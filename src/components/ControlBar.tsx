import React from 'react';
import type { MeterStatus, WeightingType, ResponseTime } from '../types';
import { Mic, MicOff, Pause, Play, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface ControlBarProps {
  status: MeterStatus;
  weighting: WeightingType;
  responseTime: ResponseTime;
  calibrationOffset: number;
  isCalibOpen: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
  onToggleCalib: () => void;
  onSelectWeighting: (w: WeightingType) => void;
  onSelectResponse: (r: ResponseTime) => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  status,
  weighting,
  responseTime,
  calibrationOffset,
  isCalibOpen,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
  onToggleCalib,
  onSelectWeighting,
  onSelectResponse,
}) => {
  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isIdle = status === 'idle' || status === 'error';

  const calibDelta = calibrationOffset - 100;
  const calibText = calibDelta >= 0 ? `+${calibDelta}` : `${calibDelta}`;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Upper Control Bar: Weighting, Response, Calibration Drawer Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-zinc-800">
        {/* Weighting Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">Weighting:</span>
          <div className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900/90 p-0.5" role="group">
            {(['A', 'C', 'Z'] as WeightingType[]).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onSelectWeighting(w)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold font-mono transition-all ${
                  weighting === w
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title={
                  w === 'A'
                    ? 'A-Weighting (dBA): Models human hearing (Recommended for nursery & everyday)'
                    : w === 'C'
                    ? 'C-Weighting (dBC): Flat response for bass and industrial equipment'
                    : 'Z-Weighting (dBZ): Unweighted raw acoustic energy'
                }
              >
                dB{w}
              </button>
            ))}
          </div>
        </div>

        {/* Right side toggles: Response time & Calibration */}
        <div className="flex items-center gap-2">
          {/* Response Ballistics (Slow vs Fast) */}
          <div className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900/90 p-0.5">
            <button
              type="button"
              onClick={() => onSelectResponse('slow')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                responseTime === 'slow'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Slow response: 1000ms time constant (Recommended for ambient and sleep noise)"
            >
              Slow (1s)
            </button>
            <button
              type="button"
              onClick={() => onSelectResponse('fast')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                responseTime === 'fast'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Fast response: 125ms time constant (Catches fast spikes)"
            >
              Fast (125ms)
            </button>
          </div>

          {/* Calibration Button */}
          <button
            type="button"
            onClick={onToggleCalib}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all ${
              isCalibOpen
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-zinc-800 bg-zinc-900/90 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
            title="Adjust Microphone Calibration Offset"
          >
            <SlidersHorizontal className="size-3" />
            <span>Cal: {calibText} dB</span>
          </button>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {isIdle ? (
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-zinc-950 font-bold px-7 py-3.5 text-sm sm:text-base shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Mic className="size-5" />
            <span>Start Noise Meter</span>
          </button>
        ) : (
          <>
            {isRunning ? (
              <button
                type="button"
                onClick={onPause}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold px-5 py-3 text-sm transition-all cursor-pointer"
              >
                <Pause className="size-4" />
                <span>Pause</span>
              </button>
            ) : isPaused ? (
              <button
                type="button"
                onClick={onResume}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-5 py-3 text-sm transition-all cursor-pointer"
              >
                <Play className="size-4" />
                <span>Resume</span>
              </button>
            ) : null}

            {/* Reset Button */}
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 font-medium px-4 py-3 text-sm transition-all cursor-pointer"
              title="Reset Min, Max, and Average"
            >
              <RotateCcw className="size-4" />
              <span>Reset</span>
            </button>

            {/* Stop / Turn Off Mic */}
            <button
              type="button"
              onClick={onStop}
              className="inline-flex items-center gap-2 rounded-xl border border-red-900/40 bg-red-950/20 hover:bg-red-950/40 text-red-400 font-medium px-4 py-3 text-sm transition-all cursor-pointer"
              title="Turn off microphone and stop sampling"
            >
              <MicOff className="size-4" />
              <span>Stop</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
