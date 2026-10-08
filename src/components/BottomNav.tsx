import React from 'react';
import type { AppTab } from '../types';
import { Activity, SlidersHorizontal, BookOpen, HelpCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  isMeasuring: boolean;
}

interface NavItem {
  id: AppTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'meter', label: 'Meter', icon: Activity },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
  { id: 'guidelines', label: 'Guidelines', icon: BookOpen },
  { id: 'about', label: 'About', icon: HelpCircle },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  isMeasuring,
}) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0a0d18]/95 backdrop-blur-md border-t border-[#1b2238] px-2 py-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-md transition-all cursor-pointer ${
                isActive
                  ? 'text-[#f0f4fc]'
                  : 'text-[#6c7d9e] hover:text-[#c4d0e6]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`size-5 transition-transform duration-150 ${
                    isActive ? 'scale-110 text-emerald-400' : 'text-[#8292b0]'
                  }`}
                />
                {/* Live pulse indicator on Meter icon when measuring in background */}
                {item.id === 'meter' && isMeasuring && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium tracking-tight ${
                  isActive ? 'font-semibold text-[#f0f4fc]' : 'text-[#6c7d9e]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
