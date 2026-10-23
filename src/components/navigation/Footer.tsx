import React, { useState } from 'react';
import { Compass, Mail, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Button } from '../common/Button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                AURA<span className="text-brand-500">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Crafting extraordinary small-group tours, cultural expeditions, and bespoke private itineraries with certified regional specialists across 50+ countries.
            </p>

            {/* Accreditations */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>100% Financial Protection</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <HeartHandshake size={14} className="text-brand-400" />
                <span>Responsible Travel Partner</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Explore Journeys
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#tours" className="hover:text-white transition-colors">Japan Cultural Tours</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Patagonia Glacier Treks</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Amalfi Coastal Cruises</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Serengeti Wildlife Safaris</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Iceland Aurora Expeditions</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Peru Sacred Valley</a></li>
            </ul>
          </div>

          {/* Travel Philosophy & Support */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Why AURA
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#why-us" className="hover:text-white transition-colors">Small Group Philosophy</a></li>
              <li><a href="#itinerary" className="hover:text-white transition-colors">Day-by-Day Transparency</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Verified Traveler Reviews</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Flexible Booking Guarantee</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Safety & Guide Credentials</a></li>
            </ul>
          </div>

          {/* Direct Support & Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-brand-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  Global Travel Hubs: London • New York • Zurich • Tokyo
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-brand-400 shrink-0" />
                <a href="tel:+18005550199" className="text-xs text-slate-300 hover:text-white">
                  +1 (800) 555-0199
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-brand-400 shrink-0" />
                <a href="mailto:concierge@aurajourneys.com" className="text-xs text-slate-300 hover:text-white">
                  concierge@aurajourneys.com
                </a>
              </div>

              {/* Newsletter */}
              <div className="pt-3">
                <p className="text-xs text-slate-400 mb-2 font-medium">
                  Receive curated seasonal itineraries:
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
                    <CheckCircle2 size={14} />
                    <span>Subscribed! Check your inbox soon.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-1.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-brand-500 w-full"
                    />
                    <button
                      type="submit"
                      className="bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-lg transition-colors cursor-pointer"
                      aria-label="Subscribe to newsletter"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AURA Journeys Ltd. All rights reserved. World-Class Business Website Template.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Booking Terms</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
