import React, { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

interface SpectrumVisualizerProps {
  spectrumBands: number[]; // 64 normalized values [0.0 - 1.0]
  peakHz: number;
  isActive: boolean;
}

export const SpectrumVisualizer: React.FC<SpectrumVisualizerProps> = ({
  spectrumBands,
  peakHz,
  isActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const barCount = spectrumBands.length;
    const gap = 2;
    const totalGap = gap * (barCount - 1);
    const barWidth = Math.max(1, (width - totalGap) / barCount);

    if (isActive) {
      for (let i = 0; i < barCount; i++) {
        const val = spectrumBands[i];
        const barHeight = Math.max(2, val * (height - 8));
        const x = i * (barWidth + gap);
        const y = height - barHeight;

        // Dynamic gradient: low freqs teal/green -> mids blue -> highs purple/amber
        const hue = 160 + (i / barCount) * 120;
        ctx.fillStyle = `hsl(${hue}, 80%, 55%)`;

        ctx.fillRect(x, y, barWidth, barHeight);
      }
    } else {
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#52525b';
      ctx.textAlign = 'center';
      ctx.fillText('Frequency spectrum (20 Hz - 20 kHz) active while measuring', width / 2, height / 2);
    }
  }, [spectrumBands, isActive]);

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-blue-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
            Acoustic Frequency Spectrum
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          <span>Peak: {isActive && peakHz > 0 ? `${peakHz} Hz` : '-- Hz'}</span>
          <span>• 20 Hz – 20 kHz</span>
        </div>
      </div>

      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800/80">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
};
