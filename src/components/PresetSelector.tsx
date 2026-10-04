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
  nursery: <Baby className="size-4 mr-1.5 shrink-0" />,
  hearing: <Shield className="size-4 mr-1.5 shrink-0" />,
  sleep: <Moon className="size-4 mr-1.5 shrink-0" />,
  raw: <Sliders className="size-4 mr-1.5 shrink-0" />,
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
        <TabsList>
          {(Object.keys(PRESETS) as PresetType[]).map((id) => (
            <TabsTrigger
              key={id}
              value={id}
              disabled={disabled}
            >
              {PRESET_ICONS[id]}
              <span className="truncate">{PRESETS[id].shortName}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
