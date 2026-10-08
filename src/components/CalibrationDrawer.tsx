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
    <div className="rounded-md border border-[#1f2742] bg-[#12172a]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-150 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a8b8d4]">
          <SlidersHorizontal className="size-3.5 text-[#8292b0]" />
          <span>Microphone Calibration & Offset</span>
        </div>
        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-[#182036] border border-[#253052] text-[#f0f4fc]">
          Offset: {deltaText}
        </span>
      </div>

      <p className="text-xs text-[#8a99b5] leading-relaxed">
        Consumer smartphone and laptop microphones are calibrated to an acoustic baseline. If you have an{' '}
        <strong className="text-[#f0f4fc]">Apple Watch (Noise app)</strong> or hardware decibel meter, you can fine-tune here.
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
            className="w-full h-2 rounded-md bg-[#182036] accent-emerald-500 cursor-pointer"
          />
          <span className="font-mono text-xs font-bold text-[#f0f4fc] w-14 text-right">
            {deltaText}
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#222b46] bg-[#182036] hover:bg-[#222c4a] text-[#c4d0e6] text-xs px-3 h-8 transition-colors cursor-pointer"
          title="Reset calibration to +0 dB baseline"
        >
          <RotateCcw className="size-3 text-[#8292b0]" />
          <span>Reset Default</span>
        </button>
      </div>
    </div>
  );
};
