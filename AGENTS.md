# 🤖 AI Agent Guidelines & Architecture Manual (OpenNoiseMeter)

This document provides clear, actionable instructions for AI coding assistants (such as Antigravity, Claude Code, Cursor, Copilot, etc.) contributing to **OpenNoiseMeter**, as well as review guidelines for the repository maintainer.

---

## 🏛️ Architecture Overview

OpenNoiseMeter is a client-side Progressive Web App (PWA) built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It contains **zero backend services**, stores **no cookies**, and processes all audio locally using the HTML5 **Web Audio API**.

### Core Directory Structure

```
src/
├── audio/
│   ├── weighting.ts        # IEC 61672-1:2013 A/C/Z acoustic curves, RMS, FFT, Leq & ballistics
│   ├── noiseGenerator.ts   # Web Audio sound masker (Pink, Brown, White, Rain noise synthesis)
│   └── __tests__/          # Unit tests verifying mathematical formulas and ISO/IEC standards
├── components/
│   ├── Header.tsx          # App navbar, privacy badge, guide & masker modal triggers
│   ├── PresetSelector.tsx  # Mode switcher (Nursery, Hearing, Sleep, Raw)
│   ├── ContextBanner.tsx   # Dynamic real-time guidance (AAP 50 dBA crib rule, placement tips)
│   ├── RadialGauge.tsx     # High-DPI Canvas arc meter, needle physics, and digital readout
│   ├── StatsCards.tsx      # Current, Min, Leq Average, and Peak Max session metrics
│   ├── ControlBar.tsx      # Start/Pause/Resume/Reset, dBA/dBC/dBZ, Fast/Slow toggles
│   ├── CalibrationDrawer.tsx # ±30 dB microphone calibration slider
│   ├── HistoryChart.tsx    # 60-second scrolling canvas timeline with threshold markers
│   ├── SpectrumVisualizer.tsx # 64-band frequency spectrum (20 Hz - 20 kHz)
│   ├── MethodologyModal.tsx # AAP baby sleep research, dBA explanation, and privacy promise
│   ├── SoundMaskerModal.tsx # Ad-free white/pink/brown noise generator modal
│   ├── EducationalSection.tsx # SEO FAQs and the motivation manifesto
│   └── Footer.tsx          # Open-source MIT attribution and link to araujoigor.com
├── constants/
│   └── presets.ts          # Preset definitions, thresholds, colors, and scientific citations
├── hooks/
│   └── useNoiseMeter.ts    # React hook managing AudioContext, AnalyserNode, and RAF loop
├── types/
│   └── index.ts            # Domain TypeScript types
├── App.tsx                 # Root layout and state wiring
├── index.css               # Tailwind CSS v4 styling
└── main.tsx                # React DOM root & service worker registration
```

---

## 🔒 Non-Negotiable Core Principles

When proposing or implementing changes, agents **MUST** respect the following invariants:

1. **Zero Tracking / Zero Cookies:**
   * Never introduce analytics scripts (Google Analytics, Segment, Mixpanel, etc.).
   * Never set tracking cookies.
   * `localStorage` may only be used for user settings (e.g. microphone calibration offset).
2. **100% Client-Side Privacy:**
   * Microphone audio must **never** be streamed to any external server or saved to persistent disk storage.
   * Audio processing must remain 100% in volatile browser memory.
3. **No Bloat / Minimal Bundle Size:**
   * Total gzipped bundle size must stay under 100 KB.
   * Do not introduce heavy charting or UI component libraries when a lightweight Canvas or Tailwind solution suffices.
4. **Ad-Free Guarantee:**
   * No third-party ad SDKs or monetization banners will ever be accepted.
5. **Acoustic Standards Integrity:**
   * Any change to frequency weighting curves must comply with **IEC 61672-1:2013**.
   * Any change to $L_{eq}$ (continuous equivalent sound level) must comply with **ISO 1996 / IEC 61672**.

---

## 🛠️ Commands for Agents

Before creating or proposing any pull request, agents must run and pass all of the following commands:

```bash
# 1. Install dependencies
bun install

# 2. Run unit tests
bun test

# 3. Verify TypeScript types and production build
bun run build

# 4. Verify bundle size remains within strict limits (<95 kB JS, <15 kB CSS)
bun run size
```

*If any test, build, or bundle size check fails, fix the code before finalizing your response.*

---

## 🔬 Acoustic & DSP Implementation Notes

### Microphone Constraints
When requesting microphone access, avoid automatic browser post-processing which alters decibel readings:
```typescript
navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: false,
    noiseSuppression: false,
    autoGainControl: false,
  },
  video: false,
});
```

### Leq (Equivalent Continuous Sound Level) Formula
Sound pressure is logarithmic, meaning decibel averaging requires energy integration:
$$L_{eq} = 10 \log_{10}\left( \frac{1}{M} \sum_{i=1}^{M} 10^{SPL_i / 10} \right)$$
Do not use a simple arithmetic mean $\frac{\sum SPL_i}{M}$ as it under-represents loud spikes.

---

## 📋 Maintainer Review Checklist (For Igor)

When reviewing PRs submitted by AI agents or human contributors:

* [ ] **Network Check:** Inspect the diff for any `fetch()`, `XMLHttpRequest`, or third-party script tags. There should be none.
* [ ] **Acoustic Tests:** Ensure `bun test` passes and any new acoustic functions have matching tests in `src/audio/__tests__/`.
* [ ] **Build Check:** Ensure `bun run build` succeeds cleanly with zero TypeScript errors.
* [ ] **Bundle Size:** Ensure `bun run size` passes without exceeding limits.
* [ ] **PWA & Offline:** Check that `dist/sw.js` and `manifest.webmanifest` are properly generated.
* [ ] **Responsive UI:** Verify mobile layouts (especially on small smartphone screens).
