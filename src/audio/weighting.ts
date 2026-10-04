import type { WeightingType, ResponseTime } from '../types';

/**
 * IEC 61672-1:2013 A-weighting frequency curve calculation.
 * Returns relative gain in dB at the specified frequency (Hz).
 * At 1000 Hz, gain is exactly 0 dB.
 */
export function calculateAWeighting(frequencyHz: number): number {
  if (frequencyHz <= 10) return -70;
  const f2 = frequencyHz * frequencyHz;
  const num = 12194 * 12194 * f2 * f2;
  const den =
    (f2 + 20.6 * 20.6) *
    Math.sqrt((f2 + 107.7 * 107.7) * (f2 + 737.9 * 737.9)) *
    (f2 + 12194 * 12194);

  if (den <= 0) return -100;
  const ra = num / den;
  return 20 * Math.log10(ra) + 2.0;
}

/**
 * IEC 61672-1:2013 C-weighting frequency curve calculation.
 * Flatter response than A-weighting, retains low bass energy.
 */
export function calculateCWeighting(frequencyHz: number): number {
  if (frequencyHz <= 10) return -40;
  const f2 = frequencyHz * frequencyHz;
  const num = 12194 * 12194 * f2;
  const den = (f2 + 20.6 * 20.6) * (f2 + 12194 * 12194);

  if (den <= 0) return -100;
  const rc = num / den;
  return 20 * Math.log10(rc) + 0.06;
}

/**
 * Calculates Root Mean Square (RMS) amplitude from time-domain PCM samples.
 */
export function calculateRms(samples: Float32Array): number {
  let sumSquares = 0;
  const len = samples.length;
  if (len === 0) return 0;

  for (let i = 0; i < len; i++) {
    const val = samples[i];
    sumSquares += val * val;
  }

  return Math.sqrt(sumSquares / len);
}

/**
 * Converts RMS amplitude into dBFS (Decibels relative to Full Scale).
 * Silence or near zero maps to -100 dBFS.
 */
export function rmsToDbfs(rms: number): number {
  if (rms <= 0.00001) return -100;
  const dbfs = 20 * Math.log10(rms);
  return Math.max(-100, Math.min(0, dbfs));
}

/**
 * Computes Sound Pressure Level (SPL) from FFT frequency bins, applying
 * the selected acoustic weighting filter (A, C, or Z) and calibration offset.
 */
export function calculateSplFromFft(
  frequencyBinsDb: Float32Array,
  sampleRate: number,
  weighting: WeightingType,
  calibrationOffset: number
): { spl: number; peakFrequencyHz: number } {
  const binCount = frequencyBinsDb.length;
  if (binCount === 0) {
    return { spl: 30, peakFrequencyHz: 0 };
  }

  const nyquist = sampleRate / 2;
  const hzPerBin = nyquist / binCount;

  let totalLinearPower = 0;
  let maxDb = -Infinity;
  let peakBinIndex = 0;

  // Skip DC offset bin 0
  for (let i = 1; i < binCount; i++) {
    const rawDb = frequencyBinsDb[i];
    if (rawDb > maxDb) {
      maxDb = rawDb;
      peakBinIndex = i;
    }

    const freqHz = i * hzPerBin;
    let weightOffset = 0;

    if (weighting === 'A') {
      weightOffset = calculateAWeighting(freqHz);
    } else if (weighting === 'C') {
      weightOffset = calculateCWeighting(freqHz);
    }

    const weightedDb = rawDb + weightOffset;
    // Sum power: 10^(dB/10)
    totalLinearPower += Math.pow(10, weightedDb / 10);
  }

  const peakFrequencyHz = Math.round(peakBinIndex * hzPerBin);

  if (totalLinearPower <= 0 || isNaN(totalLinearPower)) {
    return { spl: 30, peakFrequencyHz: 0 };
  }

  const rawSpl = 10 * Math.log10(totalLinearPower);
  const calibratedSpl = Math.max(20, Math.min(130, rawSpl + calibrationOffset));

  return {
    spl: Number(calibratedSpl.toFixed(1)),
    peakFrequencyHz,
  };
}

/**
 * Updates equivalent continuous sound level (Leq) using energy averaging.
 * ISO 1996 / IEC 61672 mathematical formula.
 */
export function updateLeq(
  currentLeq: number,
  sampleCount: number,
  newInstantSpl: number
): number {
  if (sampleCount <= 0 || currentLeq <= 0) {
    return newInstantSpl;
  }

  const prevEnergy = Math.pow(10, currentLeq / 10);
  const newEnergy = Math.pow(10, newInstantSpl / 10);

  const updatedEnergy = (prevEnergy * sampleCount + newEnergy) / (sampleCount + 1);
  return Number((10 * Math.log10(updatedEnergy)).toFixed(1));
}

/**
 * IEC 61672 ballistics exponential time weighting filter.
 * Fast: tau = 125ms (0.125s)
 * Slow: tau = 1000ms (1.0s)
 */
export function applyBallistics(
  currentVal: number,
  targetVal: number,
  dtSeconds: number,
  response: ResponseTime
): number {
  const tau = response === 'fast' ? 0.125 : 1.0;
  const alpha = 1 - Math.exp(-dtSeconds / tau);
  const smoothed = currentVal + alpha * (targetVal - currentVal);
  return Number(smoothed.toFixed(1));
}
