import type { Variants } from 'framer-motion';

// Fade up on scroll — the primary animation used throughout the site
export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

// Stagger container for animating children in sequence
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// Stagger child item
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// Card hover lift
export const cardHover = {
  whileHover: { y: -6, transition: { duration: 0.3 } },
};

// Page-level entrance
export const pageEntrance = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};
