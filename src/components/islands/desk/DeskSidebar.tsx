import type { ReactNode } from 'react'

import { DESK_NAV, type DeskView } from '@/components/islands/desk/types'
import { cn } from '@/lib/cn'

interface DeskSidebarProps {
  active: DeskView
  email?: string
  open: boolean
  onNavigate: (view: DeskView) => void
  onClose: () => void
  onLogout: () => void
}

export function DeskSidebar({
  active,
  email,
  open,
  onNavigate,
  onClose,
  onLogout,
}: DeskSidebarProps) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-bg-deep/70 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(100%,17.5rem)] flex-col border-r border-paper/10 bg-bg-elevated transition-transform duration-300 lg:static lg:z-auto lg:w-60 lg:translate-x-0 lg:shrink-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="border-b border-paper/10 px-5 py-5">
          <a
            href="/"
            className="font-wordmark text-base font-extrabold uppercase tracking-[var(--tracking-wordmark)] text-paper no-underline"
          >
            Temugank
          </a>
          <p className="mt-1 font-display text-[0.55rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
            Admin desk
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Desk">
          <ul className="space-y-1">
            {DESK_NAV.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded px-3 py-3 text-left transition-colors',
                    active === item.id
                      ? 'bg-paper/10 text-paper'
                      : 'text-stone hover:bg-paper/5 hover:text-paper',
                  )}
                >
                  <span className="font-display text-[0.62rem] uppercase tracking-[var(--tracking-ultra)]">
                    {item.label}
                  </span>
                  <span className="font-body text-[0.65rem] text-stone/70">{item.hint}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-paper/10 px-5 py-4">
          {email ? (
            <p className="truncate font-body text-xs text-stone">{email}</p>
          ) : null}
          <button
            type="button"
            onClick={onLogout}
            className="mt-3 font-display text-[0.55rem] uppercase tracking-[var(--tracking-ultra)] text-stone transition-colors hover:text-paper"
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}

export function DeskPanel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="min-w-0">
      <header className="mb-6 border-b border-paper/10 pb-5">
        <h2 className="font-display text-xl uppercase tracking-[var(--tracking-wide-editorial)] text-paper sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 font-body text-sm leading-relaxed text-stone">{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  )
}

export const deskFieldClass =
  'w-full border border-paper/15 bg-bg-deep px-3 py-2.5 font-body text-sm text-paper placeholder:text-stone/60 focus:border-sage/50 focus:outline-none'

export const deskLabelClass =
  'font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-stone'

export const deskButtonClass =
  'border border-paper/25 px-4 py-2.5 font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-paper transition-colors hover:border-sage/60 hover:bg-sage/10 disabled:opacity-40'
