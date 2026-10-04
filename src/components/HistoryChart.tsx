import React, { useEffect, useRef } from 'react';
import type { PresetType } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { TrendingUp } from 'lucide-react';

interface HistoryChartProps {
  history: number[];
  preset: PresetType;
  isActive: boolean;
}

export const HistoryChart: React.FC<HistoryChartProps> = ({
  history,
  preset,
  isActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const thresholdDb = preset === 'nursery' ? 50 : preset === 'hearing' ? 85 : 45;
  const thresholdLabel =
    preset === 'nursery'
      ? '50 dBA AAP Crib Sleep Limit'
      : preset === 'hearing'
      ? '85 dBA NIOSH Hazard Limit'
      : '45 dBA Restful Sleep Target';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const minDb = 25;
    const maxDb = 95;
    const dbRange = maxDb - minDb;

    const getY = (val: number) => {
      const clamped = Math.max(minDb, Math.min(maxDb, val));
      const fraction = (clamped - minDb) / dbRange;
      return height - fraction * height;
    };

    // 1. Grid Lines (30, 50, 70, 90 dB)
    [30, 50, 70, 90].forEach((db) => {
      const y = getY(db);
      ctx.strokeStyle = '#27272a'; // zinc-800
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      ctx.font = '10px monospace';
      ctx.fillStyle = '#71717a'; // zinc-500
      ctx.textAlign = 'right';
      ctx.fillText(`${db} dB`, width - 6, y - 3);
    });

    // 2. Preset Threshold Reference Line
    const thresholdY = getY(thresholdDb);
    ctx.strokeStyle = preset === 'nursery' ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, thresholdY);
    ctx.lineTo(width, thresholdY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Threshold Text
    ctx.font = '600 10px monospace';
    ctx.fillStyle = preset === 'nursery' ? '#34d399' : '#f87171';
    ctx.textAlign = 'left';
    ctx.fillText(thresholdLabel, 8, thresholdY - 4);

    // 3. Draw History Curve
    if (history.length > 1) {
      const step = width / Math.max(1, history.length - 1);

      // Area fill
      const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
      fillGradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      fillGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

      ctx.beginPath();
      ctx.moveTo(0, getY(history[0]));

      for (let i = 1; i < history.length; i++) {
        const x = i * step;
        const y = getY(history[i]);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Stroke Line
      ctx.beginPath();
      ctx.moveTo(0, getY(history[0]));
      for (let i = 1; i < history.length; i++) {
        const x = i * step;
        const y = getY(history[i]);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else if (!isActive) {
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#71717a';
      ctx.textAlign = 'center';
      ctx.fillText('Real-time timeline will stream here while measuring', width / 2, height / 2);
    }
  }, [history, thresholdDb, thresholdLabel, preset, isActive]);

  return (
    <Card className="border-zinc-800/80 bg-zinc-950/60 shadow-sm">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <TrendingUp className="size-3.5 text-zinc-400" />
            <span>Sound Level Timeline (Last 60s)</span>
          </CardTitle>
          <span className="text-[11px] font-mono text-zinc-400">
            Rolling Series
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-2">
        <div className="relative h-36 w-full overflow-hidden rounded-lg bg-zinc-900/60 border border-zinc-800">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      </CardContent>
    </Card>
  );
};
