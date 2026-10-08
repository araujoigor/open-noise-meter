import React from 'react';
import { Heart, ShieldCheck, Smartphone, HelpCircle, CheckCircle2, BookOpen, Volume2, Waves } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  const faqs = [
    {
      q: 'How loud should my baby’s white noise machine be?',
      a: 'The American Academy of Pediatrics (AAP) recommends keeping white noise machines at or below 50 dBA at the infant’s crib, placed at least 7 feet (2 meters) away from the baby. Measuring the sound directly where your baby sleeps ensures the volume is soothing without risking acoustic fatigue or hearing development impairment.',
    },
    {
      q: 'Why build an ad-free web app instead of downloading an app store decibel meter?',
      a: 'Most sound meter apps on the iOS App Store and Google Play are filled with unskippable 30-second video ads, weekly subscription paywalls ($4.99/week), and third-party trackers. You already paid for the microphone in your hardware. Reading an ambient sensor is basic digital signal processing that should be free, instant, and privacy-respecting.',
    },
    {
      q: 'How accurate is a phone microphone for measuring decibels?',
      a: 'Smartphone microphones provide an excellent relative estimate of environmental noise. OpenNoiseMeter applies standardized IEC 61672-1 A-weighting curves and provides an offset calibration slider in Settings. If you have an Apple Watch with the Noise app, you can match readings for decibel precision.',
    },
    {
      q: 'How do I install OpenNoiseMeter as an app on my phone?',
      a: 'On iOS Safari: Tap the Share button and select "Add to Home Screen". On Android Chrome: Tap the three dots menu and select "Install app". Once installed, OpenNoiseMeter launches in fullscreen like a native app and works completely offline.',
    },
  ];

  return (
    <section id="guidelines" className="space-y-6 pt-2 text-[#c4d0e6]">
      {/* 1. AAP Pediatric Guidelines & Infant Sleep Science */}
      <div className="rounded-md border border-[#1e253e] bg-[#0c101d] p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#161d32] text-emerald-400">
            <BookOpen className="size-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#f0f4fc]">
              Infant Sleep Guidelines & White Noise Science
            </h3>
            <p className="text-xs text-[#8292b0]">
              American Academy of Pediatrics (AAP) Recommendations & Safe Sleep Limits
            </p>
          </div>
        </div>

        {/* The AAP Research Findings */}
        <div className="rounded-md border border-emerald-900/40 bg-emerald-950/20 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-900/60 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-700/50">
              AAP Study (Pediatrics, Vol. 133)
            </span>
            <span className="font-semibold text-[#f0f4fc] text-xs">Infant Sleep Machines</span>
          </div>
          <p className="text-xs sm:text-sm text-[#c4d0e6] leading-relaxed">
            In a landmark research study by the <strong>American Academy of Pediatrics (AAP)</strong>, researchers evaluated 14 commercial infant white noise machines. At maximum volume, all 14 exceeded 50 dBA at 30 cm and 100 cm, and several produced hazardous sound exceeding 85 dBA.
          </p>
          <div className="pt-1 space-y-2 font-medium text-emerald-300 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
              <span><strong>The 50 dBA Crib Limit:</strong> Continuous sound levels at your baby’s crib should not exceed 50 dBA. Sustained noise above 50 dBA can increase cardiovascular stress and impact auditory cortex development.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
              <span><strong>The 7-Foot Rule:</strong> Place sound machines at least 7 feet (2 meters) away from the crib. Sound pressure drops by approximately 6 dB for each doubling of distance.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
              <span><strong>Measure at Crib Distance:</strong> Place your device directly inside the crib where your baby’s head rests to measure the true volume reaching their ears.</span>
            </div>
          </div>
        </div>

        {/* Decibel Science: dBA Weighting & Leq Average */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="rounded-md border border-[#1b2238] bg-[#101424]/80 p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <Volume2 className="size-3.5 text-sky-400" />
              <h4 className="font-semibold text-[#f0f4fc] text-xs">
                What is dBA? (A-Weighting Explained)
              </h4>
            </div>
            <p className="text-xs text-[#8e9ebc] leading-relaxed">
              Human ears do not hear all sound frequencies equally. We are most sensitive to mid frequencies between <strong>1 kHz and 5 kHz</strong> (speech and infant crying) and less sensitive to low bass rumbles. <strong>dBA (A-weighting)</strong> applies the standardized <strong>IEC 61672-1</strong> curve to match human ear perception.
            </p>
          </div>

          <div className="rounded-md border border-[#1b2238] bg-[#101424]/80 p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <Waves className="size-3.5 text-blue-400" />
              <h4 className="font-semibold text-[#f0f4fc] text-xs">
                Why Leq (Energy Average) Matters
              </h4>
            </div>
            <p className="text-xs text-[#8e9ebc] leading-relaxed">
              Sound fluctuates dynamically. <strong>Leq (Equivalent Continuous Sound Level)</strong> calculates true cumulative acoustic energy over your session (using the logarithmic ISO 1996 formula), giving an accurate baseline for nighttime sleep exposure rather than reacting to single-second spikes.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Motivation Story Card */}
      <div className="rounded-md border border-[#1c243c] bg-[#0e1322]/80 p-5 sm:p-6 shadow-xl backdrop-blur-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#151c30] px-2 py-0.5 text-[10px] font-mono text-[#a4b4d2] border border-[#222c4a]">
            Why OpenNoiseMeter Exists
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#f0f4fc]">
          Tired of ad-loaded apps for something so simple
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-[#8e9ebc] leading-relaxed">
          <p>
            The reason I created <strong className="text-[#f0f4fc]">OpenNoiseMeter</strong> is personal: I wanted to check if my daughter’s white noise machine was too loud and protect her developing hearing.
          </p>
          <p>
            When searching for a decibel meter on the app stores, every single application was loaded with obnoxious popups, subscription prompts, and invasive trackers.{' '}
            <strong className="text-[#f0f4fc]">
              You already paid for the hardware in your phone. Why should you have to endure ads or pay recurring subscriptions just to access your own microphone sensor?
            </strong>
          </p>
          <p>
            I believe the web platform and <strong className="text-[#f0f4fc]">Progressive Web Apps (PWAs)</strong> offer a free, open, and user-respecting alternative to native app store gatekeepers. This project is 100% open source, stores zero data, uses zero cookies, and will forever remain completely free.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#1b2238] text-xs text-[#8a99b5]">
            <div className="flex items-center gap-1.5">
              <Heart className="size-3.5 text-rose-400" />
              <span>Open Source (MIT)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>0 Cookies • 0 Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="size-3.5 text-sky-400" />
              <span>Installable PWA</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FAQs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <HelpCircle className="size-4 text-[#8292b0]" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8292b0]">
            Frequently Asked Questions
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-md border border-[#1a2238] bg-[#0e1322]/50 p-4 space-y-1.5"
            >
              <h5 className="font-semibold text-[#f0f4fc] text-xs sm:text-sm">
                {faq.q}
              </h5>
              <p className="text-xs text-[#8e9ebc] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
