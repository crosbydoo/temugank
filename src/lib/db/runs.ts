import type { RunEvent } from '@/types/content'

import { nowUnix, slugify } from '@/lib/db/client'
import type { D1Database } from '@cloudflare/workers-types'

interface RunRow {
  id: string
  title: string
  location: string
  date_label: string
  note: string
  created_at: number
  updated_at: number
}

function mapRow(row: RunRow): RunEvent {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    dateLabel: row.date_label,
    note: row.note,
  }
}

export async function listRuns(db: D1Database): Promise<RunEvent[]> {
  const { results } = await db
    .prepare('SELECT * FROM runs ORDER BY created_at DESC')
    .all<RunRow>()
  return (results ?? []).map(mapRow)
}

export interface RunInput {
  title: string
  location: string
  dateLabel: string
  note: string
}

export async function createRun(db: D1Database, input: RunInput): Promise<RunEvent> {
  const id = slugify(input.title) || `run-${nowUnix()}`
  const now = nowUnix()
  await db
    .prepare(
      `INSERT INTO runs (id, title, location, date_label, note, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, input.title, input.location, input.dateLabel, input.note, now, now)
    .run()
  return { id, ...input }
}

export async function updateRun(
  db: D1Database,
  id: string,
  input: RunInput,
): Promise<RunEvent | null> {
  const now = nowUnix()
  const result = await db
    .prepare(
      `UPDATE runs SET title = ?, location = ?, date_label = ?, note = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(input.title, input.location, input.dateLabel, input.note, now, id)
    .run()
  if (!result.meta.changes) return null
  return { id, ...input }
}

export async function deleteRun(db: D1Database, id: string): Promise<boolean> {
  const result = await db.prepare('DELETE FROM runs WHERE id = ?').bind(id).run()
  return (result.meta.changes ?? 0) > 0
}

export async function countRuns(db: D1Database): Promise<number> {
  const row = await db.prepare('SELECT COUNT(*) as count FROM runs').first<{ count: number }>()
  return row?.count ?? 0
}
