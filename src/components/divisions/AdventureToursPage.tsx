import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, ArrowRight, Compass, Flame, Wind, Heart } from 'lucide-react';
import Magnetic from '../Magnetic';

interface PageProps {
  onClose: () => void;
  onBookNow: () => void;
}

const adventures = [
  {
    id: 'antarctica',
    name: 'South Pole Expedition',
    temp: '-32°C',
    altitude: '2,835 m',
    gear: ['Full Polar Thermal Parka Level IV', 'Sat-Link Comm Collar', 'Heated Inner Boots'],
    difficulty: 'Extreme/Elite'
  },
  {
    id: 'everest',
    name: 'Everest Heli-Ski Camp',
    temp: '-24°C',
    altitude: '5,364 m',
    gear: ['Altitude Oxygen Rig System II', 'Carbon composite heating skis', 'RECCO rescue beacons'],
    difficulty: 'Ultra/Professional'
  },
  {
    id: 'mariana',
    name: 'Deep Trench Abyss Dive',
    temp: '2°C',
    altitude: '-10,928 m',
    gear: ['Atmospheric diving hull suit', 'O2 scrubbers', 'Bioluminescence high beam'],
    difficulty: 'Astronaut Level'
  }
];

const destinations = [
  {
    title: 'Antarctica South Pole',
    duration: '11 Nights 12 Days',
    price: '₹3,45,000',
    tag: 'EXPLORER PLUS',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Himalayan Heli-Ski',
    duration: '7 Nights 8 Days',
    price: '₹2,65,000',
    tag: 'EXTREME SKI',
    image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Iceland Volcanic Caves',
    duration: '6 Nights 7 Days',
    price: '₹1,95,000',
    tag: 'SUB-ZERO TOURS',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80'
  }
];

export default function AdventureToursPage({ onClose, onBookNow }: PageProps) {
  const [selectedAdvId, setSelectedAdvId] = useState('antarctica');
  const activeAdv = adventures.find(a => a.id === selectedAdvId) || adventures[0];

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
        <div className="absolute top-[20%] -right-1/4 w-[600px] h-[600px] bg-emerald-950/[0.12] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[65%] -left-1/4 w-[600px] h-[600px] bg-teal-950/[0.08] rounded-full blur-[140px]" />
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
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90" 
            alt="Adventure Tours"
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
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-emerald-300">
                OUR SPECIALIZATION
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight font-sans font-extrabold text-white select-none leading-[0.95]">
              Adventure
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic font-light text-neutral-300 tracking-wide">
              Extreme wilderness meets hyper-luxe survival comforts.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY & PORTFOLIO */}
      <section className="relative min-h-screen w-full flex flex-col justify-between bg-black text-left px-6 md:px-12 py-12 md:py-16">
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-12 mb-8 relative z-10">
          {/* Left Text Narrative & Interactive Altitude Widget */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-neutral-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light font-sans tracking-wide">
              Challenge yourself at the boundaries of human endurance without sacrificing the finest standards of luxury. We design ultra-custom expeditions utilizing expert high-altitude mountaineers, military-grade private satellite tracking networks, and climate-controlled luxury dome basecamps.
            </p>

            {/* Interactive Selector */}
            <div className="pt-4 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold block">
                RIGGING & GEOMAPPING INTERACTIVE TELEMETRY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {adventures.map((adv) => (
                  <button
                    key={adv.id}
                    onClick={() => setSelectedAdvId(adv.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer bg-transparent outline-none ${selectedAdvId === adv.id ? 'bg-emerald-500/10 border-emerald-400 text-white font-semibold shadow-lg shadow-emerald-950/25' : 'border-white/5 text-neutral-400 hover:border-white/10'}`}
                  >
                    <span className="text-[10px] font-mono block text-emerald-300 font-bold mb-1">TERRAIN</span>
                    <span className="text-xs leading-tight font-sans block font-semibold">{adv.name}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Telemetry HUD */}
              <div className="p-5 bg-white/[0.01] border border-white/5 rounded-[18px] space-y-4 font-sans">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-200 font-bold font-mono">
                    <Compass className="w-4 h-4 text-emerald-400 animate-spin" /> LIVE EXPEDITION STATS
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {activeAdv.difficulty}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <span className="text-[9px] font-mono text-neutral-400 block mb-1">ATMOSPHERIC TEMP</span>
                    <span className="text-lg font-mono font-black text-rose-300 flex items-center gap-1">
                      <Flame className="w-4 h-4 text-emerald-400" /> {activeAdv.temp}
                    </span>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <span className="text-[9px] font-mono text-neutral-400 block mb-1">RELATIVE ALTITUDE</span>
                    <span className="text-lg font-mono font-black text-sky-300 flex items-center gap-1">
                      <Wind className="w-4 h-4 text-sky-400 animate-pulse" /> {activeAdv.altitude}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-3 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col justify-center">
                    <span className="text-[9px] font-mono text-neutral-400 block mb-1">HEALTH & O2 TARGET</span>
                    <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> 100% SECURE
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">DEPLOYED SYSTEM CONFIGS</span>
                  <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">
                    {activeAdv.gear.map((g, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights (DIVISION HIGHLIGHTS box with white bold text items) */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80" alt="Division Visual" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 rounded-[24px] p-8 shadow-2xl">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-400 block mb-5 uppercase">
                SURVIVAL PROTOCOLS
              </span>
              <ul className="space-y-4 text-left">
                {[
                  'Certified Elite Sherpa Leads',
                  'Military Satellite Tracking HUD',
                  'Climate-Controlled Geodesic Pods',
                  'Dedicated Air Ambulance Extraction'
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
              HIGH-INTENSITY WILDERNESS EXPEDITIONS
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
                  whileHover={{ y: -6, borderColor: 'rgba(16,185,129,0.3)' }}
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
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[8px] sm:text-[9px] font-mono tracking-widest font-black uppercase flex items-center justify-center gap-1">
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
            * MEDICAL CLEARANCE AND PRE-DEPARTURE FITNESS AUDIT MANDATORILY INCLUDED.
          </span>

          <Magnetic strength={0.25}>
            <button
              onClick={onBookNow}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-200 text-black text-xs font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:shadow-emerald-500/15 hover:brightness-105 active:scale-[0.98] transition-all outline-none border-none cursor-pointer"
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
