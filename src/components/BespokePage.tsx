import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MapPin, Star, Compass, Sparkles, Crown, ArrowRight, 
  Plane, ShieldCheck, Check, Camera, Sun, Wind, Droplets, 
  Thermometer, Clock, Volume2, VolumeX, ChevronRight, Play, Pause, Calendar
} from 'lucide-react';
import { curatedDestinations } from '../data';
import Magnetic from './Magnetic';

interface BespokePageProps {
  isOpen: boolean;
  destId: 'bali' | 'maldives' | 'vietnam';
  onClose: () => void;
  onBookNow: () => void;
}

// Web Audio API Synthesizer for high-fidelity ambient relaxation
class BespokeSoundscape {
  private ctx: AudioContext | null = null;
  private nodes: AudioNode[] = [];
  private intervalId: any = null;

  constructor(private type: 'bali' | 'maldives' | 'vietnam') {}

  start() {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime); // Gentle ambient background volume
      masterGain.connect(this.ctx.destination);

      if (this.type === 'maldives') {
        // Maldives: Ocean Waves & Tropical Breezes
        const bufferSize = this.ctx.sampleRate * 5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut * 0.98) + (white * 0.02);
          lastOut = data[i];
        }

        const noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = buffer;
        noiseNode.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, this.ctx.currentTime);

        const waveGain = this.ctx.createGain();
        waveGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

        noiseNode.connect(filter);
        filter.connect(waveGain);
        waveGain.connect(masterGain);
        noiseNode.start();
        this.nodes.push(noiseNode);

        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 second wave cycles

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        this.nodes.push(lfo);

      } else if (this.type === 'bali') {
        // Bali: Deep Temple Gong & Jungle Singing Bowls
        const drone = this.ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(110, this.ctx.currentTime);

        const droneGain = this.ctx.createGain();
        droneGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        drone.connect(droneGain);
        droneGain.connect(masterGain);
        drone.start();
        this.nodes.push(drone);

        const playTempleBowl = () => {
          if (!this.ctx || this.ctx.state === 'closed') return;
          const chords = [220, 277.18, 329.63, 440];
          const freq = chords[Math.floor(Math.random() * chords.length)];

          const bowl = this.ctx.createOscillator();
          bowl.type = 'sine';
          bowl.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.5);

          bowl.connect(gain);
          gain.connect(masterGain);
          bowl.start();
          bowl.stop(this.ctx.currentTime + 4.7);
        };

        playTempleBowl();
        this.intervalId = setInterval(playTempleBowl, 3600);

      } else if (this.type === 'vietnam') {
        // Vietnam: Ethereal Bamboo Flute & Peaceful Winds
        const wind = this.ctx.createOscillator();
        wind.type = 'sine';
        wind.frequency.setValueAtTime(147, this.ctx.currentTime);

        const windGain = this.ctx.createGain();
        windGain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        wind.connect(windGain);
        windGain.connect(masterGain);
        wind.start();
        this.nodes.push(wind);

        const playMountainFlute = () => {
          if (!this.ctx || this.ctx.state === 'closed') return;
          const pentatonicScale = [293.66, 329.63, 392.00, 440.00, 523.25];
          const freq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];

          const flute = this.ctx.createOscillator();
          flute.type = 'sine';
          flute.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const vibrato = this.ctx.createOscillator();
          vibrato.frequency.setValueAtTime(5.5, this.ctx.currentTime);
          const vibratoGain = this.ctx.createGain();
          vibratoGain.gain.setValueAtTime(3.5, this.ctx.currentTime);
          vibrato.connect(vibratoGain);
          vibratoGain.connect(flute.frequency);
          vibrato.start();

          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.0);

          flute.connect(gain);
          gain.connect(masterGain);
          flute.start();
          vibrato.stop(this.ctx.currentTime + 4.2);
          flute.stop(this.ctx.currentTime + 4.2);
        };

        playMountainFlute();
        this.intervalId = setInterval(playMountainFlute, 4500);
      }
    } catch (e) {
      console.warn("Web Audio API blocked: ", e);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.nodes.forEach(node => {
      try { (node as any).stop(); } catch (e) {}
    });
    if (this.ctx) {
      try { this.ctx.close(); } catch (e) {}
    }
  }
}

// Metadata for Bali, Maldives, and Vietnam
const bespokeMeta: Record<string, {
  timezoneLabel: string;
  weatherStats: { temp: string; humidity: string; waterTemp: string; uniqueMetric: string; uniqueMetricValue: string };
  upgrades: { id: string; label: string; price: number; rupeePrice: number; desc: string }[];
  itinerary: { day: number; title: string; subtitle: string; desc: string; image: string; icon: string }[];
  rupeePriceText: string;
  rupeePriceValue: number;
  bestForPills: string[];
  manifestBreakdown: { base: number; flights: number; taxes: number; total: number; note: string; isFlightIncluded?: boolean };
}> = {
  bali: {
    timezoneLabel: 'BALI TIME • UTC+8',
    weatherStats: { temp: '29°C', humidity: '76%', waterTemp: '28°C', uniqueMetric: 'Temple Vista', uniqueMetricValue: '9.8km Clear' },
    upgrades: [
      { id: 'temple-suite', label: 'Clifftop Private Temple Suite Upgrade', price: 950, rupeePrice: 78000, desc: 'Perched on high Uluwatu cliffs with dedicated stone sanctuary & infinity pool' },
      { id: 'heli-volcano', label: 'Helicopter Volcanic Dawn Safari', price: 1200, rupeePrice: 98000, desc: 'A stunning sunrise helicopter flight over active Mt. Batur & volcanic lakes' },
      { id: 'priestess-blessing', label: 'High Priestess Cavern Blessing', price: 450, rupeePrice: 36000, desc: 'A private purification water ceremony inside a secret jungle river cavern' },
      { id: 'rolls-chauffeur', label: '24/7 Vintage Rolls-Royce Steward', price: 600, rupeePrice: 49000, desc: 'Fully stocked vintage Rolls-Royce with a dedicated personal butler-chauffeur' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Sacred Cavern Cleansing',
        subtitle: 'THE ASCENT',
        desc: 'Settle into your spectacular clifftop estate before your personal butler escorts you to a hidden temple river canyon. Indulge in an ancient, candle-lit purification water ceremony guided by a high priestess. Savor an organic culinary welcome overlooking deep emerald valleys.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        icon: 'Sparkles'
      },
      {
        day: 2,
        title: 'Dawn Peak Safari & Bamboo Sound Bath',
        subtitle: 'SOUL RESONANCE',
        desc: 'Board your private helicopter for a breathtaking sunrise flyover of Mount Batur and its mist-covered caldera. In the afternoon, realign your absolute frequency with a professional sound bath inside Ubud\'s private acoustic bamboo dome, nestled among rice field terraces.',
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
        icon: 'Compass'
      },
      {
        day: 3,
        title: 'Michelin Culinary Arts & Lost Temples',
        subtitle: 'ROYAL HEIRLOOMS',
        desc: 'Craft a masterfully custom local menu under the guidance of a Michelin-starred chef using mountain-harvested organic botanicals. Spend your sunset with VIP front-row seating at Uluwatu\'s clifftop fire dance, complete with private temple grounds access.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        icon: 'Crown'
      },
      {
        day: 4,
        title: 'Secret Chasms & Sacred Keepsakes',
        subtitle: 'THE RETURN',
        desc: 'Trek into deep rainforest paths to swim inside secret waterfalls. Your vintage chauffeur-driven vehicle will escort you back to the VIP hangar lounge for your departures. Receive hand-tailored silver keepsakes to commemorate your spiritual sanctuary.',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
        icon: 'Plane'
      }
    ],
    rupeePriceText: '₹82,950',
    rupeePriceValue: 82950,
    bestForPills: ['SACRED TEMPLES', 'WELLNESS RETREATS', 'FAMILY SANCTUARIES'],
    manifestBreakdown: {
      base: 68500,
      flights: 10500,
      taxes: 3950,
      total: 82950,
      note: 'PER PERSON • INCL. TAX + FLIGHT EST.'
    }
  },
  maldives: {
    timezoneLabel: 'MALE TIME • UTC+5',
    weatherStats: { temp: '31°C', humidity: '70%', waterTemp: '29°C', uniqueMetric: 'Lagoon Clarity', uniqueMetricValue: '99% Perfect' },
    upgrades: [
      { id: 'overwater-pavilion', label: 'Presidential Overwater Pavilion Upgrade', price: 1850, rupeePrice: 150000, desc: 'Ultra-exclusive 400sqm overwater villa with private lap pool, waterslide, & glass floor' },
      { id: 'superyacht-cruise', label: 'Chartered 80ft Superyacht Day Cruise', price: 3500, rupeePrice: 280000, desc: 'Full-day voyage with dedicated captain, crew, custom menus, water slides, & seabobs' },
      { id: 'undersea-wine', label: 'Undersea Private Wine Degustation', price: 1100, rupeePrice: 90000, desc: '6-course tasting menu paired with rare vintages, 5 meters below the ocean surface' },
      { id: 'marine-project', label: 'Coral Propagation with Marine Biologist', price: 400, rupeePrice: 32000, desc: 'Adopt & plant a personalized coral frame on your villa reef with GPS tracking coordinates' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'VIP Seaplane Arrival & Yacht Cruise',
        subtitle: 'AQUATIC ENTRANCE',
        desc: 'Arrive via private seaplane directly to your overwater dock. Board a private 80ft superyacht for an exclusive sunset cruise accompanied by free-flowing champagne, chilled caviar, and a personal acoustic harpist playing as the sun dips beneath the horizon.',
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
        icon: 'Plane'
      },
      {
        day: 2,
        title: 'Deep-Sea Submarine & Coral Nurseries',
        subtitle: 'THE DEEPS',
        desc: 'Descend to deep reef walls in a state-of-the-art private luxury submarine to view rare bioluminescent corals and schools of hammerheads. Return to your villa for a private, hands-on coral propagation workshop with our resident marine biologist.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        icon: 'Compass'
      },
      {
        day: 3,
        title: 'Sandbank Sanctuary & Celestial Dining',
        subtitle: 'PURE SERENITY',
        desc: 'Spend the afternoon on a pristine, tide-emerging private sandbank with a custom-built luxury spa tent and continuous therapeutic care. As night falls, savor a magnificent gourmet fire-pit barbecue prepared solely for you under the Milky Way.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        icon: 'Crown'
      },
      {
        day: 4,
        title: 'Bioluminescent Dawn & CIP Farewell',
        subtitle: 'THE DEPARTURE',
        desc: 'Take a final dawn swim through bioluminescent plankton before boarding a fast-track speed launch to the international CIP departure terminal, completely bypassed from standard airport queues. Return home fully restored.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
        icon: 'Sparkles'
      }
    ],
    rupeePriceText: '₹1,06,500',
    rupeePriceValue: 106500,
    bestForPills: ['LUXURY HONEYMOONS', 'LUXURY TOURS', 'GROUP TRIPS'],
    manifestBreakdown: {
      base: 90000,
      flights: 12000,
      taxes: 4500,
      total: 106500,
      note: 'PER PERSON • INCL. TAX + FLIGHT EST.'
    }
  },
  vietnam: {
    timezoneLabel: 'HANOI TIME • UTC+7',
    weatherStats: { temp: '28°C', humidity: '82%', waterTemp: '27°C', uniqueMetric: 'Karst Mist Vibe', uniqueMetricValue: 'Highly Ethereal' },
    upgrades: [
      { id: 'imperial-citadel', label: 'Imperial Suite at Hue Royal Citadel', price: 850, rupeePrice: 69000, desc: 'Restored royal guest suite with hand-carved mahogany furniture & secret palace gardens' },
      { id: 'seaplane-halong', label: 'Chartered Seaplane Low-Altitude Flight', price: 1400, rupeePrice: 115000, desc: 'Breathtaking low-altitude flight over karst pillars with beautiful water takeoffs' },
      { id: 'silk-tailoring', label: 'Ancestral Silk Heritage Tailoring', price: 650, rupeePrice: 53000, desc: 'Generational master tailors custom-design 3 bespoke garments in pure mulberry silk' },
      { id: 'imperial-vault', label: 'Citadel Vault Royal Feast', price: 900, rupeePrice: 74000, desc: 'An ultra-exclusive 9-course imperial feast inside the original stone vaults of Hue Citadel' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Seaplane Arrival & Imperial Banquet',
        subtitle: 'KINGS RECEPTION',
        desc: 'Fly low over Ha Long Bay via private chartered seaplane, landing directly next to your luxury junk vessel. Indulge in an exclusive candlelit feast with traditional royal court musicians inside the historic stone Citadel vaults.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        icon: 'Plane'
      },
      {
        day: 2,
        title: 'Karst Labyrinths & Lagoon Kayaking',
        subtitle: 'HIDDEN WATERS',
        desc: 'Wander through dramatic limestone karst labyrinths. Glide through hidden lagoons in high-end ocean kayaks, discovering secret glowing sea caves and bioluminescent marine tunnels under expert private supervision.',
        image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=800&q=80',
        icon: 'Compass'
      },
      {
        day: 3,
        title: 'Ancestral Silk & Critic Street Hunt',
        subtitle: 'CULINARY LEGACY',
        desc: 'Collaborate with generational master tailors to design custom heirloom garments using local hand-spun silk. As dusk falls, join an exclusive street-gastronomy tour led by a world-renowned food critic through lantern-lit corridors.',
        image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=800&q=80',
        icon: 'Crown'
      },
      {
        day: 4,
        title: 'Lacquer Masterclass & Ancient Therapy',
        subtitle: 'SENSORY RETREAT',
        desc: 'Participate in a private masterclass with a lacquer art legend, creating your own polished souvenir. Indulge in a 3-hour warm herbal hot stone therapy before your luxury chauffeured transfer to Hanoi.',
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
        icon: 'Sparkles'
      }
    ],
    rupeePriceText: '₹1,09,000',
    rupeePriceValue: 109000,
    bestForPills: ['IMPERIAL HERITAGE', 'STREET GASTRONOMY', 'BAY CRUISES'],
    manifestBreakdown: {
      base: 85000,
      flights: 19000,
      taxes: 5000,
      total: 109000,
      note: 'PER PERSON • INCL. TAX & RT FLIGHTS',
      isFlightIncluded: true
    }
  }
};

export default function BespokePage({ isOpen, destId, onClose, onBookNow }: BespokePageProps) {
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [soundscapeActive, setSoundscapeActive] = useState<boolean>(false);
  const [simulatedClimate, setSimulatedClimate] = useState<'day' | 'night' | 'rain'>('day');
  const [localTimeStr, setLocalTimeStr] = useState<string>('');
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const audioRef = useRef<BespokeSoundscape | null>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const destination = curatedDestinations.find(d => d.id === destId);
  const meta = bespokeMeta[destId];

  // Local Time Tracking Effect
  useEffect(() => {
    if (!isOpen || !meta) return;
    
    if ((window as any).lenis) { (window as any).lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); };

    // De-activate soundscape upon changing/reopening
    if (audioRef.current) {
      audioRef.current.stop();
      setSoundscapeActive(false);
    }

    let offset = 0;
    if (destId === 'bali') offset = 8;
    else if (destId === 'maldives') offset = 5;
    else if (destId === 'vietnam') offset = 7;

    const updateClock = () => {
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const destTime = new Date(utc + (3600000 * offset));
      
      const hours = String(destTime.getHours()).padStart(2, '0');
      const minutes = String(destTime.getMinutes()).padStart(2, '0');
      const seconds = String(destTime.getSeconds()).padStart(2, '0');
      const ampm = destTime.getHours() >= 12 ? 'PM' : 'AM';
      setLocalTimeStr(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    // Scroll to top when page is mounted
    if ((window as any).lenis) { (window as any).lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo({ top: 0, behavior: "auto" }); };

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.stop();
      }
    };
  }, [isOpen, destId, meta]);

  if (!destination || !meta) return null;

  // Soundscape Activation Toggle
  const toggleSoundscape = () => {
    if (soundscapeActive) {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current = null;
      }
      setSoundscapeActive(false);
    } else {
      const soundObj = new BespokeSoundscape(destId);
      soundObj.start();
      audioRef.current = soundObj;
      setSoundscapeActive(true);
    }
  };

  // Close Soundscape & clean up
  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current = null;
    }
    setSoundscapeActive(false);
    setSelectedUpgrades([]);
    setActiveDay(1);
    setSimulatedClimate('day');
    onClose();
  };

  // Upgrades selection handler
  const handleToggleUpgrade = (uId: string) => {
    if (selectedUpgrades.includes(uId)) {
      setSelectedUpgrades(selectedUpgrades.filter(id => id !== uId));
    } else {
      setSelectedUpgrades([...selectedUpgrades, uId]);
    }
  };

  const upgradesRupeePriceTotal = selectedUpgrades.reduce((sum, uId) => {
    const u = meta.upgrades.find(item => item.id === uId);
    return sum + (u ? u.rupeePrice : 0);
  }, 0);
  
  const dynamicTotalRupeePrice = meta.rupeePriceValue + upgradesRupeePriceTotal;

  // Custom climate labels based on destination id
  const getDayClimateLabel = () => {
    if (destId === 'bali') return 'Volcanic Noon';
    if (destId === 'maldives') return 'Lagoon Noon';
    return 'Karst Noon';
  };

  const getNightClimateLabel = () => {
    if (destId === 'bali') return 'Sacred Nightfall';
    if (destId === 'maldives') return 'Celestial Twilight';
    return 'Starry Mist';
  };

  const getRainClimateLabel = () => {
    if (destId === 'bali') return 'Monsoon Cleansing';
    if (destId === 'maldives') return 'Ocean Spray';
    return 'Dappled Karst Rain';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 32, stiffness: 180, mass: 1 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#030304] font-sans selection:bg-purple-500/30 selection:text-white"
          data-lenis-prevent="true"
        >
          {/* Climate Background Atmosphere Effects */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-[180px]" />
            
            {/* Rain simulator overlay */}
            {simulatedClimate === 'rain' && (
              <div className="absolute inset-0 bg-cyan-950/20 backdrop-blur-[1px] transition-all duration-1000 z-10">
                <div className="w-full h-full opacity-35 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_80%)]" />
                <div className="rain-container absolute inset-0 opacity-40">
                  <div className="absolute top-[-10%] left-[10%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.2s_linear_infinite]" />
                  <div className="absolute top-[-10%] left-[30%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.4s_linear_infinite_0.3s]" />
                  <div className="absolute top-[-10%] left-[50%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.1s_linear_infinite_0.1s]" />
                  <div className="absolute top-[-10%] left-[70%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.3s_linear_infinite_0.5s]" />
                  <div className="absolute top-[-10%] left-[90%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.2s_linear_infinite_0.2s]" />
                </div>
              </div>
            )}

            {/* Night simulator overlay */}
            {simulatedClimate === 'night' && (
              <div className="absolute inset-0 bg-slate-950/45 transition-all duration-1000 z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.1)_0%,transparent_60%)]" />
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute top-[15%] left-[20%] w-[2px] h-[2px] bg-white rounded-full animate-ping" />
                  <div className="absolute top-[25%] left-[60%] w-[1px] h-[1px] bg-white rounded-full animate-pulse" />
                  <div className="absolute top-[40%] left-[45%] w-[2px] h-[2px] bg-white rounded-full animate-pulse" />
                  <div className="absolute top-[75%] left-[80%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-ping" />
                </div>
              </div>
            )}
          </div>

          <div className="relative z-10 w-full text-white bg-black">
            
            {/* 1. Hero Full Viewport Cover */}
            <section className="w-full min-h-[60vh] relative flex flex-col items-center text-center px-6 pt-10 pb-20 overflow-hidden bg-black">
              {/* Visual Background */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <motion.img 
                  src={destination.bgImage} 
                  alt={`${destination.name} Standalone Sanctuary`}
                  className="w-full h-full object-cover filter brightness-[0.55] saturate-[1.1]"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.2, ease: "easeOut" }}
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 transition-colors duration-1000 ${
                  simulatedClimate === 'night' ? 'bg-indigo-950/40 mix-blend-color' :
                  simulatedClimate === 'rain' ? 'bg-cyan-900/30 mix-blend-overlay' : 'bg-transparent'
                }`} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
              </div>

              {/* Absolute Top Header Capsule & Return */}
              <div className="relative z-20 w-full max-w-7xl mx-auto flex justify-between items-center select-none mb-16">
                <div></div>
                
                <button 
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-black/60 border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white/40 transition-all cursor-pointer pointer-events-auto shadow-xl"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Center Content: Massive Typographic Stack */}
              <div className="relative z-10 flex flex-col items-center justify-center mt-8 max-w-4xl">
                <div className="px-3.5 py-1 rounded-full border border-amber-400/30 bg-black/45 text-[9px] text-amber-400 font-mono tracking-widest font-semibold uppercase flex items-center gap-1.5 shadow-sm mb-6">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{destination.location.toUpperCase()} • LUXURY DESTINATION WEBPAGE</span>
                </div>

                <motion.h1 
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="text-7xl sm:text-8xl md:text-9xl font-sans font-black tracking-tighter text-white select-none leading-none mb-4 uppercase"
                >
                  {destination.name}
                </motion.h1>
                
                {/* BEST FOR Divider line */}
                <div className="flex items-center justify-center gap-4 my-2 select-none">
                  <div className="w-16 h-[1px] bg-white/40" />
                  <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-300 font-bold">BEST FOR</span>
                  <div className="w-16 h-[1px] bg-white/40" />
                </div>

                {/* Semi-transparent Capsule Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                  {meta.bestForPills.map((pill, idx) => (
                    <motion.span 
                      key={pill}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 + idx * 0.15, ease: "easeOut" }}
                      className="px-5 py-2.5 rounded-full border border-white/20 bg-black/45 backdrop-blur-md text-white font-mono text-[10px] tracking-widest uppercase font-bold shadow-lg shadow-black/30 select-none hover:border-white/45 transition-colors"
                    >
                      {pill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Scroll Down Trigger */}
              <div 
                className="relative z-10 flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group pb-4"
                onClick={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">EXPLORE WEB DETAILS</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                  <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>
            </section>

            {/* 2. Pricing Details Section */}
            <section 
              ref={pricingRef} 
              className="w-full min-h-screen relative flex flex-col justify-center items-center py-24 px-4 sm:px-6 md:px-12 bg-[#050507] overflow-hidden border-t border-white/5"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_75%)] pointer-events-none" />

              <div className="w-full max-w-4xl space-y-8 z-10 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-4xl sm:text-5xl font-sans italic font-bold tracking-tight text-white select-none">
                    Investment Details.
                  </h2>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold">TouraLuxe Bespoke Account</span>
                </div>

                {/* Master Layout Card */}
                <div className="bg-[#0c0c10]/95 border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Huge Base Cost Highlight */}
                  <div className="md:col-span-6 space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-semibold">
                      INVESTMENT ENTRY POINT
                    </span>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-sans font-black text-white tracking-tighter">
                      From {meta.rupeePriceText}
                    </div>
                    <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold pt-1">
                      {meta.manifestBreakdown.note}
                    </p>
                    <div className="h-[1px] bg-white/10 my-4" />
                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                      Our signature {destination.name} journey incorporates five-star sanctuary stays, custom-tailored local activities, round-the-clock butler concierge care, and pre-negotiated flight allocations.
                    </p>
                  </div>

                  {/* Right: Detailed Manifest Breakdown nested card */}
                  <div className="md:col-span-6 flex flex-col gap-6">
                    <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative hidden md:block">
                      <img src={destination.bgImage} alt="Manifest Breakdown Visual" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700 hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                    <div className="bg-[#060609]/95 border border-white/5 rounded-2xl p-6 md:p-8 space-y-5">
                    <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 font-bold uppercase border-b border-white/5 pb-2">
                      MANIFEST BREAKDOWN
                    </div>

                    <div className="space-y-3 font-mono text-xs text-neutral-300">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-400">Base Land Sanctuary</span>
                        <span className="text-white">
                          ₹{meta.manifestBreakdown.base.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sky-400">
                        <span className="flex items-center gap-1.5">
                          <Plane className="w-3.5 h-3.5" />
                          RT Flights {meta.manifestBreakdown.isFlightIncluded ? '(Included)' : 'Estimated'}
                        </span>
                        <span>
                          {meta.manifestBreakdown.isFlightIncluded ? 'Included' : `+₹${meta.manifestBreakdown.flights.toLocaleString('en-IN')}`}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-emerald-400">
                        <span>Taxes & GST (5%)</span>
                        <span>
                          +₹{meta.manifestBreakdown.taxes.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {selectedUpgrades.length > 0 && (
                        <div className="flex justify-between items-center text-amber-400 border-t border-white/5 pt-3">
                          <span>Bespoke Enhancements</span>
                          <span>
                            +₹{upgradesRupeePriceTotal.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-white/10 pt-4 flex justify-between items-baseline font-sans">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                          ESTIMATED TOTAL
                        </span>
                        <span className="text-2xl font-bold text-white tracking-tight">
                          From ₹{dynamicTotalRupeePrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </section>

            {/* 3. Interactive Upgrades, Climate & Soundscape HUD */}
            <section className="w-full pt-24 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
              <div className="text-left space-y-2">
                <span className="text-purple-400 text-[10px] font-mono uppercase tracking-[0.2em] block font-bold">
                  ENVIRONMENT & AUDIO CUSTOMIZATION HUD
                </span>
                <h3 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
                  Bespoke Upgrade Desk.
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4 text-left">
                {/* Environment Controls, Clock & Soundscape (7 columns) */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#08080a]/90 border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-6">
                    {/* Location Details Header */}
                    <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-b-white/5">
                      <div>
                        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">LOCAL CHRONOMETER</span>
                        <div className="flex items-center gap-2 text-white">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span className="font-mono text-base font-bold tracking-tight">{localTimeStr || "LOADING TIME..."}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">{meta.timezoneLabel}</span>
                        <div className="text-[10px] text-neutral-400 font-mono tracking-wider">SECURE LINK TERMINAL</div>
                      </div>
                    </div>

                    {/* Meteorological Live Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[8px] font-mono text-neutral-500 uppercase block">AMBIENT TEMP</span>
                        <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-white">
                          <Thermometer className="w-4 h-4 text-amber-400" />
                          {meta.weatherStats.temp}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[8px] font-mono text-neutral-500 uppercase block">HUMIDITY</span>
                        <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-white">
                          <Droplets className="w-4 h-4 text-cyan-400" />
                          {meta.weatherStats.humidity}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[8px] font-mono text-neutral-500 uppercase block">WATER TEMP</span>
                        <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-white">
                          <Wind className="w-4 h-4 text-teal-400" />
                          {meta.weatherStats.waterTemp}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[8px] font-mono text-neutral-500 uppercase block">{meta.weatherStats.uniqueMetric}</span>
                        <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-amber-400 truncate">
                          <Star className="w-3.5 h-3.5 fill-amber-400/20 text-amber-400 shrink-0" />
                          {meta.weatherStats.uniqueMetricValue}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Simulation Controls */}
                    <div className="space-y-3">
                      <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase font-bold">
                        SIMULATE ENVIRONMENT WEATHER
                      </span>
                      
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSimulatedClimate('day')}
                          className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all border cursor-pointer outline-none ${
                            simulatedClimate === 'day' 
                              ? 'bg-amber-400 text-black border-amber-400 font-bold' 
                              : 'bg-white/5 text-neutral-300 border-white/5 hover:border-white/10'
                          }`}
                        >
                          <Sun className="w-3.5 h-3.5" />
                          {getDayClimateLabel()}
                        </button>

                        <button
                          onClick={() => setSimulatedClimate('night')}
                          className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all border cursor-pointer outline-none ${
                            simulatedClimate === 'night' 
                              ? 'bg-indigo-400 text-black border-indigo-400 font-bold' 
                              : 'bg-white/5 text-neutral-300 border-white/5 hover:border-white/10'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          {getNightClimateLabel()}
                        </button>

                        <button
                          onClick={() => setSimulatedClimate('rain')}
                          className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all border cursor-pointer outline-none ${
                            simulatedClimate === 'rain' 
                              ? 'bg-cyan-400 text-black border-cyan-400 font-bold' 
                              : 'bg-white/5 text-neutral-300 border-white/5 hover:border-white/10'
                          }`}
                        >
                          <Wind className="w-3.5 h-3.5" />
                          {getRainClimateLabel()}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Soundscape Control Module */}
                  <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span className="text-xs font-bold tracking-wider font-sans">SACRED SOUNDSCAPE TRANSCEIVER</span>
                      </div>
                      <p className="text-[10px] font-light text-neutral-400 max-w-sm">
                        Inject real-time high-fidelity meditative acoustic feedback using synthesized resonant metal temple singing bowls, ocean rollers, or bamboo flutes.
                      </p>
                    </div>

                    <Magnetic strength={0.2}>
                      <button
                        onClick={toggleSoundscape}
                        className={`px-6 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1.5 transition-all cursor-pointer border outline-none ${
                          soundscapeActive 
                            ? 'bg-[#E040FB] text-white border-[#E040FB] shadow-lg shadow-purple-500/25' 
                            : 'bg-white text-black border-white hover:bg-neutral-200'
                        }`}
                      >
                        {soundscapeActive ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
                        {soundscapeActive ? 'Mute Harmony' : 'Broadcast Drone'}
                      </button>
                    </Magnetic>
                  </div>
                </div>

                {/* Upgrades List (5 columns) */}
                <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#08080a]/90 border border-white/10 shadow-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[8px] font-mono text-neutral-500 tracking-widest uppercase block font-bold border-b border-white/5 pb-2">
                      SELECT EXPANSIONS
                    </span>
                    
                    <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                      {meta.upgrades.map((upg) => {
                        const isSelected = selectedUpgrades.includes(upg.id);
                        return (
                          <div 
                            key={upg.id}
                            onClick={() => handleToggleUpgrade(upg.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-start gap-3 select-none ${
                              isSelected 
                                ? 'bg-amber-400/[0.04] border-amber-400' 
                                : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                            }`}
                          >
                            <div className="space-y-1 flex-1">
                              <span className="text-[10px] font-bold tracking-wide block text-neutral-100">{upg.label}</span>
                              <p className="text-[9px] text-neutral-400 leading-normal font-light">{upg.desc}</p>
                            </div>
                            
                            <div className="text-right shrink-0">
                              <span className="text-[10px] font-mono text-amber-400 block font-bold">+₹{upg.rupeePrice.toLocaleString('en-IN')}</span>
                              <div className={`w-4 h-4 rounded-full border mt-2 mx-auto flex items-center justify-center transition-all ${
                                isSelected ? 'bg-amber-400 border-amber-400 text-black' : 'border-white/20 bg-transparent'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">Live Combined Price</span>
                      <span className="text-xl font-bold font-sans text-white tracking-tight">₹{dynamicTotalRupeePrice.toLocaleString('en-IN')}</span>
                    </div>

                    <Magnetic strength={0.3}>
                      <button 
                        onClick={onBookNow}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-bold tracking-widest uppercase cursor-pointer hover:shadow-lg hover:shadow-amber-500/10 transition-all border-none outline-none"
                      >
                        Request Complete Manifest
                      </button>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Interactive 4-Day Curated Journey Timeline */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#08080a]/90 border border-white/10 shadow-xl text-left space-y-8 mb-12 mx-4 sm:mx-6 lg:mx-auto max-w-7xl">
              <div className="border-b border-b-white/5 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <span className="text-amber-400 text-[9px] font-mono uppercase tracking-[0.2em] block font-bold">DETAILED SCHEDULING INTERFACE</span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white mt-1">4-Day Curated Experience</h3>
                </div>
                
                <div className="flex flex-wrap gap-1.5 bg-black/60 border border-white/10 p-1 rounded-xl">
                  {meta.itinerary.map((it) => (
                    <button
                      key={it.day}
                      onClick={() => setActiveDay(it.day)}
                      className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest font-semibold cursor-pointer outline-none border-none transition-all ${
                        activeDay === it.day 
                          ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/10' 
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Day 0{it.day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid content box with animations */}
              <AnimatePresence mode="wait">
                {meta.itinerary.map((it) => {
                  if (it.day !== activeDay) return null;
                  return (
                    <motion.div
                      key={it.day}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                    >
                      {/* Left side itinerary description (7 cols) */}
                      <div className="lg:col-span-7 space-y-5">
                        <div className="flex items-center gap-3">
                          <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full px-4 py-1 font-mono text-[9px] tracking-widest font-bold">
                            PHASE 0{it.day}
                          </span>
                          <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 font-semibold uppercase">{it.subtitle}</span>
                        </div>

                        <h4 className="text-3xl font-sans font-bold tracking-tight text-white">{it.title}</h4>
                        <p className="text-neutral-300 text-sm leading-relaxed font-light">{it.desc}</p>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs font-mono">
                          <div className="space-y-1">
                            <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">DURATION</span>
                            <span className="text-white">Continuous Care</span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">STEWARD</span>
                            <span className="text-white">VIP Butler Escort</span>
                          </div>
                        </div>
                      </div>

                      {/* Right side cinematic imagery (5 cols) */}
                      <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-zoom-in"
                        onClick={() => setActiveLightboxImg(it.image)}
                      >
                        <img loading="lazy" decoding="async" 
                          src={it.image} 
                          alt={it.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[800ms]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <span className="text-[9px] font-mono tracking-widest text-white/70">CLICK FOR CINEMATIC EXPANSION</span>
                          <Camera className="w-4 h-4 text-white/70 shrink-0" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Complete Manifest Booking CTA Footer */}
            <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#050507] to-black border-t border-white/5 text-center select-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(224,64,251,0.02)_0%,transparent_50%)] pointer-events-none" />
              <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
                <Crown className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
                <h3 className="text-4xl sm:text-5xl font-sans italic font-bold tracking-tight text-white leading-tight">
                  Ready to experience the pure luxury of {destination.name}?
                </h3>
                <p className="text-neutral-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
                  Submit a customized manifest request today. Our elite travel curators will connect with you within 24 hours to review flight availability, private villas, and personalized activity sequencing.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Magnetic strength={0.3}>
                    <button 
                      onClick={onBookNow}
                      className="px-10 py-4 bg-white text-black hover:bg-neutral-100 rounded-full text-xs font-bold tracking-widest uppercase cursor-pointer outline-none border-none shadow-xl"
                    >
                      Initiate Consultation
                    </button>
                  </Magnetic>
                  
                  <button 
                    onClick={handleClose}
                    className="px-8 py-4 bg-transparent border border-white/10 hover:border-white/20 text-white rounded-full text-xs font-mono tracking-widest uppercase cursor-pointer"
                  >
                    Return to TouraLuxe Explorer
                  </button>
                </div>
              </div>
            </section>
            
          </div>

          {/* Lightbox Component for High-Res Imagery */}
          <AnimatePresence>
            {activeLightboxImg && (
              <motion.div 
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveLightboxImg(null)}
              >
                <button 
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 cursor-pointer"
                  onClick={() => setActiveLightboxImg(null)}
                >
                  <X className="w-6 h-6" />
                </button>
                <motion.img 
                  src={activeLightboxImg} 
                  alt="Expanded Sanctuary Visual"
                  className="max-w-full max-h-[85vh] rounded-xl object-contain border border-white/10 shadow-2xl"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
