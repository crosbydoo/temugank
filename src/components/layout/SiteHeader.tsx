import { useCallback, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { AnimatePresence, motion } from 'framer-motion'

import { BrandLockup } from '@/components/ui/BrandLockup'
import {
  MOBILE_DRAWER_SECONDARY,
  PRIMARY_NAV,
  SECTION_IDS,
} from '@/constants/site'
import { cn } from '@/utils/cn'

/** Three-line control — Satisfy keeps the “X” inside the light sheet, not here. */
function MenuHamburger() {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span className="absolute left-0 top-0 h-px w-full bg-paper" />
      <span className="absolute left-0 top-[6px] h-px w-full bg-paper" />
      <span className="absolute left-0 top-[12px] h-px w-full bg-paper" />
    </span>
  )
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M15 15L20 20" />
    </svg>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3.5 2.5 14.5 0 18M12 3c-2.5 3.5-2.5 14.5 0 18" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <span
      className="font-display text-xl font-extralight leading-none text-bg-deep/30"
      aria-hidden
    >
      ›
    </span>
  )
}

interface MobileFullScreenMenuProps {
  panelId: string
  onClose: () => void
}

/**
 * Satisfy-style full-viewport sheet: paper field, bold wordmark + utility icons,
 * large mono primary list (chevron rail), hairline divider, dense sans “desk”
 * links, locale strip. Portaled to `body` so it always paints edge-to-edge.
 */
function MobileFullScreenMenu({ panelId, onClose }: MobileFullScreenMenuProps) {
  return (
    <motion.div
      key="mobile-full-menu"
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-0 z-[9999] flex min-h-[100svh] w-screen max-w-none flex-col bg-paper text-bg-deep',
        'md:hidden',
        'pt-[env(safe-area-inset-top,0px)]',
      )}
    >
      <header className="flex min-h-[3.75rem] shrink-0 items-center justify-between gap-3 border-b border-black/[0.08] px-4 py-4 sm:min-h-[4rem] sm:px-6 sm:py-5">
        <BrandLockup
          variant="onLight"
          className="min-w-0 flex-1 pr-2"
          onClick={onClose}
        />
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <a
            href={`#${SECTION_IDS.journal}`}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[#0a0a0a] transition-opacity hover:opacity-55 active:opacity-40"
            aria-label="Field notes"
            onClick={onClose}
          >
            <IconSearch />
          </a>
          <a
            href="mailto:hello@temugank.local"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[#0a0a0a] transition-opacity hover:opacity-55 active:opacity-40"
            aria-label="Email the collective"
          >
            <IconMail />
          </a>
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[#0a0a0a] transition-opacity hover:opacity-55 active:opacity-40"
            aria-label="Close menu"
            onClick={onClose}
          >
            <IconClose />
          </button>
        </div>
      </header>

      <nav
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 sm:px-6"
        aria-label="Primary"
      >
        <ul className="pt-2">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href} className="border-b border-black/[0.08]">
              <a
                href={item.href}
                className={cn(
                  'flex min-h-[4.5rem] items-center justify-between gap-6 py-2 font-display text-[0.95rem] uppercase leading-none tracking-[0.16em] text-bg-deep',
                  'transition-colors hover:text-bg-deep/75 active:bg-black/[0.02]',
                  'sm:min-h-[5rem] sm:text-[1.02rem] sm:tracking-[0.17em]',
                )}
                onClick={onClose}
              >
                {item.label}
                <IconChevronRight />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-black/[0.08] px-4 py-5 sm:px-6 sm:py-6">
        <p className="mb-4 font-display text-[0.58rem] uppercase tracking-[0.28em] text-bg-deep/40">
          Desk
        </p>
        <ul className="flex flex-col">
          {MOBILE_DRAWER_SECONDARY.map((item) => {
            const openInNewTab = item.href.startsWith('http')
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'font-wordmark block border-b border-black/[0.05] py-2.5 text-[0.64rem] font-medium uppercase leading-snug tracking-[0.16em] text-bg-deep/88',
                    'last:border-b-0 transition-colors hover:text-bg-deep sm:py-3 sm:text-[0.68rem]',
                  )}
                  onClick={onClose}
                  {...(openInNewTab ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div
        className={cn(
          'flex shrink-0 items-center justify-between gap-3 border-t border-black/[0.08] px-4 py-4 sm:px-6',
          'bg-black/[0.02]',
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 text-bg-deep/65">
          <IconGlobe className="shrink-0 text-bg-deep/50" />
          <span className="truncate font-wordmark text-[0.64rem] font-medium uppercase tracking-[0.14em]">
            Indonesia (IDR)
          </span>
        </div>
        <span
          className="shrink-0 font-display text-sm font-light text-bg-deep/30"
          aria-hidden
        >
          ⌄
        </span>
      </div>

      <div
        className="shrink-0 pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
        aria-hidden
      />
    </motion.div>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const panelId = useId()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, closeMenu])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) closeMenu()
    }
    mq.addEventListener('change', onChange)
    onChange()
    return () => mq.removeEventListener('change', onChange)
  }, [menuOpen, closeMenu])

  const canPortal = typeof document !== 'undefined'

  const mobileMenuPortal =
    canPortal &&
    createPortal(
      <AnimatePresence>
        {menuOpen ? (
          <MobileFullScreenMenu panelId={panelId} onClose={closeMenu} />
        ) : null}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]',
          'border-b border-paper/5 bg-bg-deep/80 backdrop-blur-md',
          'md:border-transparent md:bg-transparent md:backdrop-blur-none',
        )}
      >
        <div
          className={cn(
            'flex min-h-[3.75rem] w-full items-center px-4 py-4 sm:min-h-[4rem] sm:px-6 sm:py-5 md:min-h-[4.25rem] md:px-8 md:py-5 lg:px-10 lg:py-6 xl:px-12',
            'justify-between gap-3',
            'md:justify-start md:gap-0',
          )}
        >
          <BrandLockup
            variant="onDark"
            onClick={closeMenu}
            className="min-w-0 shrink md:shrink-0"
          />

          <nav
            className="hidden md:ml-10 md:block lg:ml-14 xl:ml-20"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-7 lg:gap-9 xl:gap-11">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      'font-display text-[0.62rem] uppercase leading-none tracking-[var(--tracking-ultra)] text-paper/90',
                      'transition-colors duration-500 hover:text-paper lg:text-[0.68rem]',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded border border-paper/15 text-paper md:hidden"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-haspopup="dialog"
            aria-label={menuOpen ? 'Menu is open' : 'Open full screen menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuHamburger />
          </button>
        </div>
      </header>
      {mobileMenuPortal}
    </>
  )
}
