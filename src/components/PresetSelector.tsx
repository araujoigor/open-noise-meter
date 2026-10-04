import React from 'react';
import type { PresetType } from '../types';
import { PRESETS } from '../constants/presets';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Baby, Shield, Moon, Sliders } from 'lucide-react';

interface PresetSelectorProps {
  selectedPreset: PresetType;
  onSelectPreset: (preset: PresetType) => void;
  disabled?: boolean;
}

const PRESET_ICONS: Record<PresetType, React.ReactNode> = {
  nursery: <Baby className="size-3.5 mr-1.5" />,
  hearing: <Shield className="size-3.5 mr-1.5" />,
  sleep: <Moon className="size-3.5 mr-1.5" />,
  raw: <Sliders className="size-3.5 mr-1.5" />,
};

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPreset,
  onSelectPreset,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <Tabs
        value={selectedPreset}
        onValueChange={(val) => onSelectPreset(val as PresetType)}
      >
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1 bg-zinc-900 border-zinc-800/80">
          {(Object.keys(PRESETS) as PresetType[]).map((id) => (
            <TabsTrigger
              key={id}
              value={id}
              disabled={disabled}
              className="py-2 text-xs font-medium"
            >
              {PRESET_ICONS[id]}
              <span>{PRESETS[id].shortName}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
