import React from 'react';
import { HelpCircle, Heart, Smartphone, ShieldCheck, Flame } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  const faqs = [
    {
      q: 'How loud should my baby’s white noise machine be?',
      a: 'The American Academy of Pediatrics (AAP) recommends keeping white noise machines at or below 50 dBA at the infant’s crib, placed at least 7 feet (2 meters) away from the baby. Measuring the sound directly where your baby sleeps ensures the volume is soothing without risking acoustic fatigue or hearing development impairment.',
    },
    {
      q: 'Why build an ad-free web app instead of downloading a phone app?',
      a: 'Most sound meter apps on the iOS App Store and Google Play are packed with aggressive banner ads, unskippable 30-second video commercials, subscription paywalls ($4.99/week), and third-party trackers. You already paid for the microphone and hardware in your device. Measuring ambient noise is basic digital signal processing that should be free, instant, and privacy-respecting.',
    },
    {
      q: 'How accurate is a phone microphone for measuring decibels?',
      a: 'Smartphone microphones provide an excellent relative estimate of environmental noise. While not a certified Class 1 acoustic lab instrument, OpenNoiseMeter applies standardized IEC 61672-1 A-weighting curves and provides an offset calibration slider. If you have an Apple Watch with the Noise app, you can match readings for decibel precision.',
    },
    {
      q: 'How do I install OpenNoiseMeter as a PWA on my phone?',
      a: 'On iOS Safari: Tap the Share button and select "Add to Home Screen". On Android Chrome: Tap the three dots menu and select "Install app" or "Add to Home screen". Once installed, OpenNoiseMeter launches in fullscreen like a native app and works completely offline.',
    },
    {
      q: 'Does this app record or upload my audio?',
      a: 'Never. All acoustic processing happens 100% locally in your browser using the HTML5 Web Audio API. Audio samples are analyzed in real-time memory and immediately discarded. No audio is ever recorded, stored, or sent to any server.',
    },
  ];

  return (
    <section className="mt-12 border-t border-zinc-800 pt-10 text-zinc-300">
      {/* Motivation Story Card */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm uppercase tracking-wider mb-3">
          <Flame className="size-4" />
          <span>The Motivation: Ad-Free, Hardware-Respecting Utility</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
          Why I built this: Tired of ad-loaded apps for something so simple
        </h3>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
          <p>
            The reason I created <strong>OpenNoiseMeter</strong> is personal: I wanted to check if my daughter’s white noise machine was too loud and protect her developing hearing. 
          </p>
          <p>
            When searching for a decibel meter on the app stores, every single application was loaded with obnoxious popups, subscription prompts, and invasive trackers. 
            <strong> You already paid for the hardware in your phone. Why should you have to endure ads or pay recurring subscriptions just to access your own microphone sensor?</strong>
          </p>
          <p>
            I believe the web platform and <strong>Progressive Web Apps (PWAs)</strong> offer a free, open, and user-respecting alternative to native app store gatekeepers. This project is 100% open source, stores zero data, uses zero cookies, and will forever remain completely free.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Heart className="size-3.5 text-red-400" />
            <span>Open Source (MIT)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>0 Cookies • 0 Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Smartphone className="size-3.5 text-blue-400" />
            <span>Installable PWA</span>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="size-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-zinc-100">
            Frequently Asked Questions & Acoustic Guide
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-5"
            >
              <h4 className="font-semibold text-zinc-100 text-sm sm:text-base">
                {faq.q}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
