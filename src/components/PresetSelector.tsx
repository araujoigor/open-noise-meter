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
  nursery: <Baby className="size-3.5 mr-1.5 shrink-0" />,
  hearing: <Shield className="size-3.5 mr-1.5 shrink-0" />,
  sleep: <Moon className="size-3.5 mr-1.5 shrink-0" />,
  raw: <Sliders className="size-3.5 mr-1.5 shrink-0" />,
};

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPreset,
  onSelectPreset,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Acoustic Measurement Presets"
        className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-sm"
      >
        {(Object.keys(PRESETS) as PresetType[]).map((id) => {
          const isSelected = selectedPreset === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isSelected}
              disabled={disabled}
              onClick={() => onSelectPreset(id)}
              className={`flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50 ${
                isSelected
                  ? 'bg-slate-800 text-slate-100 font-semibold shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {PRESET_ICONS[id]}
              <span className="truncate">{PRESETS[id].shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
