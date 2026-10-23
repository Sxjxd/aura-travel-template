import React from 'react';
import { TESTIMONIALS } from '../../data/testimonials';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { Quote, CheckCircle, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="brand" className="mb-2">
            Verified Traveler Experiences
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
            Stories From the Field
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Read unedited feedback from travelers who returned from our small-group departures and bespoke routes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/90 flex flex-col justify-between hover:bg-slate-50 hover:shadow-md transition-all relative"
            >
              <Quote className="w-8 h-8 text-brand-200 mb-4" />

              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                "{t.quote}"
              </p>

              <div>
                <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 mb-4">
                  <RatingStars score={t.rating} size={14} />
                  <span className="text-[11px] font-semibold text-slate-500">
                    {t.travelDate}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.authorName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900 leading-tight">
                      {t.authorName}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>{t.authorLocation}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                        <CheckCircle size={11} /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[11px] text-brand-700 font-semibold flex items-center gap-1">
                  <MapPin size={11} />
                  <span>Tour: {t.tourName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
