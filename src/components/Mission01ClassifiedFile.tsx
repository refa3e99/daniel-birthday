import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock, KeyRound, Copy, Check, Edit3, RotateCcw } from 'lucide-react';
import { SIBLING_LETTER_DEFAULT } from '../data/birthdayData.ts';
import { sound } from '../utils/soundFx.ts';

interface Mission01Props {
  onComplete: () => void;
  isCompleted: boolean;
}

export const Mission01ClassifiedFile: React.FC<Mission01Props> = ({ onComplete, isCompleted }) => {
  const [letterContent, setLetterContent] = useState<string>(SIBLING_LETTER_DEFAULT);
  const [isDecrypted, setIsDecrypted] = useState<boolean>(isCompleted);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(SIBLING_LETTER_DEFAULT);

  // Generate scrambled representation for encrypted view
  const scrambledPreview = `0x7F4B2A8C // ENCRYPTED SHA-512 PAYLOAD //
%#$^&*(@!~  01000100 01000001 01001110 01001001 01000101 01001100
$$$ [AES-256-GCM] CIPHERTEXT BLOCK DETECTED $$$
a9f24c08e1bb34217f0980ad1eec709b1103f621a6012e84...
KEY_ID: SIBLING_SIGNATURE_OCT10
CLASSIFICATION: TOP SECRET // AGENT DANIEL ONLY
AUTHENTICATION REQUIRED: CLICK DECRYPT TO COMMENCE RECONSTRUCTION SEQUENCE.`;

  const handleDecrypt = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    sound.playAccessGranted();

    const fullText = letterContent;
    let currentLength = 0;
    const step = 8; // chars per tick for smooth pacing

    const interval = setInterval(() => {
      currentLength += step;
      if (currentLength >= fullText.length) {
        clearInterval(interval);
        setDisplayedText(fullText);
        setIsDecrypting(false);
        setIsDecrypted(true);
        sound.playLevelUp();
        onComplete();
      } else {
        sound.playDecryptTick();
        const revealed = fullText.slice(0, currentLength);
        const randomGlitch = '▓▒░#$%&*!?'
          .charAt(Math.floor(Math.random() * 10))
          .repeat(3);
        setDisplayedText(revealed + randomGlitch);
      }
    }, 28);
  };

  const handleCopy = () => {
    sound.playKeyClick();
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    sound.playBeep(750, 0.1);
    setLetterContent(editText);
    setDisplayedText(editText);
    setIsEditing(false);
  };

  const handleResetEdit = () => {
    sound.playKeyClick();
    setEditText(SIBLING_LETTER_DEFAULT);
    setLetterContent(SIBLING_LETTER_DEFAULT);
    setDisplayedText(SIBLING_LETTER_DEFAULT);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isCompleted && !isDecrypted) {
      setIsDecrypted(true);
      setDisplayedText(letterContent);
    }
  }, [isCompleted, isDecrypted, letterContent]);

  return (
    <section id="mission-classified" className="py-12 border-t border-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold tracking-widest uppercase">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>MISSION 01 — CLASSIFIED FILE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cyber text-white mt-1">
              Encrypted Sibling Birthday Dispatch
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">CLEARANCE:</span>
            <span className="text-cyan-400 font-semibold">OMEGA-17</span>
            <span>·</span>
            <span className={isDecrypted ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {isDecrypted ? 'DECRYPTED' : 'ENCRYPTED'}
            </span>
          </div>
        </div>

        {/* Terminal Container */}
        <div className="rounded-lg border border-emerald-500/30 bg-[#090d14] overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.1)]">
          {/* Terminal Window Header */}
          <div className="px-4 py-2.5 bg-[#0e141e] border-b border-emerald-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-emerald-400/90">classified_payload_sibling.asc</span>
            </div>

            <div className="flex items-center gap-2">
              {isDecrypted && (
                <>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1 rounded text-slate-400 hover:text-emerald-400 transition-colors"
                    title="Customize / Edit Note"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 hover:text-emerald-300 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Letter / Encrypted Body */}
          <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed min-h-[300px]">
            {!isDecrypted && !isDecrypting ? (
              <div className="space-y-6">
                <div className="p-4 rounded border border-amber-500/30 bg-amber-950/15 text-amber-300/90 text-xs sm:text-sm font-mono flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-amber-300">SECURITY NOTICE: RESTRICTED SIBLING PAYLOAD</div>
                    <div className="text-slate-400 mt-1">
                      This file is protected by sibling cryptographic keys. Decryption authorization requires target identity: <strong className="text-emerald-400">Daniel (Age 17)</strong>.
                    </div>
                  </div>
                </div>

                <pre className="text-slate-500 text-xs sm:text-sm select-all whitespace-pre-wrap bg-black/40 p-4 rounded border border-slate-800 font-mono">
                  {scrambledPreview}
                </pre>

                <div className="flex justify-center pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDecrypt}
                    className="px-6 py-3 rounded border border-emerald-400 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black font-mono font-bold text-sm tracking-wider flex items-center gap-2.5 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>[ DECRYPT CLASSIFIED MESSAGE ]</span>
                  </motion.button>
                </div>
              </div>
            ) : isDecrypting ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-emerald-400 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>DECRYPTING SIBLING ARCHIVE... [ALGORITHM: AES-GCM-256]</span>
                </div>
                <pre className="text-emerald-400 whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed">
                  {displayedText}
                </pre>
              </div>
            ) : isEditing ? (
              <div className="space-y-4">
                <div className="text-xs text-cyan-400 font-bold">
                  EDIT MODE: PERSONALIZING SIBLING DISPATCH
                </div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={14}
                  className="w-full bg-[#05080c] border border-emerald-500/40 rounded p-4 text-emerald-300 font-mono text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleResetEdit}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-400 hover:text-slate-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Default</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-1.5 rounded bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Unlock className="w-3.5 h-3.5" /> STATUS: FULLY DECRYPTED & VERIFIED
                  </span>
                  <span>CIPHER: CLEARED</span>
                </div>

                <div className="text-slate-200 whitespace-pre-line leading-relaxed text-sm sm:text-base selection:bg-emerald-500/30">
                  {letterContent}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>HASH: #DANIEL-17-LEVEL-UP</span>
                  <span className="text-emerald-400">MISSION 01 COMPLETE</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
