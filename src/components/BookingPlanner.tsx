import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ChevronRight, ChevronLeft, Sparkles, Plane, Anchor, Users, 
  Calendar, CheckCircle2, MapPin, User, Mail, Phone, Clock 
} from 'lucide-react';
import { Destination, BookingRequest } from '../types';
import { curatedDestinations } from '../data';

interface BookingPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestinationId?: string;
  onBookingCreated: (booking: BookingRequest) => void;
}

export default function BookingPlanner({ 
  isOpen, 
  onClose, 
  selectedDestinationId, 
  onBookingCreated 
}: BookingPlannerProps) {
  const [step, setStep] = useState(1);
  const [destinationId, setDestinationId] = useState(selectedDestinationId || curatedDestinations[0].id);
  const [startDate, setStartDate] = useState('');
  const [durationDays, setDurationDays] = useState(7);
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);

  // Sync destination state and reset steps on open
  React.useEffect(() => {
    if (isOpen) {
      if (selectedDestinationId) {
        setDestinationId(selectedDestinationId);
      }
      setStep(1);

      // Check if user selected bespoke upgrades on our customized page
      const stored = localStorage.getItem('touraluxe_selected_upgrades');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          const targetDestId = selectedDestinationId || destinationId;
          if (data && data.destinationId === targetDestId) {
            const upgradesList = data.upgrades;
            if (upgradesList && upgradesList.length > 0) {
              const formattedList = upgradesList.map((u: string) => u.split(' Upgrade')[0]).join(', ');
              const climateStr = data.simulatedClimate ? ` [Climate: ${data.simulatedClimate.toUpperCase()}]` : '';
              setSpecialRequests(`Upgrades: ${formattedList}.${climateStr} (VIP Priority assured)`);
            } else {
              setSpecialRequests('');
            }
          }
        } catch (e) {
          console.error("Error reading bespoke selections:", e);
        }
      }
    }
  }, [isOpen, selectedDestinationId, destinationId]);

  const selectedDestination = curatedDestinations.find(d => d.id === destinationId) || curatedDestinations[0];

  // Elite experiences with mock pricing
  const eliteEnhancements = [
    { id: 'private-jet', label: 'Private Jet Charter', price: '$12,500', desc: 'Point-to-point luxury air transit from your closest airfield.', icon: Plane },
    { id: 'yacht-sunset', label: 'Superyacht Sunset Cruise', price: '$4,200', desc: '4-hour private sunset voyage with champagne & oysters.', icon: Anchor },
    { id: 'personal-chef', label: 'Michelin Star Dining', price: '$1,800/day', desc: 'Curated organic lunch & dinners in-villa by an elite private chef.', icon: Sparkles },
  ];

  const handleToggleExperience = (id: string) => {
    if (selectedExperiences.includes(id)) {
      setSelectedExperiences(selectedExperiences.filter(e => e !== id));
    } else {
      setSelectedExperiences([...selectedExperiences, id]);
    }
  };

  const calculateTotalPrice = () => {
    let basePrice = parseInt(selectedDestination.price.replace(/[^0-9]/g, '')) * durationDays;
    let extras = 0;
    if (selectedExperiences.includes('private-jet')) extras += 12500;
    if (selectedExperiences.includes('yacht-sunset')) extras += 4200;
    if (selectedExperiences.includes('personal-chef')) extras += 1800 * durationDays;
    return (basePrice + extras).toLocaleString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !startDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const bookingId = `TL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingRequest = {
      id: bookingId,
      destinationId,
      destinationName: selectedDestination.name,
      startDate,
      durationDays,
      guestsCount,
      selectedExperiences,
      clientName,
      clientEmail,
      clientPhone,
      specialRequests,
      status: 'PENDING_VERIFICATION',
      totalPrice: `$${calculateTotalPrice()}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setSubmittedBooking(newBooking);
    onBookingCreated(newBooking);
    setStep(4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center font-sans overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ willChange: "opacity" }}
            onClick={onClose}
          />

          {/* Slide-over Content styled as a bottom sheet */}
          <motion.div 
            className="relative w-full max-w-2xl h-[90vh] md:h-[85vh] bg-[#0d0d0f] rounded-t-[32px] border-t border-x border-white/10 text-white flex flex-col z-10 shadow-2xl overflow-y-auto"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 220, mass: 1 }}
            style={{ willChange: "transform" }}
          >
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-[#070709]">
          <div>
            <h2 className="text-xl font-serif tracking-wide text-neutral-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              Tailor Your Experience
            </h2>
            <p className="text-xs text-neutral-400 tracking-wider font-light uppercase mt-1">Bespoke Travel Planner</p>
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

        {/* Progress Tracker */}
        <div className="px-8 py-4 bg-[#0a0a0c] border-b border-white/5 flex justify-between text-[11px] font-medium tracking-widest text-neutral-500 uppercase">
          <span className={step >= 1 ? 'text-white font-semibold' : ''}>1. Sanctuary</span>
          <span className={step >= 2 ? 'text-white font-semibold' : ''}>2. Details</span>
          <span className={step >= 3 ? 'text-white font-semibold' : ''}>3. Enhancements</span>
          <span className={step >= 4 ? 'text-white font-semibold' : ''}>4. Confirmed</span>
        </div>

        {/* Form Area */}
        <div className="flex-1 px-8 py-8">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-serif text-white">Select Your Destination Sanctuary</h3>
              <div className="grid grid-cols-1 gap-4">
                {curatedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => setDestinationId(dest.id)}
                    className={`relative overflow-hidden rounded-xl border cursor-pointer group transition-all duration-300 ${
                      destinationId === dest.id 
                        ? 'border-purple-400 bg-white/5 shadow-lg shadow-purple-500/5' 
                        : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                    }`}
                  >
                    <div className="h-28 relative overflow-hidden">
                      <img loading="lazy" decoding="async" 
                        src={dest.bgImage} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-medium uppercase tracking-widest">{dest.location}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-serif text-base text-neutral-100">{dest.name}</h4>
                        <span className="text-xs font-mono text-purple-300 font-semibold">{dest.price}</span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{dest.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-serif text-white">Sanctuary Details & Schedule</h3>
              
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-4">
                <img loading="lazy" decoding="async" 
                  src={selectedDestination.bgImage} 
                  alt={selectedDestination.name} 
                  className="w-16 h-16 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-purple-300">Sanctuary Chosen</span>
                  <h4 className="font-serif text-base text-neutral-100">{selectedDestination.name}</h4>
                  <p className="text-xs text-neutral-400">{selectedDestination.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest text-neutral-400 uppercase mb-2">Sanctuary Arrival Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest text-neutral-400 uppercase mb-2">Duration (Days)</label>
                    <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl p-1">
                      <motion.button 
                        type="button" 
                        onClick={() => setDurationDays(Math.max(3, durationDays - 1))}
                        className="px-3 py-2 text-neutral-400 hover:text-white cursor-pointer outline-none"
                        whileHover={{ 
                          scale: 1.2
                        }}
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        -
                      </motion.button>
                      <span className="text-sm font-mono font-medium">{durationDays} Nights</span>
                      <motion.button 
                        type="button" 
                        onClick={() => setDurationDays(durationDays + 1)}
                        className="px-3 py-2 text-neutral-400 hover:text-white cursor-pointer outline-none"
                        whileHover={{ 
                          scale: 1.2
                        }}
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest text-neutral-400 uppercase mb-2">Sanctuary Guests</label>
                    <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl p-1">
                      <motion.button 
                        type="button" 
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        className="px-3 py-2 text-neutral-400 hover:text-white cursor-pointer outline-none"
                        whileHover={{ 
                          scale: 1.2
                        }}
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        -
                      </motion.button>
                      <span className="text-sm font-mono font-medium">{guestsCount} Guests</span>
                      <motion.button 
                        type="button" 
                        onClick={() => setGuestsCount(guestsCount + 1)}
                        className="px-3 py-2 text-neutral-400 hover:text-white cursor-pointer outline-none"
                        whileHover={{ 
                          scale: 1.2
                        }}
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-serif text-white">Luxury Upgrades & Credentials</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Select optional luxury integrations. Our dedicated team manages and confirms all arrangements prior to departure.</p>

              <div className="space-y-3">
                {eliteEnhancements.map((enh) => {
                  const Icon = enh.icon;
                  const isSelected = selectedExperiences.includes(enh.id);
                  return (
                    <div
                      key={enh.id}
                      onClick={() => handleToggleExperience(enh.id)}
                      className={`p-4 rounded-xl border cursor-pointer flex gap-4 items-start transition-all duration-300 ${
                        isSelected 
                          ? 'border-purple-400 bg-white/5' 
                          : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-400/20 text-purple-400' : 'bg-white/5 text-neutral-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-neutral-100">{enh.label}</h4>
                          <span className="text-xs font-mono text-purple-300 font-semibold">{enh.price}</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1">{enh.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guest Credentials Form */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-sm font-serif text-white uppercase tracking-wider">Sanctuary Guest Credentials</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest text-neutral-400 uppercase mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input 
                        type="text" 
                        placeholder="Johnathan Doe"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest text-neutral-400 uppercase mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input 
                        type="email" 
                        placeholder="john@luxury.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest text-neutral-400 uppercase mb-2">Contact Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 0199"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest text-neutral-400 uppercase mb-2">Bespoke Custom Requests</label>
                    <input 
                      type="text" 
                      placeholder="Special dietary needs, preferred champagne..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && submittedBooking && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-8"
            >
              <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-400 mb-2">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-serif text-white">Experience Awaited</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-medium">{submittedBooking.clientName}</span>. Your bespoke reservation request has been submitted to our luxury travel curator team. 
              </p>

              {/* Luxury Itinerary Voucher Card */}
              <div className="bg-[#111115] border border-white/10 rounded-2xl p-6 text-left max-w-md mx-auto space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <p className="text-[9px] uppercase font-mono tracking-widest text-neutral-400">Reservation Identifier</p>
                    <p className="text-lg font-mono font-bold text-white tracking-wider">{submittedBooking.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase font-mono tracking-widest text-neutral-400">Sanctuary Status</p>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wide bg-amber-500/10 text-amber-400 uppercase">
                      <Clock className="w-2.5 h-2.5" /> In Review
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-light">Destination</p>
                    <p className="font-medium text-white">{submittedBooking.destinationName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-light">Guests</p>
                    <p className="font-medium text-white">{submittedBooking.guestsCount} Guests</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-light">Date of Arrival</p>
                    <p className="font-medium text-white">{submittedBooking.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-light">Duration</p>
                    <p className="font-medium text-white">{submittedBooking.durationDays} Nights</p>
                  </div>
                </div>

                {submittedBooking.selectedExperiences.length > 0 && (
                  <div className="border-t border-white/5 pt-3">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-light mb-1.5">Elite Enhancements</p>
                    <div className="flex flex-wrap gap-1.5">
                      {submittedBooking.selectedExperiences.map(e => (
                        <span key={e} className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-md text-[10px] text-purple-300 font-mono">
                          {e.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400">Estimated Valuation</span>
                  <span className="text-base font-mono font-bold text-white">{submittedBooking.totalPrice}</span>
                </div>
              </div>

              <p className="text-[10px] text-neutral-500 max-w-sm mx-auto leading-relaxed">
                A verification link and comprehensive digital itinerary brochure have been dispatched to <span className="text-neutral-300">{submittedBooking.clientEmail}</span>. Our concierge will call you at <span className="text-neutral-300">{submittedBooking.clientPhone}</span> within the hour.
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-5 border-t border-white/5 bg-[#070709] flex justify-between items-center">
          {step > 1 && step < 4 ? (
            <motion.button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-xs text-neutral-300 hover:text-white cursor-pointer outline-none bg-transparent"
              whileHover={{ 
                scale: 1.03,
                x: -3, 
                backgroundColor: "rgba(255,255,255,0.05)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </motion.button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <motion.button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded-full text-xs uppercase tracking-wider ml-auto cursor-pointer outline-none border-none"
              whileHover={{ 
                scale: 1.03,
                x: 3, 
                boxShadow: "0px 4px 15px rgba(255,255,255,0.18)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Continue <ChevronRight className="w-4 h-4" />
            </motion.button>
          ) : step === 3 ? (
            <motion.button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full text-xs uppercase tracking-widest ml-auto cursor-pointer outline-none border-none"
              whileHover={{ 
                scale: 1.04,
                boxShadow: "0px 8px 16px rgba(168,85,247,0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Confirm Experience <Sparkles className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              onClick={onClose}
              className="flex items-center justify-center w-full py-2.5 bg-white/5 border border-white/10 text-white rounded-full text-xs uppercase tracking-widest cursor-pointer outline-none"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.1)", 
                borderColor: "rgba(255,255,255,0.35)" 
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Close Sanctuary Planner
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}
