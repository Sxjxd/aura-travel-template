import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { Button } from '../common/Button';

interface NavbarProps {
  onOpenTripBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTripBuilder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Featured Tours', href: '#tours' },
    { label: 'Day-by-Day Itinerary', href: '#itinerary' },
    { label: 'Why Travel With Us', href: '#why-us' },
    { label: 'Traveler Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
            : 'bg-white/60 backdrop-blur-sm border-b border-white/20 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 leading-tight">
                  AURA<span className="text-brand-600">.</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 -mt-1">
                  Journeys
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="tel:+18005550199"
                className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Phone size={13} />
                </div>
                <span>+1 (800) 555-0199</span>
              </a>

              <Button
                variant="primary"
                size="sm"
                onClick={onOpenTripBuilder}
                className="shadow-sm"
              >
                <CalendarCheck size={16} />
                <span>Plan Custom Trip</span>
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle mobile navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-800 hover:text-brand-600 py-2 border-b border-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTripBuilder();
                  }}
                >
                  <CalendarCheck size={16} />
                  <span>Plan Custom Trip</span>
                </Button>

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-500">
                  <Phone size={14} />
                  <span>Direct Specialist Desk: +1 (800) 555-0199</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
