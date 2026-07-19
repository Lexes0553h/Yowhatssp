import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Plane, ShieldCheck, Calendar, Users, Clock, 
  MapPin, CheckCircle2, AlertCircle, ChevronDown, Check, Sparkles,
  Search, X
} from 'lucide-react';
import { BookingRequest } from '../types';

interface TrackBookingPageProps {
  isOpen: boolean;
  onClose: () => void;
  activeBookings: BookingRequest[];
}

// Pre-seeded luxury bookings for a high-end demonstration
const demoBookings: Record<string, {
  destination: string;
  client: string;
  arrival: string;
  duration: string;
  guests: number;
  price: string;
  status: 'PENDING_VERIFICATION' | 'IN_REVIEW' | 'CONFIRMED' | 'COMPLETED';
  steps: { title: string; desc: string; completed: boolean; current?: boolean }[];
}> = {
  'TL-7798': {
    destination: 'Maldives Overwater Sanctuary',
    client: 'Sir Harrison Mercer',
    arrival: 'Oct 12, 2026',
    duration: '10 Nights',
    guests: 4,
    price: '$45,800',
    status: 'CONFIRMED',
    steps: [
      { title: 'Charter Approval', desc: 'Gulfstream G650 private flight paths authenticated.', completed: true },
      { title: 'Island Estate Inspection', desc: 'Exclusive private lagoon villa sanitization check complete.', completed: true },
      { title: 'Personal Staff Allocation', desc: 'Executive butler and private chef assigned.', completed: true, current: true },
      { title: 'Security Clearances', desc: 'Private island security protocols confirmed.', completed: false },
    ]
  },
  'TL-1024': {
    destination: 'Ubud Hanging Palace, Bali',
    client: 'Lady Beatrice Thorne',
    arrival: 'Aug 24, 2026',
    duration: '14 Nights',
    guests: 2,
    price: '$32,400',
    status: 'IN_REVIEW',
    steps: [
      { title: 'Helicopter Charter', desc: 'Sikorsky S-76 transfer flight plan submitted.', completed: true },
      { title: 'High Priestess Session', desc: 'Temple purifications and sound bath scheduled.', completed: true },
      { title: 'Wellness Program Tailoring', desc: 'Dietary and yoga therapy plan being custom formulated.', completed: false, current: true },
      { title: 'Concierge Verification', desc: 'Review of local bespoke art workshops.', completed: false },
    ]
  },
  'TL-4982': {
    destination: 'Ha Long Bay Cruise & Citadel Retreat, Vietnam',
    client: 'Dr. Kenji Tanaka',
    arrival: 'Sep 05, 2026',
    duration: '8 Nights',
    guests: 3,
    price: '$21,200',
    status: 'COMPLETED',
    steps: [
      { title: 'Junk Yacht Charter', desc: 'Private majestic wood junk vessel provisioned.', completed: true },
      { title: 'Imperial Dining Clearance', desc: 'Imperial citadel vault dining reservation confirmed.', completed: true },
      { title: 'Artisan Workshop Setup', desc: 'Private silk tailoring masterclasses organized.', completed: true },
      { title: 'Journey Fully Dispatched', desc: 'VIP concierge coordinates delivered to guest.', completed: true, current: true },
    ]
  }
};

export default function TrackBookingPage({ isOpen, onClose, activeBookings }: TrackBookingPageProps) {
  useEffect(() => {
    if (isOpen) {
      if ((window as any).lenis) { (window as any).lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); };
    }
  }, [isOpen]);
  
  const [bookingId, setBookingId] = useState('');
  const [verifyMethod, setVerifyMethod] = useState<'email' | 'phone'>('email');
  const [verifyValue, setVerifyValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [trackedId, setTrackedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentTime, setCurrentTime] = useState('');

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

  // Floating particles configuration
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 15,
  }));

  // Twinkling stars configuration
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 4,
  }));

  const handleTrackSubmit = (e: FormEvent) => {
    e.preventDefault();
    const code = bookingId.trim().toUpperCase();

    if (!code) {
      setErrorMsg('Please enter a valid Booking Reference ID.');
      return;
    }

    if (!verifyValue.trim()) {
      setErrorMsg(`Please enter your associated ${verifyMethod === 'email' ? 'email address' : 'phone number'}.`);
      return;
    }

    // Check user-created active bookings or our premium demo bookings
    const existsInUser = activeBookings.find(b => b.id === code);
    const existsInDemo = demoBookings[code];

    if (existsInUser || existsInDemo) {
      setTrackedId(code);
      setErrorMsg('');
    } else {
      setErrorMsg('No bespoke reservation found under this identifier. Try "TL-7798" for a demonstration.');
      setTrackedId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'IN_REVIEW':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'COMPLETED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
    }
  };

  const userBooking = trackedId ? activeBookings.find(b => b.id === trackedId) : null;
  const demoBooking = trackedId ? demoBookings[trackedId] : null;

  const displayData = userBooking ? {
    destination: userBooking.destinationName,
    client: userBooking.clientName,
    arrival: userBooking.startDate,
    duration: `${userBooking.durationDays} Nights`,
    price: userBooking.totalPrice,
    status: userBooking.status,
    steps: [
      { title: 'Charter Approval', desc: 'VIP private flight path assignment in progress.', completed: true },
      { title: 'Estate Inspection', desc: 'Elite clifftop villa preparation checks initiated.', completed: true, current: true },
      { title: 'Personal Staff Vetting', desc: 'Local executive butler and culinary matching in progress.', completed: false },
      { title: 'Dispatch Delivery', desc: 'Secure digital vault coordinates delivery pending.', completed: false }
    ]
  } : demoBooking ? {
    destination: demoBooking.destination,
    client: demoBooking.client,
    arrival: demoBooking.arrival,
    duration: demoBooking.duration,
    price: demoBooking.price,
    status: demoBooking.status,
    steps: demoBooking.steps
  } : null;

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden scroll-smooth font-sans">
      
      {/* Background Image - Moody valley river landscape as in screenshot */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img loading="lazy" decoding="async" 
          src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1920&q=80" 
          alt="Cinematic Valley"
          className="w-full h-full object-cover opacity-20 grayscale brightness-50 mix-blend-luminosity scale-105"
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9))] pointer-events-none" />
      </div>

      {/* Floating Glowing Beacon Dot - Upper Left (Matches screenshot precisely) */}
      <div className="absolute top-[22%] left-[26%] hidden lg:flex items-center justify-center z-10 pointer-events-none select-none">
        <div className="relative flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-white/45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white relative">
              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Header with Exit / Close Controls & Logo */}
      <header className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 pt-6 sm:pt-8 flex justify-between items-center z-30">
        <div className="flex items-center">
          {/* Logo Pill */}
          <div></div>
          {/* Divider & Subtitle */}
          <div className="h-4 w-[1px] bg-white/20 mx-4" />
          <span className="text-[9px] font-sans font-black tracking-[0.25em] text-neutral-400 uppercase">
            BOOKING TRACKER
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
            title="Exit Track"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-12 z-20">
        <AnimatePresence mode="wait">
          {!trackedId ? (
            /* Track Form Card */
            <motion.div
              key="track-form-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-[460px] bg-[#0c0c0d]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col"
            >
              {/* Title & Subtitle */}
              <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl sm:text-[26px] font-sans font-black italic tracking-wider text-white uppercase">
                  TRACK YOUR BOOKING
                </h1>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed max-w-[340px] mx-auto">
                  Enter your booking ID and email or phone number to view your live travel itinerary and status.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleTrackSubmit} className="w-full space-y-6">
                
                {/* Booking ID Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-sans font-extrabold tracking-[0.2em] text-neutral-400 uppercase">
                    BOOKING REFERENCE ID *
                  </label>
                  <div className="relative flex items-center group">
                    <Search className="absolute left-4 w-4 h-4 text-neutral-500 transition-colors group-focus-within:text-white" />
                    <input
                      type="text"
                      placeholder="TRX-"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      className="w-full bg-[#161618] border border-white/5 hover:border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm font-mono tracking-wider text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Segment Picker - Verify Using */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-sans font-extrabold tracking-[0.2em] text-neutral-400 uppercase">
                    VERIFY USING *
                  </label>
                  
                  {/* Styled Segment Controls instead of custom dropdown */}
                  <div className="grid grid-cols-2 bg-[#121214] p-1 rounded-xl border border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        setVerifyMethod('email');
                        setVerifyValue('');
                      }}
                      className={`font-sans font-extrabold text-[10px] tracking-wider py-3 rounded-lg text-center cursor-pointer transition-all duration-300 uppercase ${
                        verifyMethod === 'email' 
                          ? 'bg-white text-black shadow-lg shadow-black/10' 
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      EMAIL ADDRESS
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVerifyMethod('phone');
                        setVerifyValue('');
                      }}
                      className={`font-sans font-extrabold text-[10px] tracking-wider py-3 rounded-lg text-center cursor-pointer transition-all duration-300 uppercase ${
                        verifyMethod === 'phone' 
                          ? 'bg-white text-black shadow-lg shadow-black/10' 
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      PHONE NUMBER
                    </button>
                  </div>
                </div>

                {/* Email or Phone Input (Changes placeholder and validation) */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-sans font-extrabold tracking-[0.2em] text-neutral-400 uppercase">
                    {verifyMethod === 'email' ? 'REGISTERED EMAIL *' : 'REGISTERED PHONE *'}
                  </label>
                  <input
                    type={verifyMethod === 'email' ? 'email' : 'text'}
                    placeholder={verifyMethod === 'email' ? 'your@email.com' : '+1 (555) 019-9283'}
                    value={verifyValue}
                    onChange={(e) => setVerifyValue(e.target.value)}
                    className="w-full bg-[#161618] border border-white/5 hover:border-white/10 rounded-xl px-4 py-3.5 text-sm font-sans text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-all duration-300"
                  />
                </div>

                {/* Error message */}
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-xs text-red-400 bg-red-500/10 p-3.5 rounded-xl border border-red-500/15"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="leading-snug">{errorMsg}</span>
                  </motion.div>
                )}

                {/* Bottom Row: Required legend and submission button */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-neutral-500 italic">
                    * Required fields
                  </span>

                  <button
                    type="submit"
                    className="bg-white hover:bg-neutral-100 active:scale-95 text-black font-sans font-extrabold text-[10px] tracking-wider py-3.5 px-6 rounded-full flex items-center gap-1.5 cursor-pointer border-none outline-none shadow-xl transition-all duration-200"
                  >
                    <span>TRACK BOOKING</span>
                    <span className="text-xs">→</span>
                  </button>
                </div>

              </form>

              {/* Showcase demo codes help */}
              <div className="mt-8 text-center pt-6 border-t border-white/5">
                <span className="text-[9px] font-sans font-extrabold tracking-[0.15em] text-neutral-500 uppercase block mb-3">
                  BESPOKE DEMO ACCOUNTS
                </span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['TL-7798', 'TL-1024', 'TL-4982'].map(code => (
                    <button
                      key={code}
                      onClick={() => {
                        setBookingId(code);
                        setVerifyValue(code === 'TL-7798' ? 'mercer@gulfstream.com' : code === 'TL-1024' ? 'beatrice@hangingpalace.co.uk' : 'kenji@tanakaclinic.jp');
                        setVerifyMethod('email');
                      }}
                      className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/15 text-[9px] font-mono tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          ) : (
            /* Track Result Cards */
            <motion.div
              key="track-result-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[550px] bg-[#141414]/55 backdrop-blur-[20px] border border-white/10 rounded-[28px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] p-6 sm:p-8 flex flex-col space-y-6"
            >
              {/* Shine highlight */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Top Row with ID & close */}
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">BESPOKE DISPATCH</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-base font-bold text-white tracking-wider">{trackedId}</span>
                    <span className={`px-2 py-0.5 rounded-full border text-[8px] font-mono tracking-widest uppercase ${getStatusColor(displayData?.status || '')}`}>
                      {displayData?.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTrackedId(null);
                    setErrorMsg('');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-all cursor-pointer outline-none"
                >
                  Change Code
                </button>
              </div>

              {/* Destination Highlight */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-lg text-white leading-snug">{displayData?.destination}</h3>
                    <p className="text-xs text-neutral-400 mt-1">Primary Guest: <span className="text-neutral-200 font-medium">{displayData?.client}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3.5 border-t border-white/5 text-center">
                  <div className="text-left space-y-1">
                    <span className="text-[9px] text-neutral-500 font-mono tracking-wider block uppercase">DEPARTURE</span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-200">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="font-mono truncate">{displayData?.arrival}</span>
                    </div>
                  </div>
                  <div className="text-left space-y-1">
                    <span className="text-[9px] text-neutral-500 font-mono tracking-wider block uppercase">DURATION</span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-200">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="font-mono truncate">{displayData?.duration || 'Bespoke'}</span>
                    </div>
                  </div>
                  <div className="text-left space-y-1">
                    <span className="text-[9px] text-neutral-500 font-mono tracking-wider block uppercase">VAULT VALUE</span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-200">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span className="font-mono text-emerald-400 font-bold truncate">{displayData?.price || '$28,000'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom steps / Timeline progress */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  PREPARATION CHECKLIST
                </h4>

                <div className="space-y-4 pl-1">
                  {displayData?.steps ? (
                    displayData.steps.map((step, idx) => (
                      <div key={idx} className="relative flex gap-4 items-start">
                        {/* Connecting Line */}
                        {idx !== displayData.steps.length - 1 && (
                          <div className={`absolute left-2.5 top-6 bottom-0 w-[1px] ${step.completed ? 'bg-emerald-500/30' : 'bg-neutral-800'}`} />
                        )}
                        
                        {/* Indicator Circle */}
                        <div className="relative mt-1">
                          {step.completed ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center">
                              <Check className="w-3 h-3 text-emerald-400" />
                            </div>
                          ) : step.current ? (
                            <div className="w-5 h-5 rounded-full bg-amber-950 border border-amber-500 flex items-center justify-center animate-pulse">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="space-y-0.5">
                          <h5 className={`text-xs font-semibold uppercase tracking-wide ${step.completed ? 'text-emerald-400' : step.current ? 'text-amber-400' : 'text-neutral-400'}`}>
                            {step.title}
                          </h5>
                          <p className="text-xs text-neutral-400 font-light leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    /* User custom booking fallback timeline */
                    <div className="space-y-4">
                      {[
                        { title: 'Charter Approval', desc: 'VIP private flight path assignment in progress.', completed: true },
                        { title: 'Estate Inspection', desc: 'Elite clifftop villa preparation checks initiated.', completed: true, current: true },
                        { title: 'Personal Butler Allocation', desc: 'Local executive staff vetting and matching.', completed: false },
                        { title: 'Dispatch Delivery', desc: 'Secure digital vault coordinates delivery pending.', completed: false }
                      ].map((step, idx, arr) => (
                        <div key={idx} className="relative flex gap-4 items-start">
                          {idx !== arr.length - 1 && (
                            <div className={`absolute left-2.5 top-6 bottom-0 w-[1px] ${step.completed ? 'bg-emerald-500/30' : 'bg-neutral-800'}`} />
                          )}
                          <div className="relative mt-1">
                            {step.completed ? (
                              <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center">
                                <Check className="w-3 h-3 text-emerald-400" />
                              </div>
                            ) : step.current ? (
                              <div className="w-5 h-5 rounded-full bg-amber-950 border border-amber-500 flex items-center justify-center animate-pulse">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                              </div>
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <h5 className={`text-xs font-semibold uppercase tracking-wide ${step.completed ? 'text-emerald-400' : step.current ? 'text-amber-400' : 'text-neutral-400'}`}>
                              {step.title}
                            </h5>
                            <p className="text-xs text-neutral-400 font-light leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex gap-3">
                <button
                  onClick={() => {
                    setTrackedId(null);
                    setBookingId('');
                    setVerifyValue('');
                    setErrorMsg('');
                  }}
                  className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-sans font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer outline-none"
                >
                  Track Another Booking
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-white text-black font-sans font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl hover:brightness-110 shadow-lg shadow-white/5 transition-all cursor-pointer outline-none border-none"
                >
                  Done
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer copyright */}
      <footer className="relative w-full text-center pb-8 z-30 select-none pointer-events-none">
        <p className="text-[10px] font-mono tracking-[0.25em] text-neutral-600 uppercase">
          © 2026 TOURALUXE SECURE NETWORKS. ALL RIGHTS RESERVED.
        </p>
      </footer>

    </div>
  );
}
