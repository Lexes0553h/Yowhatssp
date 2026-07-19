import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe, Calendar, Sparkles, Menu } from 'lucide-react';

interface MobileBottomNavProps {
  visibleHeader: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function MobileBottomNav({
  visibleHeader,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: MobileBottomNavProps) {
  
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        key="universal-bottom-nav"
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: visibleHeader ? 0 : 100,
          opacity: visibleHeader ? 1 : 0
        }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[94vw] max-w-[500px] will-change-transform font-sans"
      >
        <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/5 rounded-[36px] px-2 md:px-4 py-2 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.7)] relative h-[72px]">
          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if ((window as any).lenis) { (window as any).lenis.scrollTo(0); } else { window.scrollTo({ top: 0, behavior: "smooth" }); };
              setTimeout(() => {
                const searchInput = document.querySelector('#global-sticky-search-bar input') || document.querySelector('#mobile-sticky-search input');
                if (searchInput instanceof HTMLInputElement) {
                  searchInput.focus();
                }
              }, 300);
            }}
            className="flex flex-col items-center justify-center gap-1 w-[4.5rem] cursor-pointer bg-transparent border-none outline-none group"
          >
            <Search className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />
            <span className="text-[8px] font-bold tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-300">SEARCH</span>
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollToSection('destinations-section')}
            className="flex flex-col items-center justify-center gap-1 w-[4.5rem] cursor-pointer bg-transparent border-none outline-none group"
          >
            <Globe className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />
            <span className="text-[8px] font-bold tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-300">PLACES</span>
          </motion.button>

          {/* Center Book Button */}
          <div className="relative w-16 h-full flex justify-center">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                window.location.hash = '#/new-journey';
              }}
              className="absolute -top-7 w-[72px] h-[72px] bg-white rounded-full flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer outline-none border-none z-10 will-change-transform"
            >
              <Calendar className="w-6 h-6 text-black mb-0.5 stroke-[1.5]" />
              <span className="text-[9px] font-bold tracking-widest text-black">BOOK</span>
            </motion.button>
          </div>

          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollToSection('services-section')}
            className="flex flex-col items-center justify-center gap-1 w-[4.5rem] cursor-pointer bg-transparent border-none outline-none group"
          >
            <Sparkles className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />
            <span className="text-[8px] font-bold tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-300">SERVICES</span>
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center gap-1 w-[4.5rem] cursor-pointer bg-transparent border-none outline-none group"
          >
            <Menu className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />
            <span className="text-[8px] font-bold tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-300">MENU</span>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
