import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Search, ShieldCheck } from 'lucide-react';
import Magnetic from './Magnetic';

interface HeaderProps {
  visibleHeader: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isScrolledPastHero: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
}

export default function Header({
  visibleHeader,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isScrolledPastHero,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit
}: HeaderProps) {
  
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Header & Navigation (Fixed glassmorphism bar) */}
      <header 
        id="main-header" 
        className={`fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px] transition-transform duration-500 ease-in-out ${
          visibleHeader || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between relative w-full">
          
          {/* Left Capsule Logo */}
          <div className="flex justify-start">
            <Magnetic strength={0.2}>
              <motion.div 
                id="brand-logo-container" 
                onClick={() => scrollToSection('hero-fold')}
                className="bg-white rounded-full px-4 py-1.5 flex items-center gap-1 shadow-md shadow-black/25 cursor-pointer select-none"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0px 6px 15px rgba(255,255,255,0.15)"
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <span className="font-signature text-black text-lg sm:text-xl font-bold -mt-0.5 pr-0.5 select-none whitespace-nowrap">
                  TouraLuxe
                </span>
                <Plane className="w-3 h-3 text-black transform rotate-45 -mt-0.5" />
              </motion.div>
            </Magnetic>
          </div>

          {/* Middle Section: Navigation links OR Compact Search Bar based on scroll position */}
          <div id="desktop-middle-section" className="hidden lg:flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-20">
            <AnimatePresence mode="wait">
              {!isScrolledPastHero ? (
                <motion.nav 
                  key="desktop-nav"
                  id="desktop-nav" 
                  className="flex items-center justify-center gap-6 xl:gap-8"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <Magnetic strength={0.35}>
                    <motion.button 
                      onClick={() => {
                        window.location.hash = '#/new-journey';
                      }}
                      className="text-[11px] font-sans font-semibold tracking-[0.2em] text-white/70 hover:text-white uppercase cursor-pointer bg-transparent border-none outline-none py-2 px-1 whitespace-nowrap"
                      whileHover={{ 
                        scale: 1.05,
                        textShadow: "0px 0px 8px rgba(255,255,255,0.4)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      New Journey
                    </motion.button>
                  </Magnetic>
                  <Magnetic strength={0.35}>
                    <motion.button 
                      onClick={() => scrollToSection('destinations-section')}
                      className="text-[11px] font-sans font-semibold tracking-[0.2em] text-white/70 hover:text-white uppercase cursor-pointer bg-transparent border-none outline-none py-2 px-1 whitespace-nowrap"
                      whileHover={{ 
                        scale: 1.05,
                        textShadow: "0px 0px 8px rgba(255,255,255,0.4)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      Destinations
                    </motion.button>
                  </Magnetic>
                  <Magnetic strength={0.35}>
                    <motion.button 
                      onClick={() => scrollToSection('services-section')}
                      className="text-[11px] font-sans font-semibold tracking-[0.2em] text-white/70 hover:text-white uppercase cursor-pointer bg-transparent border-none outline-none py-2 px-1 whitespace-nowrap"
                      whileHover={{ 
                        scale: 1.05,
                        textShadow: "0px 0px 8px rgba(255,255,255,0.4)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      Services
                    </motion.button>
                  </Magnetic>
                  <Magnetic strength={0.35}>
                    <motion.button 
                      onClick={() => scrollToSection('about-section')}
                      className="text-[11px] font-sans font-semibold tracking-[0.2em] text-white/70 hover:text-white uppercase cursor-pointer bg-transparent border-none outline-none py-2 px-1 whitespace-nowrap"
                      whileHover={{ 
                        scale: 1.05,
                        textShadow: "0px 0px 8px rgba(255,255,255,0.4)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      About Us
                    </motion.button>
                  </Magnetic>
                </motion.nav>
              ) : (
                <motion.form
                  key="desktop-search"
                  onSubmit={handleSearchSubmit}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 flex items-center justify-between w-[480px] xl:w-[540px] shadow-lg shadow-black/50"
                >
                  <div className="flex items-center gap-2.5 flex-1 pl-1 min-w-0">
                    <Search className="w-4 h-4 text-white/50 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="WHERE WILL YOUR NEXT JOURNEY BEGIN?" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-white text-[9px] xl:text-[10px] font-sans tracking-[0.15em] font-semibold placeholder-white/40 focus:outline-none w-full min-w-0"
                    />
                  </div>
                  
                  <Magnetic strength={0.25}>
                    <motion.button 
                      type="submit"
                      className="bg-gradient-to-r from-[#d4a5e8] to-[#f4c3f5] text-black text-[9px] font-bold tracking-[0.18em] px-4 py-2 rounded-full flex items-center gap-1 uppercase shrink-0 cursor-pointer border-none outline-none"
                      whileHover={{ 
                        scale: 1.04,
                        boxShadow: "0px 4px 10px rgba(244,195,245,0.4)"
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      Explore
                    </motion.button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side Actions: Track Your Booking + Book Now Button */}
          <div className="flex justify-end items-center gap-4">
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Magnetic strength={0.35}>
                <motion.button 
                  onClick={() => {
                    window.location.hash = '#/track-booking';
                  }}
                  className="text-[11px] font-sans font-semibold tracking-[0.2em] text-white/70 hover:text-white uppercase flex items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none py-2 px-1 whitespace-nowrap"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0px 0px 8px rgba(255,255,255,0.4)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  Track Your Booking
                </motion.button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <motion.button 
                  id="book-now-button"
                  onClick={() => {
                    window.location.hash = '#/explore';
                  }}
                  className="bg-white text-black text-[10px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 rounded-full shadow-md cursor-pointer hover:bg-neutral-100 transition-colors whitespace-nowrap"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0px 8px 20px rgba(255,255,255,0.22)" 
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  Book Now
                </motion.button>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Up-scroll Sub-header Search Bar */}
      <AnimatePresence>
        {visibleHeader && isScrolledPastHero && !isMobileMenuOpen && (
          <motion.div 
            key="mobile-sticky-search"
            id="mobile-sticky-search"
            className="lg:hidden fixed top-[78px] left-0 w-full z-30 px-4 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <form 
              onSubmit={handleSearchSubmit}
              className="pointer-events-auto bg-black/90 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 flex items-center justify-between w-full max-w-sm shadow-xl shadow-black/80"
            >
              <div className="flex items-center gap-2 flex-1 pl-1 min-w-0">
                <Search className="w-4 h-4 text-white/50 shrink-0" />
                <input 
                  type="text" 
                  placeholder="WHERE WILL YOUR NEXT JOURNEY BEGIN?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-white text-[8px] sm:text-[9px] font-sans tracking-[0.12em] font-semibold placeholder-white/45 focus:outline-none w-full min-w-0"
                />
              </div>
              <button 
                type="submit"
                className="bg-gradient-to-r from-[#d4a5e8] to-[#f4c3f5] text-black text-[9px] font-bold tracking-[0.15em] px-4 py-2 rounded-full flex items-center gap-1 uppercase shrink-0 cursor-pointer border-none outline-none"
              >
                Explore
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            key="mobile-nav-panel"
            id="mobile-nav-panel"
            className="fixed inset-0 bg-black/95 z-30 pt-24 px-6 flex flex-col gap-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.location.hash = '#/new-journey';
              }}
              className="text-left text-lg font-serif tracking-wide text-neutral-300 hover:text-white py-2 border-b border-white/5 cursor-pointer bg-transparent border-t-0 border-x-0 outline-none w-full flex justify-between items-center"
              whileHover={{ 
                x: 8, 
                color: "#ffffff" 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              New Journey
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('destinations-section')}
              className="text-left text-lg font-serif tracking-wide text-neutral-300 hover:text-white py-2 border-b border-white/5 cursor-pointer bg-transparent border-t-0 border-x-0 outline-none w-full flex justify-between items-center"
              whileHover={{ 
                x: 8, 
                color: "#ffffff" 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Destinations
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('services-section')}
              className="text-left text-lg font-serif tracking-wide text-neutral-300 hover:text-white py-2 border-b border-white/5 cursor-pointer bg-transparent border-t-0 border-x-0 outline-none w-full flex justify-between items-center"
              whileHover={{ 
                x: 8, 
                color: "#ffffff" 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Services
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('about-section')}
              className="text-left text-lg font-serif tracking-wide text-neutral-300 hover:text-white py-2 border-b border-white/5 cursor-pointer bg-transparent border-t-0 border-x-0 outline-none w-full flex justify-between items-center"
              whileHover={{ 
                x: 8, 
                color: "#ffffff" 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              About Us
            </motion.button>
            <motion.button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.location.hash = '#/track-booking';
              }}
              className="text-left text-lg font-serif tracking-wide text-neutral-300 hover:text-white py-2 border-b border-white/5 flex justify-between items-center cursor-pointer bg-transparent border-t-0 border-x-0 outline-none w-full"
              whileHover={{ 
                x: 8, 
                color: "#ffffff" 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span>Track Your Booking</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </motion.button>

            <motion.button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.location.hash = '#/new-journey';
              }}
              className="mt-4 bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg text-center cursor-pointer outline-none border-none animate-none"
              whileHover={{ 
                scale: [1, 1.08, 0.94, 1.04, 0.98, 1.01, 1],
                rotate: [0, -3, 3, -1.5, 1.5, -0.5, 0],
                y: -2, 
                boxShadow: "0px 8px 24px rgba(255,255,255,0.25)" 
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Initiate Booking Consultation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
