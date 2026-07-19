import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe, Calendar, Sparkles, Menu } from 'lucide-react';
import FloatingSearchPanel from './FloatingSearchPanel';

interface FloatingTabBarProps {
  onSearchSelect: (destId: string | null, query: string) => void;
  onPlacesClick: () => void;
  onBookClick: () => void;
  onServicesClick: () => void;
  onMenuClick: () => void;
}

export default function FloatingTabBar({
  onSearchSelect,
  onPlacesClick,
  onBookClick,
  onServicesClick,
  onMenuClick,
}: FloatingTabBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const isAtBottom = currentScrollY + windowHeight >= documentHeight - 20; // 20px threshold

          // Ignore very small scroll movements (less than 10px) to prevent flickering, except when reaching bottom
          if (Math.abs(currentScrollY - lastScrollY) > 10 || isAtBottom) {
            if (isAtBottom) {
              setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
              // Scrolling down
              setIsVisible(false);
            } else {
              // Scrolling up
              setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Floating Search Panel */}
      <FloatingSearchPanel 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onSelect={(destId, query) => {
          setIsSearchOpen(false);
          onSearchSelect(destId, query);
        }}
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-[60] lg:hidden w-[95%] sm:w-[85%] md:w-[70%] max-w-[420px]"
          >
            {/* Main Pill Bar */}
            <div className="relative bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-between px-3 sm:px-6 py-2.5 h-[68px]">
            
            {/* Search Tab */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex flex-col items-center justify-center gap-1.5 w-[52px] cursor-pointer outline-none tap-highlight-transparent group"
            >
              <Search className="w-5 h-5 text-white/60 group-hover:text-white transition-colors stroke-[1.5px]" />
              <span className="text-[8.5px] font-sans font-bold tracking-[0.08em] text-white/60 group-hover:text-white transition-colors uppercase">Search</span>
            </button>

            {/* Places Tab */}
            <button 
              onClick={onPlacesClick}
              className="flex flex-col items-center justify-center gap-1.5 w-[52px] cursor-pointer outline-none tap-highlight-transparent mr-7 sm:mr-8 group"
            >
              <Globe className="w-5 h-5 text-white/60 group-hover:text-white transition-colors stroke-[1.5px]" />
              <span className="text-[8.5px] font-sans font-bold tracking-[0.08em] text-white/60 group-hover:text-white transition-colors uppercase">Places</span>
            </button>

            {/* Center Book Button */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-5">
              <button
                onClick={onBookClick}
                className="w-[72px] h-[72px] bg-white rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 outline-none cursor-pointer border border-[#eaeaea]"
              >
                <Calendar className="w-6 h-6 text-black mb-1 stroke-[2px]" />
                <span className="text-[9.5px] font-black tracking-widest text-black uppercase">Book</span>
              </button>
            </div>

            {/* Services Tab */}
            <button 
              onClick={onServicesClick}
              className="flex flex-col items-center justify-center gap-1.5 w-[52px] cursor-pointer outline-none tap-highlight-transparent ml-7 sm:ml-8 group"
            >
              <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors stroke-[1.5px]" />
              <span className="text-[8.5px] font-sans font-bold tracking-[0.08em] text-white/60 group-hover:text-white transition-colors uppercase">Services</span>
            </button>

            {/* Menu Tab */}
            <button 
              onClick={onMenuClick}
              className="flex flex-col items-center justify-center gap-1.5 w-[52px] cursor-pointer outline-none tap-highlight-transparent group"
            >
              <Menu className="w-6 h-6 text-white/60 group-hover:text-white transition-colors stroke-[1.5px]" />
              <span className="text-[8.5px] font-sans font-bold tracking-[0.08em] text-white/60 group-hover:text-white transition-colors uppercase">Menu</span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
