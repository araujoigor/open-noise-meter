import { describe, it, expect } from 'vitest';
import {
  calculateAWeighting,
  calculateCWeighting,
  calculateRms,
  rmsToDbfs,
  updateLeq,
  applyBallistics,
} from '../weighting';

describe('Acoustic Weighting Calculations (IEC 61672-1)', () => {
  it('A-weighting matches standard reference values', () => {
    // Standard IEC 61672-1 tolerance points
    expect(calculateAWeighting(1000)).toBeCloseTo(0.0, 1);
    expect(calculateAWeighting(100)).toBeCloseTo(-19.1, 1);
    expect(calculateAWeighting(2500)).toBeCloseTo(1.3, 1);
    expect(calculateAWeighting(10000)).toBeCloseTo(-2.5, 1);
  });

  it('C-weighting is flat at mid frequencies and retains low bass', () => {
    expect(calculateCWeighting(1000)).toBeCloseTo(0.0, 1);
    expect(calculateCWeighting(100)).toBeCloseTo(-0.3, 1);
  });

  it('calculates RMS correctly for silent and sine wave signals', () => {
    const silence = new Float32Array(1000).fill(0);
    expect(calculateRms(silence)).toBe(0);

    // Sine wave with amplitude 1.0 has theoretical RMS = 1 / sqrt(2) ≈ 0.7071
    const sine = new Float32Array(1000);
    for (let i = 0; i < 1000; i++) {
      sine[i] = Math.sin((2 * Math.PI * i) / 100);
    }
    expect(calculateRms(sine)).toBeCloseTo(1 / Math.SQRT2, 2);
  });

  it('converts RMS to dBFS accurately', () => {
    expect(rmsToDbfs(0)).toBe(-100);
    expect(rmsToDbfs(1.0)).toBeCloseTo(0, 1);
    expect(rmsToDbfs(0.5)).toBeCloseTo(-6.02, 1);
  });

  it('computes Leq continuous energy average according to ISO 1996', () => {
    // Equal levels average to the same level
    expect(updateLeq(50, 10, 50)).toBe(50);

    // 50 dB and 60 dB energy average:
    // (10^5 + 10^6) / 2 = 550,000 -> 10 * log10(550,000) ≈ 57.4 dB
    expect(updateLeq(50, 1, 60)).toBeCloseTo(57.4, 1);
  });

  it('applies ballistics smoothing with fast vs slow time constants', () => {
    // Fast response should jump faster toward the target than slow response
    const fastSmoothed = applyBallistics(40, 80, 0.1, 'fast');
    const slowSmoothed = applyBallistics(40, 80, 0.1, 'slow');

    expect(fastSmoothed).toBeGreaterThan(slowSmoothed);
    expect(fastSmoothed).toBeGreaterThan(40);
    expect(slowSmoothed).toBeGreaterThan(40);
  });
});
