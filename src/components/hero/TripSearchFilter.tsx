import React from 'react';
import { Search, Compass, Calendar, DollarSign, X } from 'lucide-react';
import { TripFilterState, TravelCategory } from '../../types/travel';
import { formatCurrency } from '../../utils/formatters';

interface TripSearchFilterProps {
  filters: TripFilterState;
  onFilterChange: (newFilters: Partial<TripFilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

export const TripSearchFilter: React.FC<TripSearchFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const categories: { key: TravelCategory; label: string }[] = [
    { key: 'all', label: 'All Tours' },
    { key: 'cultural', label: 'Cultural & Historic' },
    { key: 'adventure', label: 'Active Adventure' },
    { key: 'coastal', label: 'Coastal & Islands' },
    { key: 'wildlife', label: 'Wildlife & Safari' },
  ];

  const durationOptions = [
    { key: 'any', label: 'Any Duration' },
    { key: '1-7', label: '1 to 7 Days' },
    { key: '8-14', label: '8 to 14 Days' },
    { key: '15+', label: '15+ Days' },
  ];

  const isFiltered =
    Boolean(filters.destinationQuery) ||
    filters.category !== 'all' ||
    filters.durationRange !== 'any' ||
    filters.maxPriceUSD < 6000;

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-5 md:p-6 transition-all">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 border-b border-slate-100 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onFilterChange({ category: cat.key })}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filters.category === cat.key
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Filter Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* Destination Search */}
        <div className="relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Destination / Keyword
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={filters.destinationQuery}
              onChange={(e) => onFilterChange({ destinationQuery: e.target.value })}
              placeholder="e.g. Japan, Patagonia, Italy..."
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
            />
            {filters.destinationQuery && (
              <button
                onClick={() => onFilterChange({ destinationQuery: '' })}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Duration Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Trip Length
          </label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <select
              value={filters.durationRange}
              onChange={(e) =>
                onFilterChange({
                  durationRange: e.target.value as TripFilterState['durationRange'],
                })
              }
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none cursor-pointer"
            >
              {durationOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Max Budget Slider */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Max Budget
            </label>
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
              {formatCurrency(filters.maxPriceUSD)}
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="range"
              min={2500}
              max={6000}
              step={250}
              value={filters.maxPriceUSD}
              onChange={(e) => onFilterChange({ maxPriceUSD: Number(e.target.value) })}
              className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* Sort By & Results Count */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Sort Order
          </label>
          <div className="relative flex items-center">
            <Compass className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as TripFilterState['sortBy'],
                })
              }
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none cursor-pointer"
            >
              <option value="featured">Featured Tours</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Trip Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Status Strip */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium">
          Showing <strong className="text-slate-900">{totalResults}</strong> tour packages
        </span>

        {isFiltered && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-800 transition-colors cursor-pointer"
          >
            <X size={13} />
            <span>Clear all filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
