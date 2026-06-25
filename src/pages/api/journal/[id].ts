import type { APIRoute } from 'astro'

import { json, parseJson, requireAdmin } from '@/lib/api/helpers'
import { getDb } from '@/lib/db/client'
import { deleteJournal, updateJournal, type JournalInput } from '@/lib/db/journal'

export const PUT: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const id = context.params.id
  if (!id) return json({ error: 'Missing id.' }, 400)
  const body = await parseJson<JournalInput>(context.request)
  if (!body?.title || !body?.dek || !body?.date || !body?.readTime) {
    return json({ error: 'title, dek, date, and readTime are required.' }, 400)
  }
  const db = getDb()!
  const updated = await updateJournal(db, id, body)
  if (!updated) return json({ error: 'Not found.' }, 404)
  return json(updated)
}

export const DELETE: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const id = context.params.id
  if (!id) return json({ error: 'Missing id.' }, 400)
  const db = getDb()!
  const ok = await deleteJournal(db, id)
  if (!ok) return json({ error: 'Not found.' }, 404)
  return json({ ok: true })
}
