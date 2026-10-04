import type { NoiseType } from '../types';

class SoundMasker {
  private audioCtx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentType: NoiseType = 'pink';
  private currentVolume: number = 0.3;

  private initContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public play(type: NoiseType = this.currentType, volume: number = this.currentVolume): void {
    const ctx = this.initContext();
    this.stop();

    this.currentType = type;
    this.currentVolume = volume;

    const bufferSize = ctx.sampleRate * 2; // 2-second looping buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
      // White noise: flat spectrum random noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      // Pink noise (1/f spectrum) using Paul Kellet's filter
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown') {
      // Brown / Red noise (1/f^2 spectrum): integrated white noise
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Compensate for volume reduction
      }
    } else if (type === 'rain') {
      // Rain simulation: pink noise base with gentle randomized droplet impulses
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.15;
        b2 = 0.86 * b2 + white * 0.3;
        let sample = (b0 + b1 + b2) * 0.15;

        // Random droplets
        if (Math.random() < 0.002) {
          sample += (Math.random() * 2 - 1) * 0.4;
        }
        data[i] = sample;
      }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    this.gainNode = ctx.createGain();
    // Smooth ramp-in to avoid speaker clicking
    this.gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), ctx.currentTime + 0.15);

    source.connect(this.gainNode);
    this.gainNode.connect(ctx.destination);

    source.start(0);
    this.noiseNode = source;
    this.isPlaying = true;
  }

  public setVolume(volume: number): void {
    this.currentVolume = volume;
    if (this.gainNode && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, volume)), now + 0.05);
    }
  }

  public stop(): void {
    if (this.noiseNode && this.audioCtx && this.gainNode) {
      try {
        const now = this.audioCtx.currentTime;
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.linearRampToValueAtTime(0.001, now + 0.1);
        const node = this.noiseNode as AudioBufferSourceNode;
        setTimeout(() => {
          try {
            node.stop();
            node.disconnect();
          } catch {
            // Ignore if already stopped
          }
        }, 120);
      } catch {
        // Safe disconnect
      }
    }
    this.noiseNode = null;
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getType(): NoiseType {
    return this.currentType;
  }

  public getVolume(): number {
    return this.currentVolume;
  }
}

export const soundMasker = new SoundMasker();
