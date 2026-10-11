import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, FileCode, X, Upload, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MemoryItem } from '../types.ts';
import { MEMORIES } from '../data/birthdayData.ts';
import { sound } from '../utils/soundFx.ts';

interface Mission02Props {
  onComplete: () => void;
  isCompleted: boolean;
}

export const Mission02MemoryDatabase: React.FC<Mission02Props> = ({ onComplete, isCompleted }) => {
  const [memories, setMemories] = useState<MemoryItem[]>(MEMORIES);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [filterTag, setFilterTag] = useState<string>('all');
  const [viewedCount, setViewedCount] = useState<number>(0);

  const tags = ['all', 'Tech Lab', 'Hackathon', 'Origins', 'Agent Dossier'];

  const filteredMemories = filterTag === 'all'
    ? memories
    : memories.filter((m) => m.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase()));

  const handleOpenMemory = (memory: MemoryItem) => {
    sound.playAccessGranted();
    setSelectedMemory(memory);
    const newCount = viewedCount + 1;
    setViewedCount(newCount);
    if (!isCompleted && newCount >= 2) {
      onComplete();
    }
  };

  const handleCloseModal = () => {
    sound.playKeyClick();
    setSelectedMemory(null);
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setMemories((prev) =>
          prev.map((item) => (item.id === id ? { ...item, image: url } : item))
        );
        if (selectedMemory && selectedMemory.id === id) {
          setSelectedMemory((prev) => (prev ? { ...prev, image: url } : null));
        }
        sound.playLevelUp();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="mission-memories" className="py-12 border-t border-slate-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold tracking-widest uppercase">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>MISSION 02 — MEMORY DATABASE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cyber text-white mt-1">
              Recovered Encrypted Archives
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Declassified memory sectors dating back from early childhood tinkering to late-night coding battles. Click any file to inspect recovered artifacts.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">SECTOR STATUS:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 4/4 RESTORED
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 font-mono text-xs">
          <span className="text-slate-500 mr-2 shrink-0">FILTER INDEX:</span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                sound.playKeyClick();
                setFilterTag(tag);
              }}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 ${
                filterTag === tag
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-[#0b1017] text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Memory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMemories.map((mem) => (
            <motion.div
              key={mem.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.15 }}
              onClick={() => handleOpenMemory(mem)}
              className="rounded-lg border border-slate-800 bg-[#080d14] overflow-hidden hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Image Card Container with Fallback */}
                <div className="relative aspect-4/3 bg-[#0a0f16] overflow-hidden border-b border-slate-800/80">
                  <img
                    src={mem.image}
                    alt={mem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        if (mem.image.startsWith('/pic')) {
                          target.src = '/assets/images' + mem.image;
                          return;
                        }
                      }
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d14] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating file tag */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 backdrop-blur-sm">
                    {mem.year}
                  </div>

                  <div className="absolute top-2.5 right-2.5 text-[10px] font-mono text-cyan-300 bg-black/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    RECOVERED
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2 font-mono">
                  <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                    <FileCode className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{mem.codeName}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-emerald-300 transition-colors line-clamp-1 font-cyber">
                    {mem.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {mem.summary}
                  </p>
                </div>
              </div>

              {/* Bottom metadata strip */}
              <div className="p-4 pt-0 font-mono flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/50 mt-3">
                <span className="truncate">{mem.tags[0]}</span>
                <span className="text-emerald-400/90 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  INSPECT <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Inspector */}
        <AnimatePresence>
          {selectedMemory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-[#090e16] border border-emerald-500/50 rounded-lg overflow-hidden shadow-[0_0_35px_rgba(34,197,94,0.25)] flex flex-col max-h-[90vh]"
              >
                {/* Modal Title Bar */}
                <div className="px-4 py-3 bg-[#0d1420] border-b border-emerald-500/20 flex items-center justify-between font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="text-emerald-300 font-bold">{selectedMemory.codeName}</span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-6 overflow-y-auto space-y-5 font-mono text-xs sm:text-sm">
                  {/* Photo with scanline effect */}
                  <div className="relative aspect-16/10 rounded overflow-hidden border border-slate-800 bg-black">
                    <img
                      src={selectedMemory.image}
                      alt={selectedMemory.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          if (selectedMemory.image.startsWith('/pic')) {
                            target.src = '/assets/images' + selectedMemory.image;
                          }
                        }
                      }}
                    />
                    <div className="absolute inset-0 scanlines-overlay opacity-30 pointer-events-none" />
                  </div>

                  {/* Metadata grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded bg-[#060a0f] border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 block">TIMESTAMP:</span>
                      <span className="text-slate-300 font-semibold">{selectedMemory.timestamp}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">SECURITY CLEARANCE:</span>
                      <span className="text-cyan-400 font-semibold">{selectedMemory.clearanceLevel}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">ARCHIVE YEAR:</span>
                      <span className="text-emerald-400 font-semibold">CIRCA {selectedMemory.year}</span>
                    </div>
                  </div>

                  {/* Title & Sibling Note */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold font-cyber text-white">
                      {selectedMemory.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedMemory.summary}
                    </p>

                    <div className="p-4 rounded border border-emerald-500/40 bg-emerald-950/25 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>SIBLING CLASSIFIED LOG ENTRY:</span>
                      </div>
                      <p className="text-emerald-200/90 leading-relaxed italic">
                        "{selectedMemory.classifiedNote}"
                      </p>
                    </div>
                  </div>

                  {/* Custom Photo Upload Helper */}
                  <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                    <label className="flex items-center gap-1.5 cursor-pointer text-emerald-400 hover:text-emerald-300 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Replace With Real Personal Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleCustomImageUpload(e, selectedMemory.id)}
                      />
                    </label>

                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-1.5 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
                    >
                      Close Dossier
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
