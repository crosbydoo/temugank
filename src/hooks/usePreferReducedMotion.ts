import { useReducedMotion } from 'framer-motion'

/**
 * Single place to respect OS “reduce motion” for Framer-driven UI.
 */
export function usePreferReducedMotion(): boolean {
  return useReducedMotion() ?? false
}
