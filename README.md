# 🔊 OpenNoiseMeter

> **Free, open-source, and 100% ad-free sound level decibel meter (dBA) with baby sleep / white noise machine safety checks.**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Zero Ads](https://img.shields.io/badge/Ads-Zero-emerald.svg)]()
[![Zero Cookies](https://img.shields.io/badge/Cookies-None-emerald.svg)]()
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)]()
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-emerald.svg)]()

---

## 🎯 The Motivation: Why I Built This

I created **OpenNoiseMeter** out of a very personal need: I wanted to check if my daughter's white noise machine was too loud and protect her developing hearing. 

When searching the iOS App Store and Google Play, almost every single decibel meter was unbearable:
* **30-second unskippable video ads** before you can even measure sound.
* **$4.99/week recurring subscriptions** for basic microphone access.
* **Intrusive analytics, trackers, and telemetry.**

**I already paid for the hardware and the microphone in my device. Why should I have to endure ads or pay subscriptions just to read an ambient hardware sensor?**

I believe basic utility tools belong on the open web. Progressive Web Apps (PWAs) provide a free, sovereign alternative to app store gatekeepers. This project is 100% open-source, stores zero cookies, collects zero data, and will remain ad-free forever.

---

## ✨ Features

* 🍼 **Nursery & Infant Sleep Safety Mode (AAP Guidelines)**:
  * Targets the **American Academy of Pediatrics (AAP)** 50 dBA crib limit.
  * Real-time qualitative assessment: *Safe for Sleep*, *Borderline*, or *Too Loud!*.
  * Actionable placement guidance (*7-foot rule*).
* 🛡️ **Everyday Hearing Protection (WHO & NIOSH)**:
  * 85 dBA recommended exposure limit (REL).
  * Warns when ambient noise can cause permanent sensorineural hearing damage.
* 🌙 **Sleep & Focus / Quiet Space**:
  * Assesses background tranquility for deep work and restorative sleep.
* 📊 **Pro / Unconstrained Meter**:
  * **IEC 61672-1 Frequency Weightings**: **dBA** (human ear simulation), **dBC** (flat bass/industrial), **dBZ** (unweighted linear SPL).
  * **Ballistics Time Weightings**: **Slow (1000ms)** for steady ambient sleep noise; **Fast (125ms)** for transient spikes.
* 📈 **Dual Real-Time Acoustic Visualizers**:
  * **60-Second Scrolling History Graph** with preset threshold guidelines.
  * **64-Band Real-Time Frequency Spectrum** (20 Hz – 20 kHz) with dominant peak frequency detection.
* 🌸 **Built-in Smart Sound Masker**:
  * 100% client-side synthesized Pink Noise, Brown Noise, White Noise, and Gentle Rain.
  * Zero downloads, works completely offline.
* 📱 **First-Class PWA (Progressive Web App)**:
  * Installable directly to your home screen on iOS and Android.
  * Launches in fullscreen with no browser address bar.
  * Works 100% offline via Service Worker precaching.
* 🔒 **100% Client-Side Privacy**:
  * Audio samples are processed in local volatile RAM via the Web Audio API and immediately discarded.
  * Zero audio recorded, zero audio streamed, zero tracking cookies.

---

## 🔬 Acoustic Science & AAP Guidelines

### The 50 dBA / 7-Foot Rule for White Noise Machines
A study published in *Pediatrics* (American Academy of Pediatrics) found that commercial infant sleep machines placed close to cribs routinely produce sound levels hazardous to newborn hearing. 

The AAP recommends:
1. **Never exceed 50 dBA** at the infant's sleep location.
2. **Place sound machines at least 7 feet (2 meters) away** from the crib.
3. Place your phone directly inside the crib where your baby's head rests to measure what their ears actually perceive.

---

## 🎛️ Microphone Calibration

Consumer smartphone and laptop microphones are built for vocal clarity and telephony, not factory-calibrated acoustics. 

* **Out-of-the-box Baseline:** OpenNoiseMeter is pre-calibrated (+100 dBFS offset) so a typical quiet room reads ~35–40 dBA and normal speaking voice reads ~60–65 dBA.
* **Fine-Tuning:** If you have an **Apple Watch (Noise app)** or a physical Type 2 sound level meter, open the **Calibration Drawer** and adjust the slider (±30 dB) to match your reference.

---

## 🚀 Quick Start (Local Development)

This project uses [Bun](https://bun.sh/) (or Node/npm) with Vite, React, TypeScript, and Tailwind CSS.

```bash
# Clone the repository
git clone https://github.com/araujoigor/noise-meter.git
cd noise-meter

# Install dependencies
bun install

# Start local dev server
bun run dev

# Run unit tests
bun test

# Build production bundle and PWA service worker
bun run build
```

---

## 🌐 Deployment & Subdomain Setup

OpenNoiseMeter is built to run on its own domain or subdomain (e.g., `noise-meter.araujoigor.com`):

### Why a Subdomain is Recommended for PWAs
* **Microphone Permissions:** Browser prompts explicitly for `noise-meter.araujoigor.com` rather than your personal root domain, isolating sensor permissions.
* **Root Scope:** The PWA manifest and Service Worker install at root (`/`), preventing iOS WebKit subpath navigation bugs.
* **Zero Configuration:** Any developer can clone, fork, and deploy directly to Vercel, Netlify, or Cloudflare Pages with zero path rewrites.

### Deploy to Vercel
1. Push to GitHub.
2. Import project into Vercel.
3. Add custom domain (e.g. `noise-meter.araujoigor.com`).

---

## 🤖 AI Agent & Human Contribution

See [`AGENTS.md`](./AGENTS.md) for architecture guidelines, DSP math constraints, and rules for automated coding assistants proposing PRs. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for human contributor workflows.

---

## 📄 License

MIT © [Igor Araujo](https://araujoigor.com)
