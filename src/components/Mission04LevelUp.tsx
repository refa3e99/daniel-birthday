import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  ArrowRight, 
  ShieldAlert, 
  Code2, 
  Compass, 
  Flame, 
  Award, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { ACHIEVEMENTS } from '../data/birthdayData.ts';
import { sound } from '../utils/soundFx.ts';

interface Mission04Props {
  onComplete: () => void;
  isCompleted: boolean;
}

export const Mission04LevelUp: React.FC<Mission04Props> = ({ onComplete }) => {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  const fireCyberConfetti = () => {
    sound.playLevelUp();
    setHasTriggeredConfetti(true);
    onComplete();

    // Custom neon cyber color scheme
    const cyberColors = ['#22c55e', '#06b6d4', '#10b981', '#38bdf8', '#ffffff'];

    // Left cannon
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.65 },
      colors: cyberColors,
    });

    // Right cannon
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.65 },
      colors: cyberColors,
    });

    // Center starburst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { x: 0.5, y: 0.45 },
        colors: cyberColors,
      });
    }, 250);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-emerald-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-400" />;
      case 'Award':
      default:
        return <Award className="w-5 h-5 text-emerald-300" />;
    }
  };

  return (
    <section id="mission-levelup" className="py-12 border-t border-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold tracking-widest uppercase">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>MISSION 04 — LEVEL 17</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cyber text-white mt-1">
              Level-Up Protocol & Achievement Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Promoted from Tier 16 to Tier 17. All attributes re-indexed. Lifetime legend status granted.
            </p>
          </div>

          <button
            onClick={fireCyberConfetti}
            className="px-4 py-2.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.35)] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRIGGER CELEBRATION PROTOCOL</span>
          </button>
        </div>

        {/* Level 16 -> Level 17 Big Banner Card */}
        <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-b from-[#0a131b] to-[#060a0f] p-8 sm:p-10 mb-8 box-glow-green relative overflow-hidden">
          {/* Subtle radar circle behind */}
          <div className="absolute -top-12 -right-12 w-64 h-64 border border-emerald-500/10 rounded-full animate-radar pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Left: Progression Visual */}
            <div className="flex items-center gap-4 sm:gap-6 font-cyber">
              {/* Previous Level */}
              <div className="text-center p-4 rounded-lg bg-slate-900/80 border border-slate-800 w-28 sm:w-36">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  DECOMMISSIONED
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold text-slate-500 line-through mt-1">
                  LVL 16
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  100% EXHAUSTED
                </div>
              </div>

              {/* Arrow */}
              <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400">
                <ArrowRight className="w-6 h-6 animate-pulse" />
              </div>

              {/* New Level 17 Unlocked */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-center p-4 rounded-lg bg-emerald-950/40 border border-emerald-400/60 w-32 sm:w-44 shadow-[0_0_25px_rgba(34,197,94,0.25)]"
              >
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" /> ACTIVE NOW
                </div>
                <div className="text-3xl sm:text-5xl font-black text-white glow-green mt-1">
                  LVL 17
                </div>
                <div className="text-[11px] font-mono text-cyan-300 font-semibold mt-1">
                  UNLOCKED TODAY
                </div>
              </motion.div>
            </div>

            {/* Right: XP Bar & Status Text */}
            <div className="w-full md:w-72 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">LEVEL 17 PROGRESSION:</span>
                <span className="text-emerald-400 font-bold">100% READY</span>
              </div>
              <div className="h-3 rounded bg-slate-950 border border-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-sm shadow-[0_0_12px_#22c55e]" />
              </div>
              <div className="text-[11px] text-slate-500 text-right">
                NEXT RANK: ADULT PROTOCOL (T-MINUS 365 DAYS)
              </div>
            </div>
          </div>
        </div>

        {/* Fictional Achievements Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-slate-400">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">
              UNLOCKED ACHIEVEMENTS (5/5)
            </span>
            <span>SYSTEM AWARD POOL: 100% CLAIMED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((ach) => (
              <motion.div
                key={ach.id}
                whileHover={{ y: -2 }}
                className="p-5 rounded-lg border border-slate-800 bg-[#080d14] hover:border-emerald-500/40 hover:bg-[#0b121c] transition-all font-mono space-y-2 group"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 group-hover:border-emerald-500/30">
                    {getIcon(ach.iconName)}
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                    {ach.points}
                  </span>
                </div>

                <div className="pt-1">
                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-emerald-300 transition-colors font-cyber">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/90 pt-1 border-t border-slate-850">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>CLAIMED BY DANIEL // AGE 17</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
