import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Home, Ship } from 'lucide-react';
import Magnetic from '../Magnetic';

interface PageProps {
  onClose: () => void;
  onBookNow: () => void;
}

const destinations = [
  {
    title: 'Maldives',
    duration: '4 Nights 5 Days',
    price: '₹1,06,500',
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Vietnam',
    duration: '3 Nights 4 Days',
    price: '₹1,09,000',
    originalPrice: '₹1,19,500',
    tag: 'SUPER SAVER',
    discount: '-9%',
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Amalfi Coast',
    duration: '5 Nights 6 Days',
    price: '₹1,85,000',
    tag: 'ULTRA LUXE',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80'
  }
];

export default function LuxuryToursPage({ onClose, onBookNow }: PageProps) {
  const [selectedYacht, setSelectedYacht] = useState('superyacht');
  const [activeTab, setActiveTab] = useState<'villas' | 'yachts'>('villas');

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
        <div className="absolute top-[20%] -right-1/4 w-[600px] h-[600px] bg-purple-950/[0.12] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[65%] -left-1/4 w-[600px] h-[600px] bg-indigo-950/[0.1] rounded-full blur-[140px]" />
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
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=90" 
            alt="Luxury Tours"
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
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-purple-300">
                OUR SPECIALIZATION
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight font-sans font-extrabold text-white select-none leading-[0.95]">
              Luxury Tours
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic font-light text-neutral-300 tracking-wide">
              Exclusive global access.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY & PORTFOLIO */}
      <section className="relative min-h-screen w-full flex flex-col justify-between bg-black text-left px-6 md:px-12 py-12 md:py-16">
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-12 mb-8 relative z-10">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-neutral-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light font-sans tracking-wide">
              We curate bespoke luxury journeys across the world's most exclusive destinations—combining personalized itineraries, premium stays, and unforgettable experiences. From secluded Mediterranean villas to private island escapes, every journey is a masterpiece of comfort and discovery.
            </p>

            {/* Micro Interaction Tab */}
            <div className="pt-4">
              <div className="flex border-b border-white/10 mb-6 max-w-xs">
                <button 
                  onClick={() => setActiveTab('villas')}
                  className={`pb-3 px-4 text-xs font-mono tracking-widest uppercase transition-all bg-transparent border-none cursor-pointer outline-none ${activeTab === 'villas' ? 'text-purple-400 border-b-2 border-purple-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  Villa Selection
                </button>
                <button 
                  onClick={() => setActiveTab('yachts')}
                  className={`pb-3 px-4 text-xs font-mono tracking-widest uppercase transition-all bg-transparent border-none cursor-pointer outline-none ${activeTab === 'yachts' ? 'text-purple-400 border-b-2 border-purple-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  Yacht Charter
                </button>
              </div>

              {activeTab === 'villas' ? (
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-[18px] text-xs space-y-2 text-neutral-300">
                  <div className="flex items-center gap-2 text-white font-mono font-bold"><Home className="w-4 h-4 text-purple-400" /> Private Clifftop Estates</div>
                  <p>Guaranteed absolute view preservation, secluded private infinity pools, on-call personal butler crew, and direct private beach elevators.</p>
                </div>
              ) : (
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-[18px] text-xs space-y-4 text-neutral-300">
                  <div className="flex items-center gap-2 text-white font-mono font-bold"><Ship className="w-4 h-4 text-purple-400" /> Superyacht Options</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Luxe Majesty II', 'Sea Sceptre', 'Aurora Sovereign', 'Midnight Horizon'].map((yachtName) => (
                      <button
                        key={yachtName}
                        onClick={() => setSelectedYacht(yachtName)}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer bg-transparent outline-none ${selectedYacht === yachtName ? 'bg-purple-500/10 border-purple-400 text-white font-semibold' : 'border-white/5 text-neutral-400 hover:border-white/10'}`}
                      >
                        {yachtName}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] italic text-neutral-500 font-mono">Currently Selected: {selectedYacht} (Includes chef, heli-pad access)</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Highlights (DIVISION HIGHLIGHTS box with white bold text items) */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80" alt="Division Visual" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 rounded-[24px] p-8 shadow-2xl">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-400 block mb-5 uppercase">
                DIVISION HIGHLIGHTS
              </span>
              <ul className="space-y-4 text-left">
                {[
                  'Personalized Itineraries',
                  'Premium Property Access',
                  'Luxury Urban Transfers',
                  'Visa Concierge Support'
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
              BEST DESTINATIONS FOR LUXURY TOURS
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
                  whileHover={{ y: -6, borderColor: 'rgba(168,85,247,0.3)' }}
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
                  
                  {/* Top badges custom-styled matching mockup */}
                  <div className="absolute top-5 left-5">
                    <span className={`px-3 py-1.5 rounded-full text-[8px] sm:text-[9px] font-mono tracking-widest font-black uppercase border flex items-center justify-center gap-1 ${
                      dest.tag === 'BESTSELLER' 
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' 
                        : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    }`}>
                      {dest.tag === 'BESTSELLER' ? '★ BESTSELLER' : `🏷️ ${dest.tag}`}
                    </span>
                  </div>

                  {dest.discount && (
                    <div className="absolute top-5 right-5">
                      <span className="w-9 h-9 rounded-full bg-emerald-500 text-black font-sans font-extrabold text-[10px] flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        {dest.discount}
                      </span>
                    </div>
                  )}

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
                      {dest.originalPrice && (
                        <span className="text-neutral-500 line-through text-xs ml-2 font-normal">
                          {dest.originalPrice}
                        </span>
                      )}
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
            * INCLUSIVE OF PRIVATE AIRPORT VIP ENTRANCE AND PRIVATE GROUND CO-TRANSIT.
          </span>

          <Magnetic strength={0.25}>
            <button
              onClick={onBookNow}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-300 via-pink-300 to-amber-200 text-black text-xs font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:shadow-purple-500/15 hover:brightness-105 active:scale-[0.98] transition-all outline-none border-none cursor-pointer"
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
