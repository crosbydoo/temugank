import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface TextCtaProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

/**
 * Inline editorial CTA — link semantics with button-adjacent styling.
 * Touch-friendly min height on phones.
 */
export function TextCta({ className, children, ...rest }: TextCtaProps) {
  return (
    <a
      className={cn(
        'inline-flex min-h-[44px] w-full min-w-0 items-center justify-center border border-paper/25 bg-transparent px-5 py-2.5 sm:w-auto sm:px-6 sm:py-3',
        'font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-paper sm:text-[0.62rem] md:text-[0.65rem]',
        'text-center transition-colors duration-500 hover:border-sage/60 hover:bg-sage/10',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-paper',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  )
}
