import React, { useState, useEffect, useCallback } from 'react';
import { OpeningTerminal } from './components/OpeningTerminal.tsx';
import { Navbar } from './components/Navbar.tsx';
import { MatrixRainCanvas } from './components/MatrixRainCanvas.tsx';
import { BirthdayHero } from './components/BirthdayHero.tsx';
import { Mission01ClassifiedFile } from './components/Mission01ClassifiedFile.tsx';
import { Mission02MemoryDatabase } from './components/Mission02MemoryDatabase.tsx';
import { Mission03DanielExe } from './components/Mission03DanielExe.tsx';
import { Mission04LevelUp } from './components/Mission04LevelUp.tsx';
import { SecretTerminal } from './components/SecretTerminal.tsx';
import { SecretVaultModal } from './components/SecretVaultModal.tsx';
import { FinalSection } from './components/FinalSection.tsx';
import { sound } from './utils/soundFx.ts';

export default function App() {
  const [inSystem, setInSystem] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showMatrix, setShowMatrix] = useState<boolean>(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState<boolean>(false);

  const [completedMissions, setCompletedMissions] = useState<{ [key: string]: boolean }>({
    m1: false,
    m2: false,
    m3: true,
    m4: true,
  });

  const markMissionComplete = useCallback((missionKey: string) => {
    setCompletedMissions((prev) => {
      if (prev[missionKey]) return prev;
      return { ...prev, [missionKey]: true };
    });
  }, []);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleMatrix = () => {
    setShowMatrix((prev) => !prev);
  };

  const handleUnlockEasterEgg = () => {
    setEasterEggUnlocked(true);
    setIsTerminalOpen(false);
    setIsVaultOpen(true);
  };

  const handleRestartMission = () => {
    sound.playGlitchZap();
    setInSystem(false);
    setCompletedMissions({
      m1: false,
      m2: false,
      m3: true,
      m4: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut: `~` or `\` opens terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '`' || e.key === '~') && inSystem) {
        e.preventDefault();
        sound.playKeyClick();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inSystem]);

  return (
    <div className="min-h-screen bg-[#05080c] text-slate-100 font-mono relative selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Matrix Rain */}
      {showMatrix && <MatrixRainCanvas opacity={0.16} />}

      {/* Subtle Scanlines & CRT Grid */}
      <div className="fixed inset-0 cyber-grid opacity-50 pointer-events-none z-0" />
      <div className="fixed inset-0 scanlines-overlay opacity-30 pointer-events-none z-0" />

      {/* Opening Terminal Screen */}
      {!inSystem ? (
        <OpeningTerminal
          onEnterSystem={() => {
            setInSystem(true);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Bar Navigation */}
          <Navbar
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            showMatrix={showMatrix}
            onToggleMatrix={handleToggleMatrix}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            activeSection="brief"
          />

          {/* Main Birthday Content Area */}
          <main className="flex-1">
            <BirthdayHero
              completedMissions={completedMissions}
              onStartMission={(id) => {
                const el = document.querySelector(`#${id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* MISSION 01 — CLASSIFIED FILE */}
            <Mission01ClassifiedFile
              isCompleted={completedMissions['m1']}
              onComplete={() => markMissionComplete('m1')}
            />

            {/* MISSION 02 — MEMORY DATABASE */}
            <Mission02MemoryDatabase
              isCompleted={completedMissions['m2']}
              onComplete={() => markMissionComplete('m2')}
            />

            {/* MISSION 03 — DANIEL.EXE */}
            <Mission03DanielExe
              isCompleted={completedMissions['m3']}
              onComplete={() => markMissionComplete('m3')}
            />

            {/* MISSION 04 — LEVEL 17 */}
            <Mission04LevelUp
              isCompleted={completedMissions['m4']}
              onComplete={() => markMissionComplete('m4')}
            />
          </main>

          {/* Final Sibling Emotional Message & Restart */}
          <FinalSection
            onRestartMission={handleRestartMission}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />

          {/* Secret CLI Terminal Drawer */}
          <SecretTerminal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onUnlockEasterEgg={handleUnlockEasterEgg}
            easterEggUnlocked={easterEggUnlocked}
          />

          {/* Secret Easter Egg Reward Modal */}
          <SecretVaultModal
            isOpen={isVaultOpen}
            onClose={() => setIsVaultOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
