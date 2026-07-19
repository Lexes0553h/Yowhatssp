import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Cpu, Sparkles, Database } from 'lucide-react';
import Magnetic from '../Magnetic';

interface PageProps {
  onClose: () => void;
  onBookNow: () => void;
}

const destinations = [
  {
    title: 'Kyoto Cyber-Alps',
    duration: '5 Nights 6 Days',
    price: '₹1,85,000',
    tag: 'NEURAL CHOICE',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Bora Bora Quantum Villa',
    duration: '6 Nights 7 Days',
    price: '₹2,65,000',
    tag: 'QUANTUM RESONANCE',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Sub-Orbital Aurora Flight',
    duration: '1 Night 2 Days',
    price: '₹9,85,000',
    tag: 'NEURAL FRONTIER',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80'
  }
];

export default function AiTravelPage({ onClose, onBookNow }: PageProps) {
  const [activityProfile, setActivityProfile] = useState<number>(50);
  const [gastronomyBias, setGastronomyBias] = useState<number>(80);
  const [atmosphereResonance, setAtmosphereResonance] = useState<number>(70);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledResult, setCompiledResult] = useState<any | null>(null);

  const handleGenerate = () => {
    setIsCompiling(true);
    setCompiledResult(null);
    setTimeout(() => {
      setIsCompiling(false);
      setCompiledResult({
        destination: activityProfile > 60 ? 'Kyoto Cyber-Alps' : 'Bora Bora Floating Quantum Villa',
        vibe: gastronomyBias > 60 ? 'Hyper-Sensory Molecular Tasting & Zero-Gravity Lounging' : 'Deep Wellness Isolation & Marine Bioluminescent Dining',
        neuralConfidence: '99.78%',
        quantumRoute: 'Direct Private Hypersonic Core Tunnel'
      });
    }, 1200);
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
        <div className="absolute top-[20%] -right-1/4 w-[600px] h-[600px] bg-violet-950/[0.15] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[65%] -left-1/4 w-[600px] h-[600px] bg-indigo-950/[0.12] rounded-full blur-[140px]" />
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
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=90" 
            alt="AI Travel"
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
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-violet-300">
                OUR SPECIALIZATION
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight font-sans font-extrabold text-white select-none leading-[0.95]">
              AI Travel
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic font-light text-neutral-300 tracking-wide">
              Neural Travel Routing & Quantum Resonance Synthesis.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY & PORTFOLIO */}
      <section className="relative min-h-screen w-full flex flex-col justify-between bg-black text-left px-6 md:px-12 py-12 md:py-16">
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-12 mb-8 relative z-10">
          {/* Left Text Narrative & AI Generator Tool */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-neutral-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light font-sans tracking-wide">
              Welcome to the post-itinerary era. We utilize sovereign machine-learning clusters coupled with continuous telemetry feeds from weather patterns, gastronomy tables, and villa availability state. Enjoy instant predictive mapping of your next life chapter.
            </p>

            {/* Interactive Section */}
            <div className="pt-4 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold block">
                QUANTUM RESONANCE ITERATIVE ALIGNER
              </span>

              <div className="p-5 bg-white/[0.01] border border-white/5 rounded-[18px] space-y-5">
                {/* Sliders */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400">ACTIVITY LEVEL</span>
                      <span className="text-violet-400 font-bold">{activityProfile}% Resonance</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={activityProfile}
                      onChange={(e) => setActivityProfile(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400">GASTRONOMY COMPLEXITY</span>
                      <span className="text-violet-400 font-bold">{gastronomyBias}% Sensory</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={gastronomyBias}
                      onChange={(e) => setGastronomyBias(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400">ATMOSPHERIC RESONANCE</span>
                      <span className="text-violet-400 font-bold">{atmosphereResonance}% Seclusion</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={atmosphereResonance}
                      onChange={(e) => setAtmosphereResonance(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isCompiling}
                  className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border-none outline-none"
                >
                  {isCompiling ? (
                    <>
                      <Database className="w-4 h-4 animate-spin text-white" />
                      <span>QUERYING NEURAL MATRICES...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>EXECUTE SYNAPTIC SELECTION</span>
                    </>
                  )}
                </button>

                {/* Result output */}
                {compiledResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl space-y-3 font-mono text-xs text-neutral-300"
                  >
                    <div className="flex justify-between items-center text-violet-400 border-b border-white/5 pb-2">
                      <span className="font-bold flex items-center gap-1"><Cpu className="w-4 h-4" /> MODEL RESPONSE SUCCESS</span>
                      <span>Confidence: {compiledResult.neuralConfidence}</span>
                    </div>
                    <div className="space-y-1">
                      <div><span className="text-white font-bold">Resonance Target:</span> {compiledResult.destination}</div>
                      <div><span className="text-white font-bold">Gastronomy Node:</span> {compiledResult.vibe}</div>
                      <div><span className="text-white font-bold">Core Route:</span> {compiledResult.quantumRoute}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Highlights (DIVISION HIGHLIGHTS box with white bold text items) */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Division Visual" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 rounded-[24px] p-8 shadow-2xl">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-400 block mb-5 uppercase">
                NEURAL CAPABILITIES
              </span>
              <ul className="space-y-4 text-left">
                {[
                  'Instant Model Itinerary Compilation',
                  'Real-Time Private Fleet Matching',
                  'Direct Elite Property Syncing',
                  'Adaptive Weather Optimization'
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
              RESONATED NEURAL CONCEPTS
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
                  whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.3)' }}
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
                    <span className="px-3.5 py-1.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 text-[8px] sm:text-[9px] font-mono tracking-widest font-black uppercase flex items-center justify-center gap-1">
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
            * NEURAL MODELS UPDATED CONTINUOUSLY WITH REAL-TIME MARKET RESERVATION INDICES.
          </span>

          <Magnetic strength={0.25}>
            <button
              onClick={onBookNow}
              className="w-full sm:w-auto bg-gradient-to-r from-violet-300 via-indigo-300 to-amber-200 text-black text-xs font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:shadow-violet-500/15 hover:brightness-105 active:scale-[0.98] transition-all outline-none border-none cursor-pointer"
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
