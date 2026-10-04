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

  return (
    <div
      className={`w-full rounded-2xl border p-4 sm:p-5 transition-all ${
        isActive && activeThreshold
          ? isDanger
            ? 'border-red-500/50 bg-red-950/20 text-red-200'
            : isCaution
            ? 'border-amber-500/50 bg-amber-950/20 text-amber-200'
            : 'border-emerald-500/50 bg-emerald-950/20 text-emerald-200'
          : 'border-zinc-800 bg-zinc-900/60 text-zinc-300'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Dynamic Status Icon */}
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

        {/* Content */}
        <div className="flex-1">
          {/* Headline */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-zinc-100">
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
                    {activeThreshold.badge}
                  </span>{' '}
                  — {activeThreshold.label} ({currentSpl.toFixed(1)} dBA)
                </>
              ) : (
                presetConfig.guidance.ruleTitle
              )}
            </h3>

            {/* Citations Tag */}
            <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700/60">
              {presetConfig.shortName} Mode
            </span>
          </div>

          {/* Advice / Explanation */}
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
            {isActive && activeThreshold
              ? activeThreshold.advice
              : presetConfig.guidance.ruleText}
          </p>

          {/* Placement Tip for Baby Mode */}
          {presetConfig.id === 'nursery' && presetConfig.guidance.recommendedPlacement && (
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 px-3 py-2 text-[11px] text-zinc-300">
              <MapPin className="size-3.5 text-emerald-400 shrink-0" />
              <span>
                <strong>Placement:</strong> {presetConfig.guidance.recommendedPlacement}
              </span>
            </div>
          )}

          {/* Source Citation Footer */}
          <div className="mt-2.5 text-[10px] text-zinc-400">
            Standard: {presetConfig.guidance.standardCitation}
          </div>
        </div>
      </div>
    </div>
  );
};
