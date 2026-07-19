import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Heart } from 'lucide-react';
import Magnetic from '../Magnetic';

interface PageProps {
  onClose: () => void;
  onBookNow: () => void;
}

const enhancements = [
  { id: 'seaplane', name: 'Private Seaplane Sunset Sunset', price: '₹75,000', desc: 'A custom sunset flight over secluded coral chains, complete with Krug Rosé.' },
  { id: 'sandbank', name: 'Private Sandbank Candlelight Banquet', price: '₹95,000', desc: 'A dedicated Michelin-starred chef on a completely isolated sandbank under torches.' },
  { id: 'spa', name: 'Couples Volcanic Clay Ritual', price: '₹40,000', desc: 'Indulge in ancient therapeutic massages side-by-side with oceanic breeze.' }
];

const bungalows = [
  { name: 'Sovereign Reef Sanctuary (320 sqm)', pool: '80m Private Pool', glassFloor: 'Integrated Living Room' },
  { name: 'Sunset Lagoon Pavilion (280 sqm)', pool: '65m Infinity Edge', glassFloor: 'Bedroom Under-View' }
];

const destinations = [
  {
    title: 'Maldives Overwater',
    duration: '5 Nights 6 Days',
    price: '₹1,95,000',
    tag: 'ROMANCE EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Bora Bora Overwater',
    duration: '6 Nights 7 Days',
    price: '₹2,35,000',
    tag: 'ULTRA PRIVACY',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Santorini Sunset Loft',
    duration: '5 Nights 6 Days',
    price: '₹1,55,000',
    tag: 'HONEYMOON BEST',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
  }
];

export default function LuxuryHoneymoonsPage({ onClose, onBookNow }: PageProps) {
  const [selectedEnhance, setSelectedEnhance] = useState('seaplane');
  const [activeBungalowIdx, setActiveBungalowIdx] = useState(0);
  const [notes, setNotes] = useState<string[]>(['"The absolute perfect sunset at Bora Bora." - R & A', '"Incredible attention to private detail." - S & M']);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([`"${newNote}" - Custom Guest`, ...notes]);
    setNewNote('');
  };

  const currentEnhance = enhancements.find(e => e.id === selectedEnhance) || enhancements[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-screen bg-[#000000] text-white relative pb-24"
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] -right-1/4 w-[600px] h-[600px] bg-purple-950/[0.1] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[65%] -left-1/4 w-[600px] h-[600px] bg-rose-950/[0.12] rounded-full blur-[140px]" />
      </div>

      {/* FIXED FLOATING BRAND CAPSULE HEADER & CLOSE BUTTON */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center pointer-events-none">
        <div></div>

        <div className="pointer-events-auto">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-neutral-900 hover:scale-105 transition-all shadow-lg cursor-pointer outline-none border-none"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* SECTION 1: IMMERSIVE HERO */}
      <section className="relative min-h-[50vh] w-full flex flex-col items-start justify-center pb-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, filter: 'brightness(0.25) saturate(0.9)' }}
            animate={{ scale: 1, filter: 'brightness(0.3) saturate(1.1)' }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=90" 
            alt="Luxury Honeymoons"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col text-left">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-pink-300">
                OUR SPECIALIZATION
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight font-sans font-extrabold text-white select-none leading-[0.95]">
              Honeymoons
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic font-light text-neutral-300 tracking-wide">
              Eternal Romance & Sovereign Seclusion.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY & PORTFOLIO */}
      <section className="relative min-h-screen w-full flex flex-col justify-between bg-black text-left px-6 md:px-12 py-12 md:py-16">
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-12 mb-8 relative z-10">
          {/* Left Text Narrative & Romance Customizations */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-neutral-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light font-sans tracking-wide">
              Celebrate your eternal journey together in the world's most intimate sanctuaries. From private overwater reef palaces to candlelit rainforest summits, every detail is engineered to preserve absolute privacy and curate breathtaking romantic milestones.
            </p>

            {/* Micro Interaction: Romance Enhancements */}
            <div className="pt-4 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold block">
                CHOOSE ROMANTIC MILESTONE ACCENTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {enhancements.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setSelectedEnhance(e.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer bg-transparent outline-none ${selectedEnhance === e.id ? 'bg-pink-500/10 border-pink-400 text-white font-semibold shadow-lg shadow-pink-950/25' : 'border-white/5 text-neutral-400 hover:border-white/10'}`}
                  >
                    <span className="text-[10px] font-mono block text-pink-300 font-bold mb-1">{e.price}</span>
                    <span className="text-xs leading-tight font-sans block font-semibold">{e.name}</span>
                  </button>
                ))}
              </div>

              {/* Enhanced Info HUD */}
              <div className="p-5 bg-white/[0.01] border border-white/5 rounded-[18px] space-y-4">
                <div className="font-mono text-xs text-neutral-300">
                  <span className="text-pink-300 font-bold uppercase">DESCRIPTION:</span> {currentEnhance.desc}
                </div>

                {/* Bungalow Viewer */}
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-400 block mb-3">
                    OVERWATER BUNGALOW LAYOUTS
                  </span>
                  <div className="flex gap-2 mb-3">
                    {bungalows.map((b, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveBungalowIdx(i)}
                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono tracking-wider transition-all cursor-pointer bg-transparent outline-none ${activeBungalowIdx === i ? 'bg-pink-500/10 border-pink-400 text-white font-bold' : 'border-white/5 text-neutral-400'}`}
                      >
                        Bungalow {i + 1}
                      </button>
                    ))}
                  </div>
                  <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-neutral-300 space-y-1">
                    <div><span className="text-pink-300 font-bold">Model:</span> {bungalows[activeBungalowIdx].name}</div>
                    <div><span className="text-pink-300 font-bold">Pool:</span> {bungalows[activeBungalowIdx].pool}</div>
                    <div><span className="text-pink-300 font-bold">Glass Floor:</span> {bungalows[activeBungalowIdx].glassFloor}</div>
                  </div>
                </div>

                {/* Guest Wishes Wall */}
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-400 block mb-3">
                    COUPLES COMPLIMENTARY GUEST BOOK
                  </span>
                  <form onSubmit={handleAddNote} className="flex gap-2 mb-3">
                    <input 
                      type="text"
                      placeholder="Add custom romantic wish..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 text-xs font-mono text-white placeholder-neutral-600 outline-none focus:border-pink-400 transition-all"
                    />
                    <button 
                      type="submit"
                      className="bg-pink-500/20 border border-pink-500/30 text-pink-300 px-4 py-2 rounded-xl text-xs font-mono font-bold hover:bg-pink-500/30 active:scale-95 transition-all outline-none cursor-pointer"
                    >
                      Post Wish
                    </button>
                  </form>
                  <div className="space-y-1.5">
                    {notes.slice(0, 2).map((note, idx) => (
                      <div key={idx} className="text-[11px] font-mono italic text-neutral-400 border-l-2 border-pink-500/30 pl-3">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights (DIVISION HIGHLIGHTS box with white bold text items) */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80" alt="Division Visual" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 rounded-[24px] p-8 shadow-2xl">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-400 block mb-5 uppercase">
                DIVISION HIGHLIGHTS
              </span>
              <ul className="space-y-4 text-left">
                {[
                  'Bespoke Romantic Accents',
                  'Royal VIP Flight Upgrade',
                  'Secluded Beach Overwater Villas',
                  '24/7 Butler & Yacht Crew',
                  'Premium Champagne & Caviar Cellar'
                ].map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-neutral-200 text-xs sm:text-sm font-medium tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <span className="text-white font-sans font-bold">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full max-w-7xl mx-auto border-t border-white/10 my-10" />

        {/* Catalog Section */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 font-bold uppercase">
              SECLUDED COVE SANCTUARIES
            </span>
            <span className="px-4 py-1.5 rounded-full border border-white/15 text-[8px] sm:text-[9px] text-neutral-300 font-mono tracking-widest font-semibold bg-white/5 uppercase">
              LIVE CATALOG
            </span>
          </div>

          <div className="overflow-x-auto pb-4 scrollbar-none">
            <div className="flex gap-6 min-w-max px-1">
              {destinations.map((dest, idx) => (
                <motion.div
                  key={idx}
                  className="relative w-[300px] sm:w-[350px] aspect-[4/3] rounded-[24px] overflow-hidden border border-white/10 shadow-xl group cursor-pointer"
                  whileHover={{ y: -6, borderColor: 'rgba(236,72,153,0.3)' }}
                  transition={{ duration: 0.3 }}
                  onClick={onBookNow}
                >
                  <img loading="lazy" decoding="async" 
                    src={dest.image} 
                    alt={dest.title}
                    className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.8] group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="px-3.5 py-1.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30 text-[8px] sm:text-[9px] font-mono tracking-widest font-black uppercase flex items-center justify-center gap-1">
                      ★ {dest.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight mb-1">
                      {dest.title}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400 block tracking-widest uppercase mb-3">
                      {dest.duration}
                    </span>
                    <div className="flex items-baseline gap-1 text-white font-mono text-sm font-bold">
                      <span className="text-neutral-400 font-normal text-xs mr-1">From</span>
                      <span className="text-xl sm:text-2xl font-black">{dest.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Bar Footer */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 mt-12">
          <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-500 uppercase font-medium">
            * HONEYMOON DEPARTURES AUTOMATICALLY CO-TRIGGER ROYAL VIP FLIGHT STATUS.
          </span>

          <Magnetic strength={0.25}>
            <button
              onClick={onBookNow}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 text-black text-xs font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:shadow-pink-500/15 hover:brightness-105 active:scale-[0.98] transition-all outline-none border-none cursor-pointer"
            >
              <span>Initiate Concierge Consultation</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </Magnetic>
        </div>

      </section>
    </motion.div>
  );
}
