import React from 'react';
import type { MeterStatus, WeightingType, ResponseTime } from '../types';
import { Button } from './ui/button';
import { Mic, MicOff, Pause, Play, RotateCcw } from 'lucide-react';

interface ControlBarProps {
  status: MeterStatus;
  weighting: WeightingType;
  responseTime: ResponseTime;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
  onSelectWeighting: (w: WeightingType) => void;
  onSelectResponse: (r: ResponseTime) => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  status,
  weighting,
  responseTime,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
  onSelectWeighting,
  onSelectResponse,
}) => {
  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isIdle = status === 'idle' || status === 'error';

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {isIdle ? (
          <Button
            size="lg"
            onClick={onStart}
            className="h-12 px-8 text-base font-semibold gap-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 shadow-md"
          >
            <Mic className="size-5" />
            <span>Start Measuring</span>
          </Button>
        ) : (
          <>
            {isRunning ? (
              <Button
                variant="secondary"
                size="default"
                onClick={onPause}
                className="gap-2 font-medium"
              >
                <Pause className="size-4" />
                <span>Pause</span>
              </Button>
            ) : isPaused ? (
              <Button
                variant="default"
                size="default"
                onClick={onResume}
                className="gap-2 font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
              >
                <Play className="size-4" />
                <span>Resume</span>
              </Button>
            ) : null}

            <Button
              variant="outline"
              size="default"
              onClick={onReset}
              className="gap-2 text-zinc-400 hover:text-zinc-200"
              title="Reset session statistics"
            >
              <RotateCcw className="size-4" />
              <span>Reset</span>
            </Button>

            <Button
              variant="outline"
              size="default"
              onClick={onStop}
              className="gap-2 border-red-900/40 text-red-400 hover:bg-red-950/30 hover:text-red-300"
              title="Stop microphone"
            >
              <MicOff className="size-4" />
              <span>Stop</span>
            </Button>
          </>
        )}
      </div>

      {/* Quick Settings Selector Strip */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
        {/* Weighting Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 font-mono">Weighting:</span>
          <div className="inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-0.5" role="group">
            {(['A', 'C', 'Z'] as WeightingType[]).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onSelectWeighting(w)}
                className={`rounded px-2 py-0.5 text-xs font-mono font-medium transition-colors ${
                  weighting === w
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title={
                  w === 'A'
                    ? 'dBA (Human hearing curve - recommended for baby & everyday)'
                    : w === 'C'
                    ? 'dBC (Flat curve for low frequency bass)'
                    : 'dBZ (Unweighted linear sound pressure)'
                }
              >
                dB{w}
              </button>
            ))}
          </div>
        </div>

        {/* Response Ballistics */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 font-mono hidden sm:inline">Response:</span>
          <div className="inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-0.5">
            <button
              type="button"
              onClick={() => onSelectResponse('slow')}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                responseTime === 'slow'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Slow (1s): Standard for steady environmental and sleep noise"
            >
              Slow (1s)
            </button>
            <button
              type="button"
              onClick={() => onSelectResponse('fast')}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                responseTime === 'fast'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Fast (125ms): Responsive to transient peaks and impulsive sounds"
            >
              Fast (125ms)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
