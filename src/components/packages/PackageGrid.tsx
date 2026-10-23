import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, RotateCcw, Sparkles, Filter } from 'lucide-react';
import { TourPackage, TravelCategory } from '../../types/travel';
import { PackageCard } from './PackageCard';
import { Button } from '../common/Button';
import { viewportConfig, scrollRevealFadeUp } from '../../utils/motion';

interface PackageGridProps {
  packages: TourPackage[];
  allPackages: TourPackage[];
  activeCategory: TravelCategory;
  onCategoryChange: (category: TravelCategory) => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onQuickInquire: (pkg: TourPackage) => void;
  onResetFilters: () => void;
}

export const PackageGrid: React.FC<PackageGridProps> = ({
  packages,
  allPackages,
  activeCategory,
  onCategoryChange,
  onSelectPackage,
  onQuickInquire,
  onResetFilters,
}) => {
  const categoryTabs: { key: TravelCategory; label: string }[] = [
    { key: 'all', label: 'All Tours' },
    { key: 'cultural', label: 'Cultural & Historic' },
    { key: 'adventure', label: 'Active Adventure' },
    { key: 'coastal', label: 'Coastal & Islands' },
    { key: 'wildlife', label: 'Wildlife & Safari' },
  ];

  // Calculate counts for each category
  const getCategoryCount = (cat: TravelCategory) => {
    if (cat === 'all') return allPackages.length;
    return allPackages.filter((p) => p.category === cat).length;
  };

  // Recommended packages if current filter returns fewer than 3 packages
  const recommendedPackages = packages.length < 3
    ? allPackages.filter((p) => !packages.some((item) => item.id === p.id)).slice(0, 3 - packages.length)
    : [];

  return (
    <section id="tours" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={scrollRevealFadeUp}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-xs font-bold text-brand-700 uppercase tracking-widest mb-3">
            <Sparkles size={13} className="text-brand-600" />
            <span>Handpicked Routes</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-950 tracking-tight">
            Featured Tour Packages
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Small-group trips with reasonable travel times, certified local guides, and handpicked boutique hotels.
          </p>
        </motion.div>

        {/* In-Section Category Filter Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={scrollRevealFadeUp}
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
        >
          {categoryTabs.map((tab) => {
            const count = getCategoryCount(tab.key);
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onCategoryChange(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white border border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-slate-800 text-brand-300' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Filter Summary Strip */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-brand-600" />
            <span>
              Showing <strong className="text-slate-900">{packages.length}</strong> of{' '}
              <strong className="text-slate-900">{allPackages.length}</strong> tours
            </span>
          </div>

          {activeCategory !== 'all' && (
            <button
              onClick={onResetFilters}
              className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw size={12} />
              <span>Show All Tours</span>
            </button>
          )}
        </div>

        {/* Package Grid or Empty State */}
        {packages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-1">
              No matching journeys found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Try adjusting your search criteria, raising your budget ceiling, or resetting all filters.
            </p>
            <Button variant="secondary" size="sm" onClick={onResetFilters}>
              <RotateCcw size={14} />
              <span>Reset all filters</span>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {/* Primary Filtered Grid */}
            <motion.div
              layout
              className={`grid gap-8 ${
                packages.length === 1
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto'
                  : packages.length === 2
                  ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              <AnimatePresence>
                {packages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onSelect={onSelectPackage}
                    onQuickInquire={onQuickInquire}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* If filtered to 1-2 items, show other popular expeditions so the screen remains balanced */}
            {recommendedPackages.length > 0 && activeCategory !== 'all' && (
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      You Might Also Enjoy
                    </h3>
                    <p className="text-xs text-slate-500">
                      Other top-rated itineraries across our global destinations:
                    </p>
                  </div>
                  <button
                    onClick={() => onCategoryChange('all')}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                  >
                    View All Expeditions →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      onSelect={onSelectPackage}
                      onQuickInquire={onQuickInquire}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
