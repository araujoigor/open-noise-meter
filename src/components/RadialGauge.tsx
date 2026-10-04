import React, { useEffect, useRef } from 'react';
import type { WeightingType, PresetThreshold, PresetType } from '../types';

interface RadialGaugeProps {
  value: number; // Current SPL (20 - 120)
  min?: number;
  max?: number;
  unit: WeightingType;
  isActive: boolean;
  activeThreshold?: PresetThreshold;
  preset: PresetType;
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  value,
  min = 20,
  max = 110,
  unit,
  isActive,
  activeThreshold,
  preset,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Determine current active color
  const statusColor = activeThreshold?.color || '#10b981';

  // Get human-readable verdict
  const verdictText = isActive && activeThreshold
    ? activeThreshold.verdict || `${activeThreshold.badge} — ${activeThreshold.label}`
    : 'Ready • Microphone Inactive';

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
    // Position center slightly below middle to give a majestic open arch
    const centerY = height * 0.58;
    const radius = Math.min(centerX - 36, centerY - 24);

    ctx.clearRect(0, 0, width, height);

    // 240-degree arc: from 150 deg (5/6 * PI) to 390 deg (13/6 * PI)
    const startAngle = Math.PI * 0.82;
    const endAngle = Math.PI * 2.18;
    const totalAngle = endAngle - startAngle;

    // 1. Draw Background Outer Track
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#27272a'; // zinc-800
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();

    // 2. Draw Subtle Zone Reference Segments along the track
    if (preset === 'nursery') {
      // 50 dBA mark
      const fraction50 = (50 - min) / (max - min);
      const angle50 = startAngle + fraction50 * totalAngle;

      // Safe zone arc track tint (< 50 dB)
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)'; // emerald-500 tint
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, angle50);
      ctx.stroke();

      // Caution/Loud zone arc track tint (> 50 dB)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, angle50, endAngle);
      ctx.stroke();
    }

    // 3. Draw Active Value Progress Arc
    if (isActive && value >= min) {
      const clampedVal = Math.max(min, Math.min(max, value));
      const fraction = (clampedVal - min) / (max - min);
      const currentAngle = startAngle + fraction * totalAngle;

      // Dynamic color gradient based on preset and level
      const gradient = ctx.createLinearGradient(
        centerX - radius,
        centerY,
        centerX + radius,
        centerY
      );
      gradient.addColorStop(0.0, '#34d399'); // emerald-400
      gradient.addColorStop(0.4, '#10b981'); // emerald-500
      gradient.addColorStop(0.65, '#f59e0b'); // amber-500
      gradient.addColorStop(1.0, '#ef4444'); // red-500

      // Glow layer
      ctx.shadowColor = statusColor;
      ctx.shadowBlur = 12;
      ctx.lineWidth = 11;
      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, currentAngle);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Indicator Pip at Tip
      const tipX = centerX + radius * Math.cos(currentAngle);
      const tipY = centerY + radius * Math.sin(currentAngle);

      // Outer glow ring
      ctx.shadowColor = statusColor;
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tipX, tipY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Inner core
      ctx.fillStyle = statusColor;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 4. Draw Tick Marks and Labels
    const ticks = [
      { val: 30, label: '30' },
      { val: 40, label: '40' },
      { val: 50, label: preset === 'nursery' ? '50 • AAP' : '50' },
      { val: 60, label: '60' },
      { val: 70, label: '70' },
      { val: 85, label: preset === 'hearing' ? '85 • WHO' : '85' },
      { val: 100, label: '100' },
    ];

    ticks.forEach(({ val, label }) => {
      const fraction = (val - min) / (max - min);
      const angle = startAngle + fraction * totalAngle;

      const isAapLimit = preset === 'nursery' && val === 50;
      const isNioshLimit = preset === 'hearing' && val === 85;

      const innerLen = isAapLimit || isNioshLimit ? 14 : 8;
      const innerX = centerX + (radius - innerLen) * Math.cos(angle);
      const innerY = centerY + (radius - innerLen) * Math.sin(angle);
      const outerX = centerX + (radius + 2) * Math.cos(angle);
      const outerY = centerY + (radius + 2) * Math.sin(angle);

      // Tick line
      ctx.lineWidth = isAapLimit || isNioshLimit ? 2.5 : 1.5;
      ctx.strokeStyle = isAapLimit
        ? '#10b981'
        : isNioshLimit
        ? '#ef4444'
        : '#52525b';
      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();

      // Label text
      const textDist = isAapLimit || isNioshLimit ? 24 : 18;
      const textX = centerX + (radius - textDist) * Math.cos(angle);
      const textY = centerY + (radius - textDist) * Math.sin(angle);

      ctx.font = isAapLimit || isNioshLimit ? '600 10px monospace' : '500 9px monospace';
      ctx.fillStyle = isAapLimit
        ? '#34d399'
        : isNioshLimit
        ? '#f87171'
        : '#71717a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, textX, textY);
    });
  }, [value, min, max, isActive, statusColor, preset]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Dynamic ambient backlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700 blur-3xl opacity-20"
        style={{
          background: isActive
            ? `radial-gradient(circle at 50% 50%, ${statusColor} 0%, transparent 65%)`
            : 'radial-gradient(circle at 50% 50%, rgba(39, 39, 42, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* High-DPI Canvas Arc Meter */}
      <div className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center select-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Central Prominent Digital Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
          {/* Decibels Numbers */}
          <div className="flex items-baseline justify-center gap-1.5">
            <span
              className={`font-mono text-6xl sm:text-7xl font-extrabold tracking-tight tabular-nums leading-none transition-colors ${
                isActive ? 'text-zinc-100' : 'text-zinc-600'
              }`}
            >
              {isActive ? value.toFixed(1) : '--.-'}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-zinc-400">
              dB{unit}
            </span>
          </div>

          {/* Immediate Context Verdict Pill */}
          <div className="mt-3.5 flex items-center justify-center max-w-[90%]">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all duration-300 shadow-sm ${
                isActive && activeThreshold
                  ? ''
                  : 'border-zinc-800 bg-zinc-900/90 text-zinc-400'
              }`}
              style={
                isActive && activeThreshold
                  ? {
                      backgroundColor: `${statusColor}18`,
                      borderColor: `${statusColor}45`,
                      color: statusColor,
                    }
                  : undefined
              }
            >
              <span
                className={`size-2 rounded-full shrink-0 ${
                  isActive ? 'animate-pulse' : 'bg-zinc-600'
                }`}
                style={isActive ? { backgroundColor: statusColor } : undefined}
              />
              <span className="truncate">{verdictText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
