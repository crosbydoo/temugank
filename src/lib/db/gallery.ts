import type { GalleryItem } from '@/types/content'

import { nowUnix, slugify } from '@/lib/db/client'
import type { D1Database } from '@cloudflare/workers-types'

interface GalleryRow {
  id: string
  src: string
  alt: string
  caption: string
  sort_order: number
  created_at: number
}

function mapRow(row: GalleryRow): GalleryItem {
  return {
    id: row.id,
    src: row.src,
    alt: row.alt,
    caption: row.caption,
  }
}

export async function listGallery(db: D1Database): Promise<GalleryItem[]> {
  const { results } = await db
    .prepare('SELECT * FROM gallery_items ORDER BY sort_order ASC, created_at DESC')
    .all<GalleryRow>()
  return (results ?? []).map(mapRow)
}

export async function countGallery(db: D1Database): Promise<number> {
  const row = await db
    .prepare('SELECT COUNT(*) as count FROM gallery_items')
    .first<{ count: number }>()
  return row?.count ?? 0
}

export interface GalleryInput {
  src: string
  alt: string
  caption: string
}

export async function createGalleryItem(
  db: D1Database,
  input: GalleryInput,
): Promise<GalleryItem> {
  const id = slugify(input.caption) || `gallery-${nowUnix()}`
  const now = nowUnix()
  await db
    .prepare(
      `INSERT INTO gallery_items (id, src, alt, caption, sort_order, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, input.src, input.alt, input.caption, now, now)
    .run()
  return { id, ...input }
}

export async function deleteGalleryItem(db: D1Database, id: string): Promise<boolean> {
  const result = await db.prepare('DELETE FROM gallery_items WHERE id = ?').bind(id).run()
  return (result.meta.changes ?? 0) > 0
}
