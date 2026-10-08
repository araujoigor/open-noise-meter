import React, { useState } from 'react';
import type { AppTab } from './types';
import { useNoiseMeter } from './hooks/useNoiseMeter';
import { PRESETS } from './constants/presets';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PresetSelector } from './components/PresetSelector';
import { MeterDisplay } from './components/MeterDisplay';
import { SettingsView } from './components/SettingsView';
import { GuidelinesView } from './components/GuidelinesView';
import { AboutView } from './components/AboutView';
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

  const [activeTab, setActiveTab] = useState<AppTab>('meter');

  const currentPresetConfig = PRESETS[preset];

  // Find active threshold for the current sound level
  const activeThreshold = currentPresetConfig.thresholds.find(
    (t) => stats.current <= t.maxDb
  ) || currentPresetConfig.thresholds[currentPresetConfig.thresholds.length - 1];

  const isMeasuring = status === 'running' || status === 'paused';

  return (
    <div className="min-h-screen bg-[#0a0d18] text-[#f0f4fc] flex flex-col font-sans selection:bg-[#202844] selection:text-[#f0f4fc] antialiased pb-20 md:pb-6">
      {/* Top Navbar with Desktop Tabs */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMeasuring={isMeasuring}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6 pb-14 md:pb-6">
        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 flex items-center gap-2.5 rounded-md border border-rose-900/60 bg-rose-950/40 p-3 text-xs sm:text-sm text-rose-200">
            <AlertCircle className="size-4.5 text-rose-400 shrink-0" />
            <div>
              <span className="font-semibold">Microphone Error: </span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Tab 1: Meter (Hero Acoustic Console) */}
        {activeTab === 'meter' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <PresetSelector
              selectedPreset={preset}
              onSelectPreset={setPreset}
            />
            <MeterDisplay
              stats={stats}
              history={history}
              isActive={isMeasuring}
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
          </div>
        )}

        {/* Tab 2: Settings (Microphone Calibration & Audio Pipeline) */}
        {activeTab === 'settings' && (
          <SettingsView
            calibrationOffset={calibrationOffset}
            onOffsetChange={setCalibrationOffset}
            onResetCalibration={resetCalibration}
            weighting={weighting}
            onSelectWeighting={setWeighting}
            responseTime={responseTime}
            onSelectResponse={setResponseTime}
            currentSpl={stats.current}
            isMeasuring={isMeasuring}
          />
        )}

        {/* Tab 3: Guidelines (Pediatric Sleep Research & Acoustic Science) */}
        {activeTab === 'guidelines' && (
          <GuidelinesView />
        )}

        {/* Tab 4: About (Manifesto, FAQs & Open Source) */}
        {activeTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMeasuring={isMeasuring}
      />
    </div>
  );
};

export default App;
