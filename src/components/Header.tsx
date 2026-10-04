import React from 'react';
import { Volume2, BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenMethodology: () => void;
  onOpenMasker: () => void;
  isMaskerPlaying: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMethodology,
  onOpenMasker,
  isMaskerPlaying,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-800 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-sm">
            <Volume2 className="size-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold tracking-tight text-zinc-100">
              OpenNoiseMeter
            </span>
            <span className="hidden sm:inline-flex rounded-full bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-400 border border-zinc-700/60">
              Open Source • No Ads
            </span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Sound Masker Quick Button */}
          <button
            type="button"
            onClick={onOpenMasker}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
              isMaskerPlaying
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-sm'
                : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:text-white'
            }`}
            title="Ad-Free White & Pink Noise Generator"
          >
            <Sparkles className="size-3.5" />
            <span className="hidden sm:inline">
              {isMaskerPlaying ? 'Sound Masker (Playing)' : 'Sound Masker'}
            </span>
            <span className="sm:hidden">Masker</span>
          </button>

          {/* Methodology / Science Guide */}
          <button
            type="button"
            onClick={onOpenMethodology}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
            title="Acoustic Science & AAP Baby Sleep Guidelines"
          >
            <BookOpen className="size-3.5" />
            <span className="hidden sm:inline">Science & Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/araujoigor/noise-meter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
            title="View Open Source Code on GitHub"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
