import React from 'react';
import { Plane } from 'lucide-react';

export default function Footer() {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-black text-neutral-400 text-xs relative overflow-hidden pb-24 lg:pb-0 font-sans">
      {/* Soft radial overlay at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start pt-12 pb-12 md:pt-20 md:pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Left Brand Area */}
        <div className="md:col-span-5 lg:col-span-6 space-y-6 md:pt-24 pt-4">
          <div 
            className="inline-flex bg-white rounded-full px-5 py-2 items-center gap-1.5 cursor-pointer shadow-md shadow-black/25" 
            onClick={() => scrollToSection('hero-fold')}
          >
            <span className="font-signature text-black text-xl font-bold -mt-0.5 pr-0.5 select-none">
              TouraLuxe
            </span>
            <Plane className="w-3.5 h-3.5 text-black transform rotate-45 -mt-0.5" />
          </div>
          
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm font-light">
            We don't sell trips. We craft transcendent experiences for the world's most discerning travelers.
          </p>
        </div>

        {/* Services Column - right aligned grid structure with beautiful spacing */}
        <div className="md:col-span-3 md:col-start-8 lg:col-span-2 lg:col-start-9 space-y-5">
          <h5 className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-500 font-bold">SERVICES</h5>
          <ul className="space-y-4 font-sans list-none p-0">
            {[
              { id: 'luxury-tours', title: 'Luxury Tours' },
              { id: 'group-trips', title: 'Group Trips' },
              { id: 'adventure-tours', title: 'Adventure Tours' },
              { id: 'luxury-honeymoons', title: 'Luxury Honeymoons' },
              { id: 'mice-events', title: 'MICE Events' },
              { id: 'custom-journeys', title: 'Custom Journeys' },
              { id: 'ai-travel', title: 'AI Travel Planner' }
            ].map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => {
                    window.location.hash = `#/services/${item.id}`;
                  }}
                  className="text-white hover:text-[#F598F2] font-semibold text-sm tracking-wide transition-colors text-left bg-transparent border-none p-0 cursor-pointer outline-none block"
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div className="md:col-span-2 md:col-start-11 lg:col-span-2 lg:col-start-11 space-y-5">
          <h5 className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-500 font-bold">COMPANY</h5>
          <ul className="space-y-4 font-sans list-none p-0">
            <li>
              <button 
                onClick={() => scrollToSection('about-section')} 
                className="text-white hover:text-[#F598F2] font-semibold text-sm tracking-wide transition-colors text-left bg-transparent border-none p-0 cursor-pointer outline-none block"
              >
                Philosophy
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('destinations-section')} 
                className="text-white hover:text-[#F598F2] font-semibold text-sm tracking-wide transition-colors text-left bg-transparent border-none p-0 cursor-pointer outline-none block"
              >
                Journal
              </button>
            </li>
            <li>
              <a href="mailto:concierge@touraluxe.com" className="text-white hover:text-[#F598F2] font-semibold text-sm tracking-wide transition-colors block decoration-transparent">
                Contact
              </a>
            </li>
            <li>
              <button onClick={() => { window.location.hash = '#/track-booking'; }} className="text-white hover:text-[#F598F2] font-semibold text-sm tracking-wide transition-colors text-left bg-transparent border-none p-0 cursor-pointer outline-none block">
                Track Your Booking
              </button>
            </li>
            <li>
              <button 
                onClick={() => { window.location.hash = '#/terms'; }} 
                className="text-white hover:text-[#F598F2] font-semibold text-sm tracking-wide transition-colors text-left bg-transparent border-none p-0 cursor-pointer outline-none block"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Sub-footer Copyright */}
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 pb-28 lg:pb-8 px-4 sm:px-6 lg:px-8 border-t border-white/10 flex items-center justify-start text-xs text-white font-sans font-medium tracking-widest uppercase">
        <p>© 2026 TouraLuxe. All rights reserved.</p>
      </div>
    </footer>
  );
}
