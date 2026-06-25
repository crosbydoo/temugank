import type { Variants } from 'framer-motion'

/**
 * Animation variants stay out of components so:
 * - motion stays consistent sitewide
 * - juniors can tweak timing in one folder
 * - future design systems can import the same tokens
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
}

export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(8% 8% 8% 8%)', opacity: 0.85 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
  },
}

export const imageHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}
