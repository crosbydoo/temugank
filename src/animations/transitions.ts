import type { Transition } from 'framer-motion'

/** Shared motion timing: slow, editorial, never “startup demo”. */
export const softTransition: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
}

export const quickTransition: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
}
