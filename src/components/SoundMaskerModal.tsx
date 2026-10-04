import React, { useState, useEffect } from 'react';
import type { NoiseType } from '../types';
import { soundMasker } from '../audio/noiseGenerator';
import { Sparkles, Play, Square, Volume2, X } from 'lucide-react';

interface SoundMaskerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStateChange: (isPlaying: boolean) => void;
}

export const SoundMaskerModal: React.FC<SoundMaskerModalProps> = ({
  isOpen,
  onClose,
  onStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(soundMasker.getIsPlaying());
  const [currentType, setCurrentType] = useState<NoiseType>(soundMasker.getType());
  const [volume, setVolume] = useState<number>(soundMasker.getVolume());

  useEffect(() => {
    setIsPlaying(soundMasker.getIsPlaying());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundMasker.stop();
      setIsPlaying(false);
      onStateChange(false);
    } else {
      soundMasker.play(currentType, volume);
      setIsPlaying(true);
      onStateChange(true);
    }
  };

  const handleSelectType = (type: NoiseType) => {
    setCurrentType(type);
    if (isPlaying) {
      soundMasker.play(type, volume);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundMasker.setVolume(newVol);
  };

  const noiseOptions: { type: NoiseType; name: string; desc: string; icon: string }[] = [
    {
      type: 'pink',
      name: 'Pink Noise (Balanced)',
      desc: 'Balanced 1/f soothing hiss. Recommended for baby sleep.',
      icon: '🌸',
    },
    {
      type: 'brown',
      name: 'Brown Noise (Deep)',
      desc: 'Deep low-frequency rumble. Great for masking traffic.',
      icon: '🌰',
    },
    {
      type: 'white',
      name: 'White Noise (Crisp)',
      desc: 'Even acoustic energy across all frequencies.',
      icon: '❄️',
    },
    {
      type: 'rain',
      name: 'Gentle Rain',
      desc: 'Soft rainfall with randomized droplet impulses.',
      icon: '🌧️',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                Smart Sound Masker
              </h3>
              <p className="text-xs text-zinc-400">
                100% Ad-Free, Client-Side Sound Generator
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Noise Type Picker */}
        <div className="mt-5 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Select Noise Color
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {noiseOptions.map((opt) => (
              <button
                key={opt.type}
                type="button"
                onClick={() => handleSelectType(opt.type)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  currentType === opt.type
                    ? 'border-emerald-500 bg-emerald-500/10 text-zinc-100 ring-1 ring-emerald-500/50'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{opt.icon}</span>
                  <span className="text-xs font-semibold text-zinc-200">
                    {opt.name}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2">
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Playback & Volume Control */}
        <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-sm transition-all ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-400 text-zinc-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="size-4 fill-current" />
                <span>Stop Masker</span>
              </>
            ) : (
              <>
                <Play className="size-4 fill-current" />
                <span>Play Masker</span>
              </>
            )}
          </button>

          {/* Volume Slider */}
          <div className="flex items-center gap-2.5">
            <Volume2 className="size-4 text-zinc-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-32 sm:w-40 accent-emerald-500 cursor-pointer"
            />
            <span className="font-mono text-xs text-zinc-400 w-10 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-5 rounded-xl bg-zinc-900 border border-zinc-800/80 p-3 text-xs text-zinc-400">
          💡 <strong className="text-zinc-200">Parent Tip:</strong> You can run this sound generator on your phone while testing the sound level at the crib with another device, or use it directly as an ad-free sleep machine.
        </div>
      </div>
    </div>
  );
};
