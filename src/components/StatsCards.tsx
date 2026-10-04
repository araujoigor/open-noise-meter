import React from 'react';
import type { MeterStats, WeightingType } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Activity, ArrowDown, ArrowUp, Zap } from 'lucide-react';

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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Current */}
        <Card className="border-zinc-800/80 bg-zinc-950/60">
          <CardHeader className="p-3.5 pb-1">
            <CardTitle className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <Activity className="size-3 text-zinc-400" />
              <span>Current</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="font-mono text-2xl font-bold tabular-nums">
              {isActive && stats.current > 0 ? (
                <>
                  <span className="text-zinc-100">{stats.current.toFixed(1)}</span>
                  <span className="text-xs text-zinc-400 font-normal ml-1 font-sans">dB{unit}</span>
                </>
              ) : (
                <span className="text-zinc-700">--</span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500">Real-time RMS</span>
          </CardContent>
        </Card>

        {/* Min */}
        <Card className="border-zinc-800/80 bg-zinc-950/60">
          <CardHeader className="p-3.5 pb-1">
            <CardTitle className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <ArrowDown className="size-3 text-emerald-400" />
              <span>Min</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="font-mono text-2xl font-bold tabular-nums">
              {isActive && stats.min > 0 ? (
                <>
                  <span className="text-emerald-400">{stats.min.toFixed(1)}</span>
                  <span className="text-xs text-emerald-400/60 font-normal ml-1 font-sans">dB{unit}</span>
                </>
              ) : (
                <span className="text-zinc-700">--</span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500">Lowest level</span>
          </CardContent>
        </Card>

        {/* Average Leq */}
        <Card className="border-zinc-800/80 bg-zinc-950/60">
          <CardHeader className="p-3.5 pb-1">
            <CardTitle className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <Zap className="size-3 text-blue-400" />
              <span>Average (Leq)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="font-mono text-2xl font-bold tabular-nums">
              {isActive && stats.avg > 0 ? (
                <>
                  <span className="text-blue-400">{stats.avg.toFixed(1)}</span>
                  <span className="text-xs text-blue-400/60 font-normal ml-1 font-sans">dB{unit}</span>
                </>
              ) : (
                <span className="text-zinc-700">--</span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500">Energy average</span>
          </CardContent>
        </Card>

        {/* Peak Max */}
        <Card className="border-zinc-800/80 bg-zinc-950/60">
          <CardHeader className="p-3.5 pb-1">
            <CardTitle className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <ArrowUp className="size-3 text-amber-400" />
              <span>Peak</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="font-mono text-2xl font-bold tabular-nums">
              {isActive && stats.max > 0 ? (
                <>
                  <span className="text-amber-400">{stats.max.toFixed(1)}</span>
                  <span className="text-xs text-amber-400/60 font-normal ml-1 font-sans">dB{unit}</span>
                </>
              ) : (
                <span className="text-zinc-700">--</span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500">Highest spike</span>
          </CardContent>
        </Card>
      </div>

      {isActive && (
        <div className="flex justify-between items-center px-1 text-[11px] font-mono text-zinc-500">
          <span>Session: {formatTime(stats.elapsedSeconds)}</span>
          <span>Peak Freq: {stats.peakFrequencyHz > 0 ? `${stats.peakFrequencyHz} Hz` : '-- Hz'}</span>
        </div>
      )}
    </div>
  );
};
