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
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-emerald-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Microphone Calibration Offset
            </h4>
          </div>
          <p className="mt-1 text-xs text-zinc-400 leading-relaxed max-w-xl">
            Smartphone and laptop microphones are pre-calibrated to a standard baseline. If you have an{' '}
            <strong className="text-zinc-200">Apple Watch (Noise app)</strong> or a physical sound meter, you can match your device reading here.
          </p>
        </div>

        {/* Slider & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <input
            type="range"
            min="70"
            max="130"
            step="1"
            value={calibrationOffset}
            onChange={(e) => onOffsetChange(Number(e.target.value))}
            className="w-36 sm:w-44 accent-emerald-500 cursor-pointer"
          />
          <span className="font-mono text-sm font-bold text-emerald-400 w-16 text-right">
            {deltaText}
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            title="Reset calibration offset to +0 dB default"
          >
            <RotateCcw className="size-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
