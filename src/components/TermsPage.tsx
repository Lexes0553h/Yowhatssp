import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, X, Shield, FileText, CreditCard, 
  RefreshCw, FileCheck, UserCheck, Eye, AlertTriangle, Mail 
} from 'lucide-react';

interface TermsPageProps {
  onClose: () => void;
}

export default function TermsPage({ onClose }: TermsPageProps) {
  React.useEffect(() => {
    if ((window as any).lenis) { (window as any).lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); };
  }, []);

  const [currentTime, setCurrentTime] = useState('');
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const sections = [
    { 
      id: 'introduction', 
      title: 'Introduction', 
      icon: FileText,
      desc: 'Overview of our luxury travel advisory terms and client relations.'
    },
    { 
      id: 'bookings', 
      title: 'Bookings', 
      icon: Shield,
      desc: 'Legal definition and policies concerning luxury bespoke reservations.'
    },
    { 
      id: 'payments', 
      title: 'Payments & Fees', 
      icon: CreditCard,
      desc: 'Premium secure vault processing, currency, and escrow rules.'
    },
    { 
      id: 'cancellations', 
      title: 'Cancellations & Refunds', 
      icon: RefreshCw,
      desc: 'Charter, villa, and itinerary termination and credit terms.'
    },
    { 
      id: 'documents', 
      title: 'Travel Documents', 
      icon: FileCheck,
      desc: 'Passport, bespoke entry visa, and medical clearance protocols.'
    },
    { 
      id: 'responsibilities', 
      title: 'User Responsibilities', 
      icon: UserCheck,
      desc: 'Code of conduct, private charter flight rules, and estate care.'
    },
    { 
      id: 'privacy', 
      title: 'Privacy Policy', 
      icon: Eye,
      desc: 'Nondisclosure, VIP profile security, and digital data vaults.'
    },
    { 
      id: 'liability', 
      title: 'Liability & Indemnity', 
      icon: AlertTriangle,
      desc: 'Scope of responsibility for charter operators and local partners.'
    },
    { 
      id: 'contact', 
      title: 'Contact Information', 
      icon: Mail,
      desc: 'Connect with the Elite Concierge Desk for legal inquiries.'
    }
  ];

  const sectionData: Record<string, {
    title: string;
    icon: React.ComponentType<any>;
    content: React.ReactNode;
  }> = {
    introduction: {
      title: "1. Introduction",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p>
            TouraLuxe provides highly curated travel design, destination coordination, and experiential advisory services. Our platform operates as an intermediary portal, linking elite travelers with premier logistics partners, verified luxury estates, certified flight operators, and dedicated private hosts.
          </p>
          <p>
            These Terms of Service cover all bookings, digital itineraries, smart-contract reservations, and travel support rendered globally. Your authorization to charge your card or execute wallet transactions acts as a direct sign of compliance.
          </p>
        </div>
      )
    },
    bookings: {
      title: "2. Bookings & Reservations",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p>
            All custom itinerary proposals created by our AI engine or hand-crafted by human designers are subject to availability. Reservations are only secured once a verified confirmation dispatch is issued with an assigned <strong>Bespoke Booking Reference ID (TRX/TL)</strong>.
          </p>
          <p>
            We reserve the right to decline booking requests for any region, vessel, or property at our sole discretion. Any modified request must be submitted directly to your assigned Elite Concierge Desk.
          </p>
        </div>
      )
    },
    payments: {
      title: "3. Payments & Secure Fees",
      icon: CreditCard,
      content: (
        <div className="space-y-4">
          <p>
            Prices for bespoke stays are denominated in USD or EUR. Due to the high exclusivity of private aviation, superyacht leases, and clifftop villa takeovers, full payment or a minimum 50% non-refundable escrow deposit is required at scheduling.
          </p>
          <p>
            Transactions are routed through a secure virtual checkout. If credit parameters are not satisfied within 48 hours, TouraLuxe reserves the right to automatically release reservations to waitlisted candidates.
          </p>
        </div>
      )
    },
    cancellations: {
      title: "4. Cancellations & Refunds",
      icon: RefreshCw,
      content: (
        <div className="space-y-4">
          <p>
            Because we secure guaranteed property lockouts with our destination partners, cancellations are subject to strict tiers:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li><strong>60+ Days Prior:</strong> Eligible for 75% refund of total itinerary value, minus non-refundable operator deposits.</li>
            <li><strong>30–59 Days Prior:</strong> Eligible for a 50% luxury travel credit valid for 12 months. No cash refunds.</li>
            <li><strong>Under 30 Days Prior:</strong> All payments are fully forfeited.</li>
          </ul>
          <p>
            We highly recommend securing comprehensive, tier-one travel interruption insurance to safeguard your journeys.
          </p>
        </div>
      )
    },
    documents: {
      title: "5. Travel Documents & Visas",
      icon: FileCheck,
      content: (
        <div className="space-y-4">
          <p>
            The primary guest bears absolute responsibility for holding valid travel documents, passports (with at least 6 months validity from date of return), medical declarations, vaccines, and the correct entry visas.
          </p>
          <p>
            While TouraLuxe's concierge desks provide complimentary visa filing guidance and fast-track processing support, we are not liable for immigration clearance denials or border delays.
          </p>
        </div>
      )
    },
    responsibilities: {
      title: "6. User Responsibilities & Conduct",
      icon: UserCheck,
      content: (
        <div className="space-y-4">
          <p>
            Clients are expected to uphold impeccable ethical codes and property respect. Damage to charter vessels, private helicopters, or luxury estate interiors will be assessed directly by our partners, and billed securely to your vault on-file.
          </p>
          <p>
            Disruptive conduct during aviation transport or unauthorized access to restricted wilderness reserves can lead to immediate termination of services with zero compensation.
          </p>
        </div>
      )
    },
    privacy: {
      title: "7. Privacy & Nondisclosure",
      icon: Eye,
      content: (
        <div className="space-y-4">
          <p>
            Your privacy is our utmost priority. TouraLuxe implements strict multi-layer client profile encryption. We will never sell, lease, or distribute your identity, digital logs, or travel histories to any third party.
          </p>
          <p>
            All legal disclosures are stored in an isolated data vault, ensuring that your elite traveler profiles are only shared with security personnel, flight captains, and estate managers required to coordinate your dispatch.
          </p>
        </div>
      )
    },
    liability: {
      title: "8. Liability & Indemnity",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <p>
            TouraLuxe operates exclusively as an agent and coordinator. We do not own, control, or directly operate aircraft, marine vessels, transfer cars, hotels, or restaurants.
          </p>
          <p>
            Consequently, TouraLuxe shall not be held liable for personal injury, property loss, weather delays, flight cancellations, strikes, acts of God, or any third-party provider failures. Our maximum cumulative liability is strictly limited to the direct advisory commission fee received for your booking.
          </p>
        </div>
      )
    },
    contact: {
      title: "9. Contact Information",
      icon: Mail,
      content: (
        <div className="space-y-4">
          <p>
            Should you have questions regarding this legal agreement or require elite counseling, please reach out to our dedicated compliance desk:
          </p>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2 text-neutral-400">
            <p><strong>Primary Desk:</strong> legal@touraluxe.com</p>
            <p><strong>VIP Elite Hotline:</strong> +1 (800) 888-LUXE (Complimentary for Platinum Members)</p>
            <p><strong>Global Headquarters:</strong> TouraLuxe Advisors Ltd, Geneva, Switzerland</p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden scroll-smooth font-sans">
      
      {/* Background Image - Moody high-contrast mountain range backdrop */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img loading="lazy" decoding="async" 
          src="https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Wilderness Mountain"
          className="w-full h-full object-cover opacity-[0.14] grayscale brightness-50 mix-blend-luminosity scale-105"
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9))] pointer-events-none" />
      </div>

      {/* Top Navigation / Header */}
      <header className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 pt-6 sm:pt-8 flex justify-between items-center z-30">
        <div className="flex items-center">
          {/* Logo Pill */}
          <div className="bg-white rounded-full px-4 sm:px-5 py-2.5 flex items-center gap-1.5 shadow-lg shadow-black/40 cursor-pointer" onClick={onClose}>
            <span className="font-signature text-black text-lg sm:text-xl font-bold -mt-0.5 tracking-normal">TouraLuxe</span>
            <Plane className="w-3.5 h-3.5 text-black transform rotate-45 -mt-0.5 fill-black" />
          </div>
          {/* Divider & Subtitle */}
          <div className="h-4 w-[1px] bg-white/20 mx-4" />
          <span className="text-[9px] font-sans font-black tracking-[0.25em] text-neutral-400 uppercase">
            TERMS & CONDITIONS
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Live Clock */}
          <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase select-none">
            GMT {currentTime || '00:00:00'}
          </span>
          {/* Close button with circular border */}
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/40 hover:bg-white/10 hover:border-white/30 transition-all text-white cursor-pointer outline-none"
            title="Return to Main"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 md:py-16 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Side: Sticky Directory / Mini-Navigator */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#F598F2] uppercase font-bold block">
              CLIENT PROTOCOL & DISPATCH
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight font-light leading-tight">
              Legal Architecture
            </h1>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Please review the binding operational frameworks governing TouraLuxe bespoke travels, elite concierge coordination, and private charters.
            </p>
          </div>

          {/* Quick List Directory */}
          <nav className="space-y-1.5 pt-4 border-t border-white/5">
            {sections.map((sect) => {
              const IconComp = sect.icon;
              const isSelected = activeSection === sect.id;
              return (
                <button
                  key={sect.id}
                  onClick={() => {
                    setActiveSection(sect.id);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border flex items-center gap-3.5 transition-all outline-none cursor-pointer ${
                    isSelected 
                      ? 'bg-white border-white text-black shadow-lg shadow-white/5' 
                      : 'bg-[#0d0d0f]/50 border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? 'text-black' : 'text-neutral-500'}`} />
                  <span className="text-xs font-semibold tracking-wider font-sans uppercase">
                    {sect.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Tab Container with Sliding Transition */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Statement card */}
          <div className="bg-[#0b0b0c]/90 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#d4af37] font-semibold block uppercase">
              LAST UPDATE: JULY 2026
            </span>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Welcome to <strong>TouraLuxe</strong>. These terms constitute a legally binding agreement between you ("the Client") and TouraLuxe Luxury Travel Advisory. By commissioning our private advisors to plan, arrange, or manage any custom itinerary, hotel booking, wellness retreat, private aviation, or marine charter, you explicitly accept these conditions.
            </p>
          </div>

          {/* Sliding Section Content Container */}
          <div className="relative overflow-hidden min-h-[360px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#0b0b0c]/40 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  {React.createElement(sectionData[activeSection].icon, { className: "w-5 h-5 text-[#F598F2]" })}
                  <h2 className="font-serif text-xl sm:text-2xl text-white tracking-wide font-light">
                    {sectionData[activeSection].title}
                  </h2>
                </div>
                <div className="text-xs text-neutral-300 font-light leading-relaxed">
                  {sectionData[activeSection].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </main>

      {/* Elegant minimalist bottom bar */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-black py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
          <span>© 2026 TOURALUXE GLOBAL. ALL RIGHTS RESERVED.</span>
          <button onClick={onClose} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer outline-none uppercase font-bold">
            RETURN TO HOMEPAGE ↑
          </button>
        </div>
      </footer>

    </div>
  );
}
