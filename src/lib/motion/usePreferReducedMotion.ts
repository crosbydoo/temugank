import { useEffect, useState } from 'react'

/**
 * Respects OS “reduce motion” without framer-motion’s hook (SSR-safe).
 */
export function usePreferReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduceMotion
}
