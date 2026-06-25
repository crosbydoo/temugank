import { motion } from 'framer-motion'

import { imageHover, maskReveal } from '@/lib/motion/variants'
import { quickTransition, softTransition } from '@/lib/motion/transitions'
import { usePreferReducedMotion } from '@/lib/motion/usePreferReducedMotion'
import { cn } from '@/lib/cn'

export interface MaskedMediaProps {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  className?: string
}

/**
 * Editorial image treatment: soft mask reveal + restrained hover scale.
 */
export function MaskedMedia({
  src,
  alt,
  loading = 'lazy',
  className,
}: MaskedMediaProps) {
  const reduceMotion = usePreferReducedMotion()

  if (reduceMotion) {
    return (
      <div className={cn('overflow-hidden', className)}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      variants={maskReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={softTransition}
    >
      <motion.div variants={imageHover} initial="rest" whileHover="hover">
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className="h-full w-full object-cover"
          transition={quickTransition}
        />
      </motion.div>
    </motion.div>
  )
}
