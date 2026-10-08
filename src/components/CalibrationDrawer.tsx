import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface CalibrationDrawerProps {
  isOpen: boolean;
  calibrationOffset: number;
  onOffsetChange: (offset: number) => void;
  onReset: () => void;
}

export const CalibrationDrawer: React.FC<CalibrationDrawerProps> = ({
  isOpen,
  calibrationOffset,
  onOffsetChange,
  onReset,
}) => {
  if (!isOpen) return null;

  const delta = calibrationOffset - 100;
  const deltaText = delta >= 0 ? `+${delta} dB` : `${delta} dB`;

  return (
    <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 sm:p-5 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-150 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <SlidersHorizontal className="size-3.5 text-slate-400" />
          <span>Microphone Calibration & Offset</span>
        </div>
        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 text-slate-200">
          Offset: {deltaText}
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Consumer smartphone and laptop microphones are calibrated to an acoustic baseline. If you have an{' '}
        <strong className="text-slate-200">Apple Watch (Noise app)</strong> or hardware decibel meter, you can fine-tune here.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="70"
            max="130"
            step="1"
            value={calibrationOffset}
            onChange={(e) => onOffsetChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-slate-800 accent-emerald-500 cursor-pointer"
          />
          <span className="font-mono text-xs font-bold text-slate-200 w-14 text-right">
            {deltaText}
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs px-3 h-8 transition-colors cursor-pointer"
          title="Reset calibration to +0 dB baseline"
        >
          <RotateCcw className="size-3 text-slate-400" />
          <span>Reset Default</span>
        </button>
      </div>
    </div>
  );
};
