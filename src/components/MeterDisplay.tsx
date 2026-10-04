import React from 'react';
import type { PresetConfig, PresetThreshold, WeightingType, ResponseTime } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { CheckCircle2, AlertTriangle, AlertCircle, MapPin, Radio } from 'lucide-react';

interface MeterDisplayProps {
  currentSpl: number;
  isActive: boolean;
  unit: WeightingType;
  responseTime: ResponseTime;
  presetConfig: PresetConfig;
  activeThreshold?: PresetThreshold;
}

export const MeterDisplay: React.FC<MeterDisplayProps> = ({
  currentSpl,
  isActive,
  unit,
  responseTime,
  presetConfig,
  activeThreshold,
}) => {
  // Split into integer and decimal for modern typography
  const formattedValue = isActive && currentSpl > 0 ? currentSpl.toFixed(1) : '--.-';
  const [intPart, decPart] = formattedValue.split('.');

  const isDanger = activeThreshold?.level === 'danger';
  const isCaution = activeThreshold?.level === 'caution';

  // Zone bar calculation (min: 25 dB, max: 95 dB)
  const minRange = 25;
  const maxRange = 95;
  const clampedSpl = Math.max(minRange, Math.min(maxRange, currentSpl));
  const pointerPercent = ((clampedSpl - minRange) / (maxRange - minRange)) * 100;

  // Threshold marker percent (e.g. 50 dB for nursery)
  const targetThresholdDb = presetConfig.id === 'nursery' ? 50 : presetConfig.id === 'hearing' ? 85 : 50;
  const thresholdPercent = ((targetThresholdDb - minRange) / (maxRange - minRange)) * 100;

  return (
    <Card className="border-zinc-800 bg-zinc-950/80 shadow-md">
      <CardContent className="p-6 sm:p-8 space-y-6">
        {/* Top Meta Strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-medium text-xs border-zinc-700 bg-zinc-900">
              {presetConfig.name}
            </Badge>
            {isActive ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                <Radio className="size-3 text-zinc-600" />
                Standby
              </span>
            )}
          </div>

          <span className="text-xs text-zinc-400 font-mono">
            dB{unit} • {responseTime === 'slow' ? 'Slow (1s)' : 'Fast (125ms)'}
          </span>
        </div>

        {/* Central Bold Readout */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="flex items-baseline font-mono tracking-tight select-none">
            <span className="text-7xl sm:text-8xl font-extrabold text-zinc-100 tabular-nums">
              {intPart}
            </span>
            <span className="text-4xl sm:text-5xl font-bold text-zinc-400 tabular-nums">
              .{decPart || '0'}
            </span>
            <span className="text-xl sm:text-2xl font-semibold text-zinc-400 font-sans ml-2">
              dB{unit}
            </span>
          </div>

          {/* Qualitative Status Badge */}
          <div className="mt-3">
            {isActive && activeThreshold ? (
              <Badge
                variant={isDanger ? 'destructive' : isCaution ? 'warning' : 'success'}
                className="text-xs font-semibold px-3 py-1"
              >
                {activeThreshold.badge}
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs text-zinc-400 px-3 py-1">
                Press Start to Measure
              </Badge>
            )}
          </div>
        </div>

        {/* Segmented Range Zone Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 px-0.5">
            <span>{minRange} dB</span>
            <span className="font-semibold text-emerald-400">
              {presetConfig.id === 'nursery' ? 'AAP 50 dB Limit' : `${targetThresholdDb} dB Target`}
            </span>
            <span>{maxRange} dB</span>
          </div>

          {/* Track Bar with Zones */}
          <div className="relative h-3 w-full rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden flex">
            {/* Safe Zone (Green) */}
            <div
              style={{ width: `${thresholdPercent}%` }}
              className="h-full bg-emerald-500/30 border-r border-emerald-500/60"
            />
            {/* Caution Zone (Amber) */}
            <div
              style={{ width: `${Math.min(100 - thresholdPercent, 18)}%` }}
              className="h-full bg-amber-500/30 border-r border-amber-500/60"
            />
            {/* Danger Zone (Red) */}
            <div className="h-full flex-1 bg-red-500/30" />

            {/* Live Indicator Cursor */}
            {isActive && (
              <div
                className="absolute top-0 bottom-0 w-2 -ml-1 rounded-full bg-zinc-100 shadow-md transition-all duration-100"
                style={{ left: `${pointerPercent}%` }}
              />
            )}
          </div>
        </div>

        {/* Dynamic Verdict Alert */}
        {isActive && activeThreshold ? (
          <Alert
            variant={isDanger ? 'destructive' : isCaution ? 'warning' : 'success'}
          >
            {isDanger ? (
              <AlertCircle className="size-4" />
            ) : isCaution ? (
              <AlertTriangle className="size-4" />
            ) : (
              <CheckCircle2 className="size-4" />
            )}
            <AlertTitle className="text-sm font-semibold">
              {activeThreshold.label} ({currentSpl.toFixed(1)} dB{unit})
            </AlertTitle>
            <AlertDescription className="mt-1">
              {activeThreshold.advice}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="default" className="border-zinc-800 bg-zinc-900/40">
            <CheckCircle2 className="size-4 text-zinc-400" />
            <AlertTitle className="text-sm font-semibold text-zinc-200">
              {presetConfig.guidance.ruleTitle}
            </AlertTitle>
            <AlertDescription className="mt-1 text-zinc-400">
              {presetConfig.guidance.ruleText}
            </AlertDescription>
          </Alert>
        )}

        {/* Nursery Placement Tip */}
        {presetConfig.id === 'nursery' && (
          <div className="flex items-center gap-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 px-3.5 py-2.5 text-xs text-zinc-300">
            <MapPin className="size-4 text-emerald-400 shrink-0" />
            <span>
              <strong>The 7-Foot Rule:</strong> Place noise machines at least 7 ft (2m) from crib. Measure inside crib where baby’s head rests.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
