import type { PresetConfig, PresetType } from '../types';

export const PRESETS: Record<PresetType, PresetConfig> = {
  nursery: {
    id: 'nursery',
    name: 'Nursery & Baby',
    shortName: 'Baby Sleep',
    icon: 'Baby',
    subtitle: 'AAP Infant White Noise Safety',
    description: 'Monitor sound machines, crib noise, and nursery environments against pediatric guidelines.',
    defaultWeighting: 'A',
    defaultResponse: 'slow',
    thresholds: [
      {
        maxDb: 45,
        label: 'Whisper Quiet',
        level: 'safe',
        badge: 'Safe for Sleep',
        advice: 'Peaceful nursery ambient level. Excellent for uninterrupted infant sleep.',
        color: '#10b981', // emerald-500
      },
      {
        maxDb: 50,
        label: 'Optimal White Noise',
        level: 'safe',
        badge: 'AAP Compliant (<50 dBA)',
        advice: 'Meets American Academy of Pediatrics (AAP) recommendations for crib-distance sound.',
        color: '#10b981', // emerald-500
      },
      {
        maxDb: 60,
        label: 'Borderline Loud',
        level: 'caution',
        badge: 'Caution: Reduce Volume',
        advice: 'Acceptable for short soothing, but too loud for all-night sleep. Lower volume or move machine further away.',
        color: '#f59e0b', // amber-500
      },
      {
        maxDb: 130,
        label: 'Hearing Hazard for Baby',
        level: 'danger',
        badge: 'Too Loud! Turn Down',
        advice: 'Exceeds hospital nursery safety limits (>60 dBA). Can impact infant auditory cortex development. Move speaker 7+ ft away immediately.',
        color: '#ef4444', // red-500
      },
    ],
    guidance: {
      ruleTitle: 'The 50 dBA / 7-Foot Rule for White Noise Machines',
      ruleText: 'The American Academy of Pediatrics (AAP) recommends that white noise machines be placed at least 7 feet (2 meters) away from an infant’s crib, and set so that sound levels at the baby’s ears do not exceed 50 dBA.',
      standardCitation: 'American Academy of Pediatrics (AAP) Study on Infant Sleep Machines (Pediatrics, Vol. 133)',
      recommendedPlacement: 'Place your phone inside the crib (where your baby’s head rests) to measure the actual level your baby experiences.',
    },
  },
  hearing: {
    id: 'hearing',
    name: 'Hearing Safety',
    shortName: 'General Safety',
    icon: 'Shield',
    subtitle: 'WHO & NIOSH Occupational Limits',
    description: 'Track daily noise exposure and detect when sound levels exceed safe hearing limits.',
    defaultWeighting: 'A',
    defaultResponse: 'fast',
    thresholds: [
      {
        maxDb: 70,
        label: 'Safe Sound Level',
        level: 'safe',
        badge: 'Safe Indefinitely',
        advice: 'No risk of hearing damage even with continuous exposure 24 hours a day.',
        color: '#10b981',
      },
      {
        maxDb: 85,
        label: 'Moderate Exposure',
        level: 'caution',
        badge: 'Safe for 8h Limit',
        advice: 'Typical busy traffic or loud restaurant. Safe for up to 8 hours daily without hearing protection.',
        color: '#f59e0b',
      },
      {
        maxDb: 130,
        label: 'Hazardous Noise',
        level: 'danger',
        badge: 'Hearing Protection Required',
        advice: 'Exceeds 85 dBA. Every 3 dB increase halves allowable exposure time (88 dB = 4h, 91 dB = 2h, 100 dB = 15m).',
        color: '#ef4444',
      },
    ],
    guidance: {
      ruleTitle: 'NIOSH 85 dBA Recommended Exposure Limit (REL)',
      ruleText: 'Sustained exposure to sound at or above 85 dBA can cause permanent sensorineural hearing loss. The NIOSH 3 dB exchange rate dictates that allowable safe exposure time is cut in half for every 3 dB increase.',
      standardCitation: 'NIOSH (National Institute for Occupational Safety and Health) Criteria for a Recommended Standard',
    },
  },
  sleep: {
    id: 'sleep',
    name: 'Sleep & Focus',
    shortName: 'Rest & Focus',
    icon: 'Moon',
    subtitle: 'Bedroom & Study Ambient Noise',
    description: 'Ensure restorative sleep environments and quiet focus areas for deep work.',
    defaultWeighting: 'A',
    defaultResponse: 'slow',
    thresholds: [
      {
        maxDb: 35,
        label: 'Library Quiet',
        level: 'safe',
        badge: 'Deep Rest Optimal',
        advice: 'Ideal bedroom quietness for restorative REM and deep sleep cycles.',
        color: '#10b981',
      },
      {
        maxDb: 45,
        label: 'Pleasant Ambient',
        level: 'safe',
        badge: 'Good Focus & Sleep',
        advice: 'Normal quiet residential interior. Suitable for focus and sleep.',
        color: '#10b981',
      },
      {
        maxDb: 55,
        label: 'Moderate Disruption',
        level: 'caution',
        badge: 'May Disturb Sleep',
        advice: 'Noticeable background noise (AC, conversation, distant street). May wake light sleepers.',
        color: '#f59e0b',
      },
      {
        maxDb: 130,
        label: 'Sleep Disruptive',
        level: 'danger',
        badge: 'Too Noisy to Sleep',
        advice: 'High ambient noise level. Consider earplugs, soundproofing, or soothing white noise masking.',
        color: '#ef4444',
      },
    ],
    guidance: {
      ruleTitle: 'WHO Night Noise Guidelines for Europe',
      ruleText: 'The World Health Organization recommends night noise levels below 40 dBA outside bedrooms to prevent sleep disturbances and cardiovascular strain.',
      standardCitation: 'World Health Organization (WHO) Night Noise Guidelines for Europe',
    },
  },
  raw: {
    id: 'raw',
    name: 'Pro / Unconstrained',
    shortName: 'Pro Meter',
    icon: 'Sliders',
    subtitle: 'Full Dynamic Acoustic Range',
    description: 'Unfiltered decibel monitoring with selectable fast/slow ballistics and weighting curves.',
    defaultWeighting: 'A',
    defaultResponse: 'fast',
    thresholds: [
      {
        maxDb: 40,
        label: 'Faint / Whispering',
        level: 'safe',
        badge: '20–40 dB',
        advice: 'Quiet room or whispering.',
        color: '#10b981',
      },
      {
        maxDb: 70,
        label: 'Normal Speech',
        level: 'safe',
        badge: '40–70 dB',
        advice: 'Normal conversation or office ambient.',
        color: '#3b82f6',
      },
      {
        maxDb: 90,
        label: 'Loud Traffic / Machinery',
        level: 'caution',
        badge: '70–90 dB',
        advice: 'Heavy city traffic or lawnmower.',
        color: '#f59e0b',
      },
      {
        maxDb: 130,
        label: 'Very Loud / Danger',
        level: 'danger',
        badge: '90–130+ dB',
        advice: 'Rock concert, siren, or jet takeoff.',
        color: '#ef4444',
      },
    ],
    guidance: {
      ruleTitle: 'IEC 61672 Sound Level Meter Standard',
      ruleText: 'Standard sound level meters use exponential time weightings: Fast (125ms) captures impulsive fluctuations, while Slow (1s) provides an integrated steady-state reading.',
      standardCitation: 'IEC 61672-1:2013 Electroacoustics — Sound level meters',
    },
  },
};

export const DEFAULT_PRESET: PresetType = 'nursery';

export const DEFAULT_CALIBRATION_OFFSET = 100; // Baseline calibration for raw Web Audio dBFS to estimated SPL (dBA)
