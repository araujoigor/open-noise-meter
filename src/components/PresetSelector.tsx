import React from 'react';
import type { PresetType } from '../types';
import { PRESETS } from '../constants/presets';
import { Baby, Shield, Moon, Sliders } from 'lucide-react';

interface PresetSelectorProps {
  selectedPreset: PresetType;
  onSelectPreset: (preset: PresetType) => void;
  disabled?: boolean;
}

const PRESET_META: Record<
  PresetType,
  {
    icon: React.ReactNode;
    title: string;
    badge: string;
  }
> = {
  nursery: {
    icon: <Baby className="size-4" />,
    title: 'Baby & Nursery',
    badge: 'AAP Crib Rule',
  },
  hearing: {
    icon: <Shield className="size-4" />,
    title: 'Hearing Safety',
    badge: 'WHO / 85 dB',
  },
  sleep: {
    icon: <Moon className="size-4" />,
    title: 'Sleep & Focus',
    badge: 'Quiet Space',
  },
  raw: {
    icon: <Sliders className="size-4" />,
    title: 'Pro / Raw',
    badge: 'Full Range',
  },
};

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPreset,
  onSelectPreset,
  disabled = false,
}) => {
  const presetKeys = Object.keys(PRESETS) as PresetType[];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Measurement Context
        </span>
        <span className="text-[11px] text-zinc-500">
          Adapts real-time safety thresholds
        </span>
      </div>

      {/* Modern 4-Pill Segmented Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presetKeys.map((key) => {
          const isSelected = selectedPreset === key;
          const meta = PRESET_META[key];

          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPreset(key)}
              className={`group relative flex items-center gap-2.5 rounded-xl border p-2.5 sm:p-3 text-left transition-all ${
                isSelected
                  ? 'border-emerald-500/70 bg-gradient-to-b from-emerald-500/15 to-emerald-500/5 text-zinc-100 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                  : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900/90'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* Icon avatar */}
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                  isSelected
                    ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                    : 'border-zinc-800 bg-zinc-800/70 text-zinc-400 group-hover:text-zinc-300'
                }`}
              >
                {meta.icon}
              </div>

              {/* Title & Badge */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-xs font-semibold truncate ${
                      isSelected ? 'text-zinc-100' : 'text-zinc-300'
                    }`}
                  >
                    {meta.title}
                  </span>
                  {isSelected && (
                    <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] shrink-0" />
                  )}
                </div>
                <span
                  className={`block text-[10px] font-mono truncate mt-0.5 ${
                    isSelected ? 'text-emerald-400/90 font-medium' : 'text-zinc-500'
                  }`}
                >
                  {meta.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
