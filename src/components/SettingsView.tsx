import React from 'react';
import type { WeightingType, ResponseTime } from '../types';
import { SlidersHorizontal, RotateCcw, Cpu, ShieldCheck } from 'lucide-react';

interface SettingsViewProps {
  calibrationOffset: number;
  onOffsetChange: (offset: number) => void;
  onResetCalibration: () => void;
  weighting: WeightingType;
  onSelectWeighting: (w: WeightingType) => void;
  responseTime: ResponseTime;
  onSelectResponse: (r: ResponseTime) => void;
  currentSpl: number;
  isMeasuring: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  calibrationOffset,
  onOffsetChange,
  onResetCalibration,
  weighting,
  onSelectWeighting,
  responseTime,
  onSelectResponse,
  currentSpl,
  isMeasuring,
}) => {
  const delta = calibrationOffset - 100;
  const deltaText = delta >= 0 ? `+${delta} dB` : `${delta} dB`;

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-200">
      {/* 1. Microphone Calibration Card */}
      <div className="rounded-md border border-[#1f2742] bg-[#0e1220]/95 p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-[#161d32] text-indigo-400">
              <SlidersHorizontal className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#f0f4fc]">
                Microphone Calibration
              </h3>
              <p className="text-xs text-[#8292b0]">
                Fine-tune hardware microphone sensitivity offset (±30 dB)
              </p>
            </div>
          </div>

          <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#182036] border border-[#253052] text-[#f0f4fc] font-bold">
            Offset: {deltaText}
          </span>
        </div>

        <p className="text-xs text-[#8e9ebc] leading-relaxed">
          Consumer smartphone and laptop microphones are calibrated to an acoustic baseline. If you have an{' '}
          <strong className="text-[#f0f4fc]">Apple Watch (Noise app)</strong> or reference hardware sound meter, adjust the slider to match your reference reading.
        </p>

        {/* Live SPL test preview */}
        {isMeasuring && (
          <div className="flex items-center justify-between p-3 rounded-md bg-[#12172a] border border-[#1f2742] text-xs font-mono">
            <span className="text-[#8292b0]">Live Calibrated Reading:</span>
            <span className="font-bold text-indigo-400 text-sm">{currentSpl.toFixed(1)} dB{weighting}</span>
          </div>
        )}

        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="70"
              max="130"
              step="1"
              value={calibrationOffset}
              onChange={(e) => onOffsetChange(Number(e.target.value))}
              className="w-full h-2 rounded-md bg-[#182036] accent-indigo-400 cursor-pointer"
            />
            <span className="font-mono text-xs font-bold text-[#f0f4fc] w-14 text-right">
              {deltaText}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#6c7d9e]">Baseline: +0 dB</span>
            <button
              type="button"
              onClick={onResetCalibration}
              className="inline-flex items-center gap-1.5 text-xs text-[#8292b0] hover:text-[#f0f4fc] transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3" />
              <span>Reset to default (+0 dB)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Acoustic Filter & Ballistics Preferences */}
      <div className="rounded-md border border-[#1f2742] bg-[#0e1220]/95 p-5 sm:p-6 shadow-2xl space-y-4">
        <h4 className="text-sm font-semibold text-[#f0f4fc]">
          Acoustic Curves & Ballistics
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Weighting */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#8a99b5]">Frequency Weighting Curve</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-md bg-[#101424] border border-[#1d253e]">
              {(['A', 'C', 'Z'] as WeightingType[]).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => onSelectWeighting(w)}
                  className={`py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                    weighting === w
                      ? 'bg-[#1f2742] text-[#f0f4fc] font-bold border border-[#2d395e]'
                      : 'text-[#8292b0] hover:text-[#f0f4fc]'
                  }`}
                >
                  dB{w}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#6c7d9e] leading-relaxed">
              <strong>dBA:</strong> Human ear response (standard for AAP & sleep). <strong>dBC:</strong> Low bass / machinery. <strong>dBZ:</strong> Unweighted flat pressure.
            </p>
          </div>

          {/* Response Ballistics */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#8a99b5]">Time Response Ballistics</label>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-md bg-[#101424] border border-[#1d253e]">
              <button
                type="button"
                onClick={() => onSelectResponse('slow')}
                className={`py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                  responseTime === 'slow'
                    ? 'bg-[#1f2742] text-[#f0f4fc] font-bold border border-[#2d395e]'
                    : 'text-[#8292b0] hover:text-[#f0f4fc]'
                }`}
              >
                Slow (1s)
              </button>
              <button
                type="button"
                onClick={() => onSelectResponse('fast')}
                className={`py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                  responseTime === 'fast'
                    ? 'bg-[#1f2742] text-[#f0f4fc] font-bold border border-[#2d395e]'
                    : 'text-[#8292b0] hover:text-[#f0f4fc]'
                }`}
              >
                Fast (125ms)
              </button>
            </div>
            <p className="text-[11px] text-[#6c7d9e] leading-relaxed">
              <strong>Slow (1s):</strong> Dampens brief spikes for continuous sleep monitoring. <strong>Fast (125ms):</strong> Captures impulsive peaks.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Audio Pipeline & Privacy Diagnostics */}
      <div className="rounded-md border border-[#1f2742] bg-[#0e1220]/95 p-5 sm:p-6 shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="size-4 text-sky-400" />
          <h4 className="text-sm font-semibold text-[#f0f4fc]">
            Audio Engine & Privacy Architecture
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs font-mono">
          <div className="p-2.5 rounded-md bg-[#12172a] border border-[#1b2238]">
            <span className="text-[#6c7d9e] block text-[10px]">STANDARD</span>
            <span className="text-[#f0f4fc] font-semibold">IEC 61672-1</span>
          </div>
          <div className="p-2.5 rounded-md bg-[#12172a] border border-[#1b2238]">
            <span className="text-[#6c7d9e] block text-[10px]">LEQ FORMULA</span>
            <span className="text-[#f0f4fc] font-semibold">ISO 1996</span>
          </div>
          <div className="p-2.5 rounded-md bg-[#12172a] border border-[#1b2238]">
            <span className="text-[#6c7d9e] block text-[10px]">FFT RESOLUTION</span>
            <span className="text-[#f0f4fc] font-semibold">2048 Bins</span>
          </div>
          <div className="p-2.5 rounded-md bg-[#12172a] border border-[#1b2238]">
            <span className="text-[#6c7d9e] block text-[10px]">PRIVACY</span>
            <span className="text-indigo-400 font-semibold">100% In-RAM</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-2 text-xs text-[#8e9ebc]">
          <ShieldCheck className="size-4 text-indigo-400 shrink-0 mt-0.5" />
          <span>
            <strong>Zero Tracking Guarantee:</strong> Microphone audio samples are processed exclusively in volatile browser RAM using the HTML5 Web Audio API. Audio is never recorded, saved to disk, or sent to external servers. Zero cookies.
          </span>
        </div>
      </div>
    </div>
  );
};
