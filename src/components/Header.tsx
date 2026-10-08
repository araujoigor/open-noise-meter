import React from 'react';
import { Waves, BookOpen, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onOpenMethodology: () => void;
  onToggleSettings: () => void;
  isSettingsOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMethodology,
  onToggleSettings,
  isSettingsOpen,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#090c10]/90 backdrop-blur-md">
      <div className="mx-auto flex h-13 max-w-4xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Waves className="size-4.5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-slate-100">
                OpenNoiseMeter
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700/50">
                <ShieldCheck className="size-3 text-emerald-400" />
                Zero Tracking • No Ads
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono hidden xs:block">
              Client-Side Web Audio Decibel Meter
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Settings / Calibration Toggle */}
          <Button
            variant={isSettingsOpen ? 'secondary' : 'outline'}
            size="sm"
            onClick={onToggleSettings}
            className="text-xs h-7.5 px-2.5 gap-1.5 border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300"
            title="Calibrate microphone offset (±30 dB)"
          >
            <SlidersHorizontal className="size-3.5 text-slate-400" />
            <span className="hidden sm:inline">Calibrate</span>
          </Button>

          {/* Guide Modal */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenMethodology}
            className="text-xs h-7.5 px-2.5 gap-1.5 border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300"
            title="AAP Infant Sleep Guidelines & Decibel Science"
          >
            <BookOpen className="size-3.5 text-slate-400" />
            <span className="hidden sm:inline">Guide</span>
          </Button>

          {/* GitHub link */}
          <a
            href="https://github.com/araujoigor/noise-meter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
            title="View Open Source Code on GitHub"
          >
            <Button
              variant="ghost"
              size="icon"
              className="size-7.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
