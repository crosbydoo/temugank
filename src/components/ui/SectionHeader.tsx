import { cn } from '@/lib/cn'
import { SectionLabel } from '@/components/ui/SectionLabel'

export interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  labelClassName?: string
  titleClassName?: string
  className?: string
}

/** Satisfy-style section intro: mono label + uppercase headline, optional one-line dek. */
export function SectionHeader({
  label,
  title,
  description,
  labelClassName,
  titleClassName,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn('max-w-2xl', className)}>
      <SectionLabel className={labelClassName}>{label}</SectionLabel>
      <h2
        className={cn(
          'mt-3 font-display text-xl uppercase leading-tight tracking-[var(--tracking-wide-editorial)] sm:mt-4 sm:text-2xl md:text-3xl',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 font-body text-sm leading-relaxed text-stone sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  )
}
