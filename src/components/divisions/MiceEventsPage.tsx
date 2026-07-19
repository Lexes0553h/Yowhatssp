import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Cpu } from 'lucide-react';
import Magnetic from '../Magnetic';

interface PageProps {
  onClose: () => void;
  onBookNow: () => void;
}

const destinations = [
  {
    title: 'Swiss Alps Boardroom',
    duration: '3 Nights 4 Days',
    price: '₹2,65,000',
    tag: 'SUMMIT EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Amalfi Corporate Offsite',
    duration: '4 Nights 5 Days',
    price: '₹3,05,000',
    tag: 'RETREAT EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Castle Buyout Scotland',
    duration: '4 Nights 5 Days',
    price: '₹4,25,000',
    tag: 'SOVEREIGN PRIVATE',
    image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80'
  }
];

export default function MiceEventsPage({ onClose, onBookNow }: PageProps) {
  const [delegates, setDelegates] = useState<number>(30);
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'encrypted' | 'sovereign'>('encrypted');
  const [hasAvStage, setHasAvStage] = useState(true);

  // Estimator calculation
  const baseCostPerDelegate = 15000; // in INR
  const multiplier = securityLevel === 'standard' ? 1 : securityLevel === 'encrypted' ? 1.4 : 2.1;
  const avCost = hasAvStage ? 150000 : 0;
  const calculatedEstimate = Math.round((delegates * baseCostPerDelegate * multiplier) + avCost);

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
        <div className="absolute top-[20%] -right-1/4 w-[600px] h-[600px] bg-blue-950/[0.12] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[65%] -left-1/4 w-[600px] h-[600px] bg-slate-950/[0.1] rounded-full blur-[140px]" />
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
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=90" 
            alt="MICE Events"
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
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-blue-300">
                OUR SPECIALIZATION
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight font-sans font-extrabold text-white select-none leading-[0.95]">
              MICE Events
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic font-light text-neutral-300 tracking-wide">
              Sovereign Boardrooms, Global Summits, & Enterprise Buyouts.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY & PORTFOLIO */}
      <section className="relative min-h-screen w-full flex flex-col justify-between bg-black text-left px-6 md:px-12 py-12 md:py-16">
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-12 mb-8 relative z-10">
          {/* Left Text Narrative & Estimator Interactive Tool */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-neutral-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light font-sans tracking-wide">
              We orchestrate world-class corporate offsites, annual general assemblies, and highly confidential investor retreats. Combining deep physical security, encrypted satellite networks, and magnificent castle or island takeovers to build cohesive corporate power.
            </p>

            {/* Interactive Tool: Summit Estimator */}
            <div className="pt-4 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold block">
                INTERACTIVE SUMMIT BUILDER & BUDGET CALCULATOR
              </span>

              <div className="p-5 bg-white/[0.01] border border-white/5 rounded-[18px] space-y-5">
                {/* 1. Delegate Count */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-neutral-400 uppercase font-semibold">DELEGATES & VIPS</span>
                    <span className="text-blue-400 font-black">{delegates} DELEGATES</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="150" 
                    value={delegates}
                    onChange={(e) => setDelegates(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* 2. Encryption/Security toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'standard', name: 'Standard VIP Secure', price: 'Base pricing' },
                    { id: 'encrypted', name: 'Symmetric Jamming', price: '+40% Tech Levy' },
                    { id: 'sovereign', name: 'Private Airspace Block', price: '+110% Military Gradeed' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSecurityLevel(s.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer bg-transparent outline-none ${securityLevel === s.id ? 'bg-blue-500/10 border-blue-400 text-white font-semibold' : 'border-white/5 text-neutral-400 hover:border-white/10'}`}
                    >
                      <span className="text-[9px] font-mono block text-blue-300 mb-0.5 font-bold">{s.price}</span>
                      <span className="text-[11px] leading-tight block font-sans">{s.name}</span>
                    </button>
                  ))}
                </div>

                {/* 3. Stage Toggle */}
                <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-neutral-300 font-sans">Full Holographic AV Stage Setup</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={hasAvStage} 
                    onChange={(e) => setHasAvStage(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-500 bg-white/5 border-white/10 cursor-pointer"
                  />
                </div>

                {/* Cost estimate layout */}
                <div className="border-t border-white/5 pt-4 flex justify-between items-center font-mono">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">ESTIMATED EXPENDITURE</span>
                    <span className="text-xs text-neutral-500">Includes gourmet dining and local yacht shuttle</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-400">₹{calculatedEstimate.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights (DIVISION HIGHLIGHTS box with white bold text items) */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" alt="Division Visual" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 rounded-[24px] p-8 shadow-2xl">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-400 block mb-5 uppercase">
                ENTERPRISE CAPABILITIES
              </span>
              <ul className="space-y-4 text-left">
                {[
                  'Bilateral Non-Disclosure Compliance',
                  'Dedicated Live Translation Scribes',
                  'Sovereign Castle buyouts',
                  'Premium Aviation Support'
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
              ELITE OFF-SITE SUMMIT PLACES
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
                  whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.3)' }}
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
                    <span className="px-3.5 py-1.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[8px] sm:text-[9px] font-mono tracking-widest font-black uppercase flex items-center justify-center gap-1">
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
            * SECURITY ADVISORY AUDITS MANDATORILY FILED 14 DAYS IN ADVANCE.
          </span>

          <Magnetic strength={0.25}>
            <button
              onClick={onBookNow}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-300 via-sky-300 to-slate-200 text-black text-xs font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:shadow-blue-500/15 hover:brightness-105 active:scale-[0.98] transition-all outline-none border-none cursor-pointer"
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
