import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  X, Search, Plane, ShieldCheck, CheckCircle2, Sparkles, MapPin, 
  Calendar, Users, AlertCircle, Clock, ChevronRight, CheckCircle 
} from 'lucide-react';
import { BookingRequest } from '../types';

interface BookingTrackerProps {
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
      { title: 'Charter Approval', desc: 'Gulfstream G650 private flight paths authenticated and approved.', completed: true },
      { title: 'Island Estate Inspection', desc: 'Exclusive private lagoon villa sanitization and structural check complete.', completed: true },
      { title: 'Personal Staff Allocation', desc: 'Executive butler and world-class private chef assigned.', completed: true, current: true },
      { title: 'Security Clearances', desc: 'Private island security protocols and transport coordinates confirmed.', completed: false },
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
      { title: 'Helicopter Charter', desc: 'Sikorsky S-76 clifftop transfer flight plan submitted.', completed: true },
      { title: 'High Priestess Session', desc: 'Temple purifications and private sound bath scheduled.', completed: true },
      { title: 'Wellness Program Tailoring', desc: 'Personalized organic dietary and yoga therapy plan being custom formulated.', completed: false, current: true },
      { title: 'Concierge Verification', desc: 'Review of local bespoke art workshops and secret locations.', completed: false },
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
      { title: 'Junk Yacht Charter', desc: 'Private majestic wood junk vessel fully provisioned.', completed: true },
      { title: 'Imperial Dining Clearance', desc: 'Imperial citadel vault exclusive dinner reservation confirmed.', completed: true },
      { title: 'Artisan Workshop Setup', desc: 'Private silk tailoring and lacquer art masterclasses organized.', completed: true },
      { title: 'Journey Fully Dispatched', desc: 'VIP concierge coordinates delivered to guest.', completed: true, current: true },
    ]
  }
};

export default function BookingTracker({ isOpen, onClose, activeBookings }: BookingTrackerProps) {
  const [searchCode, setSearchCode] = useState('');
  const [trackedId, setTrackedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const code = searchCode.trim().toUpperCase();
    
    // Check user-created active bookings or our premium demo bookings
    const existsInUser = activeBookings.find(b => b.id === code);
    const existsInDemo = demoBookings[code];

    if (existsInUser || existsInDemo) {
      setTrackedId(code);
      setErrorMsg('');
    } else {
      setErrorMsg('No bespoke reservation found under this identifier. Check your format (e.g., TL-7798).');
      setTrackedId(null);
    }
  };

  // Get current state
  const userBooking = activeBookings.find(b => b.id === trackedId);
  const demoBooking = trackedId ? demoBookings[trackedId] : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'IN_REVIEW':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'COMPLETED':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/20';
      default:
        return 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end font-sans overflow-hidden">
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ willChange: "opacity" }}
        onClick={onClose}
      />

      {/* Slide-over Content */}
      <motion.div 
        className="relative w-full max-w-xl h-full bg-[#0d0d0f] border-l border-white/10 text-white flex flex-col z-10 shadow-2xl overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 280 }}
        style={{ willChange: "transform" }}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-[#070709]">
          <div>
            <h2 className="text-xl font-serif tracking-wide text-neutral-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Sanctuary Tracker
            </h2>
            <p className="text-xs text-neutral-400 tracking-wider font-light uppercase mt-1">Authentic excellence in progress</p>
          </div>
          <motion.button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white cursor-pointer outline-none"
            whileHover={{ 
              scale: 1.15,
              rotate: 90
            }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8 space-y-6">
          {/* Tracking Search Input */}
          <div className="space-y-2">
            <h3 className="text-sm font-serif text-white uppercase tracking-wider">Locate Bespoke Itinerary</h3>
            <p className="text-xs text-neutral-400">Enter your secure Reservation Identifier code to review flight preparation, staff scheduling, and security protocols.</p>
            
            <form onSubmit={handleSearch} className="flex gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input 
                  type="text"
                  placeholder="e.g. TL-7798, TL-1024, TL-4982"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm font-mono tracking-wider text-white focus:outline-none focus:border-emerald-400 focus:bg-white/[0.05] transition-all"
                />
              </div>
              <motion.button 
                type="submit"
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider cursor-pointer outline-none border-none"
                whileHover={{ 
                  scale: 1.04,
                  boxShadow: "0px 4px 15px rgba(255,255,255,0.18)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Search
              </motion.button>
            </form>

            {errorMsg && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/10 mt-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Quick Demo Suggesters */}
          {!trackedId && (
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Active Showcase Portfolios</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {Object.entries(demoBookings).map(([id, booking]) => (
                  <motion.div
                    key={id}
                    onClick={() => {
                      setTrackedId(id);
                      setSearchCode(id);
                      setErrorMsg('');
                    }}
                    className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl cursor-pointer flex justify-between items-center group"
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "rgba(255,255,255,0.04)", 
                      borderColor: "rgba(255,255,255,0.25)" 
                    }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{id}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono border uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">{booking.client} — {booking.destination}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Search Result Display */}
          {trackedId && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-4 border-t border-white/5"
            >
              {/* Detailed Card */}
              {demoBooking && (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="bg-[#111115] border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase">Reservation ID: {trackedId}</span>
                        <h4 className="font-serif text-lg text-white mt-1">{demoBooking.destination}</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">Guest: {demoBooking.client}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono border uppercase tracking-wider ${getStatusColor(demoBooking.status)}`}>
                        {demoBooking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-center">
                      <div className="text-left">
                        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Arrival</span>
                        <p className="text-xs font-medium text-white mt-0.5">{demoBooking.arrival}</p>
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Duration</span>
                        <p className="text-xs font-medium text-white mt-0.5">{demoBooking.duration}</p>
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Estimated Valuation</span>
                        <p className="text-xs font-mono font-bold text-emerald-300 mt-0.5">{demoBooking.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Operational Timeline Steps */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-semibold text-neutral-300 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      Operational Dispatch Tracker
                    </h4>
                    
                    <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                      {demoBooking.steps.map((step, idx) => (
                        <div key={idx} className="relative">
                          {/* Dot Indicator */}
                          <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                            step.completed 
                              ? 'bg-emerald-400 border-emerald-400 shadow-md shadow-emerald-400/30' 
                              : step.current 
                                ? 'bg-[#0d0d0f] border-purple-400 scale-125'
                                : 'bg-[#0d0d0f] border-neutral-600'
                          }`}>
                            {step.current && !step.completed && (
                              <div className="absolute inset-0.5 bg-purple-400 rounded-full animate-ping" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className={`text-xs font-semibold ${
                                step.completed ? 'text-neutral-200 line-through decoration-white/20' : step.current ? 'text-purple-300' : 'text-neutral-400'
                              }`}>
                                {step.title}
                              </h5>
                              {step.current && !step.completed && (
                                <span className="text-[8px] bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded px-1 font-mono uppercase tracking-widest animate-pulse">
                                  Current Phase
                                </span>
                              )}
                              {step.completed && (
                                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-1 font-mono uppercase tracking-widest">
                                  Complete
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* User created booking track */}
              {userBooking && (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="bg-[#111115] border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-purple-400 uppercase">Your Reservation Code: {trackedId}</span>
                        <h4 className="font-serif text-lg text-white mt-1">{userBooking.destinationName} Overwater Sanctuary</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">Guest: {userBooking.clientName}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono border uppercase tracking-wider ${getStatusColor(userBooking.status)}`}>
                        {userBooking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-center">
                      <div className="text-left">
                        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Arrival Date</span>
                        <p className="text-xs font-medium text-white mt-0.5">{userBooking.startDate}</p>
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Nights</span>
                        <p className="text-xs font-medium text-white mt-0.5">{userBooking.durationDays} Nights</p>
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Valuation</span>
                        <p className="text-xs font-mono font-bold text-purple-300 mt-0.5">{userBooking.totalPrice}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Operational Steps */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-semibold text-neutral-300 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      Operations Timeline
                    </h4>
                    
                    <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 bg-emerald-400 border-emerald-400" />
                        <div>
                          <h5 className="text-xs font-semibold text-neutral-200 line-through decoration-white/20">Bespoke Submission Received</h5>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Luxury travel curator has mapped out primary flight vectors and local guides.</p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 bg-[#0d0d0f] border-purple-400 scale-125">
                          <div className="absolute inset-0.5 bg-purple-400 rounded-full animate-ping" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-semibold text-purple-300">Sanctuary Curator Review</h5>
                            <span className="text-[8px] bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded px-1 font-mono uppercase tracking-widest animate-pulse">
                              Active Phase
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Our lead coordinator is contacting the resort managers to inspect clifftop/overwater villas and assign dedicated private chefs.</p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 bg-[#0d0d0f] border-neutral-600" />
                        <div>
                          <h5 className="text-xs font-semibold text-neutral-400">Charter & Transport Fast-Tracking</h5>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Private helicopter and jet paths will be configured and locked once verification completes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Clear tracked booking button */}
              <motion.button
                onClick={() => {
                  setTrackedId(null);
                  setSearchCode('');
                }}
                className="w-full py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs uppercase tracking-widest font-semibold cursor-pointer outline-none"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.1)", 
                  borderColor: "rgba(255,255,255,0.25)" 
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Clear Tracker & Check Another Code
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/5 bg-[#070709] text-center text-[10px] text-neutral-500">
          Our global dispatch network operates continuously. Need urgent assistance? Dial +1 (800) TOURALUXE.
        </div>
      </motion.div>
    </div>
  );
}
