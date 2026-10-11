import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ChevronDown, Binary, CheckCircle2, Terminal } from 'lucide-react';
import { sound } from '../utils/soundFx.ts';

interface BirthdayHeroProps {
  completedMissions: { [key: string]: boolean };
  onStartMission: (missionId: string) => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({
  completedMissions,
  onStartMission,
}) => {
  const scrollToFirstMission = () => {
    sound.playBeep(600, 0.08);
    const element = document.querySelector('#mission-classified');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="mission-brief" className="relative pt-12 pb-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Terminal Header Bar */}
        <div className="rounded-t-lg border border-emerald-500/30 bg-[#0a0f16] px-4 py-2.5 flex items-center justify-between text-xs font-mono text-emerald-400/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-slate-400">SESSION: CLASSIFIED_BIRTHDAY_SURPRISE</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>TARGET_STATUS: 17_YEARS_ACTIVE</span>
            <span className="text-emerald-400">AUTHORIZED</span>
          </div>
        </div>

        {/* Main Hero Card Container */}
        <div className="rounded-b-lg border-x border-b border-emerald-500/30 bg-[#070b10]/95 p-6 sm:p-10 lg:p-12 box-glow-green relative">
          {/* Subtle decorative grid lines */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Sibling Operational Lead-in */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-6">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              DIRECTIVE OVERRIDE: SIBLING LEVEL ACCESS
            </span>
            <span>·</span>
            <span>DATE: OCTOBER 10</span>
            <span>·</span>
            <span className="text-cyan-400">CLEARANCE: LEVEL 17</span>
          </div>

          {/* Large Main Birthday Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-cyber text-white leading-tight">
              HAPPY 17TH BIRTHDAY, <span className="text-emerald-400 glow-green">DANIEL</span> 🎂
            </h1>

            {/* Required Sister/Brother Heartfelt Message */}
            <div className="max-w-3xl space-y-3 font-mono text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-emerald-500/60 pl-4 sm:pl-6 bg-emerald-950/20 py-3 rounded-r">
              <p className="text-emerald-300 font-semibold">
                You’ve officially unlocked Level 17.
              </p>
              <p className="text-slate-300">
                Keep exploring, keep building, keep breaking things (ethically 😎), and never stop being curious.
              </p>
            </div>

            <p className="text-sm font-mono text-slate-400 max-w-2xl leading-relaxed">
              Welcome to your custom command center. Behind every terminal command, memory log, and system stat on this site is an older sibling who is endlessly proud of who you are and everything you’re building.
            </p>
          </motion.div>

          {/* 4 Interactive Missions Quick Radar */}
          <div className="mt-10 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: 'mission-classified',
                number: '01',
                title: 'Classified File',
                desc: 'Decrypt the personal birthday letter',
                done: completedMissions['m1'],
              },
              {
                id: 'mission-memories',
                number: '02',
                title: 'Memory Database',
                desc: 'Explore recovered encrypted photo archives',
                done: completedMissions['m2'],
              },
              {
                id: 'mission-stats',
                number: '03',
                title: 'Daniel.exe',
                desc: 'Audit system stats & hacker diagnostics',
                done: completedMissions['m3'],
              },
              {
                id: 'mission-levelup',
                number: '04',
                title: 'Level 17 Upgrade',
                desc: 'Unlock XP rewards & 17-year achievements',
                done: completedMissions['m4'],
              },
            ].map((mission) => (
              <button
                key={mission.id}
                onClick={() => {
                  sound.playKeyClick();
                  onStartMission(mission.id);
                  const target = document.querySelector(`#${mission.id}`);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded border text-left font-mono transition-all group ${
                  mission.done
                    ? 'border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-slate-800 bg-[#090e15] hover:border-emerald-500/40 hover:bg-[#0c131d]'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="text-emerald-400 font-bold">MISSION {mission.number}</span>
                  {mission.done ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> RECOVERED
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">READY</span>
                  )}
                </div>
                <h2 className="text-sm font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                  {mission.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {mission.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={scrollToFirstMission}
              className="px-5 py-2.5 rounded bg-emerald-500 text-black font-mono font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 hover:bg-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
            >
              <span>EXECUTE MISSION 01</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-cyan-400" />
                TARGET AGE: 17
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                SECRET CODE HIDDEN IN SYSTEM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
