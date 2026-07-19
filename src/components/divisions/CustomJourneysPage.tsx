import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Compass, Sparkles, Feather, Eye } from 'lucide-react';
import Magnetic from '../Magnetic';

interface PageProps {
  onClose: () => void;
  onBookNow: () => void;
}

const customPillars = [
  { id: 'heritage', title: 'Ancient Heritage', desc: 'Private archaeological access, Vatican after-hours, or ancient temple stays.' },
  { id: 'culinary', title: 'Hyper-Local Gastronomy', desc: 'Foraging with 3-starred chefs, vineyard takeovers, volcanic cooking.' },
  { id: 'nature', title: 'Untamed Sanctuaries', desc: 'Private reserve tracking, cloudforest canopy, deep marine research.' },
  { id: 'spiritual', title: 'Spiritual Ascendance', desc: 'Closed-door monastic sessions, private hot springs, silent mountain stays.' }
];

const destinations = [
  {
    title: 'Egyptian Silk Road Trace',
    duration: '8 Nights 9 Days',
    price: '₹2,55,000',
    tag: 'HISTORIC ARCHIVE',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Private Bhutanese Kingdom',
    duration: '6 Nights 7 Days',
    price: '₹2,85,000',
    tag: 'KINGDOM EXCLUSIVITY',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Patagonian Ice Glamping',
    duration: '7 Nights 8 Days',
    price: '₹2,45,000',
    tag: 'GLACIER SANCTUARY',
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=600&q=80'
  }
];

export default function CustomJourneysPage({ onClose, onBookNow }: PageProps) {
  const [selectedPillar, setSelectedPillar] = useState('heritage');
  const [dreamLog, setDreamLog] = useState('');
  const [showItinerary, setShowItinerary] = useState(false);

  const activePillarObj = customPillars.find(p => p.id === selectedPillar) || customPillars[0];

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    setShowItinerary(true);
  };

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
        <div className="absolute top-[20%] -right-1/4 w-[600px] h-[600px] bg-amber-950/[0.12] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[65%] -left-1/4 w-[600px] h-[600px] bg-neutral-950/[0.1] rounded-full blur-[140px]" />
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
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=90" 
            alt="Custom Journeys"
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
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-amber-300">
                OUR SPECIALIZATION
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight font-sans font-extrabold text-white select-none leading-[0.95]">
              Custom Journeys
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic font-light text-neutral-300 tracking-wide">
              The ultimate blank canvas. You dream, we orchestrate.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY & PORTFOLIO */}
      <section className="relative min-h-screen w-full flex flex-col justify-between bg-black text-left px-6 md:px-12 py-12 md:py-16">
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-12 mb-8 relative z-10">
          {/* Left Text Narrative & Blank Canvas Builder */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-neutral-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light font-sans tracking-wide">
              No templates, no pre-designed paths, no compromises. We begin with a completely blank canvas—your desires, aspirations, and interests. Our master planners consult historic archives, private curators, and elite networks to turn your personal folklore into reality.
            </p>

            {/* Interactive Blank Canvas Story Board */}
            <div className="pt-4 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold block">
                CHOOSE AN ANCHOR PILLAR OF EXPERIENCE
              </span>
              <div className="grid grid-cols-2 gap-3">
                {customPillars.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPillar(p.id);
                      setShowItinerary(false);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer bg-transparent outline-none ${selectedPillar === p.id ? 'bg-amber-500/10 border-amber-400 text-white font-semibold' : 'border-white/5 text-neutral-400 hover:border-white/10'}`}
                  >
                    <span className="text-xs font-bold font-sans block mb-1 text-amber-200">{p.title}</span>
                    <span className="text-[10px] leading-tight block text-neutral-400 font-mono italic">{p.desc.substring(0, 52)}...</span>
                  </button>
                ))}
              </div>

              {/* Blank Canvas Input */}
              <div className="p-5 bg-white/[0.01] border border-white/5 rounded-[18px] space-y-4">
                <div className="flex items-center gap-2 text-sm text-neutral-200 font-bold font-serif italic">
                  <Feather className="w-4 h-4 text-amber-400" /> Write Your Custom Odyssey Spec
                </div>
                
                <form onSubmit={handleCompile} className="space-y-3">
                  <textarea 
                    value={dreamLog}
                    onChange={(e) => {
                      setDreamLog(e.target.value);
                      setShowItinerary(false);
                    }}
                    placeholder="e.g., I want to trace the historic silk road in Western China on vintage rail cars, then arrange a private dining dome with ancient classical musicians..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-400 text-white min-h-[90px] font-sans placeholder-neutral-600"
                  />
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-mono font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border-none outline-none">
                    <Sparkles className="w-4 h-4" /> Assemble My Custom Itinerary Matrix
                  </button>
                </form>

                {showItinerary && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-amber-500/5 border border-amber-400/20 rounded-xl space-y-3 text-left"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono font-bold uppercase tracking-wider">
                      <Eye className="w-3.5 h-3.5" /> PROPOSED ITINERARY CONTEXT
                    </div>
                    <div className="space-y-2 text-xs text-neutral-300">
                      <p className="font-semibold text-white">Pillar Core: {activePillarObj.title}</p>
                      <p className="italic text-neutral-400">"{dreamLog || 'Bespoke high luxury exploration throughout remote vistas.'}"</p>
                      <div className="border-t border-white/5 pt-2 font-mono text-[10px] text-amber-400">
                        ⚡ Status: Dynamic context compiled. Ready for private jet and butler roster matching.
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Highlights (DIVISION HIGHLIGHTS box with white bold text items) */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80" alt="Division Visual" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 rounded-[24px] p-8 shadow-2xl">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-400 block mb-5 uppercase">
                CRAFT PILLARS
              </span>
              <ul className="space-y-4 text-left">
                {[
                  'Zero-Template Assembly',
                  'Vetted Historians & Scholars',
                  'Sovereign-Level Security',
                  'Private Museum & Gallery Buyouts'
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
              REVERED HISTORICAL INSPIRATIONS
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
                  whileHover={{ y: -6, borderColor: 'rgba(245,158,11,0.3)' }}
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
                    <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[8px] sm:text-[9px] font-mono tracking-widest font-black uppercase flex items-center justify-center gap-1">
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
            * ARCHIVAL RESEARCH AND EMBASSY PROTOCOL SERVICES INCLUDED BY DEFAULT.
          </span>

          <Magnetic strength={0.25}>
            <button
              onClick={onBookNow}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200 text-black text-xs font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:shadow-amber-500/15 hover:brightness-105 active:scale-[0.98] transition-all outline-none border-none cursor-pointer"
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
