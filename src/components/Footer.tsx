import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#07090d] py-7 px-4 sm:px-6 text-center text-xs text-slate-400">
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span>Created by </span>
          <a
            href="https://araujoigor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-200 hover:underline"
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
            className="hover:text-slate-200 transition-colors"
          >
            GitHub Repository
          </a>
          <span>•</span>
          <span className="text-slate-400">Zero Cookies • Zero Tracking</span>
        </div>
      </div>
    </footer>
  );
};
