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
      <div className="space-y-6">
        {/* Stepper Progress Bar */}
        {!isSubmitted && (
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Step {step} of 4: {
                  step === 1 ? 'Destinations & Style' :
                  step === 2 ? 'Party & Pacing' :
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
            className="text-center py-8 px-4 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-900">
              Trip Proposal Request Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{fullName || 'Adventurer'}</strong>. Our regional itinerary specialist for{' '}
              <strong>{selectedDestinations.join(', ')}</strong> is reviewing your brief and will send a detailed custom proposal to <strong>{email || 'your email'}</strong> within 24 business hours.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto text-left space-y-1.5">
              <div><strong>Destinations:</strong> {selectedDestinations.join(', ')}</div>
              <div><strong>Travelers:</strong> {adults} Adults{children > 0 ? `, ${children} Children` : ''}</div>
              <div><strong>Duration:</strong> {durationDays} Days ({travelSeason})</div>
              <div><strong>Est. Range:</strong> ~{formatCurrency(estimatedInvestment)} total</div>
            </div>

            <div className="pt-4">
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900 mb-1">
                    Where would you like to travel?
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">
                    Select one or multiple dream destinations to combine:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {destinationOptions.map((dest) => {
                      const isSelected = selectedDestinations.includes(dest);
                      return (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => toggleDestination(dest)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-brand-50 border-brand-500 text-brand-900 shadow-sm ring-1 ring-brand-400'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <MapPin size={13} className={isSelected ? 'text-brand-600' : 'text-slate-400'} />
                            {isSelected && <CheckCircle2 size={13} className="text-brand-600" />}
                          </div>
                          <span>{dest}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold text-base text-slate-900 mb-1">
                    What is your desired travel style?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {travelStyles.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setTravelStyle(style)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
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

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <Button variant="primary" onClick={() => setStep(2)}>
                    <span>Continue to Party & Pacing</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Party Size, Duration & Timing */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Party Steppers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold uppercase text-slate-500 block mb-2">
                      Adults (Age 12+)
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-display font-bold text-slate-900">
                        {adults} {adults === 1 ? 'Adult' : 'Adults'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold uppercase text-slate-500 block mb-2">
                      Children (Under 12)
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-display font-bold text-slate-900">
                        {children} {children === 1 ? 'Child' : 'Children'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      Estimated Journey Length
                    </h4>
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
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
                    <span>4 Days (Short Break)</span>
                    <span>14 Days (Standard Expedition)</span>
                    <span>25 Days (Grand Circuit)</span>
                  </div>
                </div>

                {/* Season Pills */}
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 mb-2">
                    Preferred Travel Window
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {seasons.map((season) => (
                      <button
                        key={season}
                        type="button"
                        onClick={() => setTravelSeason(season)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
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

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </Button>
                  <Button variant="primary" onClick={() => setStep(3)}>
                    <span>Continue to Comfort & Budget</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Accommodation Tier & Live Pricing Calculator */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900 mb-2">
                    Select Preferred Lodging Comfort
                  </h4>
                  <div className="space-y-3">
                    {accommodationTiers.map((tierItem) => {
                      const isSelected = accommodationTier === tierItem.tier;
                      return (
                        <div
                          key={tierItem.tier}
                          onClick={() => setAccommodationTier(tierItem.tier)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-brand-50/70 border-brand-500 shadow-sm ring-1 ring-brand-300'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                              <Hotel size={15} className="text-brand-600" />
                              {tierItem.tier}
                            </span>
                            <span className="text-xs font-bold text-brand-700">
                              ~${tierItem.multiplier}/day per guest
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">{tierItem.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Estimator Ticker Card */}
                <div className="bg-slate-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                  <div>
                    <div className="text-[11px] uppercase font-bold text-brand-400">
                      Real-Time Estimated Journey Investment
                    </div>
                    <div className="font-display font-extrabold text-3xl text-white">
                      {formatCurrency(estimatedInvestment)}
                      <span className="text-xs font-normal text-slate-400"> (Total for group)</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Includes boutique lodgings, private transport, guide service & internal logistics.
                    </div>
                  </div>
                  <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-center border border-slate-700 shrink-0">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Per Guest Approx.</div>
                    <div className="font-bold text-base text-emerald-400">
                      {formatCurrency(Math.round(estimatedInvestment / Math.max(1, adults + children)))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Button variant="ghost" onClick={() => setStep(2)}>
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </Button>
                  <Button variant="primary" onClick={() => setStep(4)}>
                    <span>Review & Request Proposal</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Info & Review */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Summary Strip */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <span className="text-slate-400 block font-semibold">Destinations</span>
                    <span className="font-bold text-slate-900">{selectedDestinations.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Party</span>
                    <span className="font-bold text-slate-900">{adults} Adults{children > 0 ? `, ${children} Kids` : ''}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Length & Season</span>
                    <span className="font-bold text-slate-900">{durationDays} Days • {travelSeason}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Est. Target</span>
                    <span className="font-bold text-brand-700">{formatCurrency(estimatedInvestment)}</span>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. eleanor@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Preferred Contact Method
                      </label>
                      <select className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none">
                        <option>Email Itinerary PDF</option>
                        <option>Phone Consultation</option>
                        <option>WhatsApp Direct</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Special Celebrations or Preferences (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. 20th Anniversary, interest in private hiking trails, wine tasting..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <Button variant="ghost" type="button" onClick={() => setStep(3)}>
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </Button>
                    <Button variant="accent" size="lg" type="submit">
                      <span>Submit Custom Trip Brief</span>
                      <Sparkles size={16} />
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
