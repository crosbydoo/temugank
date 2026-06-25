import { nowUnix, slugify } from '@/lib/db/client'
import type { D1Database } from '@cloudflare/workers-types'

export interface DocLink {
  id: string
  label: string
  href: string
  description: string
  sortOrder: number
}

interface DocLinkRow {
  id: string
  label: string
  href: string
  description: string
  sort_order: number
  created_at: number
  updated_at: number
}

function mapRow(row: DocLinkRow): DocLink {
  return {
    id: row.id,
    label: row.label,
    href: row.href,
    description: row.description,
    sortOrder: row.sort_order,
  }
}

export async function listDocLinks(db: D1Database): Promise<DocLink[]> {
  const { results } = await db
    .prepare('SELECT * FROM doc_links ORDER BY sort_order ASC, created_at ASC')
    .all<DocLinkRow>()
  return (results ?? []).map(mapRow)
}

export interface DocLinkInput {
  label: string
  href: string
  description: string
  sortOrder?: number
}

export async function createDocLink(db: D1Database, input: DocLinkInput): Promise<DocLink> {
  const id = slugify(input.label) || `doc-${nowUnix()}`
  const now = nowUnix()
  const sortOrder = input.sortOrder ?? now
  await db
    .prepare(
      `INSERT INTO doc_links (id, label, href, description, sort_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, input.label, input.href, input.description, sortOrder, now, now)
    .run()
  return { id, label: input.label, href: input.href, description: input.description, sortOrder }
}

export async function updateDocLink(
  db: D1Database,
  id: string,
  input: DocLinkInput,
): Promise<DocLink | null> {
  const now = nowUnix()
  const sortOrder = input.sortOrder ?? now
  const result = await db
    .prepare(
      `UPDATE doc_links SET label = ?, href = ?, description = ?, sort_order = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(input.label, input.href, input.description, sortOrder, now, id)
    .run()
  if (!result.meta.changes) return null
  return { id, label: input.label, href: input.href, description: input.description, sortOrder }
}

export async function deleteDocLink(db: D1Database, id: string): Promise<boolean> {
  const result = await db.prepare('DELETE FROM doc_links WHERE id = ?').bind(id).run()
  return (result.meta.changes ?? 0) > 0
}

export async function countDocLinks(db: D1Database): Promise<number> {
  const row = await db
    .prepare('SELECT COUNT(*) as count FROM doc_links')
    .first<{ count: number }>()
  return row?.count ?? 0
}
