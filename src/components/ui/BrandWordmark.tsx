import type { HTMLAttributes } from 'react'

import { SITE } from '@/config/site'
import { cn } from '@/lib/cn'

export type BrandWordmarkProps = HTMLAttributes<HTMLHeadingElement>

/**
 * Bold uppercase sans logotype — semantic `h2` for the site name.
 * Color comes from `className` (navbar vs drawer vs footer).
 */
export function BrandWordmark({ className, ...rest }: BrandWordmarkProps) {
  return (
    <h2
      className={cn(
        'm-0 p-0 font-wordmark text-[1em] font-extrabold uppercase antialiased',
        'tracking-[var(--tracking-wordmark)]',
        className,
      )}
      {...rest}
    >
      {SITE.name}
    </h2>
  )
}
