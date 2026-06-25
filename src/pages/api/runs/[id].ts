import type { APIRoute } from 'astro'

import { json, parseJson, requireAdmin } from '@/lib/api/helpers'
import { getDb } from '@/lib/db/client'
import { deleteRun, updateRun, type RunInput } from '@/lib/db/runs'

export const PUT: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const id = context.params.id
  if (!id) return json({ error: 'Missing id.' }, 400)
  const body = await parseJson<RunInput>(context.request)
  if (!body?.title || !body?.location || !body?.dateLabel) {
    return json({ error: 'title, location, and dateLabel are required.' }, 400)
  }
  const db = getDb()!
  const updated = await updateRun(db, id, {
    title: body.title,
    location: body.location,
    dateLabel: body.dateLabel,
    note: body.note ?? '',
  })
  if (!updated) return json({ error: 'Not found.' }, 404)
  return json(updated)
}

export const DELETE: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const id = context.params.id
  if (!id) return json({ error: 'Missing id.' }, 400)
  const db = getDb()!
  const ok = await deleteRun(db, id)
  if (!ok) return json({ error: 'Not found.' }, 404)
  return json({ ok: true })
}
