export type PresetType = 'nursery' | 'hearing' | 'sleep' | 'raw';

export type WeightingType = 'A' | 'C' | 'Z';

export type ResponseTime = 'fast' | 'slow';

export type MeterStatus = 'idle' | 'running' | 'paused' | 'error';

export type RiskLevel = 'safe' | 'caution' | 'danger';

export interface MeterStats {
  current: number;
  min: number;
  max: number;
  avg: number; // Leq (Energy equivalent continuous sound level)
  sampleCount: number;
  elapsedSeconds: number;
  peakFrequencyHz: number;
}

export interface PresetThreshold {
  maxDb: number;
  label: string;
  level: RiskLevel;
  badge: string;
  advice: string;
  color: string;
}

export interface PresetConfig {
  id: PresetType;
  name: string;
  shortName: string;
  icon: string;
  subtitle: string;
  description: string;
  defaultWeighting: WeightingType;
  defaultResponse: ResponseTime;
  thresholds: PresetThreshold[];
  guidance: {
    ruleTitle: string;
    ruleText: string;
    standardCitation: string;
    recommendedPlacement?: string;
  };
}

export type NoiseType = 'pink' | 'brown' | 'white' | 'rain';
