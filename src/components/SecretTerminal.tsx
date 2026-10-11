import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, HelpCircle } from 'lucide-react';
import { SECRET_EASTER_EGG_DATA } from '../data/birthdayData.ts';
import { sound } from '../utils/soundFx.ts';

interface SecretTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockEasterEgg: () => void;
  easterEggUnlocked: boolean;
}

interface LogEntry {
  id: string;
  type: 'cmd' | 'output' | 'success' | 'error' | 'sys';
  text: string;
}

export const SecretTerminal: React.FC<SecretTerminalProps> = ({
  isOpen,
  onClose,
  onUnlockEasterEgg,
  easterEggUnlocked,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      type: 'sys',
      text: 'CYBER-CORE TERMINAL v17.0 // CLASSIFIED ACCESS SHELL',
    },
    {
      id: '2',
      type: 'sys',
      text: "Type 'help' for command manual, or enter access code to unlock the secret vault.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    sound.playKeyClick();
    const newLogs: LogEntry[] = [
      ...logs,
      { id: Date.now().toString(), type: 'cmd', text: `daniel@cyber-core:~$ ${cmd}` },
    ];

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputVal('');

    const lower = cmd.toLowerCase();

    // Check Easter Egg triggers
    if (SECRET_EASTER_EGG_DATA.validCodes.some((code) => lower.includes(code))) {
      sound.playEasterEggSound();
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: '>>> ACCESS CODE CONFIRMED! DECRYPTING RESTRICTED SIBLING VAULT...',
      });
      newLogs.push({
        id: (Date.now() + 2).toString(),
        type: 'success',
        text: '>>> CLEARANCE OMEGA-17 GRANTED. OPENING REWARD SCREEN NOW!',
      });
      setLogs(newLogs);
      setTimeout(() => {
        onUnlockEasterEgg();
      }, 700);
      return;
    }

    // Command handling
    if (lower === 'help') {
      sound.playBeep(650, 0.08);
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `AVAILABLE COMMANDS:
  help                     - Show this assistance manual
  1337                     - Elite access code override
  daniel17                 - Direct birthday override code
  whoami                   - Print active identity credentials
  sudo birthday            - Elevate birthday privileges
  cat secret.txt           - Inspect hidden file payload
  cake                     - Execute birthday nutrition protocol
  stats                    - View current attribute summary
  hack_the_planet          - Execute cinematic cyber maneuver
  clear                    - Flush terminal screen buffer
  exit                     - Close interactive shell`,
      });
    } else if (lower === 'clear') {
      sound.playKeyClick();
      setLogs([]);
      return;
    } else if (lower === 'exit') {
      sound.playKeyClick();
      onClose();
      return;
    } else if (lower === 'whoami') {
      sound.playBeep(600, 0.08);
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'USER: Daniel\nAGE: 17\nROLE: Elite Ethical Hacker, Coder, Best Little Brother\nGUILD: Sibling Syndicate',
      });
    } else if (lower === 'cat secret.txt' || lower === 'cat secret') {
      sound.playDecryptTick();
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'SECRET.TXT CONTENT:\n"The password is an elite hacker term or your name followed by your new age.\nTry typing: 1337 or daniel17 to unlock your sibling rewards vault!"',
      });
    } else if (lower === 'cake' || lower.includes('apt-get install cake')) {
      sound.playAccessGranted();
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  chocolate_cake-17.0.0
17 candles upgraded, 0 to remove, 0 not upgraded.
Unpacking cake... 100%
Setting up chocolate_cake-17.0.0...
🎂 CAKE READY FOR DANIEL!`,
      });
    } else if (lower === 'stats') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'CODING: 99% | CURIOSITY: 100% | HACKING: 87% | SIBLING ANNOYANCE: 100% | LEVEL: 17',
      });
    } else if (lower === 'hack_the_planet') {
      sound.playGlitchZap();
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: '⚡ HACK THE PLANET! ⚡\nSystem overclocked! Remember to always hack ethically and responsibly 😎',
      });
    } else {
      sound.playGlitchZap();
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `Unknown command: '${cmd}'. Type 'help' or try the access code: 1337`,
      });
    }

    setLogs(newLogs);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="w-full max-w-3xl bg-[#070b10] border border-emerald-500/50 rounded-lg overflow-hidden shadow-[0_0_35px_rgba(34,197,94,0.3)] flex flex-col h-[520px] max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-4 py-2.5 bg-[#0d141e] border-b border-emerald-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-emerald-400 font-bold flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                interactive-cli // daniel@cyber-core:~
              </span>
            </div>

            <div className="flex items-center gap-3">
              {easterEggUnlocked && (
                <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> VAULT UNLOCKED
                </span>
              )}
              <button
                onClick={() => {
                  sound.playKeyClick();
                  onClose();
                }}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Command Suggestions Strip */}
          <div className="px-4 py-1.5 bg-[#090f16] border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 shrink-0">SHORTCUTS:</span>
            {['help', '1337', 'daniel17', 'whoami', 'cake', 'cat secret.txt'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInputVal(cmd);
                  inputRef.current?.focus();
                }}
                className="px-2 py-0.5 rounded bg-slate-800/80 text-emerald-300 hover:bg-emerald-500/20 transition-colors shrink-0"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Screen Body */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm space-y-2 select-text">
            {logs.map((log) => {
              let textClass = 'text-slate-300';
              if (log.type === 'cmd') textClass = 'text-cyan-300 font-semibold';
              if (log.type === 'sys') textClass = 'text-slate-500';
              if (log.type === 'success') textClass = 'text-emerald-400 font-bold glow-green';
              if (log.type === 'error') textClass = 'text-rose-400';

              return (
                <div key={log.id} className={`${textClass} whitespace-pre-wrap leading-relaxed`}>
                  {log.text}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input Line */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#0a0f16] border-t border-emerald-500/20 flex items-center gap-2 font-mono"
          >
            <span className="text-emerald-400 text-xs sm:text-sm font-bold shrink-0">
              daniel@cyber-core:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command or code (e.g., 1337 or help)..."
              className="flex-1 bg-transparent text-emerald-300 text-xs sm:text-sm focus:outline-none selection:bg-emerald-500/30 font-mono"
            />
            <button
              type="submit"
              className="p-1.5 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
