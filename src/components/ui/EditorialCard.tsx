import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/cn'

export interface EditorialCardProps extends HTMLAttributes<HTMLElement> {
  as?: 'article' | 'div'
  children: ReactNode
}

/**
 * Shared card chrome for runs + journal — one source of truth for borders.
 */
export function EditorialCard({
  as: Tag = 'article',
  className,
  children,
  ...rest
}: EditorialCardProps) {
  return (
    <Tag
      className={cn(
        'group border border-paper/10 bg-bg-elevated/40 p-5 sm:p-6 md:p-8',
        'transition-colors duration-500 hover:border-paper/25',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
