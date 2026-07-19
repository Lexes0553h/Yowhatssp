import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ArrowLeft, Globe, Mountain, Star, 
  ArrowRight, Plane, RefreshCw, Search,
  Compass, Sparkles, MapPin, Calendar, Users,
  Ship, Navigation, ShieldCheck, Info, Check, HelpCircle
} from 'lucide-react';
import { Destination } from '../types';
import { curatedDestinations } from '../data';
// @ts-ignore
import maldivesBeachHero from '../assets/images/maldives_beach_hero_1784329530793.jpg';

interface NewJourneyPageProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (destId: string) => void;
  onBookNow: (destId: string) => void;
  initialSearchQuery?: string;
}

// Custom curated ultra-luxury destinations for India to perfectly populate the INDIA tab
export const luxuryIndiaDestinations: Destination[] = [
  {
    id: 'kerala',
    name: 'Kerala Backwaters',
    tagline: 'Private Floating Palaces & Ayurvedic Sanctuaries',
    description: 'Drift through serene palm-fringed canals on a private hand-crafted luxury houseboat. Experience traditional culinary excellence and customized Panchakarma wellness therapies guided by master Ayurvedic healers.',
    location: 'Kerala, India',
    rating: 4.92,
    bgImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'From $1,200 / night',
    highlights: [
      'Private 100ft luxury solar-houseboat',
      'Dedicated wellness chef & Ayurvedic doctor',
      'Sunset yoga sessions on open water decks',
      'Behind-the-scenes spice plantation helicopter tour'
    ],
    activities: [
      'Personalized oil massaged marma therapy',
      'Traditional culinary arts lesson with heritage family',
      'Kathakali private performance under ancient banyan trees',
      'Guided canoe exploration of bird sanctuaries'
    ]
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan Palaces',
    tagline: 'Royal Fortresses & Majestic Desert Havens',
    description: 'Live like royalty in carefully restored 18th-century clifftop fortresses and floating lake palaces. Witness stunning desert sunsets over Udaipur\'s Lake Pichola while enjoying gold-leaf dinners under regal arches.',
    location: 'Udaipur, India',
    rating: 4.96,
    bgImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'From $2,100 / night',
    highlights: [
      'Heritage suites with 24-karat gold frescoes',
      'Champagne cruises on a historic private royal barge',
      'Private vintage car collection transfers',
      'Royal equestrian falconry demonstrations'
    ],
    activities: [
      'Exclusive high-jewelry masterclass with imperial artisans',
      'Private rooftop sitar and sufi vocal concerts',
      'Astronomical desert stargazing with vintage telescopes',
      'Authentic Rajasthani culinary feast in a secret oasis'
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh Highlands',
    tagline: 'Glacial Monasteries & High-Altitude Glamping',
    description: 'Escape to ultra-luxurious heated geodesic domes set amidst the rugged, snow-capped Himalayas. Embark on spiritual morning prayers in ancient cliffside monasteries and trek through high passes guided by local snow leopard trackers.',
    location: 'Ladakh, India',
    rating: 4.89,
    bgImage: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=2400&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'From $1,750 / night',
    highlights: [
      'Ultra-exclusive heated luxury camp dome',
      'VIP morning audience with senior monastery head Lama',
      'Oxygen-enriched private custom villas',
      'Private high-altitude astronomer and lounge dome'
    ],
    activities: [
      'Traditional Himalayan stone baths',
      'Private helicopter flight over Pangong Lake',
      'Ancient manuscript restoration masterclass',
      'Snow leopard preservation wildlife hike with researchers'
    ]
  }
];

// Rich custom data mapping for flight calculations & HUD parameters
const destinationFlightDetails: Record<string, {
  airport: string;
  distInt: string; // From NYC Private Terminal
  distDom: string; // From BOM Private Terminal
  heliport: string;
  durationInt: string;
  durationDom: string;
}> = {
  bali: {
    airport: 'Denpasar Private Hangar (DPS)',
    distInt: '9,640 mi',
    distDom: '3,450 mi',
    heliport: 'Amandari Heliport, Ubud',
    durationInt: '18h 30m',
    durationDom: '6h 45m'
  },
  vietnam: {
    airport: 'Da Nang VIP Terminal (DAD)',
    distInt: '8,510 mi',
    distDom: '2,620 mi',
    heliport: 'InterContinental Peninsula Heliport',
    durationInt: '16h 15m',
    durationDom: '5h 15m'
  },
  maldives: {
    airport: 'Velana Jet Centre (MLE)',
    distInt: '8,720 mi',
    distDom: '1,020 mi',
    heliport: 'Soneva Jani Private Overwater Pad',
    durationInt: '16h 45m',
    durationDom: '2h 30m'
  },
  kerala: {
    airport: 'Cochin VIP Lounge (COK)',
    distInt: '8,340 mi',
    distDom: '660 mi',
    heliport: 'Kumarakom Houseboat Pier Helipad',
    durationInt: '15h 50m',
    durationDom: '1h 20m'
  },
  rajasthan: {
    airport: 'Udaipur Royal Hangar (UDR)',
    distInt: '7,480 mi',
    distDom: '410 mi',
    heliport: 'Taj Lake Palace Rooftop Pad',
    durationInt: '14h 20m',
    durationDom: '0h 55m'
  },
  ladakh: {
    airport: 'Leh Military-VIP Base (IXL)',
    distInt: '7,150 mi',
    distDom: '1,050 mi',
    heliport: 'Thiksey Camp Heliport',
    durationInt: '13h 40m',
    durationDom: '2h 10m'
  }
};

export default function NewJourneyPage({ 
  isOpen, 
  onClose, 
  onSelectDestination, 
  onBookNow,
  initialSearchQuery = ''
}: NewJourneyPageProps) {
  
  React.useEffect(() => {
    if (isOpen) {
      if ((window as any).lenis) { (window as any).lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); };
    }
  }, [isOpen]);

  // Main filter/customizer states
  const [activeTab, setActiveTab] = useState<'all' | 'international' | 'india'>('all');
  const [selectedVibe, setSelectedVibe] = useState<string>('all');
  const [nights, setNights] = useState<number>(7);
  const [guests, setGuests] = useState<number>(2);
  const [privateJet, setPrivateJet] = useState<boolean>(false);
  const [yachtCharter, setYachtCharter] = useState<boolean>(false);
  const [selectedDestId, setSelectedDestId] = useState<string>('vietnam');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  // Comparison Tray state
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState<boolean>(false);

  // Combined list for filtering
  const allDestinations = [...curatedDestinations, ...luxuryIndiaDestinations];

  // Filter based on active geographical tab, experience vibe selection, and search query
  const filteredDestinations = allDestinations.filter(dest => {
    // 1. Geography Tab filter
    if (activeTab === 'international') {
      const isIndia = dest.location.toLowerCase() === 'india' || dest.location.toLowerCase().includes('india');
      if (isIndia) return false;
    }
    if (activeTab === 'india') {
      const isIndia = dest.location.toLowerCase() === 'india' || dest.location.toLowerCase().includes('india');
      if (!isIndia) return false;
    }

    // 2. Experience Vibe customizer filter
    if (selectedVibe !== 'all') {
      if (selectedVibe === 'wellness') {
        return dest.id === 'bali' || dest.id === 'kerala' || dest.id === 'maldives';
      }
      if (selectedVibe === 'heritage') {
        return dest.id === 'rajasthan' || dest.id === 'vietnam';
      }
      if (selectedVibe === 'alpine') {
        return dest.id === 'ladakh';
      }
      if (selectedVibe === 'coastal') {
        return dest.id === 'maldives' || dest.id === 'kerala' || dest.id === 'bali';
      }
    }

    // 3. Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchesName = dest.name.toLowerCase().includes(q);
      const matchesLocation = dest.location.toLowerCase().includes(q);
      const matchesTagline = dest.tagline.toLowerCase().includes(q);
      const matchesDescription = dest.description?.toLowerCase().includes(q) || false;
      const matchesHighlights = dest.highlights.some(hl => hl.toLowerCase().includes(q));
      if (!matchesName && !matchesLocation && !matchesTagline && !matchesDescription && !matchesHighlights) {
        return false;
      }
    }

    return true;
  });

  // Smart luxury customized price engine handling nightly vs package and currency formats perfectly
  const getCustomizedPrice = (basePriceStr: string, id: string) => {
    const numericPart = basePriceStr.replace(/[^0-9]/g, '');
    const basePrice = parseInt(numericPart, 10) || 1500;
    const isNightly = basePriceStr.toLowerCase().includes('night') || ['kerala', 'rajasthan', 'ladakh'].includes(id);
    
    let calculatedCost = 0;
    if (isNightly) {
      // Nightly rate: basePrice is per night
      calculatedCost = basePrice * nights * (1 + (guests - 1) * 0.45);
    } else {
      // Package rate: base is generally for a 3-night experience
      const packageBaseNights = id === 'bali' || id === 'vietnam' ? 3 : 4;
      calculatedCost = basePrice * (nights / packageBaseNights) * (1 + (guests - 1) * 0.45);
    }
    
    if (privateJet) calculatedCost += 15000;
    if (yachtCharter) calculatedCost += 8500;
    
    const isRupee = basePriceStr.includes('₹');
    return new Intl.NumberFormat(isRupee ? 'en-IN' : 'en-US', { 
      style: 'currency', 
      currency: isRupee ? 'INR' : 'USD', 
      maximumFractionDigits: 0 
    }).format(calculatedCost);
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        if (prev.length >= 3) return prev;
        return [...prev, id];
      }
    });
    setCompareOpen(true);
  };

  // Extract selected destination parameters for the HUD
  const selectedDest = allDestinations.find(d => d.id === selectedDestId) || allDestinations[0];
  const hudDetails = destinationFlightDetails[selectedDest.id] || {
    airport: 'VIP Private Hangar',
    distInt: '8,500 mi',
    distDom: '1,200 mi',
    heliport: 'Sanctuary Heliport',
    durationInt: '16h 00m',
    durationDom: '2h 30m'
  };

  // Determine departure terminal based on geography
  const isDomesticDep = activeTab === 'india' || selectedDest.location.toLowerCase().includes('india');
  const departureTerm = isDomesticDep 
    ? 'Mumbai VIP Jet Terminal (BOM)' 
    : 'New York JFK Private Hangar (JFK)';
  const flightDistance = isDomesticDep ? hudDetails.distDom : hudDetails.distInt;
  const flightDuration = isDomesticDep ? hudDetails.durationDom : hudDetails.durationInt;

  return (
    <div className="flex-1 min-h-screen bg-[#050507] text-white flex flex-col font-sans relative select-none selection:bg-amber-400/20 selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: IMMERSIVE VISUAL HERO (MATCHING USER SCREENSHOT EXACTLY) */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pb-24 overflow-hidden shrink-0">
        
        {/* Full screen background image of Trang An/Ninh Binh, Vietnam (Canyon with Pagoda temple on lake) */}
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async" 
            src="https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=2400&q=80" 
            alt="Trang An, Ninh Binh, Vietnam Bespoke Sanctuary Background" 
            className="w-full h-full object-cover object-center scale-[1.01] filter brightness-[0.55] contrast-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette and rich darkness transitions to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#050507]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* ELEGANT TOP BAR HEADER */}
        <header className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-8 flex justify-between items-center bg-transparent shrink-0">
          {/* TouraLuxe white badge pill */}
          <div className="flex items-center gap-4">
            <div></div>
          </div>

          {/* Top Right Home & Close Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="bg-black/50 backdrop-blur-md hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full flex items-center gap-2 text-white text-xs font-bold tracking-[0.18em] uppercase transition-all cursor-pointer outline-none shadow-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>HOME</span>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* HERO MAIN TEXT & TABS BAR (LEFT-ALIGNED AS SHOWN IN THE SCREENSHOT) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-end text-left pb-16">
          
          <div className="max-w-4xl space-y-6">
            {/* Global Manifest Badge */}
            <div className="flex items-center gap-2 text-white/50 mb-2">
              <Globe className="w-4 h-4 text-white/40" />
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase">
                GLOBAL MANIFEST
              </span>
            </div>

            {/* Typographic Heading Pair */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[6rem] xl:text-[6.5rem] tracking-tight leading-[0.95] select-none">
              <span className="font-sans font-extrabold text-white block">Discover Your</span>
              <span className="font-serif italic font-light text-neutral-300 block mt-2">Next Chapter.</span>
            </h1>
            
            {/* Sub-caption */}
            <p className="text-sm sm:text-base md:text-lg font-sans text-neutral-300/80 font-light max-w-xl leading-relaxed pt-2">
              Moments that move you. Places you'll never forget.
            </p>

            {/* Interactive Navigation Pills (Tabs) */}
            <div className="flex flex-wrap gap-3 pt-8 md:pt-10">
              {/* ALL DESTINATIONS TAB */}
              <button
                onClick={() => setActiveTab('all')}
                className={`transition-all duration-300 uppercase ${
                  activeTab === 'all'
                    ? 'bg-white text-black font-sans font-bold text-[10px] tracking-[0.2em] px-6 py-3.5 rounded-full flex items-center gap-2 shadow-lg scale-100'
                    : 'bg-black/30 hover:bg-black/50 border border-white/10 text-white/70 hover:text-white font-sans font-bold text-[10px] tracking-[0.2em] px-6 py-3.5 rounded-full flex items-center gap-2'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>ALL DESTINATIONS</span>
              </button>

              {/* INTERNATIONAL TAB */}
              <button
                onClick={() => setActiveTab('international')}
                className={`transition-all duration-300 uppercase ${
                  activeTab === 'international'
                    ? 'bg-white text-black font-sans font-bold text-[10px] tracking-[0.2em] px-6 py-3.5 rounded-full flex items-center gap-2 shadow-lg scale-100'
                    : 'bg-black/30 hover:bg-black/50 border border-white/10 text-white/70 hover:text-white font-sans font-bold text-[10px] tracking-[0.2em] px-6 py-3.5 rounded-full flex items-center gap-2'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>INTERNATIONAL</span>
              </button>

              {/* INDIA TAB */}
              <button
                onClick={() => setActiveTab('india')}
                className={`transition-all duration-300 uppercase ${
                  activeTab === 'india'
                    ? 'bg-white text-black font-sans font-bold text-[10px] tracking-[0.2em] px-6 py-3.5 rounded-full flex items-center gap-2 shadow-lg scale-100'
                    : 'bg-black/30 hover:bg-black/50 border border-white/10 text-white/70 hover:text-white font-sans font-bold text-[10px] tracking-[0.2em] px-6 py-3.5 rounded-full flex items-center gap-2'
                }`}
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>INDIA</span>
              </button>
            </div>
          </div>

        </div>

        {/* Scroll indicator pointing down */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-neutral-500 font-mono text-[8px] tracking-[0.2em] select-none pointer-events-none animate-pulse">
          <span>SCROLL TO DISCOVER SANCTUARIES</span>
          <div className="w-4.5 h-7 rounded-full border border-neutral-800 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-neutral-400"
            />
          </div>
        </div>
      </section>      {/* SECTION 2: THE DESTINATIONS SHOWROOM GRID */}
      <section id="showroom" className="bg-[#050507] pt-16 pb-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Integrated Search & Filter HUD */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-neutral-950/40 border border-white/5 rounded-3xl p-4">
            <div className="flex items-center gap-2.5 text-left">
              <Globe className="w-4.5 h-4.5 text-amber-500 shrink-0" />
              <div>
                <h3 className="text-sm font-sans font-bold tracking-[0.2em] uppercase text-white">
                  Signature Reserves
                </h3>
                <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                  Discover curated experiences of absolute distinction
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-72">
                <div className="bg-neutral-900/60 border border-white/10 hover:border-white/20 focus-within:border-white/30 transition-all rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-inner">
                  <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input 
                    type="text"
                    placeholder="Search sanctuaries, tags, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-white text-xs font-sans placeholder-neutral-500 focus:outline-none w-full"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-neutral-500 hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Info Text about results */}
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest px-2 font-medium shrink-0 whitespace-nowrap self-center">
                {filteredDestinations.length} matching {filteredDestinations.length === 1 ? 'sanctuary' : 'sanctuaries'}
              </div>
            </div>
          </div>

          {/* Showroom Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredDestinations.map((dest, idx) => {
                    const isSelected = selectedDestId === dest.id;
                    const isCompared = compareList.includes(dest.id);
                    return (
                      <motion.div
                        layout
                        key={dest.id}
                        initial={{ opacity: 0, scale: 0.96, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 15 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => {
                          setSelectedDestId(dest.id);
                        }}
                        className={`group relative rounded-[2rem] overflow-hidden border flex flex-col justify-between p-5 transition-all duration-500 shadow-xl text-left cursor-pointer ${
                          isSelected 
                            ? 'border-[#d4af37]/75 bg-white/[0.03] shadow-[#d4af37]/[0.02]' 
                            : 'border-white/5 bg-black/40 hover:border-white/15 hover:bg-black/60'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#d4af37]" />
                        )}

                        <div className="space-y-4">
                          {/* Visual Card image */}
                          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 bg-neutral-950">
                            <img loading="lazy" decoding="async" 
                              src={dest.bgImage} 
                              alt={dest.name} 
                              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 text-[9px] text-amber-400 font-mono flex items-center gap-1 font-semibold">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              {dest.rating}
                            </div>
                            
                            <div className="absolute top-3.5 right-3.5 bg-black/75 border border-white/10 rounded-full px-3 py-1 text-[8px] font-mono text-neutral-300 uppercase tracking-widest font-semibold">
                              {dest.id === 'bali' || dest.id === 'kerala' || dest.id === 'maldives' ? 'Wellness Zen' : dest.id === 'rajasthan' || dest.id === 'vietnam' ? 'Royal Reserve' : 'Alpine Sanctuary'}
                            </div>
                          </div>

                          <div className="space-y-1.5 px-1">
                            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block">
                              {dest.location}
                            </span>
                            <h3 className="text-xl font-serif text-white group-hover:text-amber-400 transition-colors font-semibold">
                              {dest.name}
                            </h3>
                            <p className="text-neutral-400 text-xs font-light line-clamp-2 leading-relaxed">
                              {dest.tagline}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1 px-1">
                            {dest.highlights.slice(0, 2).map((hl, hIdx) => (
                              <span key={hIdx} className="text-[8px] font-mono uppercase bg-white/5 text-neutral-300 px-2.5 py-1 rounded-full border border-white/5">
                                {hl}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 px-1">
                          <div className="space-y-0.5">
                            <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">EXCLUSIVE RATE</span>
                            <span className="text-white text-xs font-semibold font-mono">
                              {dest.price}
                            </span>
                          </div>
                          
                          <div className="flex gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCompare(dest.id);
                              }}
                              className={`px-3 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase border transition-all cursor-pointer outline-none ${
                                isCompared 
                                  ? 'bg-amber-400/25 border-amber-400 text-amber-300 font-bold' 
                                  : 'bg-white/5 hover:bg-white/10 border-white/5 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {isCompared ? 'ADDED' : 'COMPARE'}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectDestination(dest.id);
                              }}
                              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[9px] font-mono tracking-widest uppercase border border-white/5 text-neutral-300 transition-colors cursor-pointer outline-none"
                            >
                              SPECS
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookNow(dest.id);
                              }}
                              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-200 text-black text-[9px] font-mono tracking-widest uppercase font-bold flex items-center gap-1 transition-all cursor-pointer outline-none"
                            >
                              RESERVE
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

        </div>
      </section>

      {/* SECTION 4: THE FLOATING COMPARISON PANEL */}
      <AnimatePresence>
        {compareOpen && compareList.length > 0 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed bottom-0 left-0 w-full bg-neutral-950/95 backdrop-blur-md border-t border-white/10 z-50 p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5 text-left">
                <RefreshCw className="w-4 h-4 text-[#d4af37] animate-[spin_4s_linear_infinite]" />
                <div>
                  <h4 className="text-sm font-mono tracking-widest text-neutral-300 uppercase font-semibold">Sanctuaries Comparison Desk ({compareList.length}/3)</h4>
                  <p className="text-[10px] text-neutral-500 font-light">Directly compare our bespoke signature reserves and global sanctuaries.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setCompareList([])}
                  className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[9px] font-mono tracking-widest text-neutral-400 hover:text-white uppercase outline-none"
                >
                  CLEAR ALL
                </button>
                <button
                  onClick={() => setCompareOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-white text-black font-mono font-bold text-[9px] tracking-widest uppercase outline-none"
                >
                  MINIMIZE
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-left">
              {compareList.map(cid => {
                const dest = allDestinations.find(d => d.id === cid);
                if (!dest) return null;
                return (
                  <div key={dest.id} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl relative space-y-4">
                    <button
                      onClick={() => toggleCompare(dest.id)}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">{dest.location}</span>
                      <h5 className="text-base font-serif text-white font-semibold">{dest.name}</h5>
                      <span className="text-amber-400 font-mono text-xs font-bold block">
                        {dest.price}
                      </span>
                    </div>

                    <hr className="border-white/5" />

                    <div className="space-y-2">
                      <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block">HIGHLIGHTS</span>
                      <ul className="space-y-1 text-[10px] text-neutral-400 font-light">
                        {dest.highlights.slice(0, 3).map((hl, hIdx) => (
                          <li key={hIdx} className="flex gap-1.5 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block">ACTIVITIES</span>
                      <div className="flex flex-wrap gap-1">
                        {dest.activities.slice(0, 2).map((act, aIdx) => (
                          <span key={aIdx} className="text-[8px] bg-white/5 text-neutral-400 px-2 rounded border border-white/5 font-mono">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <button
                        onClick={() => {
                          setCompareOpen(false);
                          onSelectDestination(dest.id);
                        }}
                        className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[9px] font-mono tracking-widest uppercase border border-white/5 transition-all text-center"
                      >
                        SPECS
                      </button>
                      <button
                        onClick={() => {
                          setCompareOpen(false);
                          onBookNow(dest.id);
                        }}
                        className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-[9px] font-mono tracking-widest font-bold uppercase transition-all text-center animate-pulse"
                      >
                        RESERVE
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
