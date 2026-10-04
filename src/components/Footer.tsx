import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-8 px-4 sm:px-6 text-center text-xs text-zinc-400">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>Created by </span>
          <a
            href="https://araujoigor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Igor Araujo
          </a>
          <span> • Open Source under MIT License</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/araujoigor/noise-meter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            GitHub Repository
          </a>
          <span>•</span>
          <span className="text-zinc-400">100% Client-Side (Zero Cookies)</span>
        </div>
      </div>
    </footer>
  );
};
