import React, { useState } from 'react';
import { useNoiseMeter } from './hooks/useNoiseMeter';
import { PRESETS } from './constants/presets';
import { Header } from './components/Header';
import { PresetSelector } from './components/PresetSelector';
import { MeterDisplay } from './components/MeterDisplay';
import { CalibrationDrawer } from './components/CalibrationDrawer';
import { EducationalSection } from './components/EducationalSection';
import { MethodologyModal } from './components/MethodologyModal';
import { Footer } from './components/Footer';
import { AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const {
    status,
    errorMessage,
    stats,
    history,
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const currentPresetConfig = PRESETS[preset];

  // Find active threshold for the current sound level
  const activeThreshold = currentPresetConfig.thresholds.find(
    (t) => stats.current <= t.maxDb
  ) || currentPresetConfig.thresholds[currentPresetConfig.thresholds.length - 1];

  const isActive = status === 'running' || status === 'paused';

  return (
    <div className="min-h-screen bg-[#0a0d18] text-[#f0f4fc] flex flex-col font-sans selection:bg-[#202844] selection:text-[#f0f4fc] antialiased">
      {/* Navbar */}
      <Header
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        isSettingsOpen={isSettingsOpen}
      />

      {/* Main Container: Focused Above-the-Fold Audio Cockpit */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-3.5 sm:px-6 py-4 sm:py-6 space-y-4">
        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-center gap-2.5 rounded-md border border-rose-900/60 bg-rose-950/40 p-3 text-xs sm:text-sm text-rose-200">
            <AlertCircle className="size-4.5 text-rose-400 shrink-0" />
            <div>
              <span className="font-semibold">Microphone Error: </span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* 1. Context Purpose Mode Selector Tabs */}
        <PresetSelector
          selectedPreset={preset}
          onSelectPreset={setPreset}
        />

        {/* 2. Unified Master Audio Console (The 4 metrics together, range meter below, verdict, controls, & timeline) */}
        <MeterDisplay
          stats={stats}
          history={history}
          isActive={isActive}
          status={status}
          unit={weighting}
          responseTime={responseTime}
          presetConfig={currentPresetConfig}
          activeThreshold={activeThreshold}
          onStart={startMeter}
          onPause={pauseMeter}
          onResume={resumeMeter}
          onStop={stopMeter}
          onReset={resetStats}
          onSelectWeighting={setWeighting}
          onSelectResponse={setResponseTime}
        />

        {/* 3. Collapsible Calibration Drawer (±30 dB) */}
        <CalibrationDrawer
          isOpen={isSettingsOpen}
          calibrationOffset={calibrationOffset}
          onOffsetChange={setCalibrationOffset}
          onReset={resetCalibration}
        />

        {/* 4. Below-the-fold: Motivation Manifesto & Educational FAQs */}
        <EducationalSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Methodology Guide Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
};

export default App;
