import React, { useEffect, useRef } from 'react';
import type { WeightingType, PresetThreshold } from '../types';

interface RadialGaugeProps {
  value: number; // Current SPL (20 - 130)
  min: number;
  max: number;
  unit: WeightingType;
  isActive: boolean;
  activeThreshold?: PresetThreshold;
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  value,
  min = 20,
  max = 120,
  unit,
  isActive,
  activeThreshold,
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
    const centerX = width / 2;
    const centerY = height * 0.85;
    const radius = Math.min(centerX - 24, centerY - 20);

    ctx.clearRect(0, 0, width, height);

    // Semi-circle arc: from PI (left) to 2 * PI (right)
    const startAngle = Math.PI * 0.95;
    const endAngle = Math.PI * 2.05;
    const totalAngle = endAngle - startAngle;

    // 1. Draw Background Track
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#27272a'; // zinc-800
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();

    // 2. Draw Active Value Arc (if active)
    if (isActive && value >= min) {
      const clampedVal = Math.max(min, Math.min(max, value));
      const fraction = (clampedVal - min) / (max - min);
      const currentAngle = startAngle + fraction * totalAngle;

      const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      gradient.addColorStop(0.0, '#10b981'); // emerald-500 (< 50)
      gradient.addColorStop(0.4, '#3b82f6'); // blue-500 (~ 60)
      gradient.addColorStop(0.65, '#f59e0b'); // amber-500 (~ 80)
      gradient.addColorStop(1.0, '#ef4444'); // red-500 (> 100)

      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, currentAngle);
      ctx.stroke();
    }

    // 3. Draw Major Tick Marks and Labels
    const ticks = [
      { val: 30, label: '30' },
      { val: 50, label: '50' },
      { val: 70, label: '70' },
      { val: 85, label: '85' },
      { val: 100, label: '100' },
    ];

    ticks.forEach(({ val, label }) => {
      const fraction = (val - min) / (max - min);
      const angle = startAngle + fraction * totalAngle;

      const innerX = centerX + (radius - 12) * Math.cos(angle);
      const innerY = centerY + (radius - 12) * Math.sin(angle);
      const outerX = centerX + (radius + 2) * Math.cos(angle);
      const outerY = centerY + (radius + 2) * Math.sin(angle);

      // Tick mark
      ctx.lineWidth = val === 50 || val === 85 ? 2.5 : 1.5;
      ctx.strokeStyle = val === 50 ? '#10b981' : val === 85 ? '#f59e0b' : '#52525b';
      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();

      // Tick Label
      const textX = centerX + (radius - 24) * Math.cos(angle);
      const textY = centerY + (radius - 24) * Math.sin(angle);
      ctx.font = '500 10px monospace';
      ctx.fillStyle = val === 50 ? '#34d399' : val === 85 ? '#fbbf24' : '#71717a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, textX, textY);
    });

    // 4. Draw Needle (if active)
    if (isActive) {
      const clampedVal = Math.max(min, Math.min(max, value));
      const fraction = (clampedVal - min) / (max - min);
      const needleAngle = startAngle + fraction * totalAngle;

      const needleLength = radius - 8;
      const tipX = centerX + needleLength * Math.cos(needleAngle);
      const tipY = centerY + needleLength * Math.sin(needleAngle);

      // Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 8;

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f4f4f5'; // zinc-100
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Needle center pivot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#09090b';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [value, min, max, isActive]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Gauge Canvas */}
      <div className="relative w-full max-w-[420px] aspect-[2/1] flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Digital Readout overlay inside the gauge arch */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 pointer-events-none select-none">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-6xl sm:text-7xl font-bold tracking-tight text-zinc-100 tabular-nums leading-none">
              {isActive ? value.toFixed(1) : '--.-'}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-zinc-400 font-mono">
              dB{unit}
            </span>
          </div>

          {/* Real-time Qualitative Assessment Badge */}
          <div className="mt-2.5 flex items-center">
            {isActive && activeThreshold ? (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm border"
                style={{
                  backgroundColor: `${activeThreshold.color}15`,
                  borderColor: `${activeThreshold.color}40`,
                  color: activeThreshold.color,
                }}
              >
                <span
                  className="size-2 rounded-full animate-pulse"
                  style={{ backgroundColor: activeThreshold.color }}
                />
                {activeThreshold.badge}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
                <span className="size-2 rounded-full bg-zinc-600" />
                Ready • Press Start
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
