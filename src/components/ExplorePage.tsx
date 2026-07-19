import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Plane, Star, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { curatedDestinations } from '../data';
import { luxuryIndiaDestinations } from './NewJourneyPage';
import { Destination } from '../types';

interface ExplorePageProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (destId: string) => void;
  onBookNow: (destId: string) => void;
  initialQuery?: string;
  initialFocusedDestId?: string | null;
}

export default function ExplorePage({ isOpen, onClose, onSelectDestination, onBookNow, initialQuery, initialFocusedDestId }: ExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      if ((window as any).lenis) { (window as any).lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); };
      if (initialQuery) {
        setSearchQuery(initialQuery);
      }
    }
  }, [isOpen, initialQuery]);

  // Combine curated and Indian destinations for full-spectrum search options
  const allDestinations = useMemo(() => {
    return [...curatedDestinations, ...luxuryIndiaDestinations];
  }, []);

  // Filter destinations based on user input
  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allDestinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(query) ||
        dest.location.toLowerCase().includes(query) ||
        dest.tagline.toLowerCase().includes(query) ||
        dest.highlights.some((h) => h.toLowerCase().includes(query))
    );
  }, [searchQuery, allDestinations]);

  // Suggested destinies matching the exact cards shown in the mockup image
  const suggestedDestinies = useMemo(() => {
    return [
      {
        id: 'bali',
        name: 'Bali',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
        location: 'Indonesia',
        tagline: 'Mystical Jungle Palaces'
      },
      {
        id: 'maldives',
        name: 'Maldives',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
        location: 'Indian Ocean',
        tagline: 'Private Overwater Sanctuaries'
      },
      {
        id: 'vietnam',
        name: 'Vietnam',
        image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1200&q=80',
        location: 'Southeast Asia',
        tagline: 'Imperial Halong Retreats'
      }
    ];
  }, []);

  // Handle escape key to close page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="relative w-full min-h-screen text-white font-sans overflow-hidden bg-black flex flex-col justify-between">
      {/* Immersive Maldives Beach Backdrop (From Screenshot) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"
          alt="Maldives Sandbar Backdrop"
          className="w-full h-full object-cover filter brightness-[0.7] saturate-[1.15]"
          style={{ objectPosition: 'center 45%' }}
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant vignette gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* HEADER SECTION */}
      <header className="relative z-20 flex justify-between items-center px-6 sm:px-12 py-8 w-full">
        <div></div>

        {/* Circular Close 'X' Button */}
        <motion.button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors shadow-lg cursor-pointer outline-none"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close search page"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </header>

      {/* CENTRAL TYPOGRAPHY & INTERACTIVE SEARCH HUD */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto w-full text-center py-6">
        {/* Slogan Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-white text-5xl sm:text-7xl font-sans tracking-tight leading-none">
            <span className="font-bold opacity-100">Explore</span>{' '}
            <span className="italic font-light opacity-90 text-neutral-300">new horizons.</span>
          </h1>
        </motion.div>

        {/* Search Header Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 font-bold uppercase mb-4 block"
        >
          SEARCH YOUR DESTINATION
        </motion.span>

        {/* Center Search Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl mx-auto mb-12"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-neutral-400 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where should your journey begin?"
              className="w-full bg-neutral-950/65 backdrop-blur-xl border border-white/20 hover:border-white/30 focus:border-white/50 focus:bg-neutral-950/85 transition-all rounded-full pl-14 pr-12 py-4 sm:py-4.5 text-sm sm:text-base font-sans text-white placeholder-neutral-400 focus:outline-none focus:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-5 flex items-center text-neutral-500 hover:text-white transition-colors outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete / Live Search Results Overlay */}
          <AnimatePresence>
            {searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 mt-3 bg-neutral-950/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl text-left max-h-[300px] overflow-y-auto z-50 divide-y divide-white/5"
              >
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => {
                        onSelectDestination(dest.id);
                        setSearchQuery('');
                      }}
                      className="p-4 flex items-center justify-between hover:bg-white/10 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        <div>
                          <div className="text-sm font-semibold text-white">{dest.name}</div>
                          <div className="text-xs text-neutral-400">{dest.location} — {dest.tagline}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full">
                          {dest.price.split(' ')[0] || dest.price}
                        </span>
                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-neutral-500 font-mono flex items-center justify-center gap-2">
                    <span className="tracking-[0.2em] font-bold">EXPLORING POSSIBILITIES...</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* SUGGESTED DESTINIES BOTTOM SECTION */}
      <section className="relative z-10 w-full px-6 sm:px-12 pb-16">
        <div className="max-w-6xl mx-auto">
          {searchQuery.trim() && filteredDestinations.length === 0 ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 w-full"
              >
                <div className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-white font-bold uppercase whitespace-pre-line leading-loose">
                  NEW{'\n'}POSSIBILITIES...
                </div>
                <div className="h-px bg-white/10 flex-1 ml-4" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, filter: 'blur(20px)' }}
                animate={{ opacity: 0.5, filter: 'blur(10px)' }}
                className="w-full md:w-[400px] aspect-[1.6] rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute bottom-6 left-6 w-12 h-4 bg-white/20 rounded-full blur-sm" />
              </motion.div>
            </div>
          ) : (
            <>
              {/* Section Divider Line & Heading */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 font-bold uppercase whitespace-nowrap">
                  SUGGESTED DESTINIES
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </motion.div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {suggestedDestinies.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCard(dest.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectDestination(dest.id)}
                className="relative aspect-[16/10] sm:aspect-[1.6] rounded-3xl overflow-hidden cursor-pointer border-2 border-white/5 shadow-2xl group transition-all"
                whileHover={{
                  scale: 1.03,
                  borderColor: 'rgba(255,255,255,0.25)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Card Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover filter brightness-[0.75] transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-[0.9]"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none transition-all duration-500 group-hover:from-black/95" />

                {/* Floating Content Accent */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[9px] font-mono font-bold">4.9</span>
                </div>

                {/* Bottom Text Details */}
                <div className="absolute bottom-6 left-6 text-left space-y-1">
                  <span className="text-[8px] font-mono tracking-[0.25em] text-cyan-400 group-hover:text-amber-400 font-bold uppercase transition-colors">
                    TRENDING DESTINY
                  </span>
                  <h3 className="text-3xl font-sans italic font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform">
                    {dest.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
          </>
          )}
        </div>
      </section>
    </div>
  );
}
