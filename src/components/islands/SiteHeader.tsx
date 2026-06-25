import { useCallback, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { AnimatePresence, motion } from 'framer-motion'

import { BrandLockup } from '@/components/ui/BrandLockup'
import { PRIMARY_NAV } from '@/config/site'
import { cn } from '@/lib/cn'

function MenuHamburger() {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span className="absolute left-0 top-0 h-px w-full bg-paper" />
      <span className="absolute left-0 top-[6px] h-px w-full bg-paper" />
      <span className="absolute left-0 top-[12px] h-px w-full bg-paper" />
    </span>
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

interface MobileMenuProps {
  panelId: string
  onClose: () => void
}

/** Satisfy-style paper sheet: wordmark, primary list, close. */
function MobileMenu({ panelId, onClose }: MobileMenuProps) {
  return (
    <motion.div
      key="mobile-menu"
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-0 z-[9999] flex min-h-[100svh] flex-col bg-paper text-bg-deep md:hidden',
        'pt-[env(safe-area-inset-top,0px)]',
      )}
    >
      <header className="flex min-h-[3.75rem] shrink-0 items-center justify-between gap-3 border-b border-black/[0.08] px-4 py-4 sm:px-6">
        <BrandLockup
          variant="onLight"
          className="min-w-0 flex-1"
          onClick={onClose}
        />
        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[#0a0a0a]"
          aria-label="Close menu"
          onClick={onClose}
        >
          <IconClose />
        </button>
      </header>

      <nav
        className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6"
        aria-label="Primary"
      >
        <ul>
          {PRIMARY_NAV.map((item) => (
            <li key={item.href} className="border-b border-black/[0.08]">
              <a
                href={item.href}
                className="flex min-h-[4.25rem] items-center justify-between gap-6 font-display text-[0.9rem] uppercase tracking-[0.14em] text-bg-deep transition-colors hover:text-bg-deep/75 sm:min-h-[4.75rem] sm:text-[0.95rem]"
                onClick={onClose}
              >
                {item.label}
                <IconChevronRight />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="shrink-0 pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
        aria-hidden
      />
    </motion.div>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelId = useId()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const mobileMenuPortal =
    typeof document !== 'undefined' &&
    createPortal(
      <AnimatePresence>
        {menuOpen ? <MobileMenu panelId={panelId} onClose={closeMenu} /> : null}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]',
          'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled
            ? 'border-paper/5 bg-black/75 backdrop-blur-md'
            : 'border-transparent bg-transparent backdrop-blur-none',
        )}
      >
        <div className="flex min-h-[3.75rem] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[4rem] sm:px-6 md:min-h-[4.25rem] md:justify-start md:px-8 md:py-5 lg:px-10">
          <BrandLockup
            variant="onDark"
            onClick={closeMenu}
            className="min-w-0 shrink md:shrink-0"
          />

          <nav className="hidden md:ml-10 md:block lg:ml-14" aria-label="Primary">
            <ul className="flex items-center gap-6 lg:gap-8">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-display text-[0.62rem] uppercase leading-none tracking-[var(--tracking-ultra)] text-paper/90 transition-colors duration-500 hover:text-paper lg:text-[0.68rem]"
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
            aria-label={menuOpen ? 'Menu is open' : 'Open menu'}
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
