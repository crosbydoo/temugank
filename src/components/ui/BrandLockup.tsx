import type { AnchorHTMLAttributes } from 'react'

import { BrandWordmark } from '@/components/ui/BrandWordmark'
import { SITE } from '@/config/site'
import { cn } from '@/lib/cn'

/** Same scale as main navbar — only ink changes for paper vs dark chrome. */
const wordmarkNavSizes =
  'text-[0.95rem] leading-none sm:text-[1.05rem] md:text-[1.15rem] lg:text-[1.2rem]'

const taglineNavSizes =
  'font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] sm:text-[0.65rem]'

export type BrandLockupVariant = 'onDark' | 'onLight'

export interface BrandLockupProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant: BrandLockupVariant
  /** Defaults to home anchor. */
  href?: string
}

/**
 * Temugank + /{tagline} — one component so navbar, drawer, and future shells
 * never drift in font size or baseline alignment.
 */
export function BrandLockup({
  variant,
  className,
  href = '#top',
  ...rest
}: BrandLockupProps) {
  const ink =
    variant === 'onDark'
      ? { wordmark: 'text-paper', tagline: 'text-stone' }
      : { wordmark: 'text-[#0a0a0a]', tagline: 'text-bg-deep/50' }

  return (
    <a
      href={href}
      className={cn(
        'flex min-w-0 shrink flex-wrap items-baseline gap-x-2 gap-y-1 no-underline',
        className,
      )}
      {...rest}
    >
      <BrandWordmark className={cn(wordmarkNavSizes, ink.wordmark)} />
      {/* Desktop hero bar: wordmark only (Satisfy-style). Tagline stays on mobile. */}
      <span className={cn(taglineNavSizes, ink.tagline, 'md:hidden')}>
        /{SITE.tagline}
      </span>
    </a>
  )
}
