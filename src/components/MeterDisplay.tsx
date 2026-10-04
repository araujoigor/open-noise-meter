import React from 'react';
import type { PresetConfig, PresetThreshold, WeightingType, ResponseTime, MeterStatus } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { CheckCircle2, AlertTriangle, AlertCircle, MapPin, Radio, Mic, MicOff, Pause, Play, RotateCcw } from 'lucide-react';

interface MeterDisplayProps {
  currentSpl: number;
  isActive: boolean;
  status: MeterStatus;
  unit: WeightingType;
  responseTime: ResponseTime;
  presetConfig: PresetConfig;
  activeThreshold?: PresetThreshold;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
  onSelectWeighting: (w: WeightingType) => void;
  onSelectResponse: (r: ResponseTime) => void;
}

export const MeterDisplay: React.FC<MeterDisplayProps> = ({
  currentSpl,
  isActive,
  status,
  unit,
  responseTime,
  presetConfig,
  activeThreshold,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
  onSelectWeighting,
  onSelectResponse,
}) => {
  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isIdle = status === 'idle' || status === 'error';

  const isDanger = activeThreshold?.level === 'danger';
  const isCaution = activeThreshold?.level === 'caution';

  // Zone range calculation (min: 25 dB, max: 95 dB)
  const minRange = 25;
  const maxRange = 95;
  const clampedSpl = Math.max(minRange, Math.min(maxRange, currentSpl || 25));
  const pointerPercent = ((clampedSpl - minRange) / (maxRange - minRange)) * 100;

  // Threshold marker percent (e.g. 50 dB for nursery)
  const targetThresholdDb = presetConfig.id === 'nursery' ? 50 : presetConfig.id === 'hearing' ? 85 : 45;
  const thresholdPercent = ((targetThresholdDb - minRange) / (maxRange - minRange)) * 100;

  return (
    <Card className="border-zinc-800 bg-zinc-950/80 shadow-md">
      <CardContent className="p-5 sm:p-7 space-y-6">
        {/* Top Meta Strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-medium text-xs border-zinc-700 bg-zinc-900">
              {presetConfig.name}
            </Badge>
            {isActive ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-medium">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                <Radio className="size-3 text-zinc-500" />
                Standby
              </span>
            )}
          </div>

          <span className="text-xs text-zinc-400 font-mono">
            dB{unit} • {responseTime === 'slow' ? 'Slow (1s)' : 'Fast (125ms)'}
          </span>
        </div>

        {/* Central Clean Digital Readout */}
        <div className="flex flex-col items-center justify-center py-2">
          {isActive && currentSpl > 0 ? (
            <div className="flex items-baseline font-mono tracking-tight select-none">
              <span className="text-7xl sm:text-8xl font-black text-zinc-100 tabular-nums">
                {Math.floor(currentSpl)}
              </span>
              <span className="text-4xl sm:text-5xl font-bold text-zinc-400 tabular-nums">
                .{Math.floor((currentSpl * 10) % 10)}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-zinc-400 font-sans ml-2">
                dB{unit}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline font-mono tracking-tight select-none">
              <span className="text-7xl sm:text-8xl font-bold text-zinc-800 tabular-nums">
                00.0
              </span>
              <span className="text-xl sm:text-2xl font-bold text-zinc-800 font-sans ml-2">
                dB{unit}
              </span>
            </div>
          )}

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
                Press Start to Begin
              </Badge>
            )}
          </div>
        </div>

        {/* Segmented Range Zone Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 px-0.5">
            <span>{minRange} dB</span>
            <span className="font-semibold text-emerald-400">
              {presetConfig.id === 'nursery' ? 'AAP 50 dB Crib Limit' : `${targetThresholdDb} dB Target`}
            </span>
            <span>{maxRange} dB</span>
          </div>

          {/* Track Bar with Zones */}
          <div className="relative h-3 w-full rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden flex">
            {/* Safe Zone (Green) */}
            <div
              style={{ width: `${thresholdPercent}%` }}
              className="h-full bg-emerald-500/25 border-r border-emerald-500/50"
            />
            {/* Caution Zone (Amber) */}
            <div
              style={{ width: `${Math.min(100 - thresholdPercent, 18)}%` }}
              className="h-full bg-amber-500/25 border-r border-amber-500/50"
            />
            {/* Danger Zone (Red) */}
            <div className="h-full flex-1 bg-red-500/25" />

            {/* Live Indicator Cursor */}
            {isActive && (
              <div
                className="absolute top-0 bottom-0 w-2.5 -ml-1 rounded-full bg-zinc-100 shadow-lg shadow-white/50 transition-all duration-75"
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

        {/* Primary Controls & Action Strip */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {isIdle ? (
              <Button
                size="lg"
                onClick={onStart}
                className="h-11 px-7 text-sm font-semibold gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 shadow-md"
              >
                <Mic className="size-4" />
                <span>Start Measuring</span>
              </Button>
            ) : (
              <>
                {isRunning ? (
                  <Button
                    variant="secondary"
                    onClick={onPause}
                    className="gap-2 font-medium"
                  >
                    <Pause className="size-4" />
                    <span>Pause</span>
                  </Button>
                ) : isPaused ? (
                  <Button
                    variant="default"
                    onClick={onResume}
                    className="gap-2 font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
                  >
                    <Play className="size-4" />
                    <span>Resume</span>
                  </Button>
                ) : null}

                <Button
                  variant="outline"
                  onClick={onReset}
                  className="gap-2 text-zinc-400 hover:text-zinc-200"
                  title="Reset session statistics"
                >
                  <RotateCcw className="size-4" />
                  <span>Reset</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={onStop}
                  className="gap-2 border-red-900/40 text-red-400 hover:bg-red-950/30 hover:text-red-300"
                  title="Stop microphone"
                >
                  <MicOff className="size-4" />
                  <span>Stop</span>
                </Button>
              </>
            )}
          </div>

          {/* Quick Filter Selection */}
          <div className="flex items-center justify-between pt-1 text-xs">
            {/* Weighting Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-mono">Weighting:</span>
              <div className="inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-0.5" role="group">
                {(['A', 'C', 'Z'] as WeightingType[]).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => onSelectWeighting(w)}
                    className={`rounded px-2 py-0.5 text-xs font-mono font-medium transition-colors ${
                      unit === w
                        ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    dB{w}
                  </button>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-mono hidden sm:inline">Response:</span>
              <div className="inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-0.5">
                <button
                  type="button"
                  onClick={() => onSelectResponse('slow')}
                  className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                    responseTime === 'slow'
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Slow (1s)
                </button>
                <button
                  type="button"
                  onClick={() => onSelectResponse('fast')}
                  className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                    responseTime === 'fast'
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Fast (125ms)
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
