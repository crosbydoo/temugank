import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface EditorialRowProps {
  meta?: ReactNode
  heading: ReactNode
  detail?: ReactNode
  as?: 'div' | 'a'
  className?: string
  href?: string
}

/**
 * Satisfy-style list row: hairline border, mono meta.
 */
export function EditorialRow({
  meta,
  heading,
  detail,
  as: Tag = 'div',
  className,
  href,
}: EditorialRowProps) {
  const rowClass = cn(
    'flex flex-col gap-1 border-b border-paper/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-6',
    Tag === 'a' && 'transition-colors hover:bg-paper/[0.02]',
    className,
  )

  const content = (
    <>
      <div className="min-w-0 flex-1">
        {meta ? (
          <p className="font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-sage">
            {meta}
          </p>
        ) : null}
        <p className="mt-1 font-display text-sm uppercase tracking-[var(--tracking-wide-editorial)] text-paper sm:text-base">
          {heading}
        </p>
        {detail ? (
          <p className="mt-2 font-body text-sm leading-relaxed text-stone">{detail}</p>
        ) : null}
      </div>
    </>
  )

  if (Tag === 'a' && href) {
    return (
      <a href={href} className={rowClass}>
        {content}
      </a>
    )
  }

  return <div className={rowClass}>{content}</div>
}
