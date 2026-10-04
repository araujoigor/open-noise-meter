import React, { useState } from 'react';
import { useNoiseMeter } from './hooks/useNoiseMeter';
import { PRESETS } from './constants/presets';
import { Header } from './components/Header';
import { PresetSelector } from './components/PresetSelector';
import { MeterDisplay } from './components/MeterDisplay';
import { StatsCards } from './components/StatsCards';
import { ControlBar } from './components/ControlBar';
import { CalibrationDrawer } from './components/CalibrationDrawer';
import { HistoryChart } from './components/HistoryChart';
import { EducationalSection } from './components/EducationalSection';
import { MethodologyModal } from './components/MethodologyModal';
import { Footer } from './components/Footer';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-zinc-100 antialiased">
      {/* Navbar */}
      <Header
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        isSettingsOpen={isSettingsOpen}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Error Alert */}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Microphone Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* 1. Context Purpose Selector Tabs */}
        <PresetSelector
          selectedPreset={preset}
          onSelectPreset={setPreset}
        />

        {/* 2. Main Hero Meter Display (Crisp digital numbers, zone bar, dynamic verdict) */}
        <MeterDisplay
          currentSpl={stats.current}
          isActive={isActive}
          unit={weighting}
          responseTime={responseTime}
          presetConfig={currentPresetConfig}
          activeThreshold={activeThreshold}
        />

        {/* 3. Session Statistics 4-Cards */}
        <StatsCards
          stats={stats}
          unit={weighting}
          isActive={isActive}
        />

        {/* 4. Controls */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-5">
          <ControlBar
            status={status}
            weighting={weighting}
            responseTime={responseTime}
            onStart={startMeter}
            onPause={pauseMeter}
            onResume={resumeMeter}
            onStop={stopMeter}
            onReset={resetStats}
            onSelectWeighting={setWeighting}
            onSelectResponse={setResponseTime}
          />
        </div>

        {/* 5. Collapsible Settings / Calibration Drawer */}
        <CalibrationDrawer
          isOpen={isSettingsOpen}
          calibrationOffset={calibrationOffset}
          onOffsetChange={setCalibrationOffset}
          onReset={resetCalibration}
        />

        {/* 6. Real-time Acoustic Timeline Chart */}
        <HistoryChart
          history={history}
          preset={preset}
          isActive={isActive}
        />

        {/* 7. Motivation Manifesto & Educational FAQs */}
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
