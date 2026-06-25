import { getCollection, getEntry } from 'astro:content'
import type { D1Database } from '@cloudflare/workers-types'

import { listGallery } from '@/lib/db/gallery'
import { listJournal } from '@/lib/db/journal'
import { listRuns } from '@/lib/db/runs'
import { mapCollectionEntries } from '@/lib/content/mapCollectionEntries'
import type { GalleryItem, JournalArticle, RunEvent } from '@/types/content'

export interface HomePageData {
  manifestoBlocks: readonly string[]
  philosophyStatements: readonly string[]
  upcomingRuns: readonly RunEvent[]
  journalArticles: readonly JournalArticle[]
  galleryItems: readonly GalleryItem[]
}

async function fromContentCollections(): Promise<HomePageData> {
  const [runs, journal, gallery, manifestoEntry] = await Promise.all([
    getCollection('runs'),
    getCollection('journal'),
    getCollection('gallery'),
    getEntry('manifesto', 'site'),
  ])

  return {
    manifestoBlocks: manifestoEntry?.data.blocks ?? [],
    philosophyStatements: manifestoEntry?.data.philosophy ?? [],
    upcomingRuns: mapCollectionEntries(runs) as RunEvent[],
    journalArticles: mapCollectionEntries(journal) as JournalArticle[],
    galleryItems: mapCollectionEntries(gallery) as GalleryItem[],
  }
}

async function fromDatabase(db: D1Database): Promise<HomePageData> {
  const [upcomingRuns, journalArticles, galleryItems, manifestoEntry] =
    await Promise.all([
      listRuns(db),
      listJournal(db),
      listGallery(db),
      getEntry('manifesto', 'site'),
    ])

  return {
    manifestoBlocks: manifestoEntry?.data.blocks ?? [],
    philosophyStatements: manifestoEntry?.data.philosophy ?? [],
    upcomingRuns,
    journalArticles,
    galleryItems,
  }
}

/** Loads home page data from D1 when available, otherwise content JSON fallback. */
export async function getHomePageData(db: D1Database | null): Promise<HomePageData> {
  if (db) {
    try {
      return await fromDatabase(db)
    } catch {
      return fromContentCollections()
    }
  }
  return fromContentCollections()
}
