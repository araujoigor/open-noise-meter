import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#181f33] bg-[#080a14] py-7 px-4 sm:px-6 text-center text-xs text-[#7a8aa8]">
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span>Created by </span>
          <a
            href="https://araujoigor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#c4d0e6] hover:underline"
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
            className="hover:text-[#f0f4fc] transition-colors"
          >
            GitHub Repository
          </a>
          <span>•</span>
          <span className="text-[#7a8aa8]">Zero Cookies • Zero Tracking</span>
        </div>
      </div>
    </footer>
  );
};
