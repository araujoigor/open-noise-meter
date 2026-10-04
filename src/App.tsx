import React, { useState } from 'react';
import { useNoiseMeter } from './hooks/useNoiseMeter';
import { PRESETS } from './constants/presets';
import { Header } from './components/Header';
import { PresetSelector } from './components/PresetSelector';
import { ContextBanner } from './components/ContextBanner';
import { RadialGauge } from './components/RadialGauge';
import { StatsCards } from './components/StatsCards';
import { ControlBar } from './components/ControlBar';
import { CalibrationDrawer } from './components/CalibrationDrawer';
import { HistoryChart } from './components/HistoryChart';
import { SpectrumVisualizer } from './components/SpectrumVisualizer';
import { EducationalSection } from './components/EducationalSection';
import { MethodologyModal } from './components/MethodologyModal';
import { SoundMaskerModal } from './components/SoundMaskerModal';
import { Footer } from './components/Footer';
import { soundMasker } from './audio/noiseGenerator';
import { AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const {
    status,
    errorMessage,
    stats,
    history,
    spectrumBands,
    preset,
    weighting,
    responseTime,
    calibrationOffset,
    startMeter,
    pauseMeter,
    resumeMeter,
    stopMeter,
    resetStats,
    setPreset,
    setWeighting,
    setResponseTime,
    setCalibrationOffset,
    resetCalibration,
  } = useNoiseMeter();

  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isMaskerOpen, setIsMaskerOpen] = useState(false);
  const [isCalibOpen, setIsCalibOpen] = useState(false);
  const [isMaskerPlaying, setIsMaskerPlaying] = useState(soundMasker.getIsPlaying());

  const currentPresetConfig = PRESETS[preset];

  // Find active threshold for the current sound level
  const activeThreshold = currentPresetConfig.thresholds.find(
    (t) => stats.current <= t.maxDb
  ) || currentPresetConfig.thresholds[currentPresetConfig.thresholds.length - 1];

  const isActive = status === 'running' || status === 'paused';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Header */}
      <Header
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenMasker={() => setIsMaskerOpen(true)}
        isMaskerPlaying={isMaskerPlaying}
      />

      {/* Main App Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Error Alert (e.g. Mic Denied) */}
        {errorMessage && (
          <div className="flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-950/30 p-4 text-red-200 text-xs sm:text-sm">
            <AlertCircle className="size-5 text-red-400 shrink-0" />
            <p className="flex-1">{errorMessage}</p>
          </div>
        )}

        {/* 1. Context / Measurement Purpose Mode Selector */}
        <PresetSelector
          selectedPreset={preset}
          onSelectPreset={setPreset}
        />

        {/* 2. Main Meter Dashboard Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-7 space-y-6 backdrop-blur-sm shadow-xl">
          {/* Dynamic Context Banner: Guidance and AAP standards */}
          <ContextBanner
            presetConfig={currentPresetConfig}
            activeThreshold={activeThreshold}
            currentSpl={stats.current}
            isActive={isActive}
          />

          {/* Central Radial Gauge */}
          <RadialGauge
            value={stats.current}
            min={20}
            max={120}
            unit={weighting}
            isActive={isActive}
            activeThreshold={activeThreshold}
          />

          {/* 4 Session Statistics Cards (Current, Min, Leq Average, Max) */}
          <StatsCards
            stats={stats}
            unit={weighting}
            isActive={isActive}
          />

          {/* Primary Controls (Start, Pause, Reset, Weighting, Response) */}
          <ControlBar
            status={status}
            weighting={weighting}
            responseTime={responseTime}
            calibrationOffset={calibrationOffset}
            isCalibOpen={isCalibOpen}
            onStart={startMeter}
            onPause={pauseMeter}
            onResume={resumeMeter}
            onStop={stopMeter}
            onReset={resetStats}
            onToggleCalib={() => setIsCalibOpen(!isCalibOpen)}
            onSelectWeighting={setWeighting}
            onSelectResponse={setResponseTime}
          />

          {/* Collapsible Calibration Offset Drawer */}
          <CalibrationDrawer
            isOpen={isCalibOpen}
            calibrationOffset={calibrationOffset}
            onOffsetChange={setCalibrationOffset}
            onReset={resetCalibration}
          />
        </div>

        {/* 3. Real-Time Graphs: 60s Scrolling History & Frequency Spectrum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HistoryChart
            history={history}
            preset={preset}
            isActive={isActive}
          />
          <SpectrumVisualizer
            spectrumBands={spectrumBands}
            peakHz={stats.peakFrequencyHz}
            isActive={isActive}
          />
        </div>

        {/* 4. SEO & Educational FAQ Section with Motivation Story */}
        <EducationalSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      <SoundMaskerModal
        isOpen={isMaskerOpen}
        onClose={() => setIsMaskerOpen(false)}
        onStateChange={setIsMaskerPlaying}
      />
    </div>
  );
};

export default App;
