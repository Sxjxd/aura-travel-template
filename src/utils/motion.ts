import { type Variants } from 'framer-motion';

export const TRANSITION_SPRING = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const TRANSITION_SMOOTH = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1],
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_SMOOTH,
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION_SMOOTH,
  },
};

export const cardHoverVariant: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -5,
    scale: 1.01,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export const modalBackdropVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalContentVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: TRANSITION_SPRING },
  exit: { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.2 } },
};

export const viewportConfig = {
  once: true,
  margin: '-60px',
};

export const scrollRevealFadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerScrollContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

