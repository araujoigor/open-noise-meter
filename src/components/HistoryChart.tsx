import React, { useEffect, useRef } from 'react';
import type { PresetType } from '../types';
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

  const thresholdDb = preset === 'nursery' ? 50 : preset === 'hearing' ? 85 : 55;
  const thresholdLabel =
    preset === 'nursery'
      ? 'AAP 50 dBA Crib Limit'
      : preset === 'hearing'
      ? 'NIOSH 85 dBA Limit'
      : '55 dBA Sleep Threshold';

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
    const maxDb = 105;
    const dbRange = maxDb - minDb;

    const getY = (val: number) => {
      const clamped = Math.max(minDb, Math.min(maxDb, val));
      const fraction = (clamped - minDb) / dbRange;
      return height - fraction * height;
    };

    // 1. Draw Grid Lines (30, 50, 70, 90 dB)
    [30, 50, 70, 90].forEach((db) => {
      const y = getY(db);
      ctx.strokeStyle = '#27272a'; // zinc-800
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      ctx.font = '500 10px monospace';
      ctx.fillStyle = '#52525b'; // zinc-600
      ctx.textAlign = 'right';
      ctx.fillText(`${db} dB`, width - 8, y - 4);
    });

    // 2. Draw Target Reference Line (e.g. 50 dBA for nursery)
    const thresholdY = getY(thresholdDb);
    ctx.strokeStyle =
      preset === 'nursery' ? 'rgba(16, 185, 129, 0.75)' : 'rgba(239, 68, 68, 0.75)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(0, thresholdY);
    ctx.lineTo(width, thresholdY);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Threshold Text Label
    ctx.font = '600 10px monospace';
    ctx.fillStyle = preset === 'nursery' ? '#34d399' : '#f87171';
    ctx.textAlign = 'left';
    ctx.fillText(`-- ${thresholdLabel}`, 10, thresholdY - 5);

    // 3. Draw History Curve
    if (history.length > 1) {
      const step = width / Math.max(1, history.length - 1);

      // Area fill under curve
      const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
      fillGradient.addColorStop(0, 'rgba(52, 211, 153, 0.2)');
      fillGradient.addColorStop(1, 'rgba(52, 211, 153, 0.0)');

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

      // Stroke line
      ctx.beginPath();
      ctx.moveTo(0, getY(history[0]));
      for (let i = 1; i < history.length; i++) {
        const x = i * step;
        const y = getY(history[i]);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#10b981'; // emerald-500
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Glowing dot on latest point
      const lastX = width;
      const lastY = getY(history[history.length - 1]);
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(lastX - 2, lastY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    } else if (!isActive) {
      // Empty placeholder
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#52525b';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Sound level timeline will record here when noise meter is active',
        width / 2,
        height / 2
      );
    }
  }, [history, thresholdDb, thresholdLabel, preset, isActive]);

  return (
    <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-emerald-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
            Sound Level Timeline (Last 60s)
          </h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">
          Rolling Session Series
        </span>
      </div>

      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800/80">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
};
