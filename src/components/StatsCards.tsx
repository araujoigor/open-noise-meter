import React from 'react';
import type { MeterStats, WeightingType } from '../types';
import { Activity, ArrowDown, ArrowUp, Zap, Clock } from 'lucide-react';

interface StatsCardsProps {
  stats: MeterStats;
  unit: WeightingType;
  isActive: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, unit, isActive }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-2">
      {/* 4 Session Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Current */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 text-center">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <Activity className="size-3 text-zinc-400" />
            <span>Current</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-zinc-100 mt-1 tabular-nums">
            {isActive && stats.current > 0 ? stats.current.toFixed(1) : '--.-'}
            <span className="text-xs text-zinc-500 font-normal ml-0.5">dB{unit}</span>
          </div>
          <span className="text-[10px] text-zinc-500 mt-0.5">Real-time level</span>
        </div>

        {/* Min */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 text-center">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <ArrowDown className="size-3 text-emerald-400" />
            <span>Min</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 tabular-nums">
            {isActive && stats.min > 0 ? stats.min.toFixed(1) : '--.-'}
            <span className="text-xs text-emerald-400/60 font-normal ml-0.5">dB{unit}</span>
          </div>
          <span className="text-[10px] text-zinc-500 mt-0.5">Lowest recorded</span>
        </div>

        {/* Leq Average */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 text-center">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <Zap className="size-3 text-blue-400" />
            <span>Average (Leq)</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-blue-400 mt-1 tabular-nums">
            {isActive && stats.avg > 0 ? stats.avg.toFixed(1) : '--.-'}
            <span className="text-xs text-blue-400/60 font-normal ml-0.5">dB{unit}</span>
          </div>
          <span className="text-[10px] text-zinc-500 mt-0.5">Energy average</span>
        </div>

        {/* Max Peak */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 text-center">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <ArrowUp className="size-3 text-amber-400" />
            <span>Peak (Max)</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 tabular-nums">
            {isActive && stats.max > 0 ? stats.max.toFixed(1) : '--.-'}
            <span className="text-xs text-amber-400/60 font-normal ml-0.5">dB{unit}</span>
          </div>
          <span className="text-[10px] text-zinc-500 mt-0.5">Maximum spike</span>
        </div>
      </div>

      {/* Session Metadata Sub-strip */}
      {isActive && (
        <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3 text-zinc-500" />
            <span>Session Time: {formatTime(stats.elapsedSeconds)}</span>
          </div>
          <div className="text-zinc-500">
            <span>Samples: {stats.sampleCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};
