import { countDocLinks } from '@/lib/db/docLinks'
import { countGallery } from '@/lib/db/gallery'
import { countJournal } from '@/lib/db/journal'
import { countRuns } from '@/lib/db/runs'
import type { D1Database } from '@cloudflare/workers-types'

export interface DeskStats {
  runs: number
  articles: number
  gallery: number
  docLinks: number
}

export async function getDeskStats(db: D1Database): Promise<DeskStats> {
  const [runs, articles, gallery, docLinks] = await Promise.all([
    countRuns(db),
    countJournal(db),
    countGallery(db),
    countDocLinks(db),
  ])
  return { runs, articles, gallery, docLinks }
}
