import type { JournalArticle } from '@/types/content'

import { nowUnix, slugify } from '@/lib/db/client'
import type { D1Database } from '@cloudflare/workers-types'

interface JournalRow {
  id: string
  title: string
  dek: string
  date_label: string
  read_time: string
  created_at: number
  updated_at: number
}

function mapRow(row: JournalRow): JournalArticle {
  return {
    id: row.id,
    title: row.title,
    dek: row.dek,
    date: row.date_label,
    readTime: row.read_time,
  }
}

export async function listJournal(db: D1Database): Promise<JournalArticle[]> {
  const { results } = await db
    .prepare('SELECT * FROM journal_articles ORDER BY created_at DESC')
    .all<JournalRow>()
  return (results ?? []).map(mapRow)
}

export interface JournalInput {
  title: string
  dek: string
  date: string
  readTime: string
}

export async function createJournal(
  db: D1Database,
  input: JournalInput,
): Promise<JournalArticle> {
  const id = slugify(input.title) || `article-${nowUnix()}`
  const now = nowUnix()
  await db
    .prepare(
      `INSERT INTO journal_articles (id, title, dek, date_label, read_time, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, input.title, input.dek, input.date, input.readTime, now, now)
    .run()
  return { id, title: input.title, dek: input.dek, date: input.date, readTime: input.readTime }
}

export async function updateJournal(
  db: D1Database,
  id: string,
  input: JournalInput,
): Promise<JournalArticle | null> {
  const now = nowUnix()
  const result = await db
    .prepare(
      `UPDATE journal_articles SET title = ?, dek = ?, date_label = ?, read_time = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(input.title, input.dek, input.date, input.readTime, now, id)
    .run()
  if (!result.meta.changes) return null
  return { id, title: input.title, dek: input.dek, date: input.date, readTime: input.readTime }
}

export async function deleteJournal(db: D1Database, id: string): Promise<boolean> {
  const result = await db.prepare('DELETE FROM journal_articles WHERE id = ?').bind(id).run()
  return (result.meta.changes ?? 0) > 0
}

export async function countJournal(db: D1Database): Promise<number> {
  const row = await db
    .prepare('SELECT COUNT(*) as count FROM journal_articles')
    .first<{ count: number }>()
  return row?.count ?? 0
}
