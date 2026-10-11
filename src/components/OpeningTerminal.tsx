import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck, Zap, Lock, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/soundFx.ts';

interface OpeningTerminalProps {
  onEnterSystem: () => void;
}

interface TerminalStep {
  text: string;
  type: 'status' | 'data' | 'success' | 'alert';
  delay: number;
}

const TERMINAL_STEPS: TerminalStep[] = [
  { text: 'INITIALIZING SECURE CONNECTION...', type: 'status', delay: 400 },
  { text: 'CONNECTING TO ENCRYPTED SUBNET [PORT: 2026-17]... ESTABLISHED', type: 'status', delay: 900 },
  { text: 'ACCESSING CLASSIFIED FILE...', type: 'status', delay: 1500 },
  { text: 'CHECKING BIOMETRIC SIGNATURES & RSA 4096 HASH...', type: 'status', delay: 2100 },
  { text: 'IDENTITY VERIFIED', type: 'success', delay: 2700 },
  { text: 'TARGET: DANIEL', type: 'data', delay: 3200 },
  { text: 'AGE: 17', type: 'data', delay: 3700 },
  { text: 'STATUS: BIRTHDAY PROTOCOL ACTIVATED', type: 'alert', delay: 4200 },
];

export const OpeningTerminal: React.FC<OpeningTerminalProps> = ({ onEnterSystem }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Sequence through terminal lines
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_STEPS.forEach((step, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
        sound.playKeyClick();
        if (step.type === 'alert') {
          sound.playAccessGranted();
          setIsReady(true);
        } else if (step.type === 'success') {
          sound.playBeep(700, 0.12, 'triangle');
        }
      }, step.delay);

      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleEnter = () => {
    sound.playGlitchZap();
    sound.playAccessGranted();
    setIsGlitching(true);
    setTimeout(() => {
      onEnterSystem();
    }, 650);
  };

  const handleSkipIntro = () => {
    setVisibleLines(TERMINAL_STEPS.length);
    setIsReady(true);
    sound.playAccessGranted();
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#040608] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
      isGlitching ? 'animate-glitch filter invert-10' : ''
    }`}>
      {/* Background cyber grid & scanlines */}
      <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 scanlines-overlay opacity-40 pointer-events-none" />

      {/* Top right quick controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-500/20 bg-[#090d14]/80 text-xs font-mono text-emerald-400 hover:border-emerald-500/60 hover:text-emerald-300 transition-colors"
          title="Toggle Cyber Sound Effects"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{isMuted ? 'SFX: MUTED' : 'SFX: ON'}</span>
        </button>

        {!isReady && (
          <button
            onClick={handleSkipIntro}
            className="px-3 py-1.5 rounded border border-slate-700/60 bg-[#090d14]/80 text-xs font-mono text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            SKIP SEQUENCE
          </button>
        )}
      </div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-3xl rounded-lg border border-emerald-500/40 bg-[#080d12]/95 shadow-[0_0_35px_rgba(16,185,129,0.18)] overflow-hidden backdrop-blur-md"
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/20 bg-[#0c1219]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/40" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
            <span className="ml-2 text-xs font-mono text-emerald-400/80 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              secure-shell://cyber-core.vault/protocol-17
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-500/60">
            <Lock className="w-3 h-3" />
            <span>ENCRYPTED (TLS 1.3)</span>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-6 sm:p-8 font-mono text-sm sm:text-base space-y-3 min-h-[340px] flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="text-xs text-slate-500 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>SYSTEM BOOT: DANIEL_OS_v17.0</span>
              <span>NODE: SIBLING_COMMAND</span>
            </div>

            {TERMINAL_STEPS.slice(0, visibleLines).map((step, idx) => {
              const isLast = idx === visibleLines - 1;
              let colorClass = 'text-slate-300';
              let badge = '[..]';

              if (step.type === 'status') {
                colorClass = 'text-emerald-400/90';
                badge = '[OK]';
              } else if (step.type === 'data') {
                colorClass = 'text-cyan-300 font-bold glow-cyan text-base sm:text-lg';
                badge = '[>>]';
              } else if (step.type === 'success') {
                colorClass = 'text-emerald-400 font-bold';
                badge = '[PASS]';
              } else if (step.type === 'alert') {
                colorClass = 'text-emerald-300 font-bold glow-green text-base sm:text-lg tracking-wide';
                badge = '[EXEC]';
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="text-xs text-emerald-600 font-semibold select-none pt-0.5">{badge}</span>
                  <span className={colorClass}>{step.text}</span>
                  {isLast && !isReady && (
                    <span className="inline-block w-2.5 h-4 bg-emerald-400 cursor-blink ml-1" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Action Zone */}
          <div className="pt-6 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CLEARANCE: LEVEL 17 GRANTED</span>
            </div>

            <motion.button
              disabled={!isReady}
              onClick={handleEnter}
              whileHover={isReady ? { scale: 1.02 } : {}}
              whileTap={isReady ? { scale: 0.98 } : {}}
              className={`w-full sm:w-auto px-6 py-3 rounded border font-mono font-bold text-sm tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${
                isReady
                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black shadow-[0_0_25px_rgba(34,197,94,0.35)] cursor-pointer'
                  : 'border-slate-800 bg-slate-900/60 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Zap className={`w-4 h-4 ${isReady ? 'text-emerald-400 group-hover:text-black' : ''}`} />
              <span>[ ENTER THE SYSTEM ]</span>
            </motion.button>
          </div>
        </div>

        {/* Footer info line */}
        <div className="px-4 py-2 bg-[#05080c] border-t border-emerald-500/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>HOST: sibling-relay-net</span>
          <span>PROTOCOL: BIRTHDAY_SURPRISE_17</span>
        </div>
      </motion.div>
    </div>
  );
};
