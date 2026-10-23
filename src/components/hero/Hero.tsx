import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, ShieldCheck, Users, Star, ArrowRight } from 'lucide-react';
import { TripFilterState } from '../../types/travel';
import { TripSearchFilter } from './TripSearchFilter';
import { fadeInUp } from '../../utils/motion';

interface HeroProps {
  filters: TripFilterState;
  onFilterChange: (newFilters: Partial<TripFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  onExploreClick,
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-brand-50/60 via-slate-50 to-white">
      {/* Decorative background grid and light blur orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-200/30 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section with Flanking Floating Experience Cards */}
        <div className="relative flex items-center justify-center min-h-[380px]">
          {/* Left Flanking Experience Card (Cultural / Mountain) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -3 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -10, 0],
              rotate: [-3, -4, -3],
            }}
            transition={{
              opacity: { duration: 0.6 },
              x: { duration: 0.6 },
              y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            onClick={() => onFilterChange({ destinationQuery: 'Kyoto', category: 'cultural' })}
            className="hidden xl:flex flex-col absolute left-0 top-2 w-56 bg-white p-2.5 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 z-20 cursor-pointer hover:scale-105 transition-transform group"
            title="Click to view Kyoto & Japanese Alps"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"
                alt="Kyoto Heritage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/30" />
              
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-wider">
                Cultural Expedition
              </span>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <div className="text-xs font-bold leading-tight line-clamp-1">Kyoto & Japanese Alps</div>
                <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
                  <span>10 Days • Small Group</span>
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    <Star size={11} className="fill-current" /> 4.96
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 px-1 flex items-center justify-between text-[11px]">
              <span className="font-bold text-brand-600 flex items-center gap-1 group-hover:text-brand-700">
                <span>View Route</span>
                <ArrowRight size={12} />
              </span>
              <span className="text-slate-500 font-semibold">$3,850/pp</span>
            </div>
          </motion.div>

          {/* Center Main Headline Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto flex flex-col items-center relative z-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200 shadow-sm text-xs font-semibold text-brand-700 mb-6">
              <Sparkles size={14} className="text-brand-500 fill-brand-500" />
              <span>2025–2026 Small Group & Bespoke Departures Open</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.12]">
              Journeys Crafted for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-teal-500">Curiosity & Wonder</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Immersive cultural expeditions, alpine treks, and coastal voyages led by certified local historians and naturalists. Transparent pricing, capped group sizes, and genuine care.
            </p>

            {/* Quick Stats Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-200/80 shadow-xs">
                <Users size={14} className="text-brand-600" />
                <span>Small Groups (Max 8–14)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-200/80 shadow-xs">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>100% Refundable Deposits</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-200/80 shadow-xs">
                <Compass size={14} className="text-brand-600" />
                <span>Certified Resident Guides</span>
              </div>
            </div>


          </motion.div>

          {/* Right Flanking Experience Card (Coastal / Islands) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 3 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 10, 0],
              rotate: [3, 4, 3],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.2 },
              x: { duration: 0.6, delay: 0.2 },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
              rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
            }}
            onClick={() => onFilterChange({ destinationQuery: 'Amalfi', category: 'coastal' })}
            className="hidden xl:flex flex-col absolute right-0 top-2 w-56 bg-white p-2.5 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 z-20 cursor-pointer hover:scale-105 transition-transform group"
            title="Click to view Amalfi Coast & Capri"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80"
                alt="Amalfi Coast"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/30" />
              
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-wider">
                Coastal Cruise
              </span>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <div className="text-xs font-bold leading-tight line-clamp-1">Amalfi Coast & Capri</div>
                <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
                  <span>8 Days • Private Boat</span>
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    <Star size={11} className="fill-current" /> 4.94
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 px-1 flex items-center justify-between text-[11px]">
              <span className="font-bold text-brand-600 flex items-center gap-1 group-hover:text-brand-700">
                <span>View Route</span>
                <ArrowRight size={12} />
              </span>
              <span className="text-slate-500 font-semibold">$3,600/pp</span>
            </div>
          </motion.div>
        </div>

        {/* Embedded Interactive Trip Filter Widget */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-5xl mx-auto"
        >
          <TripSearchFilter
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onResetFilters}
            totalResults={totalResults}
          />
        </motion.div>
      </div>
    </section>
  );
};
