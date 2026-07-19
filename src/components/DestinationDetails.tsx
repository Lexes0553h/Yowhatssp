import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MapPin, Star, Compass, Sparkles, Crown, ArrowRight, 
  Plane, ShieldCheck, Check, Camera, Compass as ActivityIcon,
  Sun, Wind, Droplets, Thermometer, Volume2, VolumeX,
  Play, Pause, ChevronRight, Activity, Zap, Calendar, Clock
} from 'lucide-react';
import { Destination } from '../types';
import Magnetic from './Magnetic';

interface DestinationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination | null;
  onBookNow: (destinationId: string) => void;
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
        // Generate soft white noise
        const bufferSize = this.ctx.sampleRate * 5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Filter noise to create pink-ish brown ocean roll sound
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

        // Slow LFO to simulate continuous cresting of ocean waves
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
        // Low base frequency drone (sacred meditation vibe)
        const drone = this.ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 Root node

        const droneGain = this.ctx.createGain();
        droneGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        drone.connect(droneGain);
        droneGain.connect(masterGain);
        drone.start();
        this.nodes.push(drone);

        const playTempleBowl = () => {
          if (!this.ctx || this.ctx.state === 'closed') return;
          const chords = [220, 277.18, 329.63, 440]; // A major meditative progression
          const freq = chords[Math.floor(Math.random() * chords.length)];

          const bowl = this.ctx.createOscillator();
          bowl.type = 'sine';
          bowl.frequency.setValueAtTime(freq, this.ctx.currentTime);

          // Authentic resonance decay envelope
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
        // Soft airy high-frequency triangle breeze
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
          const pentatonicScale = [293.66, 329.63, 392.00, 440.00, 523.25]; // G major pentatonic
          const freq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];

          const flute = this.ctx.createOscillator();
          flute.type = 'sine';
          flute.frequency.setValueAtTime(freq, this.ctx.currentTime);

          // Vibrato for wooden breath effect
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
      console.warn("Web Audio API was blocked or not supported by browser constraints: ", e);
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

// Highly specific custom content for Bali, Maldives, and Vietnam
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

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current mr-1.5 inline-block" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.133-1.343a9.893 9.893 0 0 0 4.873 1.28c5.507 0 9.99-4.478 9.991-9.985A10.003 10.003 0 0 0 12.012 2zm5.776 14.172c-.253.708-1.47 1.292-2.019 1.353-.497.054-1.147.087-3.045-.701-2.428-1.008-3.99-3.481-4.111-3.642-.121-.162-.991-1.316-.991-2.51 0-1.194.624-1.782.846-2.02.222-.239.485-.298.646-.298.162 0 .324.001.465.008.148.007.348-.053.546.425.202.486.687 1.677.748 1.799.06.122.101.263.02.425-.081.162-.121.263-.243.405-.121.142-.253.315-.364.425-.122.122-.249.255-.107.498.142.242.631 1.036 1.355 1.679.932.828 1.716 1.084 1.959 1.206.243.121.385.101.526-.06.142-.162.607-.708.769-.951.162-.242.324-.202.546-.121.222.081 1.416.668 1.659.789.243.122.405.182.465.283.06.101.06.587-.193 1.295z"/>
  </svg>
);

export default function DestinationDetails({ 
  isOpen, 
  onClose, 
  destination, 
  onBookNow 
}: DestinationDetailsProps) {
  
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [soundscapeActive, setSoundscapeActive] = useState<boolean>(false);
  const [simulatedClimate, setSimulatedClimate] = useState<'day' | 'night' | 'rain'>('day');
  const [localTimeStr, setLocalTimeStr] = useState<string>('');
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const audioRef = useRef<BespokeSoundscape | null>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const isBespoke = destination ? ['bali', 'maldives', 'vietnam'].includes(destination.id) : false;
  const meta = isBespoke && destination ? bespokeMeta[destination.id] : null;

  // Local Time Tracking Effect
  useEffect(() => {
    if (!isOpen || !destination) return;
    
    // De-activate soundscape upon reopening
    if (audioRef.current) {
      audioRef.current.stop();
      setSoundscapeActive(false);
    }

    let offset = 0;
    if (destination.id === 'bali') offset = 8;
    else if (destination.id === 'maldives') offset = 5;
    else if (destination.id === 'vietnam') offset = 7;

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

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.stop();
      }
    };
  }, [isOpen, destination]);

  // Soundscape Activation Toggle
  const toggleSoundscape = () => {
    if (!destination) return;
    if (soundscapeActive) {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current = null;
      }
      setSoundscapeActive(false);
    } else {
      const soundObj = new BespokeSoundscape(destination.id as any);
      soundObj.start();
      audioRef.current = soundObj;
      setSoundscapeActive(true);
    }
  };

  // Close Soundscape & Modal cleanly
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

  // Dynamic booking configuration pre-fill
  const handleBookClick = () => {
    if (!destination) return;
    
    const upgradesList: string[] = [];
    let extraCost = 0;
    
    if (meta) {
      selectedUpgrades.forEach(uId => {
        const u = meta.upgrades.find(item => item.id === uId);
        if (u) {
          upgradesList.push(`${u.label} (+₹${u.rupeePrice.toLocaleString('en-IN')})`);
          extraCost += u.rupeePrice;
        }
      });
    }

    const upgradeSummary = {
      destinationId: destination.id,
      destinationName: destination.name,
      upgrades: upgradesList,
      extraCost,
      simulatedClimate
    };

    localStorage.setItem('touraluxe_selected_upgrades', JSON.stringify(upgradeSummary));
    
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current = null;
    }
    setSoundscapeActive(false);

    onBookNow(destination.id);
  };

  // Parse numerical base price
  const basePriceValue = destination ? parseInt(destination.price.replace(/[^0-9]/g, '')) : 0;
  
  // Calculate dynamic pricing
  const upgradesPriceValue = meta 
    ? selectedUpgrades.reduce((sum, uId) => {
        const u = meta.upgrades.find(item => item.id === uId);
        return sum + (u ? u.price : 0);
      }, 0)
    : 0;

  const totalCalculatedPrice = basePriceValue + upgradesPriceValue;

  // Indian Rupee calculations for bespoke pages
  const initialTotalRupeePrice = meta ? meta.rupeePriceValue : 0;
  const upgradesRupeePriceTotal = meta 
    ? selectedUpgrades.reduce((sum, uId) => {
        const u = meta.upgrades.find(item => item.id === uId);
        return sum + (u ? u.rupeePrice : 0);
      }, 0)
    : 0;
  const dynamicTotalRupeePrice = initialTotalRupeePrice + upgradesRupeePriceTotal;

  return (
    <AnimatePresence>
      {isOpen && destination && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black font-sans selection:bg-amber-500/30 selection:text-white"
          data-lenis-prevent="true"
        >
          {/* Main Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 180, mass: 1 }}
            className="min-h-screen bg-[#050507] relative pb-16"
          >
            {/* Climate Background Atmosphere Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[150px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-[180px]" />
              
              {/* Rain simulator overlay */}
              {simulatedClimate === 'rain' && (
                <div className="absolute inset-0 bg-cyan-950/20 backdrop-blur-[1px] transition-all duration-1000">
                  <div className="w-full h-full opacity-35 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_80%)]" />
                  {/* CSS Rain particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="rain-container absolute inset-0 opacity-40">
                      <div className="absolute top-[-10%] left-[10%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.2s_linear_infinite]" />
                      <div className="absolute top-[-10%] left-[30%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.4s_linear_infinite_0.3s]" />
                      <div className="absolute top-[-10%] left-[50%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.1s_linear_infinite_0.1s]" />
                      <div className="absolute top-[-10%] left-[70%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.3s_linear_infinite_0.5s]" />
                      <div className="absolute top-[-10%] left-[90%] w-[1px] h-[80px] bg-cyan-400 rotate-[15deg] animate-[fall_1.2s_linear_infinite_0.2s]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Night simulator overlay */}
              {simulatedClimate === 'night' && (
                <div className="absolute inset-0 bg-slate-950/45 transition-all duration-1000">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.1)_0%,transparent_60%)]" />
                  {/* Subtle twinkling stars */}
                  <div className="absolute inset-0 opacity-60">
                    <div className="absolute top-[15%] left-[20%] w-[2px] h-[2px] bg-white rounded-full animate-ping" />
                    <div className="absolute top-[25%] left-[60%] w-[1px] h-[1px] bg-white rounded-full animate-pulse" />
                    <div className="absolute top-[40%] left-[45%] w-[2px] h-[2px] bg-white rounded-full animate-pulse" />
                    <div className="absolute top-[75%] left-[80%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-ping" />
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Luxury Navigation Header */}
            {!isBespoke && (
              <header className="sticky top-0 z-50 bg-[#050507]/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
                <div></div>

                <Magnetic strength={0.3}>
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-full bg-black/60 border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white/40 transition-all cursor-pointer pointer-events-auto shadow-xl"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Magnetic>
              </header>
            )}

            {isBespoke && meta ? (
              /* --- HIGHLY DETAILED BESPOKE WEBPAGE LAYOUT (BALI, MALDIVES, VIETNAM) --- */
              <div className="relative z-10 w-full text-white bg-black">
                
                {/* 1. Hero Full Viewport Cover (Screenshot 1 Style) */}
                <section className="w-full h-screen relative flex flex-col justify-between items-center text-center px-6 py-10 overflow-hidden bg-black">
                  {/* Visual Background */}
                  <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <motion.img 
                      src={destination.bgImage} 
                      alt={destination.name}
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

                  {/* Absolute Top Header Capsule & Close (integrated on background) */}
                  <div className="relative z-20 w-full max-w-7xl mx-auto flex justify-between items-center select-none">
                    <div></div>
                    <button 
                      onClick={handleClose}
                      className="w-10 h-10 rounded-full bg-black/60 border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white/40 transition-all cursor-pointer pointer-events-auto shadow-xl animate-none"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Center Content: Massive Typographic Stack */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto max-w-4xl">
                    <motion.h1 
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="text-7xl sm:text-8xl md:text-9xl font-sans font-black tracking-tighter text-white select-none leading-none mb-4"
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
                    <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">SCROLL</span>
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                      <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </section>
                  {/* 2. Pricing Details Section (Screenshot 2 Style) */}
                <section 
                  ref={pricingRef} 
                  className="w-full relative flex flex-col justify-center items-center py-12 px-4 sm:px-6 md:px-12 bg-[#050507] overflow-hidden border-t border-white/5"
                >
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_75%)] pointer-events-none" />

                  <div className="w-full max-w-4xl space-y-8 z-10 text-left">
                    <h2 className="text-4xl sm:text-5xl font-sans italic font-bold tracking-tight text-white select-none">
                      Pricing Details.
                    </h2>

                    {/* Master Layout Card */}
                    <div className="bg-[#0c0c10]/95 border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      
                      {/* Left: Huge Base Cost Highlight */}
                      <div className="md:col-span-6 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-semibold">
                          INVESTMENT ENTRY POINT
                        </span>
                        <div className="text-4xl sm:text-5xl md:text-6xl font-sans font-black text-white tracking-tighter">
                          From {meta.rupeePriceText}
                        </div>
                        <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold pt-1">
                          {meta.manifestBreakdown.note}
                        </p>
                      </div>

                      {/* Right: Detailed Manifest Breakdown nested card */}
                      <div className="md:col-span-6 bg-[#060609]/95 border border-white/5 rounded-2xl p-6 md:p-8 space-y-5">
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
                              RT Flights {meta.manifestBreakdown.isFlightIncluded && '(Included)'}
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
                </section>

                {/* 3. Interactive Upgrades, Climate & Soundscape HUD */}
                <section className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
                  <div className="text-left space-y-2">
                    <span className="text-purple-400 text-[10px] font-mono uppercase tracking-[0.2em] block font-bold">
                      ENVIRONMENT & AUDIO CUSTOMIZATION HUD
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
                      Bespoke Upgrade Desk.
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    {/* Environment Controls, Clock & Soundscape (7 columns) */}
                    <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#08080a]/90 border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden text-left">
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
                            SIMULATE HEIRLOOM CLIMATE
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
                              Golden Day
                            </button>

                            <button
                              onClick={() => setSimulatedClimate('night')}
                              className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all border cursor-pointer outline-none ${
                                simulatedClimate === 'night' 
                                  ? 'bg-indigo-500 text-white border-indigo-500 font-bold' 
                                  : 'bg-white/5 text-neutral-300 border-white/5 hover:border-white/10'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              Starry Night
                            </button>

                            <button
                              onClick={() => setSimulatedClimate('rain')}
                              className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all border cursor-pointer outline-none ${
                                simulatedClimate === 'rain' 
                                  ? 'bg-cyan-500 text-white border-cyan-500 font-bold' 
                                  : 'bg-white/5 text-neutral-300 border-white/5 hover:border-white/10'
                              }`}
                            >
                              <Droplets className="w-3.5 h-3.5" />
                              Tropical Mist
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Sensory Audio Drone Synthesizer */}
                      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-purple-500/[0.04] to-blue-500/[0.04] border border-purple-500/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="space-y-1 text-center sm:text-left">
                          <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest font-bold">AUDIOPHILE SOUNDSCAPE DRONE</span>
                          <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                            Initialize a procedural organic frequency synth reflecting the {destination.name} landscape.
                          </p>
                        </div>

                        <Magnetic strength={0.2}>
                          <button
                            onClick={toggleSoundscape}
                            className={`px-5 py-3 rounded-full text-[9px] font-mono uppercase tracking-[0.2em] transition-all cursor-pointer outline-none flex items-center gap-1.5 whitespace-nowrap ${
                              soundscapeActive
                                ? 'bg-purple-500 hover:bg-purple-600 text-white font-bold animate-pulse'
                                : 'bg-white/10 text-white hover:bg-white/15'
                            }`}
                          >
                            {soundscapeActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            {soundscapeActive ? 'SYNTH ON' : 'SYNTH OFF'}
                          </button>
                        </Magnetic>
                      </div>
                    </div>

                    {/* Dynamic Cost Calculator Invoice (5 columns) */}
                    <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/[0.03] to-purple-500/[0.03] border-2 border-white/10 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-400 tracking-[0.2em] uppercase font-bold">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          LIVE COST CALCULATOR
                        </div>
                        
                        <div className="pb-4 border-b border-white/5 space-y-2">
                          <div className="flex justify-between text-xs text-neutral-400">
                            <span>Base Sanctuary Package</span>
                            <span className="font-mono">₹{initialTotalRupeePrice.toLocaleString('en-IN')}</span>
                          </div>

                          {selectedUpgrades.length > 0 ? (
                            <>
                              <div className="flex justify-between text-xs text-neutral-400">
                                <span>Elite Enhancements ({selectedUpgrades.length})</span>
                                <span className="font-mono text-amber-400">+₹{upgradesRupeePriceTotal.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="pl-3 border-l border-white/10 py-1.5 space-y-1">
                                {selectedUpgrades.map(uId => {
                                  const u = meta.upgrades.find(item => item.id === uId);
                                  return u ? (
                                    <div key={uId} className="flex justify-between text-[10px] text-neutral-500 font-mono">
                                      <span className="truncate max-w-[200px]">{u.label.split(' Upgrade')[0]}</span>
                                      <span>+₹{u.rupeePrice.toLocaleString('en-IN')}</span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </>
                          ) : (
                            <div className="text-[10px] text-neutral-500 font-mono italic">
                              No modifications loaded. Standard rate applies.
                            </div>
                          )}
                        </div>

                        {/* Final Total Allocation */}
                        <div className="py-2 flex justify-between items-end">
                          <div>
                            <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase block">
                              TAILORED Bespoke Rate
                            </span>
                            <span className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-tight">
                              ₹{dynamicTotalRupeePrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest pb-1">
                            TOTAL
                          </span>
                        </div>

                        {/* Package summary list */}
                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                          <span className="text-[8px] font-mono text-neutral-500 tracking-widest uppercase block font-bold">
                            RESERVATION PACKAGE GUARANTEES:
                          </span>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[9px] text-neutral-300 font-mono">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>24/7 Butler Steward & CIP Priority Airport Clearance</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-neutral-300 font-mono">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>Climate pre-loaded to {simulatedClimate === 'day' ? 'Golden Day' : simulatedClimate === 'night' ? 'Starry Night' : 'Tropical Mist'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 relative z-10">
                        <Magnetic strength={0.25}>
                          <button
                            onClick={handleBookClick}
                            className="w-full py-4 bg-white hover:bg-neutral-100 text-black rounded-full text-xs font-bold tracking-[0.2em] uppercase cursor-pointer hover:shadow-2xl hover:shadow-white/25 transition-all outline-none flex items-center justify-center gap-2"
                          >
                            Lock Bespoke Plan & Book
                            <ArrowRight className="w-4 h-4 text-black" />
                          </button>
                        </Magnetic>
                      </div>
                    </div>
                  </div>

                  {/* 3b. Interactive Upgrades Checklist Selection List */}
                  <div className="space-y-4 text-left">
                    <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase block font-bold">
                      ELITE UPGRADES AVAILABLE
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {meta.upgrades.map((u) => {
                        const isSelected = selectedUpgrades.includes(u.id);
                        return (
                          <div 
                            key={u.id}
                            onClick={() => handleToggleUpgrade(u.id)}
                            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-start gap-4 ${
                              isSelected 
                                ? 'bg-[#0f0e09]/70 border-amber-400/80 shadow-lg' 
                                : 'bg-[#060608]/90 border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                            }`}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] ${
                                  isSelected ? 'bg-amber-400 border-amber-400 text-black font-bold' : 'border-white/30 text-transparent'
                                }`}>
                                  ✓
                                </span>
                                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                                  {u.label}
                                </h4>
                              </div>
                              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm pl-6">
                                {u.desc}
                              </p>
                            </div>
                            <span className="text-xs font-mono text-amber-400 font-bold shrink-0 pt-0.5">
                              +₹{u.rupeePrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* 4. Interactive 4-Day Curated Journey Timeline */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#08080a]/90 border border-white/10 shadow-xl text-left space-y-8 mb-12">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-b-white/5">
                    <div className="flex items-center gap-2 text-purple-400 text-[11px] font-mono uppercase tracking-[0.2em] font-bold">
                      <ActivityIcon className="w-4 h-4" />
                      BESPOKE 4-DAY INTEGRATED TIMELINE
                    </div>
                    
                    {/* Day Tabs */}
                    <div className="flex gap-1.5 bg-black/40 p-1.5 rounded-full border border-white/5">
                      {meta.itinerary.map((it) => (
                        <button
                          key={it.day}
                          onClick={() => setActiveDay(it.day)}
                          className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer outline-none ${
                            activeDay === it.day 
                              ? 'bg-purple-500 text-white font-bold' 
                              : 'text-neutral-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          Day {it.day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Day detailed content slide */}
                  <AnimatePresence mode="wait">
                    {meta.itinerary.map((it) => {
                      if (it.day !== activeDay) return null;
                      return (
                        <motion.div
                          key={it.day}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                        >
                          {/* Image column (5 cols) */}
                          <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-xl relative group">
                            <img loading="lazy" decoding="async" 
                              src={it.image} 
                              alt={it.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                            
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-3 py-1 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-300">
                                Day {it.day} Immersive
                              </span>
                            </div>
                          </div>

                          {/* Detail text column (7 cols) */}
                          <div className="md:col-span-7 space-y-4 text-left">
                            <span className="text-[9px] font-mono tracking-[0.2em] text-purple-400 uppercase font-bold block">
                              {it.subtitle}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-sans italic font-bold tracking-tight text-white">
                              {it.title}
                            </h3>
                            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light font-sans">
                              {it.desc}
                            </p>

                            <div className="pt-4 flex flex-wrap gap-3">
                              <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[9px] text-purple-300 font-mono tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-purple-400" />
                                Bespoke Concierge Host Included
                              </span>
                              <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-300 font-mono tracking-wider flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-amber-400" />
                                Private Premium Transport Secured
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* 5. Custom Photo Wall & Immersive Lightbox Grid */}
                <div className="space-y-4 mb-12 text-left">
                  <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                    <Camera className="w-4 h-4 text-neutral-500" />
                    EXCLUSIVE SANCTUARY GALLERY (CLICK IMAGE TO FOCUS)
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <motion.div 
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 shadow-lg group cursor-zoom-in"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setActiveLightboxImg(destination.bgImage)}
                    >
                      <img loading="lazy" decoding="async" 
                        src={destination.bgImage} 
                        alt={`${destination.name} primary`}
                        className="w-full h-full object-cover filter brightness-[0.8] hover:brightness-100 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-[9px] font-mono text-white/80 tracking-widest uppercase">Hero Horizon View</span>
                      </div>
                    </motion.div>

                    {destination.secondaryImages.map((image, idx) => (
                      <motion.div 
                        key={idx}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 shadow-lg group cursor-zoom-in"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setActiveLightboxImg(image)}
                      >
                        <img loading="lazy" decoding="async" 
                          src={image} 
                          alt={`${destination.name} gallery ${idx + 1}`}
                          className="w-full h-full object-cover filter brightness-[0.8] hover:brightness-100 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-[9px] font-mono text-white/80 tracking-widest uppercase">Sanctuary Detail {idx + 1}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* --- EXCELLENT DEFAULT LAYOUT FOR GENERAL/INDIA DESTINATIONS --- */
              <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Visuals & Gallery */}
                <div className="lg:col-span-6 space-y-8 text-left">
                  {/* Primary Hero Image */}
                  <motion.div 
                    className="relative aspect-[16/10] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img loading="lazy" decoding="async" 
                      src={destination.bgImage} 
                      alt={destination.name}
                      className="w-full h-full object-cover filter brightness-[0.9] saturate-[1.05]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Rating & Location Floating Badge */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] text-amber-400 font-mono tracking-widest flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {destination.rating} RATING
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] text-white/90 font-mono tracking-widest flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-white/70" />
                        {destination.location.toUpperCase()}
                      </span>
                    </div>
                  </motion.div>

                  {/* Photo Gallery Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                      <Camera className="w-4 h-4 text-neutral-500" />
                      Exclusive Sanctuary Gallery
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {destination.secondaryImages.map((image, idx) => (
                        <motion.div 
                          key={idx}
                          className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 shadow-lg group cursor-zoom-in"
                          whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.15)' }}
                          transition={{ duration: 0.3 }}
                          onClick={() => setActiveLightboxImg(image)}
                        >
                          <img loading="lazy" decoding="async" 
                            src={image} 
                            alt={`${destination.name} gallery ${idx + 1}`}
                            className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Narrative & Indulgences */}
                <div className="lg:col-span-6 space-y-10 text-left">
                  {/* Header Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-400 font-bold">
                        Bespoke Journey
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-500">
                        {destination.location}
                      </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans italic font-semibold text-white tracking-tight leading-none">
                      {destination.name}
                    </h1>

                    <h2 className="text-lg sm:text-xl font-serif italic text-amber-400/90 font-light tracking-wide max-w-xl">
                      {destination.tagline}
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light tracking-wide">
                      {destination.description}
                    </p>
                  </div>

                  {/* Exclusive Highlights */}
                  <div className="p-6 rounded-[20px] bg-[#09090b] border border-white/5 space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.015] rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2 text-white text-[11px] font-mono uppercase tracking-[0.2em] font-semibold pb-2 border-b border-white/5">
                      <Crown className="w-4 h-4 text-amber-400" />
                      Signature Elite Privileges
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 pt-2">
                      {destination.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-400 leading-normal">
                          <span className="w-5 h-5 rounded-full bg-amber-400/5 border border-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-amber-400" />
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tailored Activities */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                      <ActivityIcon className="w-4 h-4 text-neutral-500" />
                      Immersive Bespoke Activities
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {destination.activities.map((activity, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3 hover:bg-white/[0.04] transition-colors"
                        >
                          <span className="w-7 h-7 rounded-lg bg-purple-500/5 border border-purple-500/25 flex items-center justify-center shrink-0 text-purple-400">
                            <Sparkles className="w-3.5 h-3.5" />
                          </span>
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-purple-400 font-mono tracking-wider font-semibold uppercase">ACTIVITY {idx + 1}</span>
                            <p className="text-xs text-neutral-300 font-light leading-relaxed">{activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Reservation */}
                  <div className="p-6 rounded-[24px] bg-gradient-to-br from-amber-500/[0.03] to-purple-500/[0.03] border-2 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
                    
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] font-mono text-neutral-400 tracking-[0.15em] uppercase font-semibold">PREMIUM ALLOCATION RATE</span>
                      <div className="flex items-baseline justify-center sm:justify-start gap-1">
                        <span className="text-3xl md:text-4xl font-serif text-white font-bold tracking-tight">
                          {destination.price.split(' ')[1] || destination.price}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest ml-1">
                          / NIGHT
                        </span>
                      </div>
                      <p className="text-[9px] font-mono text-amber-400/80 uppercase tracking-widest">
                        Includes 24/7 personal stewardship & fast-track arrival
                      </p>
                    </div>

                    <Magnetic strength={0.25}>
                      <button
                        onClick={() => onBookNow(destination.id)}
                        className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-100 text-black rounded-full text-xs font-bold tracking-[0.2em] uppercase cursor-pointer hover:shadow-2xl hover:shadow-white/25 transition-all outline-none flex items-center justify-center gap-2"
                      >
                        Book This Experience
                        <ArrowRight className="w-4 h-4 text-black" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              </main>
            )}

            {/* Global Immersive Lightbox Modal */}
            <AnimatePresence>
              {activeLightboxImg && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-55 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
                  onClick={() => setActiveLightboxImg(null)}
                >
                  <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                    <X className="w-6 h-6" />
                  </button>
                  
                  <motion.img
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 150 }}
                    src={activeLightboxImg}
                    alt="Lightbox Focus"
                    className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  
                  <p className="text-neutral-500 font-mono text-[9px] tracking-widest uppercase mt-4">
                    TouraLuxe Exclusive Photography Hangar • Click anywhere to exit focus
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Footer inside Sanctum */}
            <footer className="mt-20 border-t border-white/5 py-8 text-center text-[10px] font-mono text-neutral-600 uppercase tracking-[0.25em]">
              TouraLuxe Exclusive Concierge Sanctum • Security Assured
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
