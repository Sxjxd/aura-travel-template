import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RatingStarsProps {
  score: number;
  reviewCount?: number;
  className?: string;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  score,
  reviewCount,
  className,
  size = 14,
}) => {
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5 text-amber-500">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              'fill-current',
              i < Math.floor(score) ? 'text-amber-500' : 'text-slate-300'
            )}
          />
        ))}
      </div>
      <span className="font-semibold text-xs md:text-sm text-slate-800">
        {score.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-xs text-slate-500">({reviewCount})</span>
      )}
    </div>
  );
};
