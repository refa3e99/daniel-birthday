import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, Sparkles, Gift, LockKeyhole, Heart } from 'lucide-react';
import { SECRET_EASTER_EGG_DATA } from '../data/birthdayData.ts';
import { sound } from '../utils/soundFx.ts';

interface SecretVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretVaultModal: React.FC<SecretVaultModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="w-full max-w-2xl bg-[#070c14] border-2 border-emerald-400 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.4)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-emerald-950/40 border-b border-emerald-500/40 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{SECRET_EASTER_EGG_DATA.title}</span>
            </div>
            <button
              onClick={() => {
                sound.playKeyClick();
                onClose();
              }}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-mono text-xs sm:text-sm">
            {/* Banner */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-emerald-300 font-bold text-sm">
                  EASTER EGG SOLVED: CLEARANCE OMEGA-17
                </div>
                <div className="text-slate-300 text-xs">
                  {SECRET_EASTER_EGG_DATA.bonusNote}
                </div>
              </div>
            </div>

            {/* Sibling Programmer Jokes */}
            <div className="space-y-3">
              <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <LockKeyhole className="w-3.5 h-3.5" />
                <span>RESTRICTED SIBLING JOKE ARCHIVES</span>
              </div>
              <div className="space-y-2">
                {SECRET_EASTER_EGG_DATA.jokes.map((joke, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-[#0b121d] border border-slate-800 text-slate-300 text-xs leading-relaxed"
                  >
                    <span className="text-emerald-400 font-bold mr-2">[{idx + 1}]</span>
                    {joke}
                  </div>
                ))}
              </div>
            </div>

            {/* Sibling Birthday Coupons */}
            <div className="space-y-3">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>OFFICIAL SIBLING REDEEMABLE COUPONS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SECRET_EASTER_EGG_DATA.siblingCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="p-3.5 rounded bg-slate-900 border border-amber-500/30 text-xs space-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] text-amber-400 font-bold">
                        {coupon.code}
                      </div>
                      <div className="text-white font-bold mt-1">
                        {coupon.title}
                      </div>
                      <div className="text-slate-400 text-[11px] mt-1 leading-snug">
                        {coupon.detail}
                      </div>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold pt-2 border-t border-slate-800">
                      STATUS: ACTIVE (NON-EXPIRING)
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sibling Love Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-500 text-xs flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                Special secret unlocked just for Daniel
              </span>
              <button
                onClick={() => {
                  sound.playKeyClick();
                  onClose();
                }}
                className="px-5 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
              >
                Accept Rewards & Close Vault
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
