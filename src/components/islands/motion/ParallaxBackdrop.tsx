import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'

import { usePreferReducedMotion } from '@/lib/motion/usePreferReducedMotion'
import { cn } from '@/lib/cn'

export interface ParallaxBackdropProps {
  src: string
  alt: string
  className?: string
}

/**
 * Subtle Y parallax tied to scroll progress — luxury, not carnival ride.
 */
export function ParallaxBackdrop({
  src,
  alt,
  className,
}: ParallaxBackdropProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = usePreferReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '11%'])

  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      {reduceMotion ? (
        <img
          src={src}
          alt={alt}
          className="h-[115%] w-full object-cover opacity-80"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      ) : (
        <motion.img
          style={{ y }}
          src={src}
          alt={alt}
          className="h-[115%] w-full object-cover opacity-80"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-deep/20 via-bg-deep/70 to-bg-deep"
        aria-hidden
      />
    </div>
  )
}
