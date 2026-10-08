import React from 'react';
import { Heart, ShieldCheck, Smartphone, HelpCircle, ExternalLink } from 'lucide-react';

export const AboutView: React.FC = () => {
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
    <div className="w-full space-y-4 text-[#c4d0e6] animate-in fade-in duration-200">
      {/* 1. Motivation Manifesto */}
      <div className="rounded-md border border-[#1c243c] bg-[#0e1322]/90 p-5 sm:p-6 shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#151c30] px-2 py-0.5 text-[10px] font-mono text-[#a4b4d2] border border-[#222c4a]">
            The Motivation Manifesto
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
              <span>Open Source (MIT License)</span>
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

      {/* 2. Frequently Asked Questions */}
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
              className="rounded-md border border-[#1a2238] bg-[#0e1322]/60 p-4 space-y-1.5"
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

      {/* 3. Author & Open Source Attribution */}
      <div className="rounded-md border border-[#1a2238] bg-[#0e1322]/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8a99b5]">
        <div>
          <span>Crafted with care by </span>
          <a
            href="https://araujoigor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#f0f4fc] hover:underline"
          >
            Igor Araujo
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/araujoigor/noise-meter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#8292b0] hover:text-[#f0f4fc] transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
