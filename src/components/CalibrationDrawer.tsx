import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface CalibrationDrawerProps {
  isOpen: boolean;
  calibrationOffset: number;
  onOffsetChange: (offset: number) => void;
  onReset: () => void;
}

export const CalibrationDrawer: React.FC<CalibrationDrawerProps> = ({
  isOpen,
  calibrationOffset,
  onOffsetChange,
  onReset,
}) => {
  if (!isOpen) return null;

  const delta = calibrationOffset - 100;
  const deltaText = delta >= 0 ? `+${delta} dB` : `${delta} dB`;

  return (
    <Card className="border-zinc-800 bg-zinc-900/60 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <SlidersHorizontal className="size-3.5 text-zinc-400" />
            <span>Microphone Calibration & Offset</span>
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs border-zinc-700 text-zinc-300">
            Offset: {deltaText}
          </Badge>
        </div>
        <CardDescription className="text-xs text-zinc-400 mt-1">
          Consumer phone and laptop microphones are pre-calibrated to a standard baseline. If you have an{' '}
          <strong className="text-zinc-200">Apple Watch (Noise app)</strong> or hardware meter, you can fine-tune here.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <input
              type="range"
              min="70"
              max="130"
              step="1"
              value={calibrationOffset}
              onChange={(e) => onOffsetChange(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-zinc-800 accent-zinc-100 cursor-pointer"
            />
            <span className="font-mono text-xs font-bold text-zinc-200 w-16 text-right">
              {deltaText}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-xs gap-1.5 h-8"
            title="Reset calibration to +0 dB default"
          >
            <RotateCcw className="size-3" />
            <span>Reset Default</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
