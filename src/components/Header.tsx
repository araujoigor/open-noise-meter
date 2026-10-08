import React from 'react';
import type { AppTab } from '../types';
import { Waves, Activity, SlidersHorizontal, BookOpen, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  isMeasuring: boolean;
}

const DESKTOP_TABS: Array<{ id: AppTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'meter', label: 'Meter', icon: Activity },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
  { id: 'guidelines', label: 'Guidelines', icon: BookOpen },
  { id: 'about', label: 'About', icon: HelpCircle },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  isMeasuring,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#1b2238] bg-[#0a0d18]/90 backdrop-blur-md">
      <div className="mx-auto flex h-13 max-w-4xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onTabChange('meter')}
            className="flex size-8 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:scale-105 transition-transform cursor-pointer"
            title="OpenNoiseMeter"
          >
            <Waves className="size-4.5 stroke-[2.2]" />
          </button>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-tight text-[#f0f4fc]">
              OpenNoiseMeter
            </span>
            <span className="text-[10px] text-[#7182a3] font-mono hidden xs:block">
              100% Client-Side Decibel Meter
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs (Hidden on mobile where bottom nav is active) */}
        <nav aria-label="Desktop Navigation" className="hidden md:flex items-center gap-1 rounded-md bg-[#101424] p-1 border border-[#1d253e]">
          {DESKTOP_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1e2640] text-[#f0f4fc] font-semibold shadow-sm border border-[#2d395e]'
                    : 'text-[#8292b0] hover:text-[#f0f4fc] hover:bg-[#161c30]'
                }`}
              >
                <Icon className={`size-3.5 ${isActive ? 'text-emerald-400' : 'text-[#8292b0]'}`} />
                <span>{tab.label}</span>
                {tab.id === 'meter' && isMeasuring && (
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions / GitHub */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/araujoigor/open-noise-meter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
            title="View Open Source Code on GitHub"
          >
            <Button
              variant="ghost"
              size="icon"
              className="size-7.5 text-[#8a99b5] hover:text-[#f0f4fc] hover:bg-[#1a2138]"
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
