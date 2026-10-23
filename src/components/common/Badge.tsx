import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'accent' | 'neutral' | 'outline' | 'emerald';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  className,
  size = 'md',
}) => {
  const variantStyles = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/60',
    accent: 'bg-amber-50 text-amber-700 border-amber-200/60',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-white/80 backdrop-blur-sm text-slate-700 border-slate-200 shadow-sm',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs md:text-sm px-3 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border tracking-wide transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
