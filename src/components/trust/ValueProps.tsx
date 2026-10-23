import React from 'react';
import { motion } from 'framer-motion';
import { Users2, BadgeDollarSign, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { viewportConfig, scrollRevealFadeUp } from '../../utils/motion';

export const ValueProps: React.FC = () => {
  const values = [
    {
      icon: <Users2 className="w-6 h-6 text-brand-600" />,
      topBorder: 'border-t-brand-500',
      iconBg: 'bg-brand-50 border-brand-200/60',
      title: 'Small Groups by Design',
      description: 'We intentionally cap departures at 8 to 14 travelers. You never wait in endless tour bus lines, dinners are held at authentic neighborhood bistros, and your guide knows your name on Day 1.',
      perks: ['Max 8–14 guests per group', 'Guaranteed window seats', 'Intimate local access'],
    },
    {
      icon: <BadgeDollarSign className="w-6 h-6 text-emerald-600" />,
      topBorder: 'border-t-emerald-500',
      iconBg: 'bg-emerald-50 border-emerald-200/60',
      title: 'Transparent, No-Surprise Pricing',
      description: 'What you see is what you pay. Internal flights, luxury rail passes, national park permits, and luggage forwarding are built directly into your fare with zero hidden airport surcharges.',
      perks: ['100% refundable deposits', 'Transparent inclusions list', 'No forced shopping stops'],
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-600" />,
      topBorder: 'border-t-amber-500',
      iconBg: 'bg-amber-50 border-amber-200/60',
      title: 'Certified Resident Guides',
      description: 'You travel with resident historians, marine biologists, and licensed mountain guides who live in the region. They unlock stories, secret viewpoints, and culinary gems you could never find alone.',
      perks: ['Bilingual resident guides', 'Emergency first-responder certified', 'Deep local relationships'],
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      topBorder: 'border-t-indigo-500',
      iconBg: 'bg-indigo-50 border-indigo-200/60',
      title: 'Thoughtfully Paced Itineraries',
      description: 'We design trips for humans, not checklists. Enjoy multiple-night stays at each boutique property so you unpack once, savor slow mornings, and never feel exhausted by mid-trip.',
      perks: ['Multiple-night boutique stays', 'Generous leisure afternoons', 'Central historic locations'],
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={scrollRevealFadeUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">
            The AURA Difference
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
            Built for Authentic, Low-Stress Travel
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Why seasoned travelers choose our small group and custom departures over mass-market bus tours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 1.0, delay: idx * 0.16, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 border-t-4 ${v.topBorder} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl border ${v.iconBg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2.5 group-hover:text-brand-600 transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {v.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                {v.perks.map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
