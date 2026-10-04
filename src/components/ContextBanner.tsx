import React from 'react';
import type { PresetConfig, PresetThreshold } from '../types';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, MapPin } from 'lucide-react';

interface ContextBannerProps {
  presetConfig: PresetConfig;
  activeThreshold?: PresetThreshold;
  currentSpl: number;
  isActive: boolean;
}

export const ContextBanner: React.FC<ContextBannerProps> = ({
  presetConfig,
  activeThreshold,
  currentSpl,
  isActive,
}) => {
  const isCaution = activeThreshold?.level === 'caution';
  const isDanger = activeThreshold?.level === 'danger';

  // Zone bar bounds for Nursery mode: 20 to 80 dB range
  const minDb = 25;
  const maxDb = 75;
  const clampedSpl = Math.max(minDb, Math.min(maxDb, currentSpl));
  const currentPercent = ((clampedSpl - minDb) / (maxDb - minDb)) * 100;
  const aapLimitPercent = ((50 - minDb) / (maxDb - minDb)) * 100;

  return (
    <div className="w-full space-y-3">
      {/* 1. Context Guidance & Active Assessment Banner */}
      <div
        className={`w-full rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
          isActive && activeThreshold
            ? isDanger
              ? 'border-red-500/40 bg-red-950/20 text-red-200'
              : isCaution
              ? 'border-amber-500/40 bg-amber-950/20 text-amber-200'
              : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200'
            : 'border-zinc-800 bg-zinc-900/60 text-zinc-300'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            {isActive && activeThreshold ? (
              isDanger ? (
                <AlertCircle className="size-5 text-red-400" />
              ) : isCaution ? (
                <AlertTriangle className="size-5 text-amber-400" />
              ) : (
                <CheckCircle2 className="size-5 text-emerald-400" />
              )
            ) : (
              <Info className="size-5 text-zinc-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header / Verdict */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                {isActive && activeThreshold ? (
                  <>
                    <span
                      className={
                        isDanger
                          ? 'text-red-400'
                          : isCaution
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }
                    >
                      {activeThreshold.verdict || activeThreshold.badge}
                    </span>
                    <span className="text-xs font-mono font-normal text-zinc-400">
                      ({currentSpl.toFixed(1)} dBA)
                    </span>
                  </>
                ) : (
                  presetConfig.guidance.ruleTitle
                )}
              </h3>

              <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700/60 shrink-0">
                {presetConfig.shortName}
              </span>
            </div>

            {/* Advice Text */}
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-300">
              {isActive && activeThreshold
                ? activeThreshold.advice
                : presetConfig.guidance.ruleText}
            </p>

            {/* Placement tip */}
            {presetConfig.guidance.recommendedPlacement && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80 px-3 py-2 text-xs text-zinc-300">
                <MapPin className="size-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-zinc-100">Placement:</strong>{' '}
                  {presetConfig.guidance.recommendedPlacement}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Visual Zone Bar / Range Indicator (Nursery & Infant Mode Hero Feature) */}
      {presetConfig.id === 'nursery' && (
        <div className="w-full rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-3.5 sm:p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
              <span>Acoustic Safety Zone</span>
              <span className="text-[10px] text-zinc-500 font-mono">
                (AAP Crib 50 dBA Limit)
              </span>
            </span>
            <span className="font-mono text-xs font-bold text-zinc-400">
              {isActive ? `${currentSpl.toFixed(1)} dBA` : 'Waiting to start'}
            </span>
          </div>

          {/* Segmented Track Bar */}
          <div className="relative w-full">
            {/* Visual zones track */}
            <div className="relative h-3.5 w-full rounded-full overflow-hidden flex bg-zinc-800/70 p-0.5 border border-zinc-700/50">
              {/* Zone 1: Safe Ambient (<45) */}
              <div
                className="h-full rounded-l-full bg-emerald-500/30 transition-colors"
                style={{ width: `${((45 - minDb) / (maxDb - minDb)) * 100}%` }}
                title="Safe nursery ambient (<45 dB)"
              />
              {/* Zone 2: AAP Target (45-50) */}
              <div
                className="h-full bg-emerald-500/70 transition-colors"
                style={{ width: `${((50 - 45) / (maxDb - minDb)) * 100}%` }}
                title="Optimal White Noise AAP Target (45-50 dB)"
              />
              {/* Zone 3: Caution (50-60) */}
              <div
                className="h-full bg-amber-500/60 transition-colors"
                style={{ width: `${((60 - 50) / (maxDb - minDb)) * 100}%` }}
                title="Caution: Borderline for Sleep (50-60 dB)"
              />
              {/* Zone 4: Too Loud (>60) */}
              <div
                className="h-full rounded-r-full bg-red-500/70 flex-1 transition-colors"
                title="Too Loud for Baby's Ears (>60 dB)"
              />
            </div>

            {/* AAP 50 dBA Threshold Marker */}
            <div
              className="absolute -top-1 bottom-0 flex flex-col items-center pointer-events-none z-10"
              style={{ left: `${aapLimitPercent}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-0.5 h-5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] rounded-full" />
            </div>

            {/* Real-time Current Decibel Position Pointer */}
            {isActive && (
              <div
                className="absolute -bottom-2 flex flex-col items-center pointer-events-none z-20 transition-all duration-150"
                style={{
                  left: `${currentPercent}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div
                  className="size-3.5 rounded-full border-2 border-zinc-950 shadow-lg"
                  style={{
                    backgroundColor: activeThreshold?.color || '#10b981',
                  }}
                />
              </div>
            )}
          </div>

          {/* Zone Labels Under the Bar */}
          <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-400 font-medium">
            <span className="text-emerald-400/90">&lt;45 Safe Ambient</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 rounded px-1.5 py-0.5">
              45–50 AAP Target
            </span>
            <span className="text-amber-400/90">50–60 Caution</span>
            <span className="text-red-400/90">&gt;60 Too Loud!</span>
          </div>
        </div>
      )}
    </div>
  );
};
