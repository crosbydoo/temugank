import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'ghost'

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 border px-5 py-2.5 font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] transition-colors duration-500 sm:px-6 sm:py-3 sm:text-[0.62rem] md:text-[0.65rem] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-paper'

const styles: Record<ButtonVariant, string> = {
  primary:
    'border-paper/25 bg-paper/5 text-paper hover:border-sage/60 hover:bg-sage/10',
  ghost:
    'border-transparent text-stone hover:border-paper/20 hover:text-paper',
}

/**
 * Primary interactive surface for CTAs.
 * Stays presentational — onClick logic lives in parents (SOLID: UI vs behavior).
 */
export function AppButton({
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}: AppButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, styles[variant], className)}
      {...rest}
    />
  )
}
