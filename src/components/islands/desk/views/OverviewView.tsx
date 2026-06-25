import { useEffect, useState } from 'react'

import { DeskPanel } from '@/components/islands/desk/DeskSidebar'
import { fetchArticles, fetchRuns, fetchStats } from '@/lib/desk/api'
import type { DeskStats } from '@/lib/desk/api'

export function OverviewView() {
  const [stats, setStats] = useState<DeskStats | null>(null)
  const [recentRuns, setRecentRuns] = useState<string[]>([])
  const [recentArticles, setRecentArticles] = useState<string[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [s, runs, articles] = await Promise.all([
          fetchStats(),
          fetchRuns(),
          fetchArticles(),
        ])
        setStats(s)
        setRecentRuns(runs.slice(0, 3).map((r) => r.title))
        setRecentArticles(articles.slice(0, 3).map((a) => a.title))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load overview')
      }
    }
    load()
  }, [])

  const cards = stats
    ? [
        { label: 'Events', value: stats.runs, tone: 'text-sage' },
        { label: 'Articles', value: stats.articles, tone: 'text-paper' },
        { label: 'Gallery', value: stats.gallery, tone: 'text-stone' },
        { label: 'Doc links', value: stats.docLinks, tone: 'text-paper' },
      ]
    : []

  return (
    <DeskPanel
      title="Overview"
      description="Live counts from D1. Public site reads the same database on each request."
    >
      {error ? <p className="font-body text-sm text-red-400">{error}</p> : null}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-3 sm:gap-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="border border-paper/10 bg-bg-elevated/60 p-4 sm:p-5"
          >
            <p className="font-display text-[0.55rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
              {card.label}
            </p>
            <p className={`mt-2 font-display text-3xl tabular-nums ${card.tone}`}>
              {card.value}
            </p>
          </article>
        ))}
        {!stats && !error ? (
          <div className="col-span-full font-body text-sm text-stone">Loading…</div>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="border border-paper/10 p-4 sm:p-5">
          <h3 className="font-display text-[0.62rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
            Recent events
          </h3>
          <ul className="mt-3 space-y-2">
            {recentRuns.length ? (
              recentRuns.map((title) => (
                <li key={title} className="font-body text-sm text-paper/90">
                  {title}
                </li>
              ))
            ) : (
              <li className="font-body text-sm text-stone">No events yet.</li>
            )}
          </ul>
        </article>
        <article className="border border-paper/10 p-4 sm:p-5">
          <h3 className="font-display text-[0.62rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
            Recent articles
          </h3>
          <ul className="mt-3 space-y-2">
            {recentArticles.length ? (
              recentArticles.map((title) => (
                <li key={title} className="font-body text-sm text-paper/90">
                  {title}
                </li>
              ))
            ) : (
              <li className="font-body text-sm text-stone">No articles yet.</li>
            )}
          </ul>
        </article>
      </div>
    </DeskPanel>
  )
}
