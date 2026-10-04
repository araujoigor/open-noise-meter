import React from 'react';
import { BookOpen, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 sticky top-0 bg-zinc-950/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <BookOpen className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                Acoustic Science & Guidelines
              </h3>
              <p className="text-xs text-zinc-400">
                Methodology, Pediatric Guidelines, and Standards
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

        {/* Content Body */}
        <div className="mt-6 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {/* Section 1: Baby Sleep & White Noise */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base mb-2">
              <BabyIcon className="size-4" />
              <span>Infant Hearing Safety & White Noise Machines</span>
            </div>
            <p className="text-zinc-300">
              In a landmark study published by the <strong>American Academy of Pediatrics (AAP)</strong> (Pediatrics, Vol. 133), researchers tested 14 commercial infant sleep machines. They found that every single machine, when placed near the crib and turned up, exceeded safe hospital nursery sound levels (50 dBA), and several exceeded 85 dBA.
            </p>
            <div className="mt-3 space-y-1.5 font-medium text-emerald-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span><strong>The 50 dBA Rule:</strong> Continuous sound levels at your baby’s crib should not exceed 50 dBA.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span><strong>The 7-Foot Distance Rule:</strong> Place white noise machines at least 7 feet (2 meters) away from the crib.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span><strong>Measure at the Crib:</strong> Place your phone where your baby sleeps to measure what their ears actually experience.</span>
              </div>
            </div>
          </div>

          {/* Section 2: What is dBA? */}
          <div>
            <h4 className="font-bold text-zinc-100 text-sm mb-1.5">
              What is dBA? (A-Weighting vs Unweighted Sound)
            </h4>
            <p>
              Human ears do not hear all acoustic frequencies equally. We are naturally most sensitive to mid-range frequencies between <strong>1 kHz and 5 kHz</strong> (the frequency spectrum of human speech and a baby’s cry) and much less sensitive to deep bass rumbling.
            </p>
            <p className="mt-2">
              <strong>dBA (A-weighting)</strong> applies the standardized <strong>IEC 61672-1</strong> frequency curve to the audio signal. It de-emphasizes low bass frequencies to reflect how human and infant ears perceive loudness.
            </p>
          </div>

          {/* Section 3: Leq Average */}
          <div>
            <h4 className="font-bold text-zinc-100 text-sm mb-1.5">
              Why Leq (Energy Equivalent Average) Matters
            </h4>
            <p>
              Sound pressure fluctuates continuously from second to second. Reacting to a momentary single-second spike can be misleading. <strong>Leq (Equivalent Continuous Sound Level)</strong> calculates the true cumulative acoustic energy over your measuring session, giving you an accurate baseline for nighttime sleep or occupational exposure.
            </p>
          </div>

          {/* Section 4: Privacy */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center gap-2 text-zinc-100 font-bold mb-1">
              <ShieldCheck className="size-4 text-emerald-400" />
              <span>100% Client-Side Privacy Guarantee</span>
            </div>
            <p className="text-zinc-400 text-xs">
              OpenNoiseMeter uses the HTML5 Web Audio API. Audio data is analyzed purely in your browser's local memory and immediately discarded. <strong>No audio is recorded, saved, transmitted, or stored on any server.</strong> There are zero analytics, zero trackers, and zero cookies.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-5 py-2 font-medium text-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

const BabyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12h.01M15 12h.01M10 16c.5.5 1.5.5 2 0M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5h-1.5" />
  </svg>
);
