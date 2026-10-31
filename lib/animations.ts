import type { Variants, Transition } from "motion/react";

/**
 * Standard smooth easing curve for elegant reveals
 */
export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Default transition timings
 */
export const defaultTransition: Transition = {
  duration: 0.8,
  ease: smoothEase,
};

/**
 * Fade up animation variant: opacity 0 to 1, y 30 to 0
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? 0.8,
      delay: custom?.delay ?? 0,
      ease: smoothEase,
    },
  }),
};

/**
 * Slide from right variant: opacity 0 to 1, x 90 to 0
 */
export const slideFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 90,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? 0.8,
      delay: custom?.delay ?? 0,
      ease: smoothEase,
    },
  }),
};

/**
 * Slide from left variant: opacity 0 to 1, x -90 to 0
 */
export const slideFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -90,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? 0.8,
      delay: custom?.delay ?? 0,
      ease: smoothEase,
    },
  }),
};

/**
 * Scale reveal variant: opacity 0 to 1, scale 0.96 to 1
 */
export const scaleReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration ?? 0.8,
      delay: custom?.delay ?? 0,
      ease: smoothEase,
    },
  }),
};

/**
 * Stagger container variant: reveals children one by one
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom?: { staggerChildren?: number; delayChildren?: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.staggerChildren ?? 0.15,
      delayChildren: custom?.delayChildren ?? 0.1,
    },
  }),
};

/**
 * Event-specific reveal variant:
 * Horizontal entrance (x: 80 to 0), subtle scale (0.97 to 1), opacity (0 to 1)
 */
export const eventSlideReveal: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
    scale: 0.97,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: custom?.duration ?? 0.85,
      delay: custom?.delay ?? 0,
      ease: smoothEase,
    },
  }),
};

/**
 * Staggered child item for event sections
 */
export const eventChildItem: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
    y: 10,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

/**
 * Reduced-motion fallback variants
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
