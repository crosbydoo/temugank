import { useEffect, useState } from 'react'

import { DeskSidebar } from '@/components/islands/desk/DeskSidebar'
import { ArticlesView } from '@/components/islands/desk/views/ArticlesView'
import { DocsView } from '@/components/islands/desk/views/DocsView'
import { EventsView } from '@/components/islands/desk/views/EventsView'
import { OverviewView } from '@/components/islands/desk/views/OverviewView'
import { parseDeskView, type DeskView } from '@/components/islands/desk/types'
import { fetchMe, logout } from '@/lib/desk/api'

export interface DeskAppProps {
  initialView?: string
}

export function DeskApp({ initialView }: DeskAppProps) {
  const [view, setView] = useState<DeskView>(() => parseDeskView(initialView))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [email, setEmail] = useState<string>()

  useEffect(() => {
    fetchMe().then((user) => {
      if (user) setEmail(user.email)
    })
  }, [])

  function navigate(next: DeskView) {
    setView(next)
    setSidebarOpen(false)
    const path = next === 'overview' ? '/desk/overview' : `/desk/${next}`
    window.history.pushState({}, '', path)
  }

  async function handleLogout() {
    await logout()
    window.location.href = '/desk/login'
  }

  return (
    <div className="flex min-h-dvh bg-bg-deep text-paper">
      <DeskSidebar
        active={view}
        email={email}
        open={sidebarOpen}
        onNavigate={navigate}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-paper/10 px-4 py-4 lg:px-6">
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded border border-paper/15 lg:hidden"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span className="absolute left-0 top-0 h-px w-full bg-paper" />
              <span className="absolute left-0 top-[6px] h-px w-full bg-paper" />
              <span className="absolute left-0 top-[12px] h-px w-full bg-paper" />
            </span>
          </button>
          <p className="font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-stone lg:ml-auto">
            Cloudflare D1 · live content
          </p>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          {view === 'overview' ? <OverviewView /> : null}
          {view === 'events' ? <EventsView /> : null}
          {view === 'articles' ? <ArticlesView /> : null}
          {view === 'docs' ? <DocsView /> : null}
        </main>
      </div>
    </div>
  )
}
