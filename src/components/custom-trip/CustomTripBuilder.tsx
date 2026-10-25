import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  ShieldCheck, 
  Sparkles,
  Hotel
} from 'lucide-react';

interface CustomTripBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export const CustomTripBuilder: React.FC<CustomTripBuilderProps> = ({
  isOpen,
  onClose,
  initialDestination,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    initialDestination ? [initialDestination] : ['Japan & Kyoto']
  );
  const [travelStyle, setTravelStyle] = useState<string>('Cultural Immersion');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [durationDays, setDurationDays] = useState<number>(10);
  const [travelSeason, setTravelSeason] = useState<string>('Autumn 2025');
  const [accommodationTier, setAccommodationTier] = useState<'Standard Boutique' | 'Premium Comfort' | 'Luxury & Wellness'>(
    'Premium Comfort'
  );
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Available options
  const destinationOptions = [
    'Japan & Kyoto',
    'Patagonia Wilderness',
    'Amalfi Coast & Capri',
    'Tanzania & Serengeti',
    'Iceland Ring Road',
    'Peru & Machu Picchu',
    'Swiss Alpine Valley',
    'Norwegian Fjords',
  ];

  const travelStyles = [
    'Cultural Immersion',
    'Active Hiking & Trekking',
    'Coastal Cruising & Leisure',
    'Wildlife & Safari',
    'Culinary & Wine Journey',
  ];

  const seasons = [
    'Spring 2025',
    'Summer 2025',
    'Autumn 2025',
    'Winter 2025',
    'Early 2026',
  ];

  const accommodationTiers = [
    {
      tier: 'Standard Boutique' as const,
      desc: 'Charming, locally owned 3-4 star boutique hotels with central heritage locations.',
      multiplier: 320,
    },
    {
      tier: 'Premium Comfort' as const,
      desc: 'Top-tier 4-5 star boutique lodges, historic ryokans, and scenic villas.',
      multiplier: 450,
    },
    {
      tier: 'Luxury & Wellness' as const,
      desc: 'Uncompromising 5-star luxury resorts, private onsen suites, and tented retreats.',
      multiplier: 680,
    },
  ];

  // Dynamic live estimate calculation
  const estimatedInvestment = useMemo(() => {
    const tierConfig = accommodationTiers.find((t) => t.tier === accommodationTier);
    const dailyBase = tierConfig ? tierConfig.multiplier : 420;
    const totalTravelers = adults + children * 0.7;
    return Math.round(dailyBase * durationDays * totalTravelers);
  }, [adults, children, durationDays, accommodationTier]);

  const toggleDestination = (dest: string) => {
    if (selectedDestinations.includes(dest)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== dest));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleResetAndClose} maxWidth="3xl">
      <div className="space-y-4">
        {/* Stepper Progress Bar */}
        {!isSubmitted && (
          <div className="border-b border-slate-200 pb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Step {step} of 4: {
                  step === 1 ? 'Destinations & Style' :
                  step === 2 ? 'Travelers & Dates' :
                  step === 3 ? 'Comfort Tier & Pricing' :
                  'Contact & Summary'
                }
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Live Custom Quote Builder
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-colors ${
                    step >= s ? 'bg-brand-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Form Body or Success State */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 px-4 space-y-4"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-900">
              Trip Proposal Request Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{fullName || 'Adventurer'}</strong>. Our regional itinerary specialist for{' '}
              <strong>{selectedDestinations.join(', ')}</strong> is reviewing your brief and will send a detailed custom proposal to <strong>{email || 'your email'}</strong> within 24 business hours.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto text-left space-y-1.5">
              <div><strong>Destinations:</strong> {selectedDestinations.join(', ')}</div>
              <div><strong>Travelers:</strong> {adults} Adults{children > 0 ? `, ${children} Children` : ''}</div>
              <div><strong>Duration:</strong> {durationDays} Days ({travelSeason})</div>
              <div><strong>Est. Range:</strong> ~{formatCurrency(estimatedInvestment)} total</div>
            </div>

            <div className="pt-2">
              <Button variant="primary" onClick={handleResetAndClose}>
                Return to Exploration
              </Button>
            </div>
          </motion.div>
        ) : (
          <div>
            {/* Step 1: Destination & Travel Style */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-0.5">
                    Where would you like to travel?
                  </h4>
                  <p className="text-xs text-slate-500 mb-2">
                    Select one or multiple dream destinations to combine:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {destinationOptions.map((dest) => {
                      const isSelected = selectedDestinations.includes(dest);
                      return (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => toggleDestination(dest)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-brand-50 border-brand-500 text-brand-900 shadow-sm ring-1 ring-brand-400'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <MapPin size={12} className={isSelected ? 'text-brand-600' : 'text-slate-400'} />
                            {isSelected && <CheckCircle2 size={12} className="text-brand-600" />}
                          </div>
                          <span className="truncate w-full">{dest}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-1.5">
                    What is your desired travel style?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {travelStyles.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setTravelStyle(style)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center sm:text-left transition-all cursor-pointer ${
                          travelStyle === style
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <Button variant="primary" size="sm" onClick={() => setStep(2)}>
                    <span>Continue to Travelers & Dates</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Party Size, Duration & Timing */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-4"
              >
                {/* Party Steppers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                      Adults (Age 12+)
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display font-bold text-slate-900">
                        {adults} {adults === 1 ? 'Adult' : 'Adults'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer flex items-center justify-center text-sm"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                      Children (Under 12)
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display font-bold text-slate-900">
                        {children} {children === 1 ? 'Child' : 'Children'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer flex items-center justify-center text-sm"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      Estimated Journey Length
                    </h4>
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-lg border border-brand-200">
                      {durationDays} Days / {durationDays - 1} Nights
                    </span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={25}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>4 Days (Short)</span>
                    <span>14 Days (Standard)</span>
                    <span>25 Days (Grand)</span>
                  </div>
                </div>

                {/* Season Pills */}
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 mb-1.5">
                    Preferred Travel Window
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {seasons.map((season) => (
                      <button
                        key={season}
                        type="button"
                        onClick={() => setTravelSeason(season)}
                        className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          travelSeason === season
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setStep(3)}>
                    <span>Continue to Comfort & Budget</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Accommodation Tier & Live Pricing Calculator */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-2">
                    Select Preferred Lodging Comfort
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {accommodationTiers.map((tierItem) => {
                      const isSelected = accommodationTier === tierItem.tier;
                      return (
                        <div
                          key={tierItem.tier}
                          onClick={() => setAccommodationTier(tierItem.tier)}
                          className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-brand-50/80 border-brand-500 shadow-sm ring-1 ring-brand-300'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                                <Hotel size={14} className="text-brand-600 shrink-0" />
                                <span className="line-clamp-1">{tierItem.tier}</span>
                              </span>
                              {isSelected && <CheckCircle2 size={14} className="text-brand-600 shrink-0" />}
                            </div>
                            <div className="text-[11px] font-bold text-brand-700 mb-1">
                              ~${tierItem.multiplier}/day per guest
                            </div>
                            <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">{tierItem.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Estimator Ticker Card */}
                <div className="bg-slate-900 rounded-xl p-3.5 sm:p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-brand-400">
                      Real-Time Estimated Journey Investment
                    </div>
                    <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      {formatCurrency(estimatedInvestment)}
                      <span className="text-xs font-normal text-slate-400"> (Total for group)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Includes boutique lodgings, private transport, guide service & internal logistics.
                    </div>
                  </div>
                  <div className="bg-slate-800/80 px-3.5 py-1.5 rounded-xl text-center border border-slate-700 shrink-0">
                    <div className="text-[9px] text-slate-400 font-semibold uppercase">Per Guest Approx.</div>
                    <div className="font-bold text-base text-emerald-400">
                      {formatCurrency(Math.round(estimatedInvestment / Math.max(1, adults + children)))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setStep(4)}>
                    <span>Review & Request Proposal</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Info & Review */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-4"
              >
                {/* Summary Strip */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Destinations</span>
                    <span className="font-bold text-slate-900 truncate block">{selectedDestinations.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Travelers</span>
                    <span className="font-bold text-slate-900">{adults} Adults{children > 0 ? `, ${children} Kids` : ''}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Duration & Season</span>
                    <span className="font-bold text-slate-900">{durationDays} Days • {travelSeason}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Est. Total</span>
                    <span className="font-bold text-brand-700">{formatCurrency(estimatedInvestment)}</span>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. eleanor@example.com"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Preferred Contact Method
                      </label>
                      <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none">
                        <option>Email Itinerary PDF</option>
                        <option>Phone Consultation</option>
                        <option>WhatsApp Direct</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Special Celebrations or Preferences (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. 20th Anniversary, interest in private hiking trails, wine tasting..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <Button variant="ghost" size="sm" type="button" onClick={() => setStep(3)}>
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </Button>
                    <Button variant="accent" size="sm" type="submit">
                      <span>Submit Custom Trip Brief</span>
                      <Sparkles size={15} />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
