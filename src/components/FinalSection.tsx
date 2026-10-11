import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Heart, ShieldCheck, Printer, Terminal } from 'lucide-react';
import { sound } from '../utils/soundFx.ts';

interface FinalSectionProps {
  onRestartMission: () => void;
  onOpenTerminal: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({
  onRestartMission,
  onOpenTerminal,
}) => {
  const handlePrintDossier = () => {
    sound.playKeyClick();
    window.print();
  };

  return (
    <footer className="py-16 sm:py-24 border-t border-slate-800 bg-gradient-to-b from-[#05080c] to-[#030508] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 font-mono">
        {/* Top Decorative Cryptographic Stamp */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>OFFICIAL MISSION DEBRIEF // SIBLING ARCHIVE SIGN-OFF</span>
        </div>

        {/* Required Emotional Birthday Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="p-8 sm:p-10 rounded-2xl border border-emerald-500/30 bg-[#070c14]/90 box-glow-green space-y-5 text-left sm:text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />

            <p className="text-lg sm:text-2xl text-slate-100 font-semibold leading-relaxed tracking-wide font-cyber">
              “Behind all the code, terminals, missions and chaos, you’re one of my favorite people in the world. I’m proud of the person you’re becoming. Happy 17th birthday, Daniel ❤️”
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Heart className="w-4 h-4 text-rose-500 inline fill-rose-500" />
                FROM: YOUR OLDER SIBLING
              </span>
              <span>SIGNED: OCTOBER 10 // YEAR 17</span>
              <span className="text-cyan-400 font-bold">STATUS: MISSION ACCOMPLISHED</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              sound.playAccessGranted();
              onRestartMission();
            }}
            className="px-6 py-3 rounded border border-emerald-400 bg-emerald-500 text-black font-mono font-bold text-sm tracking-wider flex items-center gap-2.5 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:bg-emerald-400 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>[ RESTART MISSION ]</span>
          </motion.button>

          <button
            onClick={onOpenTerminal}
            className="px-5 py-3 rounded border border-slate-800 bg-[#090e16] text-xs sm:text-sm text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Access CLI Shell</span>
          </button>

          <button
            onClick={handlePrintDossier}
            className="px-5 py-3 rounded border border-slate-800 bg-[#090e16] text-xs sm:text-sm text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors flex items-center gap-2"
            title="Print or Save Birthday Dossier as PDF"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Birthday Dossier</span>
          </button>
        </div>

        {/* Quiet footer signature */}
        <div className="pt-10 text-xs text-slate-600 flex items-center justify-center gap-2">
          <span>CLASSIFIED PROTOCOL 17</span>
          <span>·</span>
          <span>FOR DANIEL</span>
          <span>·</span>
          <span>NEVER STOP BEING CURIOUS</span>
        </div>
      </div>
    </footer>
  );
};
