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
        className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-md bg-[#101424]/90 border border-[#1d253e] backdrop-blur-sm"
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
              className={`flex items-center justify-center px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50 ${
                isSelected
                  ? 'bg-[#1e2640] text-[#f0f4fc] font-semibold shadow-sm border border-[#2d395e]'
                  : 'text-[#8292b0] hover:text-[#f0f4fc] hover:bg-[#161c30]'
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
