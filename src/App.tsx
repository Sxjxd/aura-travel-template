import React, { useState, useMemo, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { TrustBar } from './components/trust/TrustBar';
import { PackageGrid } from './components/packages/PackageGrid';
import { ItineraryTimeline } from './components/itinerary/ItineraryTimeline';
import { ValueProps } from './components/trust/ValueProps';
import { Testimonials } from './components/trust/Testimonials';
import { FAQSection } from './components/faq/FAQSection';
import { Footer } from './components/navigation/Footer';
import { PackageDetailModal } from './components/packages/PackageDetailModal';
import { CustomTripBuilder } from './components/custom-trip/CustomTripBuilder';
import { TOUR_PACKAGES } from './data/packages';
import { TourPackage, TripFilterState } from './types/travel';
import { Button } from './components/common/Button';
import { Sparkles, CalendarCheck, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  // Modal states
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [builderDestination, setBuilderDestination] = useState<string | undefined>(undefined);

  // Initialize Lenis luxury smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.78,
      touchMultiplier: 1.2,
    });

    // Expose lenis instance globally for smooth button navigation
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Smoothly intercept in-page anchor links (e.g. #itinerary, #tours) with slow luxury glide
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          lenis.scrollTo(href, {
            offset: -85,
            duration: 2.2,
            easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
          });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  // Filter state
  const [filters, setFilters] = useState<TripFilterState>({
    destinationQuery: '',
    category: 'all',
    maxPriceUSD: 6000,
    durationRange: 'any',
    sortBy: 'featured',
  });

  const handleFilterChange = (newFilters: Partial<TripFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      destinationQuery: '',
      category: 'all',
      maxPriceUSD: 6000,
      durationRange: 'any',
      sortBy: 'featured',
    });
  };

  // Compound filtering engine
  const filteredPackages = useMemo(() => {
    return TOUR_PACKAGES.filter((pkg) => {
      // Search keyword matching
      const query = filters.destinationQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        pkg.title.toLowerCase().includes(query) ||
        pkg.destination.country.toLowerCase().includes(query) ||
        pkg.destination.region.toLowerCase().includes(query) ||
        pkg.tagline.toLowerCase().includes(query);

      // Category matching
      const matchesCategory =
        filters.category === 'all' || pkg.category === filters.category;

      // Price matching
      const matchesPrice = pkg.pricing.basePriceUSD <= filters.maxPriceUSD;

      // Duration range matching
      const matchesDuration =
        filters.durationRange === 'any' ||
        (filters.durationRange === '1-7' && pkg.durationDays <= 7) ||
        (filters.durationRange === '8-14' && pkg.durationDays >= 8 && pkg.durationDays <= 14) ||
        (filters.durationRange === '15+' && pkg.durationDays >= 15);

      return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.pricing.basePriceUSD - b.pricing.basePriceUSD;
      if (filters.sortBy === 'price-desc') return b.pricing.basePriceUSD - a.pricing.basePriceUSD;
      if (filters.sortBy === 'rating') return b.rating.score - a.rating.score;
      if (filters.sortBy === 'duration') return a.durationDays - b.durationDays;
      return 0; // default featured
    });
  }, [filters]);

  const handleOpenBuilder = (destination?: string) => {
    setBuilderDestination(destination);
    setIsBuilderOpen(true);
  };

  const handleBookFromModal = (pkg: TourPackage) => {
    handleOpenBuilder(`${pkg.destination.country} (${pkg.title})`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <Navbar onOpenTripBuilder={() => handleOpenBuilder()} />

      <main className="flex-1">
        {/* Hero Section with Live Search/Filter Widget */}
        <Hero
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onExploreClick={() => {
            const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
            if (lenis) {
              lenis.scrollTo('#tours', {
                offset: -85,
                duration: 2.2,
                easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
              });
            } else {
              document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          totalResults={filteredPackages.length}
        />

        {/* Commercial Trust & Numbers Strip */}
        <TrustBar />

        {/* Filterable Tour Package Catalog */}
        <PackageGrid
          packages={filteredPackages}
          allPackages={TOUR_PACKAGES}
          activeCategory={filters.category}
          onCategoryChange={(cat) => handleFilterChange({ category: cat })}
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
          onQuickInquire={(pkg) => handleOpenBuilder(`${pkg.destination.country} (${pkg.title})`)}
          onResetFilters={handleResetFilters}
        />

        {/* Flagship Itinerary Deep-Dive Component */}
        <ItineraryTimeline onCustomizeTrip={(dest) => handleOpenBuilder(dest)} />

        {/* 4 Pillars / Value Propositions */}
        <ValueProps />

        {/* Interactive Custom Journey Callout Banner */}
        <section className="py-16 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold mb-4">
              <Sparkles size={13} />
              <span>Custom Private Travel</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight max-w-2xl mx-auto leading-tight">
              Looking for a Private Route or Custom Dates?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Every small-group tour we offer can be booked as a private trip for your family or friends, with dates and hotel choices tailored to your group.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                onClick={() => handleOpenBuilder()}
              >
                <CalendarCheck size={18} />
                <span>Build Your Custom Trip</span>
              </Button>
              <a
                href="tel:+18005550199"
                className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Call Concierge: +1 (800) 555-0199
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                No Booking Fee
              </span>
              <span>•</span>
              <span>Complimentary Quote within 24h</span>
              <span>•</span>
              <span>Direct Regional Specialist</span>
            </div>
          </div>
        </section>

        {/* Real Traveler Reviews */}
        <Testimonials />

        {/* FAQs */}
        <FAQSection onOpenTripBuilder={() => handleOpenBuilder()} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      <PackageDetailModal
        pkg={selectedPackage}
        isOpen={Boolean(selectedPackage)}
        onClose={() => setSelectedPackage(null)}
        onBookNow={handleBookFromModal}
      />

      <CustomTripBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        initialDestination={builderDestination}
      />
    </div>
  );
};

export default App;
