import React from 'react';
import { BookOpen, CheckCircle2, Volume2, Waves, MapPin, AlertTriangle } from 'lucide-react';

export const GuidelinesView: React.FC = () => {
  return (
    <div className="w-full space-y-4 text-[#c4d0e6] animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="rounded-md border border-[#1e253e] bg-[#0c101d] p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-[#161d32] text-emerald-400">
            <BookOpen className="size-4.5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#f0f4fc]">
              Infant Sleep Guidelines & Acoustic Science
            </h3>
            <p className="text-xs text-[#8292b0]">
              American Academy of Pediatrics (AAP) Recommendations & Decibel Standards
            </p>
          </div>
        </div>

        {/* The AAP Research Findings */}
        <div className="rounded-md border border-emerald-900/40 bg-emerald-950/20 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-900/60 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-700/50">
              AAP Landmark Study (Pediatrics, Vol. 133)
            </span>
            <span className="font-semibold text-[#f0f4fc] text-xs">Infant Sleep Machines</span>
          </div>
          <p className="text-xs sm:text-sm text-[#c4d0e6] leading-relaxed">
            In a landmark study by researchers at the <strong>Hospital for Sick Children (Toronto)</strong> and published by the <strong>American Academy of Pediatrics (AAP)</strong>, scientists tested 14 commercial infant sound machines. At maximum volume, all 14 exceeded 50 dBA at 30 cm and 100 cm, and several generated hazardous levels exceeding 85 dBA.
          </p>

          <div className="pt-2 space-y-3 text-xs sm:text-sm font-medium text-emerald-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4.5 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <strong className="text-emerald-200">The 50 dBA Safe Crib Limit:</strong>
                <p className="text-[#a4b4d2] font-normal mt-0.5">
                  Continuous sound levels where your baby sleeps must not exceed 50 dBA. Levels above 50 dBA can increase stress hormones and potentially impair infant auditory cortex development.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="size-4.5 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <strong className="text-emerald-200">The 7-Foot Placement Rule:</strong>
                <p className="text-[#a4b4d2] font-normal mt-0.5">
                  Keep sound machines at least 7 feet (2 meters) away from the crib. Sound pressure follows the inverse-square law, dropping by approximately 6 dB for each doubling of distance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4.5 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <strong className="text-emerald-200">Measure Where Baby Rests:</strong>
                <p className="text-[#a4b4d2] font-normal mt-0.5">
                  Do not measure right next to the machine. Place your phone inside the crib exactly where your baby’s head rests to measure true ear exposure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NIOSH / Adult Hearing Comparison */}
        <div className="rounded-md border border-[#1b2238] bg-[#101424] p-4 text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <AlertTriangle className="size-3.5" />
            <span>Adult Hearing Protection: NIOSH 85 dBA Limit</span>
          </div>
          <p className="text-[#8e9ebc] leading-relaxed">
            For adults and older children, NIOSH establishes <strong>85 dBA</strong> as the maximum safe threshold for an 8-hour workday. With the 3 dB exchange rate, allowable safe exposure cuts in half for every 3 dB increase (88 dB = 4 hours, 91 dB = 2 hours, 100 dB = 15 minutes).
          </p>
        </div>
      </div>

      {/* 2. Decibel Science Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* dBA */}
        <div className="rounded-md border border-[#1f2742] bg-[#0e1220]/95 p-5 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-[#f0f4fc]">
            <Volume2 className="size-4 text-sky-400" />
            <h4 className="text-sm font-semibold">What is dBA? (A-Weighting)</h4>
          </div>
          <p className="text-xs text-[#8e9ebc] leading-relaxed">
            Human hearing is non-linear: we are most sensitive to frequencies between <strong>1 kHz and 5 kHz</strong> (where speech and infant cries occur) and less sensitive to low bass rumble. <strong>dBA (A-weighting)</strong> applies the international <strong>IEC 61672-1:2013</strong> curve to represent how loud sound actually feels to human ears.
          </p>
        </div>

        {/* Leq */}
        <div className="rounded-md border border-[#1f2742] bg-[#0e1220]/95 p-5 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-[#f0f4fc]">
            <Waves className="size-4 text-blue-400" />
            <h4 className="text-sm font-semibold">Why Leq Energy Average Matters</h4>
          </div>
          <p className="text-xs text-[#8e9ebc] leading-relaxed">
            A simple arithmetic average (SPL sum / N) under-reports the biological impact of loud spikes. <strong>L<sub>eq</sub> (Equivalent Continuous Sound Level)</strong> uses the logarithmic <strong>ISO 1996</strong> energy integration formula to measure total acoustic energy transferred to the ear over time.
          </p>
        </div>
      </div>
    </div>
  );
};
