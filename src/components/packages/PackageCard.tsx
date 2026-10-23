import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, ArrowRight, Check, Compass, Mountain, Anchor, Trees, Eye, Star } from 'lucide-react';
import { TourPackage } from '../../types/travel';
import { Button } from '../common/Button';
import { formatCurrency, formatDuration, formatDate } from '../../utils/formatters';

interface PackageCardProps {
  pkg: TourPackage;
  onSelect: (pkg: TourPackage) => void;
  onQuickInquire: (pkg: TourPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onSelect,
  onQuickInquire,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cultural':
        return <Compass size={12} className="text-amber-600" />;
      case 'adventure':
        return <Mountain size={12} className="text-emerald-600" />;
      case 'coastal':
        return <Anchor size={12} className="text-sky-600" />;
      case 'wildlife':
        return <Trees size={12} className="text-teal-600" />;
      default:
        return <Compass size={12} className="text-brand-600" />;
    }
  };

  // Filter out any badge that duplicates the category
  const filteredBadges = pkg.badges.filter(
    (b) => !b.toLowerCase().includes(pkg.category.toLowerCase())
  );

  const nextDeparture = pkg.nextDepartureDates[0]
    ? formatDate(pkg.nextDepartureDates[0])
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 flex flex-col transition-all duration-300 group"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Dual gradient overlay for crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/40 pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Category Pill */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm uppercase tracking-wider">
              {getCategoryIcon(pkg.category)}
              <span>{pkg.category}</span>
            </span>
            {filteredBadges[0] && (
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/95 text-white text-[10px] font-bold tracking-wide shadow-sm">
                {filteredBadges[0]}
              </span>
            )}
          </div>

          {/* Premium Glass Rating Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-md">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="font-extrabold text-xs">{pkg.rating.score.toFixed(1)}</span>
            <span className="text-[10px] text-slate-300">({pkg.rating.reviewCount})</span>
          </div>
        </div>

        {/* Overlaid Location Badge */}
        <div className="absolute bottom-3 inset-x-3 flex items-center pointer-events-none">
          <div className="inline-flex items-center gap-1.5 text-xs text-white/95 font-semibold bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 max-w-full">
            <MapPin size={13} className="text-brand-400 shrink-0" />
            <span className="truncate">{pkg.destination.country} • {pkg.destination.region}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3
            onClick={() => onSelect(pkg)}
            className="font-display font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-brand-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {pkg.title}
          </h3>

          {/* Tagline */}
          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {pkg.tagline}
          </p>

          {/* Quick Specs & Upcoming Departure */}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <Calendar size={13} className="text-brand-600 shrink-0" />
                <span>{formatDuration(pkg.durationDays)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Users size={13} className="text-brand-600 shrink-0" />
                <span>Max {pkg.groupSize.max} Guests</span>
              </div>
            </div>

            {nextDeparture && (
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Next Guaranteed Departure:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70">
                  {nextDeparture}
                </span>
              </div>
            )}
          </div>

          {/* Highlights */}
          <div className="mt-4 space-y-1.5">
            {pkg.keyHighlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Starting from
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-2xl text-slate-900 leading-none">
                {formatCurrency(pkg.pricing.basePriceUSD)}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">/ person</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(pkg)}
              className="text-xs px-3 font-semibold"
            >
              <Eye size={13} />
              <span>Itinerary</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onQuickInquire(pkg)}
              className="text-xs px-3.5 font-semibold"
            >
              <span>Book</span>
              <ArrowRight size={13} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
