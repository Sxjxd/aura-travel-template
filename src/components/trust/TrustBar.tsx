import React from 'react';
import { motion } from 'framer-motion';
import { Star, Globe2, Award, Headset, CheckCircle2 } from 'lucide-react';
import { viewportConfig } from '../../utils/motion';

export const TrustBar: React.FC = () => {
  const stats = [
    {
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
      iconBg: 'bg-amber-50 border-amber-200/80',
      tag: 'Reviews',
      value: '4.96 / 5.0',
      label: 'Customer Rating',
      sublabel: '500+ verified traveler reviews',
    },
    {
      icon: <Globe2 className="w-5 h-5 text-brand-600" />,
      iconBg: 'bg-sky-50 border-sky-200/80',
      tag: 'Destinations',
      value: '52 Countries',
      label: 'Countries Offered',
      sublabel: 'Boutique hotels & local transport',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-200/80',
      tag: 'Small Groups',
      value: 'Max 8–14',
      label: 'Group Size Capped',
      sublabel: 'No big buses, personal attention',
    },
    {
      icon: <Headset className="w-5 h-5 text-indigo-600" />,
      iconBg: 'bg-indigo-50 border-indigo-200/80',
      tag: '24/7 Support',
      value: '24/7 Assistance',
      label: 'On-Call Coordinator',
      sublabel: 'Direct phone & WhatsApp support',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-slate-50/60 to-slate-50 border-y border-slate-200/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.95, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border ${stat.iconBg} group-hover:scale-105 transition-transform`}>
                    {stat.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {stat.tag}
                  </span>
                </div>

                <div className="font-display font-extrabold text-2xl lg:text-3xl text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                <span>{stat.sublabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
