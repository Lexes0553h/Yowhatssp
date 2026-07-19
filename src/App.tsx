import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { 
  Plane, Search, ArrowRight, MapPin, Compass, Users, Mountain, Heart, Briefcase, Sparkles, Cpu, MessageCircle
} from 'lucide-react';

import LoadingScreen from './components/LoadingScreen';
import BookingPlanner from './components/BookingPlanner';
import BookingTracker from './components/BookingTracker';
import CustomCursor from './components/CustomCursor';
import Magnetic from './components/Magnetic';
import { curatedDestinations } from './data';
import { BookingRequest, Destination } from './types';
import DestinationDetails from './components/DestinationDetails';
import ServiceDetails from './components/ServiceDetails';
import AirplaneAnimation from './components/AirplaneAnimation';
import ScrollSequence from './components/ScrollSequence';
import NewJourneyPage, { luxuryIndiaDestinations } from './components/NewJourneyPage';
import ExplorePage from './components/ExplorePage';
import BespokePage from './components/BespokePage';
import TrackBookingPage from './components/TrackBookingPage';
import TermsPage from './components/TermsPage';
import FloatingTabBar from './components/FloatingTabBar';
import { ScrollToOnMount } from './components/ScrollToOnMount';

// Newly extracted components
import MarqueeSection from './components/MarqueeSection';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Static/constant lists kept out of components for performance optimization
const serviceDivisions = [
  {
    id: 'luxury-tours',
    title: 'Luxury Tours',
    subtitle: 'SERVICE DIVISION',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
    icon: 'Compass'
  },
  {
    id: 'group-trips',
    title: 'Group Trips',
    subtitle: 'SERVICE DIVISION',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    icon: 'Users'
  },
  {
    id: 'adventure-tours',
    title: 'Adventure Tours',
    subtitle: 'SERVICE DIVISION',
    image: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=600&q=80',
    icon: 'Mountain'
  },
  {
    id: 'luxury-honeymoons',
    title: 'Luxury Honeymoons',
    subtitle: 'SERVICE DIVISION',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    icon: 'Heart'
  },
  {
    id: 'mice-events',
    title: 'MICE Events',
    subtitle: 'SERVICE DIVISION',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    icon: 'Briefcase'
  },
  {
    id: 'custom-journeys',
    title: 'Custom Journeys',
    subtitle: 'SERVICE DIVISION',
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80',
    icon: 'Sparkles'
  },
  {
    id: 'ai-travel',
    title: 'AI Travel Planner',
    subtitle: 'SERVICE DIVISION',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80',
    icon: 'Cpu'
  }
];

const craftJourneySlides = [
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'NUSA PENIDA, BALI',
    quote: 'Bali sun, saltwater, and smiles.',
    duration: '3 Nights 4 Days',
    idealFor: 'Couples, Families',
    flightStatus: 'Excluded',
    price: '₹82,950',
    priceNote: ' / PERSON\nINCL. TAX',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    hasFlightsBadge: false
  },
  {
    id: 'maldives',
    name: 'Maldives',
    tagline: 'MALDIVE ISLANDS, MALDIVES',
    quote: 'Crystal waters, crystal memories',
    duration: '4 Nights 5 Days',
    idealFor: 'Solo, Couple, Group',
    flightStatus: 'Excluded',
    price: '₹1,06,500',
    priceNote: ' / PERSON\nINCL. TAX + FLIGHT EST.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    hasFlightsBadge: false
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    tagline: 'VIETNAM',
    quote: 'Vietnam-Timeless charm',
    duration: '3 Nights 4 Days',
    idealFor: 'Solo, Couple, Groups',
    flightStatus: 'Included',
    price: '₹1,09,000',
    originalPrice: '₹1,19,500',
    priceNote: ' / PERSON\nINCL. TAX & RT FLIGHTS',
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=800&q=80',
    hasFlightsBadge: true
  }
];

const heroBackgrounds = [
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2400&q=80', // Maldives Beach
  'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=2400&q=80', // Swiss Alps Chalet
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2400&q=80', // Italian Amalfi Coast
  'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=80', // Rajasthan Palace
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2400&q=80'  // Kyoto Sanctuary
];

const renderDivisionIcon = (iconName: string) => {
  switch (iconName) {
    case 'Compass': return <Compass className="w-4 h-4 text-white/70" />;
    case 'Users': return <Users className="w-4 h-4 text-white/70" />;
    case 'Mountain': return <Mountain className="w-4 h-4 text-white/70" />;
    case 'Heart': return <Heart className="w-4 h-4 text-white/70" />;
    case 'Briefcase': return <Briefcase className="w-4 h-4 text-white/70" />;
    case 'Sparkles': return <Sparkles className="w-4 h-4 text-white/70" />;
    case 'Cpu': return <Cpu className="w-4 h-4 text-white/70" />;
    default: return <Compass className="w-4 h-4 text-white/70" />;
  }
};

const line1Words = "We don't sell trips.".split(" ");
const line2Words = "We craft experiences.".split(" ");

const heroHeadlineContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    }
  }
};

const wordVariants = {
  hidden: { 
    y: "115%", 
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [revealWebsite, setRevealWebsite] = useState(false);
  const [currentHeroBgIdx, setCurrentHeroBgIdx] = useState(0);

  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setCurrentHeroBgIdx((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [loading]);

  const [plannerOpen, setPlannerOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [selectedDestId, setSelectedDestId] = useState<string | undefined>(undefined);
  const [activeBookings, setActiveBookings] = useState<BookingRequest[]>([]);
  const [visibleHeader, setVisibleHeader] = useState(true);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const lastScrollYRef = useRef(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // States for the detailed destination page
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsDest, setDetailsDest] = useState<Destination | null>(null);

  // State for the full New Journey page
  const [newJourneyOpen, setNewJourneyOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [initialExploreQuery, setInitialExploreQuery] = useState('');
  const [initialExploreDestId, setInitialExploreDestId] = useState<string | null>(null);
  const [bespokeDestId, setBespokeDestId] = useState<'bali' | 'maldives' | 'vietnam' | null>(null);
  const [trackBookingOpen, setTrackBookingOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const previousHash = useRef(window.location.hash);
  const savedScrollPos = useRef(0);
  const [journeyAutoplayPaused, setJourneyAutoplayPaused] = useState(false);

  // Synchronize hash routing with pages for a true separate webpage feel
  useEffect(() => {
    const handleHash = () => {
      const currentHash = window.location.hash;
      previousHash.current = currentHash;

      if (currentHash === '#/new-journey') {
        setNewJourneyOpen(true);
        setExploreOpen(false);
        setBespokeDestId(null);
        setSelectedServiceId(null);
        setTrackBookingOpen(false);
        setTermsOpen(false);
      } else if (currentHash === '#/explore') {
        setExploreOpen(true);
        setNewJourneyOpen(false);
        setBespokeDestId(null);
        setSelectedServiceId(null);
        setTrackBookingOpen(false);
        setTermsOpen(false);
      } else if (currentHash === '#/track-booking') {
        setTrackBookingOpen(true);
        setNewJourneyOpen(false);
        setExploreOpen(false);
        setBespokeDestId(null);
        setSelectedServiceId(null);
        setTermsOpen(false);
      } else if (currentHash === '#/terms') {
        setTermsOpen(true);
        setNewJourneyOpen(false);
        setExploreOpen(false);
        setBespokeDestId(null);
        setSelectedServiceId(null);
        setTrackBookingOpen(false);
      } else if (currentHash === '#/bali') {
        setBespokeDestId('bali');
        setNewJourneyOpen(false);
        setExploreOpen(false);
        setSelectedServiceId(null);
        setTrackBookingOpen(false);
        setTermsOpen(false);
      } else if (currentHash === '#/maldives') {
        setBespokeDestId('maldives');
        setNewJourneyOpen(false);
        setExploreOpen(false);
        setSelectedServiceId(null);
        setTrackBookingOpen(false);
        setTermsOpen(false);
      } else if (currentHash === '#/vietnam') {
        setBespokeDestId('vietnam');
        setNewJourneyOpen(false);
        setExploreOpen(false);
        setSelectedServiceId(null);
        setTrackBookingOpen(false);
        setTermsOpen(false);
      } else if (currentHash.startsWith('#/services/')) {
        const serviceId = currentHash.replace('#/services/', '');
        setSelectedServiceId(serviceId);
        setNewJourneyOpen(false);
        setExploreOpen(false);
        setBespokeDestId(null);
        setTrackBookingOpen(false);
        setTermsOpen(false);
      } else {
        setNewJourneyOpen(false);
        setExploreOpen(false);
        setBespokeDestId(null);
        setSelectedServiceId(null);
        setTrackBookingOpen(false);
        setTermsOpen(false);
      }
    };
    
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    if (loading) return;

    // Respect prefers-reduced-motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    (window as any).lenis = new Lenis({
      duration: 1.8, // Softer, cinematic duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky expo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85, // Subtle momentum
      touchMultiplier: 1.5,
      lerp: 0.08, // Momentum easing
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    (window as any).lenis.on('scroll', ScrollTrigger.update);

    const tickHandler = (time: number) => {
      (window as any).lenis.raf(time * 1000);
    };
    
    // Add Lenis's raf to GSAP's ticker
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0); // Prevent lag/jumps

    return () => {
      (window as any).lenis.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, [loading]);

  // Handle header auto-hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolledPastHero(currentScrollY > 150);

      const lastScrollY = lastScrollYRef.current;
      
      if (currentScrollY < 10) {
        setVisibleHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setVisibleHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setVisibleHeader(true);
      }

      lastScrollYRef.current = currentScrollY;
      
      const hash = window.location.hash;
      if (hash === '' || hash === '#/') {
        savedScrollPos.current = currentScrollY;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isNearTop = e.clientY < 110;
      const isMovingUpwards = e.movementY < -6 && e.clientY < 320;
      if (isNearTop || isMovingUpwards) {
        setVisibleHeader(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleBookingCreated = (newBooking: BookingRequest) => {
    setActiveBookings(prev => [newBooking, ...prev]);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.hash = '#/explore';
  };

  const handleViewDetails = (destId: string) => {
    if (['bali', 'maldives', 'vietnam'].includes(destId)) {
      window.location.hash = `#/${destId}`;
      return;
    }
    const allDests = [...curatedDestinations, ...luxuryIndiaDestinations];
    const dest = allDests.find(d => d.id === destId);
    if (dest) {
      setDetailsDest(dest);
      setDetailsOpen(true);
    }
  };

  const isMainView = !newJourneyOpen && !exploreOpen && !bespokeDestId && !selectedServiceId && !trackBookingOpen && !termsOpen;

  return (
    <div className="bg-[#000000] text-neutral-100 min-h-screen relative overflow-x-hidden w-full selection:bg-purple-500/30 selection:text-white font-sans">
      {/* 1. Loading Screen Splash */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen 
            onStartExit={() => setRevealWebsite(true)}
            onComplete={() => setLoading(false)} 
          />
        )}
      </AnimatePresence>

      {revealWebsite && (
        <motion.div 
          className="relative min-h-screen flex flex-col overflow-x-clip"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Header */}
          {isMainView && (
            <Header
              visibleHeader={visibleHeader}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              isScrolledPastHero={isScrolledPastHero}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchSubmit={handleSearchSubmit}
            />
          )}

          {/* Universal Bottom Navigation Bar (Mobile) */}
          {isMainView && (
            <MobileBottomNav
              visibleHeader={visibleHeader}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          )}

          <AnimatePresence mode="wait">
            {isMainView ? (
              <motion.div
                key="landing-page-view"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col flex-1"
              >
                <ScrollToOnMount y={savedScrollPos.current} />
                {/* 4. Hero Section Fold */}
                <section 
                  id="hero-fold" 
                  className="relative min-h-screen md:h-screen md:min-h-[720px] flex flex-col justify-between items-center pt-24 md:pt-32 pb-16 md:pb-24 px-4 text-center select-none overflow-hidden"
                  style={{ backgroundColor: "#000000" }}
                >
                  {/* Visual background */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                    <AnimatePresence mode="popLayout">
                      <motion.img 
                        key={currentHeroBgIdx}
                        src={heroBackgrounds[currentHeroBgIdx]} 
                        alt="Premium Luxury Destination Sanctuary"
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 0.85, scale: 1.03 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover filter brightness-90 saturate-[1.1]"
                        style={{ objectPosition: 'center 35%' }}
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    <div 
                      className="absolute inset-0" 
                      style={{
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%, #000000 100%)"
                      }}
                    />
                    <div 
                      className="absolute inset-0" 
                      style={{
                        background: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2) 100%)"
                      }}
                    />
                  </div>

                  <div className="h-0 w-0" />

                  {/* Central Typography Heading Block */}
                  <div id="hero-headings" className="relative z-10 max-w-4xl mx-auto px-4 mt-4 md:mt-6 font-sans">
                    <motion.h2 
                      className="text-white text-[2.5rem] sm:text-[4rem] md:text-[5.2rem] lg:text-[6rem] font-serif tracking-tight leading-[1.08] drop-shadow-md font-semibold flex flex-col items-center"
                      variants={heroHeadlineContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <span className="flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden py-1">
                        {line1Words.map((word, i) => (
                          <motion.span 
                            key={i} 
                            variants={wordVariants}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </span>
                      <span className="italic font-light opacity-95 flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden py-1">
                        {line2Words.map((word, i) => (
                          <motion.span 
                            key={i} 
                            variants={wordVariants}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p 
                      className="text-white/90 text-xs sm:text-sm md:text-base font-sans font-light tracking-wide mt-5 md:mt-6 max-w-xl mx-auto drop-shadow"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                    >
                      Immersive, exclusive, and tailored entirely to your desires.
                    </motion.p>

                    {/* Trending Pill Tags */}
                    <div className="w-full flex justify-center z-10">
                      <motion.div 
                        className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3 text-[10px] md:text-xs tracking-wider relative -translate-y-4 md:-translate-y-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
                      >
                        <span className="text-white/70 uppercase tracking-[0.22em] font-semibold">Trending:</span>
                        <div className="flex gap-2.5">
                          {curatedDestinations.map((dest) => (
                            <motion.button
                              key={dest.id}
                              onClick={() => {
                                handleViewDetails(dest.id);
                              }}
                              className="px-4 py-1.5 rounded-full border border-white/20 bg-black/25 backdrop-blur-md text-white/95 text-[10px] font-mono tracking-widest cursor-pointer outline-none"
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "rgb(255,255,255)", 
                                color: "rgb(0,0,0)", 
                                borderColor: "rgb(255,255,255)", 
                                boxShadow: "0px 4px 12px rgba(255,255,255,0.18)" 
                              }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              {dest.name.toUpperCase()}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Real Search Bar & Actions Container placed below Trending section */}
                  <motion.div 
                    id="global-sticky-search-bar"
                    className="w-full flex justify-center z-20 mt-8 md:mt-12 -translate-y-4 md:-translate-y-6"
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div id="hero-bottom-actions" className="pointer-events-auto relative w-full max-w-3xl flex flex-row items-center justify-center gap-2 md:gap-4 px-2 sm:px-0">
                      {/* Main Search Capsule */}
                      <form 
                        onSubmit={handleSearchSubmit}
                        className="flex bg-black/60 backdrop-blur-md border-2 border-white/15 rounded-full px-3 py-2 md:px-6 md:py-4 items-center justify-between w-full max-w-[280px] sm:max-w-md md:max-w-[530px] shadow-2xl shadow-black/80"
                      >
                        <div className="flex items-center gap-2 md:gap-3 flex-1 pl-1">
                          <Search className="w-4 h-4 md:w-5 md:h-5 text-white/60 shrink-0" />
                          <input 
                            type="text" 
                            placeholder="WHERE WILL YOUR NEXT JOURNEY BEGIN?" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none text-white text-[8px] sm:text-[10px] md:text-xs font-sans tracking-widest font-semibold placeholder-white/50 focus:outline-none w-full min-w-[50px]"
                          />
                        </div>
                        
                        <Magnetic strength={0.35}>
                          <motion.button 
                            type="submit"
                            className="bg-gradient-to-r from-[#d4a5e8] to-[#f4c3f5] text-black text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.18em] px-3 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-1 md:gap-1.5 uppercase shrink-0 cursor-pointer border-none outline-none ml-1 md:ml-0"
                            whileHover={{ 
                              scale: 1.04,
                              boxShadow: "0px 8px 16px rgba(244,195,245,0.5)", 
                              filter: "brightness(1.08)" 
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            Explore <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[2.5px]" />
                          </motion.button>
                        </Magnetic>
                      </form>

                      {/* Float Whatsapp Icon circle */}
                      <Magnetic strength={0.2} snapRadius={55}>
                        <motion.a 
                          id="whatsapp-concierge"
                          href="https://wa.me/18008687258" 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full bg-black/45 border border-emerald-500/80 items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 shrink-0 relative group cursor-pointer decoration-transparent"
                          aria-label="Direct WhatsApp Private Concierge"
                          whileHover={{ 
                            scale: 1.1, 
                            borderColor: "#10b981", 
                            backgroundColor: "rgba(16,185,129,0.1)", 
                            boxShadow: "0px 0px 18px rgba(16,185,129,0.55)" 
                          }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <span className="hidden">WhatsApp Contact</span>
                          <MessageCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform text-emerald-400 group-hover:text-emerald-300" />
                          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 translate-y-1 group-hover:translate-y-0 bg-neutral-950/95 backdrop-blur-md border border-emerald-500/30 text-[8px] text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap tracking-[0.14em] uppercase font-sans font-semibold shadow-lg shadow-black/80 pointer-events-none">
                            Need Help Planning? Talk To Us!
                          </span>
                        </motion.a>
                      </Magnetic>
                    </div>
                  </motion.div>
                </section>

                {/* 4b. Dynamic Moving Typography Section */}
                <MarqueeSection />

                {/* 5. Beyond First Class Section */}
                <section 
                  id="services-section" 
                  className="py-16 md:py-24 bg-black text-white relative overflow-hidden px-4 sm:px-6 lg:px-8 font-sans"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,15,20,0.8)_0%,rgba(0,0,0,1)_100%)] z-0 pointer-events-none" />
                  <div className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />
                  <div className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-pink-900/10 rounded-full blur-[160px] pointer-events-none" />

                  <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-left mb-10 md:mb-16 space-y-4 max-w-3xl"
                    >
                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight font-semibold">
                        Beyond First Class.
                      </h3>
                      <p className="text-neutral-400 text-sm sm:text-base font-light tracking-wide max-w-xl leading-relaxed">
                        Our specialized divisions cater to every facet of high-end lifestyle and corporate excellence.
                      </p>
                    </motion.div>

                    <div className="relative">
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                        {serviceDivisions.map((div, idx) => (
                          <motion.div
                            key={div.id}
                            initial={{ opacity: 0, y: 40, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                              duration: 0.8,
                              ease: [0.16, 1, 0.3, 1],
                              delay: idx * 0.08
                            }}
                            style={{ willChange: "transform, opacity" }}
                            className="relative aspect-[3/4] rounded-[24px] overflow-hidden border border-white/10 group cursor-pointer shadow-2xl bg-neutral-900"
                            whileHover={{ 
                              y: -8,
                              borderColor: "rgba(244,195,245,0.4)",
                              boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212,165,232,0.15)"
                            }}
                            onClick={() => {
                              window.location.hash = `#/services/${div.id}`;
                            }}
                          >
                            <div className="absolute inset-0 z-0">
                              <img loading="lazy" decoding="async" 
                                src={div.image} 
                                alt={div.title}
                                className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </div>

                            <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center scale-75 sm:scale-100 origin-top-left">
                              {renderDivisionIcon(div.icon)}
                            </div>

                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 space-y-1">
                              <p className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-mono text-neutral-400 font-semibold leading-tight line-clamp-1">
                                {div.subtitle}
                              </p>
                              <h4 className="text-lg sm:text-2xl font-serif italic text-white font-medium group-hover:text-purple-200 transition-colors leading-tight sm:leading-normal">
                                {div.title}
                              </h4>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
                </section>

                {/* 6. Craft New Journey Section */}
                <section 
                  id="destinations-section" 
                  className="py-16 md:py-24 bg-[#050506] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-white/5 font-sans"
                  onMouseEnter={() => setJourneyAutoplayPaused(true)}
                  onMouseLeave={() => setJourneyAutoplayPaused(false)}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(10,10,15,0.7)_0%,rgba(0,0,0,1)_100%)] z-0 pointer-events-none" />
                  <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

                  <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-left mb-8 md:mb-16 space-y-4"
                    >
                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight font-semibold">
                        Craft New Journey.
                      </h3>
                    </motion.div>

                    <div className="space-y-8 md:space-y-32 lg:space-y-48">
                      {craftJourneySlides.map((slide, sIdx) => (
                        <motion.div 
                          key={slide.id}
                          initial={{ opacity: 0, y: 60 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          style={{ willChange: "transform, opacity" }}
                          className="grid grid-cols-1 lg:grid-cols-2 items-center border-b border-white/5 last:border-b-0"
                        >
                          {sIdx % 2 === 0 ? (
                            <>
                              <motion.div 
                                className="relative aspect-[4/3] rounded-[24px] overflow-hidden border-2 border-[#d4af37]/30 shadow-2xl group cursor-pointer"
                                onClick={() => handleViewDetails(slide.id)}
                                whileHover={{ scale: 1.015 }}
                                transition={{ duration: 0.5 }}
                              >
                                <img loading="lazy" decoding="async" 
                                  src={slide.image} 
                                  alt={slide.name}
                                  className="w-full h-full object-cover filter brightness-[0.85] saturate-[1.05] transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 group-hover:brightness-[0.95]"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                              </motion.div>

                              <div className="text-left pl-0 lg:pl-12 space-y-6">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 bg-black/45 text-[9px] text-[#d4af37] font-mono tracking-widest font-semibold uppercase flex items-center shadow-sm">
                                    <MapPin className="w-3 h-3 text-[#d4af37] mr-1" />
                                    {slide.tagline}
                                  </span>
                                  {slide.hasFlightsBadge && (
                                    <span className="px-3.5 py-1.5 rounded-full bg-sky-950/40 text-sky-400 border border-sky-400/30 text-[9px] font-mono tracking-widest font-bold uppercase flex items-center shadow-sm">
                                      <Plane className="w-3 h-3 text-sky-400 transform rotate-45 mr-1" />
                                      FLIGHTS INCL.
                                    </span>
                                  )}
                                </div>

                                <h4 className="text-5xl sm:text-6xl font-serif italic text-[#e2b43b] font-medium tracking-tight">
                                  {slide.name}
                                </h4>

                                <p className="text-neutral-300 font-serif italic text-sm sm:text-base font-light tracking-wide max-w-xl">
                                  "{slide.quote}"
                                </p>

                                <div className="grid grid-cols-3 border-y border-white/10 py-4 gap-4 text-xs font-mono">
                                  <div>
                                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-semibold mb-1">DURATION</span>
                                    <span className="text-white font-medium">{slide.duration}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-semibold mb-1">IDEAL FOR</span>
                                    <span className="text-white font-medium">{slide.idealFor}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-semibold mb-1">FLIGHT STATUS</span>
                                    <span className="text-white font-medium">{slide.flightStatus}</span>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div>
                                    <div className="flex items-baseline flex-wrap gap-1">
                                      <span className="text-white font-mono text-2xl sm:text-3xl font-bold tracking-tight">
                                        From {slide.price}
                                      </span>
                                      <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                                        / PERSON
                                      </span>
                                      {slide.originalPrice && (
                                        <span className="text-neutral-500 line-through text-xs font-mono ml-2">
                                          {slide.originalPrice}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-500 leading-none uppercase tracking-widest block font-semibold mt-1">
                                      {slide.priceNote ? slide.priceNote.replace('/ PERSON\n', '').replace(' / PERSON\n', '') : "INCL. TAX"}
                                    </span>
                                  </div>

                                  <Magnetic strength={0.3}>
                                    <motion.button
                                      onClick={() => handleViewDetails(slide.id)}
                                      className="px-8 py-3.5 bg-black border border-white/20 hover:border-purple-400 rounded-full text-xs font-bold tracking-widest text-neutral-200 hover:text-white uppercase cursor-pointer outline-none shadow-lg shadow-black/50"
                                      whileHover={{ 
                                        scale: 1.05,
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                        boxShadow: "0px 8px 24px rgba(212,165,232,0.12)"
                                      }}
                                      whileTap={{ scale: 0.96 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      REQUEST ACCESS
                                    </motion.button>
                                  </Magnetic>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-left pr-0 lg:pr-12 space-y-6 order-2 lg:order-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 bg-black/45 text-[9px] text-[#d4af37] font-mono tracking-widest font-semibold uppercase flex items-center shadow-sm">
                                    <MapPin className="w-3 h-3 text-[#d4af37] mr-1" />
                                    {slide.tagline}
                                  </span>
                                  {slide.hasFlightsBadge && (
                                    <span className="px-3.5 py-1.5 rounded-full bg-sky-950/40 text-sky-400 border border-sky-400/30 text-[9px] font-mono tracking-widest font-bold uppercase flex items-center shadow-sm">
                                      <Plane className="w-3 h-3 text-sky-400 transform rotate-45 mr-1" />
                                      FLIGHTS INCL.
                                    </span>
                                  )}
                                </div>

                                <h4 className="text-5xl sm:text-6xl font-serif italic text-[#e2b43b] font-medium tracking-tight">
                                  {slide.name}
                                </h4>

                                <p className="text-neutral-300 font-serif italic text-sm sm:text-base font-light tracking-wide max-w-xl">
                                  "{slide.quote}"
                                </p>

                                <div className="grid grid-cols-3 border-y border-white/10 py-4 gap-4 text-xs font-mono">
                                  <div>
                                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-semibold mb-1">DURATION</span>
                                    <span className="text-white font-medium">{slide.duration}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-semibold mb-1">IDEAL FOR</span>
                                    <span className="text-white font-medium">{slide.idealFor}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-semibold mb-1">FLIGHT STATUS</span>
                                    <span className="text-white font-medium">{slide.flightStatus}</span>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div>
                                    <div className="flex items-baseline flex-wrap gap-1">
                                      <span className="text-white font-mono text-2xl sm:text-3xl font-bold tracking-tight">
                                        From {slide.price}
                                      </span>
                                      <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                                        / PERSON
                                      </span>
                                      {slide.originalPrice && (
                                        <span className="text-neutral-500 line-through text-xs font-mono ml-2">
                                          {slide.originalPrice}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-500 leading-none uppercase tracking-widest block font-semibold mt-1">
                                      {slide.priceNote ? slide.priceNote.replace('/ PERSON\n', '').replace(' / PERSON\n', '') : "INCL. TAX"}
                                    </span>
                                  </div>

                                  <Magnetic strength={0.3}>
                                    <motion.button
                                      onClick={() => handleViewDetails(slide.id)}
                                      className="px-8 py-3.5 bg-black border border-white/20 hover:border-purple-400 rounded-full text-xs font-bold tracking-widest text-neutral-200 hover:text-white uppercase cursor-pointer outline-none shadow-lg shadow-black/50"
                                      whileHover={{ 
                                        scale: 1.05,
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                        boxShadow: "0px 8px 24px rgba(212,165,232,0.12)"
                                      }}
                                      whileTap={{ scale: 0.96 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      REQUEST ACCESS
                                    </motion.button>
                                  </Magnetic>
                                </div>
                              </div>

                              <motion.div 
                                className="relative aspect-[4/3] rounded-[24px] overflow-hidden border-2 border-[#d4af37]/30 shadow-2xl group order-1 lg:order-2 cursor-pointer"
                                onClick={() => handleViewDetails(slide.id)}
                                whileHover={{ scale: 1.015 }}
                                transition={{ duration: 0.5 }}
                              >
                                <img loading="lazy" decoding="async" 
                                  src={slide.image} 
                                  alt={slide.name}
                                  className="w-full h-full object-cover filter brightness-[0.85] saturate-[1.05] transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 group-hover:brightness-[0.95]"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                              </motion.div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
                </section>

                {/* 7. Cinematic Airplane Flight & Experience Section */}
                <AirplaneAnimation 
                  loading={loading}
                  setPlannerOpen={setPlannerOpen}
                  setSelectedDestId={setSelectedDestId}
                >
                  {/* 6.5 Scroll Animation Sequence (Right before footer) */}
                  <ScrollSequence />
                  
                  {/* 8. Elegant High-End Redesigned Footer */}
                  <Footer />
                </AirplaneAnimation>
              </motion.div>
            ) : selectedServiceId ? (
              <ServiceDetails 
                key={`service-${selectedServiceId}`}
                isOpen={!!selectedServiceId}
                onClose={() => {
                  window.location.hash = '#/';
                }}
                divisionId={selectedServiceId}
                onBookNow={(divId) => {
                  if (divId === 'luxury-honeymoons') {
                    setSelectedDestId('maldives');
                  } else {
                    setSelectedDestId(undefined);
                  }
                  setPlannerOpen(true);
                }}
              />
            ) : newJourneyOpen ? (
              <motion.div
                key="new-journey-page-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full min-h-screen bg-black flex flex-col"
              >
                <ScrollToOnMount y={0} />
                <NewJourneyPage 
                  isOpen={newJourneyOpen}
                  onClose={() => {
                    window.location.hash = '#/';
                  }}
                  onSelectDestination={handleViewDetails}
                  onBookNow={(destId) => {
                    setSelectedDestId(destId);
                    setPlannerOpen(true);
                  }}
                  initialSearchQuery={searchQuery}
                />
              </motion.div>
            ) : exploreOpen ? (
              <motion.div
                key="explore-page-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full min-h-screen bg-black flex flex-col"
              >
                <ScrollToOnMount y={0} />
                <ExplorePage 
                  isOpen={exploreOpen}
                  onClose={() => {
                    window.location.hash = '#/';
                    setInitialExploreQuery('');
                    setInitialExploreDestId(null);
                  }}
                  onSelectDestination={handleViewDetails}
                  onBookNow={(destId) => {
                    setSelectedDestId(destId);
                    setPlannerOpen(true);
                  }}
                  initialQuery={initialExploreQuery}
                  initialFocusedDestId={initialExploreDestId}
                />
              </motion.div>
            ) : trackBookingOpen ? (
              <motion.div
                key="track-booking-page-view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full min-h-screen bg-black flex flex-col"
              >
                <ScrollToOnMount y={0} />
                <TrackBookingPage 
                  isOpen={trackBookingOpen}
                  onClose={() => {
                    window.location.hash = '#/';
                  }}
                  activeBookings={activeBookings}
                />
              </motion.div>
            ) : termsOpen ? (
              <motion.div
                key="terms-page-view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full min-h-screen bg-black flex flex-col"
              >
                <ScrollToOnMount y={0} />
                <TermsPage 
                  onClose={() => {
                    window.location.hash = '#/';
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="bespoke-page-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full min-h-screen bg-black flex flex-col"
              >
                <ScrollToOnMount y={0} />
                {bespokeDestId && (
                  <BespokePage 
                    isOpen={!!bespokeDestId}
                    destId={bespokeDestId}
                    onClose={() => {
                      window.location.hash = '#/';
                    }}
                    onBookNow={() => {
                      setSelectedDestId(bespokeDestId);
                      setPlannerOpen(true);
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Modals */}
          <DestinationDetails 
            isOpen={detailsOpen}
            onClose={() => setDetailsOpen(false)}
            destination={detailsDest}
            onBookNow={(destId) => {
              setDetailsOpen(false);
              setSelectedDestId(destId);
              setPlannerOpen(true);
            }}
          />

          <BookingPlanner 
            isOpen={plannerOpen} 
            onClose={() => setPlannerOpen(false)} 
            selectedDestinationId={selectedDestId}
            onBookingCreated={handleBookingCreated}
          />

          <BookingTracker 
            isOpen={trackerOpen} 
            onClose={() => setTrackerOpen(false)} 
            activeBookings={activeBookings}
          />
        </motion.div>
      )}

      {revealWebsite && <CustomCursor />}

      {revealWebsite && (
        <FloatingTabBar
          onSearchSelect={(destId, query) => {
            setInitialExploreQuery(query);
            setInitialExploreDestId(destId);
            setExploreOpen(true);
            
            if (destId) {
              const allDests = [...curatedDestinations, ...luxuryIndiaDestinations];
              const dest = allDests.find(d => d.id === destId);
              if (dest) {
                setDetailsDest(dest);
                setDetailsOpen(true);
              }
            }
          }}
          onPlacesClick={() => {
            setExploreOpen(true);
          }}
          onBookClick={() => {
            setPlannerOpen(true);
          }}
          onServicesClick={() => {
            window.location.hash = '#/'; // Go to home to see services
            setTimeout(() => {
              const servicesSection = document.getElementById('services-section');
              if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onMenuClick={() => {
            setIsMobileMenuOpen(true);
          }}
        />
      )}
    </div>
  );
}
