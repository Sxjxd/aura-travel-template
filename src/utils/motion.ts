import { type Variants } from 'framer-motion';

export const TRANSITION_LUXURY = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
};

export const TRANSITION_SPRING = {
  type: 'spring',
  stiffness: 180,
  damping: 26,
};

export const TRANSITION_SMOOTH = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const cardHoverVariant: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export const modalBackdropVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const modalContentVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, y: 20, transition: { duration: 0.28 } },
};

export const viewportConfig = {
  once: true,
  margin: '-60px',
};

export const scrollRevealFadeUp: Variants = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerScrollContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

