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
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-md border border-slate-800 bg-[#0c0f16] shadow-2xl p-0">
        {/* Header */}
        <div className="flex flex-row items-center justify-between p-5 border-b border-slate-800/80 sticky top-0 bg-[#0c0f16]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-slate-800 text-slate-200">
              <BookOpen className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Infant Sleep Guidelines & Science
              </h3>
              <p className="text-xs text-slate-400">
                AAP Pediatric Recommendations & Acoustic Standards
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 text-xs text-slate-300 leading-relaxed">
          {/* Section 1: The AAP Study */}
          <div className="rounded-md border border-emerald-900/50 bg-emerald-950/20 p-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-900/60 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-700/50">
                AAP Study (Pediatrics, Vol. 133)
              </span>
              <span className="font-semibold text-slate-100 text-xs">Infant Sleep Machines</span>
            </div>
            <p className="text-slate-300">
              In a landmark research study by the <strong>American Academy of Pediatrics (AAP)</strong>, researchers evaluated 14 commercial infant white noise machines. At maximum volume, all 14 exceeded 50 dBA at 30 cm and 100 cm, and several produced hazardous sound exceeding 85 dBA.
            </p>
            <div className="pt-1 space-y-1.5 font-medium text-emerald-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span><strong>The 50 dBA Rule:</strong> Continuous sound levels at your baby’s crib should not exceed 50 dBA.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span><strong>The 7-Foot Rule:</strong> Place sound machines at least 7 feet (2 meters) away from the crib.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span><strong>Measure at Crib Distance:</strong> Place your device inside the crib to measure what your baby hears.</span>
              </div>
            </div>
          </div>

          {/* Section 2: What is dBA? */}
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200 text-xs">
              What is dBA? (A-Weighting Explained)
            </h4>
            <p className="text-slate-400">
              Human ears do not hear all sound frequencies equally. We are most sensitive to mid-range frequencies between <strong>1 kHz and 5 kHz</strong> (the frequency spectrum of human speech and infant crying) and less sensitive to low bass rumbles.
            </p>
            <p className="text-slate-400">
              <strong>dBA (A-weighting)</strong> applies the standardized <strong>IEC 61672-1</strong> acoustic curve to match human hearing perception rather than raw unweighted pressure.
            </p>
          </div>

          {/* Section 3: Leq Average */}
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200 text-xs">
              Why Leq (Energy Average) Matters
            </h4>
            <p className="text-slate-400">
              Sound fluctuates constantly. <strong>Leq (Equivalent Continuous Sound Level)</strong> calculates true cumulative acoustic energy over your session (using the logarithmic ISO 1996 formula), giving an accurate baseline for nighttime sleep exposure rather than reacting to single-second spikes.
            </p>
          </div>

          {/* Section 4: Privacy */}
          <div className="rounded-md border border-slate-800 bg-slate-900/40 p-3.5 flex items-start gap-3">
            <ShieldCheck className="size-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block text-xs">100% Client-Side Privacy</span>
              <p className="text-slate-400 text-xs mt-0.5">
                All audio is analyzed directly in browser memory via HTML5 Web Audio API and immediately discarded. No audio is ever recorded, stored, or sent to any server. Zero cookies.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3.5 py-1.5 font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
