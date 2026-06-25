import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

import { motion } from 'framer-motion'

import { fadeUp } from '@/lib/motion/variants'
import { softTransition } from '@/lib/motion/transitions'
import { usePreferReducedMotion } from '@/lib/motion/usePreferReducedMotion'

export interface MotionSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode
}

/**
 * Viewport-driven reveal. Respects reduced motion by disabling in-view
 * animations while keeping a single `motion.section` type for Framer props.
 */
export function MotionSection({
  className,
  children,
  ...rest
}: MotionSectionProps) {
  const reduceMotion = usePreferReducedMotion()

  return (
    <motion.section
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={reduceMotion ? undefined : { once: true, amount: 0.2 }}
      variants={reduceMotion ? undefined : fadeUp}
      transition={reduceMotion ? { duration: 0 } : softTransition}
      {...rest}
    >
      {children}
    </motion.section>
  )
}
