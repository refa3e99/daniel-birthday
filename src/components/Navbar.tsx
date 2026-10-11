import React from 'react';
import { Terminal, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundFx.ts';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  showMatrix: boolean;
  onToggleMatrix: () => void;
  onOpenTerminal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleMute,
  showMatrix,
  onToggleMatrix,
  onOpenTerminal,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sound.playKeyClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-500/20 bg-[#06090e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#mission-brief"
          onClick={(e) => handleNavClick(e, '#mission-brief')}
          className="text-base sm:text-lg font-bold font-mono text-emerald-400 tracking-wider whitespace-nowrap shrink-0 flex items-center gap-2 hover:text-emerald-300 transition-colors"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-sm inline-block shadow-[0_0_8px_#22c55e]" />
          <span>DANIEL // PROTOCOL 17</span>
        </a>

        {/* Zone 2: Concise Nav Links (Single line) */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-mono text-slate-400">
          <a
            href="#mission-brief"
            onClick={(e) => handleNavClick(e, '#mission-brief')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            01. Briefing
          </a>
          <a
            href="#mission-classified"
            onClick={(e) => handleNavClick(e, '#mission-classified')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            02. Sibling Letter
          </a>
          <a
            href="#mission-memories"
            onClick={(e) => handleNavClick(e, '#mission-memories')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            03. Memory DB
          </a>
          <a
            href="#mission-stats"
            onClick={(e) => handleNavClick(e, '#mission-stats')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            04. Daniel.exe
          </a>
          <a
            href="#mission-levelup"
            onClick={(e) => handleNavClick(e, '#mission-levelup')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            05. Level 17
          </a>
        </nav>

        {/* Zone 3: Primary Action & Quick Tool controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              sound.playKeyClick();
              onToggleMatrix();
            }}
            className={`p-2 rounded border text-xs font-mono transition-colors ${
              showMatrix
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                : 'border-slate-800 bg-[#0a0f16] text-slate-500 hover:text-slate-300'
            }`}
            title={showMatrix ? 'Disable Matrix Rain Effect' : 'Enable Matrix Rain Effect'}
            aria-label="Toggle Matrix effect"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleMute}
            className="p-2 rounded border border-slate-800 bg-[#0a0f16] text-xs font-mono text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
            title={isMuted ? 'Unmute cyber audio' : 'Mute cyber audio'}
            aria-label="Toggle Sound Effects"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              onOpenTerminal();
            }}
            className="px-3 py-1.5 rounded border border-emerald-500/60 bg-emerald-500/15 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-500 hover:text-black shadow-[0_0_12px_rgba(34,197,94,0.25)] transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI TERMINAL</span>
            <span className="sm:hidden">CLI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
