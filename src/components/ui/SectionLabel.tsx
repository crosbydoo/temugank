import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface SectionLabelProps {
  children: ReactNode
  className?: string
}

/** Small uppercase mono label used to introduce sections. */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-stone sm:text-[0.62rem] md:text-[0.65rem]',
        className,
      )}
    >
      {children}
    </p>
  )
}
