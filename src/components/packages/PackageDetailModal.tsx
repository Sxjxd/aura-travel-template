import React, { useState } from 'react';
import { TourPackage } from '../../types/travel';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { formatCurrency, formatDuration, formatDate } from '../../utils/formatters';
import { Calendar, Users, MapPin, Check, X, ShieldCheck, Clock, Hotel, Utensils, ArrowRight } from 'lucide-react';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (pkg: TourPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  isOpen,
  onClose,
  onBookNow,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'departures'>('itinerary');

  if (!pkg) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="space-y-6">
        {/* Header Hero Area */}
        <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-slate-900 shadow-md">
          <img
            src={pkg.heroImage}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-white/90 text-slate-900 font-bold">
              {pkg.category.toUpperCase()}
            </Badge>
            {pkg.badges.map((b, i) => (
              <Badge key={i} variant="accent" className="font-semibold">
                {b}
              </Badge>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs text-brand-300 font-medium mb-1">
              <MapPin size={14} />
              <span>{pkg.destination.country} • {pkg.destination.region}</span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {pkg.title}
            </h2>
          </div>
        </div>

        {/* Specs & Booking Quick Bar */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-brand-600" />
              <span className="font-bold text-slate-900">{formatDuration(pkg.durationDays)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={16} className="text-brand-600" />
              <span>Max {pkg.groupSize.max} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RatingStars score={pkg.rating.score} reviewCount={pkg.rating.reviewCount} size={14} />
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Base Fare</div>
              <div className="font-display font-extrabold text-2xl text-slate-900">
                {formatCurrency(pkg.pricing.basePriceUSD)}
                <span className="text-xs font-normal text-slate-500"> / guest</span>
              </div>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
            >
              <span>Reserve Spot</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Day-by-Day Itinerary ({pkg.itinerary.length} Days)
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            What's Included & Excluded
          </button>
          <button
            onClick={() => setActiveTab('departures')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'departures'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Upcoming Departures ({pkg.nextDepartureDates.length})
          </button>
        </div>

        {/* Tab 1: Day-by-Day Itinerary */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 italic">
              Carefully paced itinerary balancing guided cultural encounters with leisure time:
            </p>
            <div className="space-y-4">
              {pkg.itinerary.map((day) => (
                <div
                  key={day.dayNumber}
                  className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {day.dayNumber}
                      </span>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        {day.title}
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      {day.location}
                    </span>
                  </div>

                  {/* Accommodation & Meals */}
                  <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Hotel size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-800">{day.accommodation}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Utensils size={14} className="text-slate-400" />
                      <span>Meals: {day.mealsIncluded.join(', ')}</span>
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="space-y-2 pt-1">
                    {day.activities.map((act, actIdx) => (
                      <div key={actIdx} className="bg-white p-3 rounded-lg border border-slate-100 text-xs">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                            {act.title}
                          </span>
                          {act.highlightBadge && (
                            <Badge variant="accent" size="sm" className="text-[10px]">
                              {act.highlightBadge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-600 leading-relaxed pl-3">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Inclusions & Exclusions */}
        {activeTab === 'inclusions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
              <h4 className="font-display font-bold text-sm text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                <Check size={16} className="text-emerald-600" />
                What Is Included
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                {pkg.includedFeatures.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-600 shrink-0 mt-1" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 space-y-3">
              <h4 className="font-display font-bold text-sm text-rose-900 uppercase tracking-wider flex items-center gap-2">
                <X size={16} className="text-rose-600" />
                What Is Excluded
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                {pkg.excludedFeatures.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X size={14} className="text-rose-600 shrink-0 mt-1" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Departures */}
        {activeTab === 'departures' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Guaranteed departures with limited spots remaining (capped at {pkg.groupSize.max} guests):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.nextDepartureDates.map((dateStr, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {formatDate(dateStr)}
                      </div>
                      <div className="text-xs text-emerald-600 font-semibold">
                        Guaranteed Departure • 4 spots left
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onClose();
                      onBookNow(pkg);
                    }}
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
