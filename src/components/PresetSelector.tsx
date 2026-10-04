import React from 'react';
import type { PresetType } from '../types';
import { PRESETS } from '../constants/presets';
import { Baby, Shield, Moon, Sliders } from 'lucide-react';

interface PresetSelectorProps {
  selectedPreset: PresetType;
  onSelectPreset: (preset: PresetType) => void;
  disabled?: boolean;
}

const PRESET_ICONS: Record<PresetType, React.ReactNode> = {
  nursery: <Baby className="size-4" />,
  hearing: <Shield className="size-4" />,
  sleep: <Moon className="size-4" />,
  raw: <Sliders className="size-4" />,
};

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPreset,
  onSelectPreset,
  disabled = false,
}) => {
  const presetsList = Object.values(PRESETS);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Measurement Purpose & Context
        </label>
        <span className="text-[11px] text-zinc-500">
          Adapts safety thresholds & advice
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {presetsList.map((p) => {
          const isSelected = selectedPreset === p.id;
          return (
            <button
              key={p.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPreset(p.id)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/10 text-zinc-100 ring-1 ring-emerald-500/50 shadow-sm'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span
                  className={`size-7 rounded-lg flex items-center justify-center border ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-zinc-800 border-zinc-700/60 text-zinc-400'
                  }`}
                >
                  {PRESET_ICONS[p.id]}
                </span>
                {isSelected && (
                  <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                )}
              </div>

              <span className="text-xs font-semibold text-zinc-100">
                {p.name}
              </span>
              <span className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                {p.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
