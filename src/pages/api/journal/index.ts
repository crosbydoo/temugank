import type { APIRoute } from 'astro'

import { json, parseJson, requireAdmin } from '@/lib/api/helpers'
import { getDb } from '@/lib/db/client'
import { createJournal, listJournal, type JournalInput } from '@/lib/db/journal'

export const GET: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const db = getDb()!
  return json(await listJournal(db))
}

export const POST: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const body = await parseJson<JournalInput>(context.request)
  if (!body?.title || !body?.dek || !body?.date || !body?.readTime) {
    return json({ error: 'title, dek, date, and readTime are required.' }, 400)
  }
  const db = getDb()!
  const article = await createJournal(db, body)
  return json(article, 201)
}
