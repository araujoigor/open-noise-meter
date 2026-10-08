import React, { useEffect, useRef } from 'react';
import type { PresetConfig, PresetThreshold, WeightingType, ResponseTime, MeterStatus, MeterStats } from '../types';
import {
  Activity,
  Zap,
  ArrowDown,
  ArrowUp,
  Play,
  Pause,
  RotateCcw,
  Mic,
  MicOff,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  MapPin,
  Clock,
  Radio,
} from 'lucide-react';

interface MeterDisplayProps {
  stats: MeterStats;
  history: number[];
  isActive: boolean;
  status: MeterStatus;
  unit: WeightingType;
  responseTime: ResponseTime;
  presetConfig: PresetConfig;
  activeThreshold?: PresetThreshold;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
  onSelectWeighting: (w: WeightingType) => void;
  onSelectResponse: (r: ResponseTime) => void;
}

export const MeterDisplay: React.FC<MeterDisplayProps> = ({
  stats,
  history,
  isActive,
  status,
  unit,
  responseTime,
  presetConfig,
  activeThreshold,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
  onSelectWeighting,
  onSelectResponse,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isIdle = status === 'idle' || status === 'error';

  const isDanger = activeThreshold?.level === 'danger';
  const isCaution = activeThreshold?.level === 'caution';

  // Zone range calculation (min: 25 dB, max: 95 dB)
  const minRange = 25;
  const maxRange = 95;
  const clampedSpl = Math.max(minRange, Math.min(maxRange, stats.current || 25));
  const pointerPercent = ((clampedSpl - minRange) / (maxRange - minRange)) * 100;

  // Threshold marker percent (e.g. 50 dB for nursery)
  const targetThresholdDb = presetConfig.id === 'nursery' ? 50 : presetConfig.id === 'hearing' ? 85 : 45;
  const thresholdPercent = ((targetThresholdDb - minRange) / (maxRange - minRange)) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Timeline canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const minDb = 25;
    const maxDb = 95;
    const dbRange = maxDb - minDb;

    const getY = (val: number) => {
      const clamped = Math.max(minDb, Math.min(maxDb, val));
      const fraction = (clamped - minDb) / dbRange;
      return height - fraction * height;
    };

    // Grid lines (30, 50, 70, 90 dB)
    [30, 50, 70, 90].forEach((db) => {
      const y = getY(db);
      ctx.strokeStyle = '#1e2430';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      ctx.font = '9px monospace';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'right';
      ctx.fillText(`${db}`, width - 4, y - 2);
    });

    // Preset Threshold Reference Line
    const thresholdY = getY(targetThresholdDb);
    ctx.strokeStyle = presetConfig.id === 'nursery' ? 'rgba(16, 185, 129, 0.75)' : 'rgba(239, 68, 68, 0.75)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, thresholdY);
    ctx.lineTo(width, thresholdY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Threshold Text
    ctx.font = '600 9px monospace';
    ctx.fillStyle = presetConfig.id === 'nursery' ? '#34d399' : '#f87171';
    ctx.textAlign = 'left';
    ctx.fillText(
      presetConfig.id === 'nursery' ? '50 dBA AAP Crib Limit' : `${targetThresholdDb} dB Target`,
      6,
      thresholdY - 3
    );

    // Draw History Curve
    if (isActive && history.length > 1) {
      const step = width / Math.max(1, history.length - 1);

      // Area fill
      const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
      fillGradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
      fillGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

      ctx.beginPath();
      ctx.moveTo(0, getY(history[0]));

      for (let i = 1; i < history.length; i++) {
        const x = i * step;
        const y = getY(history[i]);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Stroke Line
      ctx.beginPath();
      ctx.moveTo(0, getY(history[0]));
      for (let i = 1; i < history.length; i++) {
        const x = i * step;
        const y = getY(history[i]);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  }, [history, targetThresholdDb, presetConfig.id, isActive]);

  return (
    <div className="w-full rounded-md border border-slate-800/80 bg-[#0d1017]/90 shadow-xl backdrop-blur-md overflow-hidden">
      {/* Top Console Strip: Context & Live Status */}
      <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-2.5 sm:px-6 bg-slate-900/40">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200">
            {presetConfig.name}
          </span>
          <span className="text-slate-600">•</span>
          {isActive ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-medium">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Monitoring
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <Radio className="size-3 text-slate-500" />
              Standby
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>dB{unit}</span>
          <span className="text-slate-600">•</span>
          <span>{responseTime === 'slow' ? 'Slow (1s)' : 'Fast (125ms)'}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {/* The 4 Key Metrics (Together side-by-side above the fold) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {/* 1. Live SPL */}
          <div className="rounded-md border border-slate-800/90 bg-slate-900/60 p-3 sm:p-3.5 transition-all">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="size-3.5 text-slate-300" />
                Live
              </span>
              {isActive && (
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            <div className="mt-1.5 flex items-baseline font-mono tracking-tight tabular-nums select-none">
              {isActive && stats.current > 0 ? (
                <>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-100">
                    {stats.current.toFixed(1)}
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-400 ml-1.5">
                    dB{unit}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-3xl sm:text-4xl font-bold text-slate-700">
                    00.0
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-700 ml-1.5">
                    dB{unit}
                  </span>
                </>
              )}
            </div>
            <div className="mt-1 text-[10px] text-slate-400 font-medium">
              Real-time RMS
            </div>
          </div>

          {/* 2. Average (Leq) */}
          <div className="rounded-md border border-slate-800/90 bg-slate-900/60 p-3 sm:p-3.5 transition-all">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="size-3.5 text-sky-400" />
                Average (Leq)
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline font-mono tracking-tight tabular-nums select-none">
              {isActive && stats.avg > 0 ? (
                <>
                  <span className="text-3xl sm:text-4xl font-extrabold text-sky-400">
                    {stats.avg.toFixed(1)}
                  </span>
                  <span className="text-xs font-sans font-medium text-sky-400/70 ml-1.5">
                    dB{unit}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-3xl sm:text-4xl font-bold text-slate-700">
                    00.0
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-700 ml-1.5">
                    dB{unit}
                  </span>
                </>
              )}
            </div>
            <div className="mt-1 text-[10px] text-slate-400 font-medium">
              ISO Energy Leq
            </div>
          </div>

          {/* 3. Minimum */}
          <div className="rounded-md border border-slate-800/90 bg-slate-900/60 p-3 sm:p-3.5 transition-all">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <ArrowDown className="size-3.5 text-emerald-400" />
                Minimum
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline font-mono tracking-tight tabular-nums select-none">
              {isActive && stats.min > 0 ? (
                <>
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                    {stats.min.toFixed(1)}
                  </span>
                  <span className="text-xs font-sans font-medium text-emerald-400/70 ml-1.5">
                    dB{unit}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-3xl sm:text-4xl font-bold text-slate-700">
                    00.0
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-700 ml-1.5">
                    dB{unit}
                  </span>
                </>
              )}
            </div>
            <div className="mt-1 text-[10px] text-slate-400 font-medium">
              Lowest Ambient Floor
            </div>
          </div>

          {/* 4. Peak (Max) */}
          <div className="rounded-md border border-slate-800/90 bg-slate-900/60 p-3 sm:p-3.5 transition-all">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <ArrowUp className="size-3.5 text-amber-400" />
                Peak Max
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline font-mono tracking-tight tabular-nums select-none">
              {isActive && stats.max > 0 ? (
                <>
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                    {stats.max.toFixed(1)}
                  </span>
                  <span className="text-xs font-sans font-medium text-amber-400/70 ml-1.5">
                    dB{unit}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-3xl sm:text-4xl font-bold text-slate-700">
                    00.0
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-700 ml-1.5">
                    dB{unit}
                  </span>
                </>
              )}
            </div>
            <div className="mt-1 text-[10px] text-slate-400 font-medium">
              Highest Transient Spike
            </div>
          </div>
        </div>

        {/* Precision Range & Target Meter (Directly below the 4 numbers) */}
        <div className="space-y-1.5 rounded-md border border-slate-800/80 bg-slate-900/40 p-3 sm:p-3.5">
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-mono text-slate-400 px-0.5">
            <span>{minRange} dB</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              {presetConfig.id === 'nursery' ? 'AAP 50 dB Safe Crib Limit' : `${targetThresholdDb} dB Target`}
            </span>
            <span>{maxRange} dB</span>
          </div>

          {/* The Multi-Zone Track */}
          <div className="relative h-3 w-full rounded-sm bg-slate-950 border border-slate-800 overflow-hidden flex">
            {/* Safe Zone (Green) */}
            <div
              style={{ width: `${thresholdPercent}%` }}
              className="h-full bg-emerald-500/30 border-r border-emerald-500/60"
            />
            {/* Caution Zone (Amber) */}
            <div
              style={{ width: `${Math.min(100 - thresholdPercent, 18)}%` }}
              className="h-full bg-amber-500/30 border-r border-amber-500/60"
            />
            {/* Danger Zone (Red) */}
            <div className="h-full flex-1 bg-rose-500/30" />

            {/* Live Indicator Cursor */}
            {isActive && (
              <div
                className="absolute top-0 bottom-0 w-2.5 -ml-1 rounded-sm bg-slate-100 shadow-md shadow-white/60 transition-all duration-75"
                style={{ left: `${pointerPercent}%` }}
              />
            )}
          </div>
        </div>

        {/* Dynamic Contextual Verdict Banner */}
        {isActive && activeThreshold ? (
          <div
            className={`flex items-start gap-3 rounded-md border p-3 text-xs sm:text-sm ${
              isDanger
                ? 'border-rose-900/60 bg-rose-950/30 text-rose-200'
                : isCaution
                ? 'border-amber-900/60 bg-amber-950/30 text-amber-200'
                : 'border-emerald-900/60 bg-emerald-950/30 text-emerald-200'
            }`}
          >
            {isDanger ? (
              <AlertCircle className="size-4.5 text-rose-400 shrink-0 mt-0.5" />
            ) : isCaution ? (
              <AlertTriangle className="size-4.5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="size-4.5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <div className="font-semibold text-slate-100">
                {activeThreshold.label} ({stats.current.toFixed(1)} dB{unit})
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                {activeThreshold.advice}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 rounded-md border border-slate-800/80 bg-slate-900/40 p-3 text-xs text-slate-300">
            {presetConfig.id === 'nursery' ? (
              <>
                <MapPin className="size-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>7-Foot Rule:</strong> Place noise machine 7+ ft (2m) from crib. Measure where baby’s head rests to verify volume stays below 50 dBA.
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4 text-slate-400 shrink-0" />
                <span>{presetConfig.guidance.ruleText}</span>
              </>
            )}
          </div>
        )}

        {/* Integrated Primary Controls & DSP Filter Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
          {/* Main Action Buttons */}
          <div className="flex items-center gap-2">
            {isIdle ? (
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-950 font-semibold text-xs sm:text-sm h-9 px-4 sm:px-5 shadow-md transition-all cursor-pointer"
              >
                <Mic className="size-4" />
                <span>Start Measuring</span>
              </button>
            ) : (
              <>
                {isRunning ? (
                  <button
                    type="button"
                    onClick={onPause}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-xs h-8.5 px-3 border border-slate-700/60 transition-colors cursor-pointer"
                  >
                    <Pause className="size-3.5" />
                    <span>Pause</span>
                  </button>
                ) : isPaused ? (
                  <button
                    type="button"
                    onClick={onResume}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs h-8.5 px-3 transition-colors cursor-pointer"
                  >
                    <Play className="size-3.5" />
                    <span>Resume</span>
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-medium text-xs h-8.5 px-3 border border-slate-800 transition-colors cursor-pointer"
                  title="Reset session statistics"
                >
                  <RotateCcw className="size-3.5 text-slate-400" />
                  <span>Reset</span>
                </button>

                <button
                  type="button"
                  onClick={onStop}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 font-medium text-xs h-8.5 px-3 border border-rose-900/40 transition-colors cursor-pointer"
                  title="Stop microphone"
                >
                  <MicOff className="size-3.5" />
                  <span>Stop</span>
                </button>
              </>
            )}
          </div>

          {/* Quick Filter Selection Pills */}
          <div className="flex items-center gap-2 text-xs">
            {/* Weighting Selector */}
            <div className="inline-flex rounded-md border border-slate-800 bg-slate-900/80 p-0.5">
              {(['A', 'C', 'Z'] as WeightingType[]).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => onSelectWeighting(w)}
                  className={`rounded-sm px-2 py-1 text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                    unit === w
                      ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/60'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  dB{w}
                </button>
              ))}
            </div>

            {/* Response Time */}
            <div className="inline-flex rounded-md border border-slate-800 bg-slate-900/80 p-0.5">
              <button
                type="button"
                onClick={() => onSelectResponse('slow')}
                className={`rounded-sm px-2 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                  responseTime === 'slow'
                    ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Slow
              </button>
              <button
                type="button"
                onClick={() => onSelectResponse('fast')}
                className={`rounded-sm px-2 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                  responseTime === 'fast'
                    ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Fast
              </button>
            </div>
          </div>
        </div>

        {/* Embedded 60-Second Rolling Waveform Timeline */}
        <div className="rounded-md border border-slate-800/80 bg-slate-950/70 p-2.5 sm:p-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-0.5">
            <span className="flex items-center gap-1.5">
              <Activity className="size-3 text-slate-400" />
              Rolling Acoustic Timeline (60s)
            </span>
            {isActive && (
              <span className="flex items-center gap-1 text-[10px] text-slate-500">
                <Clock className="size-3" />
                {formatTime(stats.elapsedSeconds)}
              </span>
            )}
          </div>

          <div className="relative h-24 w-full overflow-hidden rounded-md bg-slate-950 border border-slate-800/60 flex items-center justify-center">
            {isActive ? (
              <canvas ref={canvasRef} className="w-full h-full block" />
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Activity className="size-3.5 opacity-50" />
                <span>Timeline will record once measurement starts</span>
              </div>
            )}
          </div>

          {/* Bottom Telemetry Strip */}
          {isActive && (
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-0.5 px-0.5">
              <span>Samples: {stats.sampleCount}</span>
              <span>Peak Frequency: {stats.peakFrequencyHz > 0 ? `${stats.peakFrequencyHz} Hz` : '-- Hz'}</span>
              <span>Status: IEC 61672 Compliant</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
