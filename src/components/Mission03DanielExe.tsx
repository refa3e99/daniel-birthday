import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Activity, RefreshCw, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { SYSTEM_STATS } from '../data/birthdayData.ts';
import { sound } from '../utils/soundFx.ts';

interface Mission03Props {
  onComplete: () => void;
  isCompleted: boolean;
}

export const Mission03DanielExe: React.FC<Mission03Props> = ({ onComplete }) => {
  const [stats, setStats] = useState(SYSTEM_STATS);
  const [isScanning, setIsScanning] = useState(false);
  const [overclockCount, setOverclockCount] = useState(0);

  const handleRunStressTest = () => {
    if (isScanning) return;
    setIsScanning(true);
    sound.playAccessGranted();

    // Glitch sound bursts
    setTimeout(() => sound.playGlitchZap(), 200);
    setTimeout(() => sound.playDecryptTick(), 450);
    setTimeout(() => sound.playDecryptTick(), 700);

    setTimeout(() => {
      setIsScanning(false);
      setOverclockCount((prev) => prev + 1);
      sound.playLevelUp();
      onComplete();
    }, 1100);
  };

  return (
    <section id="mission-stats" className="py-12 border-t border-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold tracking-widest uppercase">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>MISSION 03 — DANIEL.EXE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cyber text-white mt-1">
              Fictional System Profile & Neural Diagnostics
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Internal specifications and telemetry captured from Daniel's Level 17 core runtime.
            </p>
          </div>

          <button
            onClick={handleRunStressTest}
            disabled={isScanning}
            className={`px-4 py-2 rounded border font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isScanning
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 animate-pulse'
                : 'border-emerald-500/40 bg-[#0c121b] text-emerald-300 hover:bg-emerald-500 hover:text-black shadow-[0_0_15px_rgba(34,197,94,0.2)]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'BENCHMARKING...' : 'RUN DIAGNOSTIC STRESS-TEST'}</span>
          </button>
        </div>

        {/* System Profile Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stats Column (2 Cols) */}
          <div className="lg:col-span-2 rounded-lg border border-emerald-500/30 bg-[#080d14] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono text-slate-400">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> RUNTIME TELEMETRY: DANIEL_CORE_17
              </span>
              <span>SAMPLING RATE: 1000 HZ</span>
            </div>

            <div className="space-y-4 font-mono">
              {stats.map((stat) => {
                const isMax = stat.value === 100;
                const isSpecial = stat.id === 'birthday_level';

                return (
                  <div key={stat.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-semibold">{stat.name}</span>
                        {isMax && (
                          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                            [MAXED]
                          </span>
                        )}
                        {isSpecial && (
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                            [TODAY]
                          </span>
                        )}
                      </div>
                      <span className={`font-bold tabular-nums ${
                        isSpecial 
                          ? 'text-cyan-400 text-base glow-cyan' 
                          : isMax 
                          ? 'text-emerald-400 glow-green' 
                          : 'text-slate-300'
                      }`}>
                        {stat.value}{isSpecial ? ' (UNLOCKED)' : '%'}
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2.5 rounded bg-slate-900 border border-slate-800 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isSpecial ? '100%' : `${stat.value}%` }}
                        transition={{ duration: 1.1, ease: 'easeOut' }}
                        className={`h-full rounded-sm transition-all duration-500 ${
                          isSpecial
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_12px_#06b6d4]'
                            : isMax
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_10px_#22c55e]'
                            : 'bg-emerald-500/80'
                        }`}
                      />
                    </div>

                    <div className="text-[11px] text-slate-500 truncate">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side Hardware / Sibling Telemetry Specs */}
          <div className="space-y-6 font-mono text-xs">
            {/* Spec Box */}
            <div className="rounded-lg border border-slate-800 bg-[#080d14] p-5 space-y-3.5">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
                <Zap className="w-3.5 h-3.5" /> HARDWARE IDENTIFICATION
              </div>

              <div className="space-y-2 text-slate-400">
                <div className="flex justify-between">
                  <span className="text-slate-500">PROCESSOR:</span>
                  <span className="text-slate-200">Neural Cortex 17.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CLOCK SPEED:</span>
                  <span className="text-emerald-400">Overclocked (Late Night)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SECURITY CLASS:</span>
                  <span className="text-cyan-400">Ethical White Hat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CO-OP TEAM:</span>
                  <span className="text-slate-200">Sibling Guild #1</span>
                </div>
              </div>
            </div>

            {/* Sibling Warning Box */}
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-5 space-y-2.5">
              <div className="text-amber-400 font-bold flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-3.5 h-3.5" /> SIBLING WARNING LOG
              </div>
              <p className="text-amber-200/80 text-[11px] leading-relaxed">
                Notice: Stat <strong className="text-amber-300">"Annoying Older Sibling"</strong> has remained pinned at 100% since approximately 2009. No known patch exists in the repository.
              </p>
              {overclockCount > 0 && (
                <div className="text-emerald-400 text-[10px] pt-1">
                  Diagnostics run: {overclockCount}x. All vital signs optimal!
                </div>
              )}
            </div>

            {/* White Hat Certification */}
            <div className="rounded-lg border border-emerald-500/20 bg-[#080d14] p-4 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
              <div>
                <div className="text-white font-bold text-xs">ETHICAL HACKER BADGE</div>
                <div className="text-slate-500 text-[11px]">Authorized to breach birthday cake security</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
