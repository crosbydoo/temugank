import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/cn'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Max-width grid shell — horizontal padding scales mobile → tablet → desktop.
 */
export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10 xl:max-w-7xl xl:px-12',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
