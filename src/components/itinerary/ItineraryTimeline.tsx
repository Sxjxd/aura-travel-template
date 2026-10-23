import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOUR_PACKAGES } from '../../data/packages';
import { ChevronDown, MapPin, Hotel, Utensils, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface ItineraryTimelineProps {
  onCustomizeTrip: (defaultDestination?: string) => void;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ onCustomizeTrip }) => {
  const flagship = TOUR_PACKAGES[0]; // Kyoto & Japanese Alps
  const [expandedDay, setExpandedDay] = useState<number>(1);

  return (
    <section id="itinerary" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" className="mb-3">
            <Sparkles size={13} className="text-brand-600" />
            <span>Interactive Route Breakdown</span>
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-950 tracking-tight">
            How a Standard Journey Unfolds
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Take a deep dive into our flagship 10-day expedition through ancient Kyoto and the Japanese Alps. Notice the thoughtful pacing, authentic boutique lodgings, and artisan cultural sessions.
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Accordion of Days */}
          <div className="lg:col-span-7 space-y-4">
            {/* Quick Day Selector Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                  Select Day:
                </span>
                {flagship.itinerary.map((d) => (
                  <button
                    key={d.dayNumber}
                    onClick={() => setExpandedDay(d.dayNumber)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      expandedDay === d.dayNumber
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    Day {d.dayNumber}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setExpandedDay(expandedDay === 0 ? 1 : 0)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors shrink-0"
              >
                {expandedDay === 0 ? 'Expand All' : 'Collapse'}
              </button>
            </div>

            {/* Accordion Cards */}
            <div className="space-y-3">
              {flagship.itinerary.map((day) => {
                const isExpanded = expandedDay === day.dayNumber;
                return (
                  <div
                    key={day.dayNumber}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? 'bg-white border-brand-400 shadow-md ring-2 ring-brand-100'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedDay(isExpanded ? 0 : day.dayNumber)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Day Marker: Centered & High Contrast */}
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 transition-all border ${
                            isExpanded
                              ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/25 ring-2 ring-brand-100'
                              : 'bg-slate-100 text-slate-800 border-slate-200 group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-200'
                          }`}
                        >
                          <span
                            className={`text-[9px] font-extrabold uppercase tracking-widest leading-none ${
                              isExpanded ? 'text-brand-200' : 'text-slate-400'
                            }`}
                          >
                            DAY
                          </span>
                          <span className="font-display font-extrabold text-xl leading-none mt-1">
                            {String(day.dayNumber).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Title & Location Tag */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-100">
                              <MapPin size={11} className="shrink-0" />
                              <span className="truncate">{day.location}</span>
                            </span>
                            <span className="text-[11px] text-slate-400 hidden sm:inline">•</span>
                            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                              {day.activities.length} Curated Experiences
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                            {day.title}
                          </h4>
                        </div>
                      </div>

                      {/* Action Chevron */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isExpanded
                            ? 'bg-brand-600 text-white shadow-xs rotate-180'
                            : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700'
                        }`}
                      >
                        <ChevronDown size={17} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3">
                            {/* Accommodation & Meals Banner */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                              <div className="flex items-center gap-2 text-slate-700">
                                <Hotel size={14} className="text-brand-600 shrink-0" />
                                <span className="font-semibold">{day.accommodation}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-600">
                                <Utensils size={14} className="text-brand-600 shrink-0" />
                                <span>Meals: {day.mealsIncluded.join(', ')}</span>
                              </div>
                            </div>

                            {/* Activities List */}
                            <div className="space-y-2">
                              {day.activities.map((act, i) => (
                                <div
                                  key={i}
                                  className="bg-slate-50/60 p-3.5 rounded-xl border border-slate-200/70 space-y-1 hover:bg-slate-50 transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                                      {act.timeOfDay} • {act.title}
                                    </span>
                                    {act.highlightBadge && (
                                      <span className="text-[10px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded-full border border-brand-200">
                                        {act.highlightBadge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed pl-5">
                                    {act.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Route Card & Summary */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                Route Overview
              </span>
              <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">10 Days • Small Group</span>
            </div>

            {/* Thumbnail Header */}
            <div className="relative rounded-2xl overflow-hidden aspect-[21/9] mb-4 border border-slate-700 shadow-sm">
              <img
                src={flagship.heroImage}
                alt={flagship.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 text-xs font-semibold text-white/95">
                Kyoto • Takayama Alps • Kanazawa
              </div>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              {flagship.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Every detail is calibrated to give you a stress-free expedition. From Shinkansen bullet train passes to onsen ryokan dining, luggage forwarded seamlessly between cities so you travel light.
            </p>

            {/* Route Milestones */}
            <div className="space-y-4 mb-8 text-xs border-y border-slate-800 py-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center font-bold text-xs border border-brand-500/40">
                  1
                </div>
                <div>
                  <div className="font-bold text-white">Kyoto Heritage Base (Days 1–3)</div>
                  <div className="text-slate-400">Gion lantern walk, Zen monastery meditation, Arashiyama dawn</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center font-bold text-xs border border-brand-500/40">
                  2
                </div>
                <div>
                  <div className="font-bold text-white">Japanese Alps & Ryokan (Days 4–7)</div>
                  <div className="text-slate-400">Takayama old timber street, thermal onsen bath, Hida beef banquet</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center font-bold text-xs border border-brand-500/40">
                  3
                </div>
                <div>
                  <div className="font-bold text-white">Kanazawa Samurai & Coastal Return (Days 8–10)</div>
                  <div className="text-slate-400">Kenroku-en landscape garden, gold-leaf artisan studio, bullet train to Tokyo</div>
                </div>
              </div>
            </div>

            {/* Inclusions summary & Action */}
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Standard Group Pricing</div>
                <div className="font-display font-extrabold text-2xl text-white">$3,850 <span className="text-xs font-normal text-slate-400">/ person</span></div>
              </div>
              <div className="text-right text-xs text-emerald-400 font-semibold">
                ✓ Shinkansen Included<br />✓ Bilingual Historian Guide
              </div>
            </div>

            <Button
              variant="accent"
              fullWidth
              size="lg"
              onClick={() => onCustomizeTrip('Japan & Japanese Alps')}
            >
              Customize This Itinerary
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
