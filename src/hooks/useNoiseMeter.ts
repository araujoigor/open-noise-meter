import { useState, useEffect, useRef, useCallback } from 'react';
import type {
  MeterStatus,
  MeterStats,
  PresetType,
  WeightingType,
  ResponseTime,
} from '../types';
import { PRESETS, DEFAULT_PRESET, DEFAULT_CALIBRATION_OFFSET } from '../constants/presets';
import {
  calculateSplFromFft,
  updateLeq,
  applyBallistics,
} from '../audio/weighting';

const CALIBRATION_STORAGE_KEY = 'open_noise_meter_calibration_offset';

export function useNoiseMeter() {
  const [status, setStatus] = useState<MeterStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [preset, setPresetState] = useState<PresetType>(DEFAULT_PRESET);
  const [weighting, setWeighting] = useState<WeightingType>(
    PRESETS[DEFAULT_PRESET].defaultWeighting
  );
  const [responseTime, setResponseTime] = useState<ResponseTime>(
    PRESETS[DEFAULT_PRESET].defaultResponse
  );

  const [calibrationOffset, setCalibrationOffsetState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(CALIBRATION_STORAGE_KEY);
      if (saved !== null) {
        const val = Number(saved);
        if (!isNaN(val) && val >= 70 && val <= 130) {
          return val;
        }
      }
    } catch {
      // Ignore local storage error
    }
    return DEFAULT_CALIBRATION_OFFSET;
  });

  const [stats, setStats] = useState<MeterStats>({
    current: 0,
    min: 0,
    max: 0,
    avg: 0,
    sampleCount: 0,
    elapsedSeconds: 0,
    peakFrequencyHz: 0,
  });

  const [history, setHistory] = useState<number[]>([]);

  // Audio nodes and animation refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Mutable state for RAF loop
  const smoothedSplRef = useRef<number>(30);
  const minSplRef = useRef<number>(Infinity);
  const maxSplRef = useRef<number>(-Infinity);
  const leqRef = useRef<number>(0);
  const sampleCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const lastHistoryPushRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  const weightingRef = useRef(weighting);
  const responseTimeRef = useRef(responseTime);
  const calibrationOffsetRef = useRef(calibrationOffset);
  const statusRef = useRef(status);
  const processFrameRef = useRef<() => void>(() => {});

  useEffect(() => {
    weightingRef.current = weighting;
    responseTimeRef.current = responseTime;
    calibrationOffsetRef.current = calibrationOffset;
    statusRef.current = status;
  }, [weighting, responseTime, calibrationOffset, status]);

  // Preset switch helper
  const setPreset = useCallback((newPreset: PresetType) => {
    setPresetState(newPreset);
    const config = PRESETS[newPreset];
    setWeighting(config.defaultWeighting);
    setResponseTime(config.defaultResponse);
  }, []);

  const setCalibrationOffset = useCallback((newOffset: number) => {
    setCalibrationOffsetState(newOffset);
    try {
      localStorage.setItem(CALIBRATION_STORAGE_KEY, String(newOffset));
    } catch {
      // Ignore local storage error
    }
  }, []);

  const resetCalibration = useCallback(() => {
    setCalibrationOffset(DEFAULT_CALIBRATION_OFFSET);
  }, [setCalibrationOffset]);

  const resetStats = useCallback(() => {
    minSplRef.current = Infinity;
    maxSplRef.current = -Infinity;
    leqRef.current = 0;
    sampleCountRef.current = 0;
    startTimeRef.current = statusRef.current === 'running' ? performance.now() : null;
    setHistory([]);
    setStats({
      current: smoothedSplRef.current > 0 ? smoothedSplRef.current : 30,
      min: smoothedSplRef.current > 0 ? smoothedSplRef.current : 30,
      max: smoothedSplRef.current > 0 ? smoothedSplRef.current : 30,
      avg: smoothedSplRef.current > 0 ? smoothedSplRef.current : 30,
      sampleCount: 0,
      elapsedSeconds: 0,
      peakFrequencyHz: 0,
    });
  }, []);

  const stopMeter = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }

    analyserRef.current = null;
    statusRef.current = 'idle';
    setStatus('idle');
  }, []);

  const pauseMeter = useCallback(() => {
    if (statusRef.current === 'running') {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      statusRef.current = 'paused';
      setStatus('paused');
    }
  }, []);

  // Main acoustic sampling frame loop
  const processFrame = useCallback(() => {
    const analyser = analyserRef.current;
    const audioCtx = audioCtxRef.current;

    if (!analyser || !audioCtx || statusRef.current !== 'running') {
      return;
    }

    const now = performance.now();
    const dtSeconds = lastTimeRef.current ? Math.min(0.1, (now - lastTimeRef.current) / 1000) : 0.033;
    lastTimeRef.current = now;

    // Allocate FFT buffer
    const bufferLength = analyser.frequencyBinCount;
    const frequencyData = new Float32Array(bufferLength);
    analyser.getFloatFrequencyData(frequencyData);

    // Compute SPL using selected weighting filter (dBA / dBC / dBZ)
    const { spl: instantSpl, peakFrequencyHz } = calculateSplFromFft(
      frequencyData,
      audioCtx.sampleRate,
      weightingRef.current,
      calibrationOffsetRef.current
    );

    // Ballistics exponential time smoothing
    const smoothedSpl = applyBallistics(
      smoothedSplRef.current,
      instantSpl,
      dtSeconds,
      responseTimeRef.current
    );
    smoothedSplRef.current = smoothedSpl;

    // Track Min and Max
    if (smoothedSpl < minSplRef.current) {
      minSplRef.current = smoothedSpl;
    }
    if (smoothedSpl > maxSplRef.current) {
      maxSplRef.current = smoothedSpl;
    }

    // Leq Energy Equivalent Average
    sampleCountRef.current += 1;
    const updatedLeq = updateLeq(leqRef.current, sampleCountRef.current - 1, instantSpl);
    leqRef.current = updatedLeq;

    // Elapsed session time
    const elapsedSeconds = startTimeRef.current
      ? Math.floor((now - startTimeRef.current) / 1000)
      : 0;

    // Push to 60-second rolling history (every 300ms)
    if (now - lastHistoryPushRef.current >= 300) {
      lastHistoryPushRef.current = now;
      setHistory((prev) => {
        const next = [...prev, smoothedSpl];
        return next.length > 60 ? next.slice(next.length - 60) : next;
      });
    }

    // Update session stats
    setStats({
      current: smoothedSpl,
      min: minSplRef.current === Infinity ? smoothedSpl : minSplRef.current,
      max: maxSplRef.current === -Infinity ? smoothedSpl : maxSplRef.current,
      avg: updatedLeq,
      sampleCount: sampleCountRef.current,
      elapsedSeconds,
      peakFrequencyHz,
    });

    animFrameRef.current = requestAnimationFrame(() => processFrameRef.current());
  }, []);

  useEffect(() => {
    processFrameRef.current = processFrame;
  }, [processFrame]);

  const resumeMeter = useCallback(() => {
    if (statusRef.current === 'paused') {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      statusRef.current = 'running';
      setStatus('running');
      lastTimeRef.current = performance.now();
      animFrameRef.current = requestAnimationFrame(() => processFrameRef.current());
    }
  }, []);

  const startMeter = useCallback(async () => {
    setErrorMessage(null);

    try {
      // 1. Request microphone access with acoustic measurement constraints
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
          video: false,
        });
      } catch {
        // Fallback if browser/platform rejects raw audio constraints
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
      }

      streamRef.current = stream;

      // 2. Initialize AudioContext
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
      audioCtxRef.current = audioCtx;

      // 3. Create AnalyserNode (2048 FFT bins for high frequency resolution)
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.2;
      analyserRef.current = analyser;

      // 4. Connect microphone -> analyser (NOT connected to destination to avoid speaker feedback!)
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;

      // 5. Initialize timing and state
      startTimeRef.current = performance.now();
      lastTimeRef.current = performance.now();
      lastHistoryPushRef.current = performance.now();
      minSplRef.current = Infinity;
      maxSplRef.current = -Infinity;
      leqRef.current = 0;
      sampleCountRef.current = 0;
      smoothedSplRef.current = 30;

      statusRef.current = 'running';
      setStatus('running');
      animFrameRef.current = requestAnimationFrame(() => processFrameRef.current());
    } catch (err: unknown) {
      stopMeter();
      statusRef.current = 'error';
      const message =
        err instanceof Error
          ? err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
            ? 'Microphone permission was denied. Please allow microphone access in your browser settings to measure noise.'
            : err.message
          : 'Could not access microphone.';
      setErrorMessage(message);
      setStatus('error');
    }
  }, [stopMeter]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMeter();
    };
  }, [stopMeter]);

  return {
    status,
    errorMessage,
    stats,
    history,
    preset,
    weighting,
    responseTime,
    calibrationOffset,
    startMeter,
    pauseMeter,
    resumeMeter,
    resetStats,
    stopMeter,
    setPreset,
    setWeighting,
    setResponseTime,
    setCalibrationOffset,
    resetCalibration,
  };
}
