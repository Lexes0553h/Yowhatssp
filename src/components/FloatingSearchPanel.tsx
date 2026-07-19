import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, X } from 'lucide-react';
import { curatedDestinations } from '../data';
import { luxuryIndiaDestinations } from './NewJourneyPage';

interface FloatingSearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (destId: string | null, query: string) => void;
}

export default function FloatingSearchPanel({ isOpen, onClose, onSelect }: FloatingSearchPanelProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const allDestinations = useMemo(() => {
    return [...curatedDestinations, ...luxuryIndiaDestinations];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allDestinations.filter(d => 
      d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q)
    );
  }, [query, allDestinations]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (results.length > 0) {
        onSelect(results[0].id, query);
      } else {
        onSelect(null, query);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-[calc(1.5rem+env(safe-area-inset-top,0px))] left-1/2 -translate-x-1/2 w-[90vw] max-w-[400px] z-[100] origin-top"
        >
          <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <form onSubmit={handleSubmit} className="relative flex items-center p-4 border-b border-white/10">
              <Search className="w-5 h-5 text-white/50 absolute left-4" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search destinations..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-transparent text-white text-sm outline-none pl-8 pr-8 placeholder:text-white/40"
              />
              <button 
                type="button" 
                onClick={onClose}
                className="absolute right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
            
            {query.trim().length > 0 && (
              <div className="max-h-[250px] overflow-y-auto">
                {results.length > 0 ? (
                  results.map(dest => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => onSelect(dest.id, query)}
                      className="w-full text-left p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-white/70" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{dest.name}</div>
                        <div className="text-[10px] text-white/50 uppercase tracking-wider">{dest.location}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">No exact matches</span>
                    <span className="text-white/30 text-[10px]">Press enter to explore possibilities</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
