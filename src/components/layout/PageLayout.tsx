import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export interface PageLayoutProps {
  children: ReactNode
}

/**
 * Shell for public pages: header + scrollable main + footer.
 * Hero bleeds under the transparent desktop header; sections set their own spacing.
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-dvh bg-bg-deep text-paper">
      <SiteHeader />
      {/* Hero sits under the fixed header; sections manage their own top spacing. */}
      <main className="min-h-0">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
