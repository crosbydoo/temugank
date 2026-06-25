import type { APIRoute } from 'astro'

import { json, parseJson, requireAdmin } from '@/lib/api/helpers'
import { getDb } from '@/lib/db/client'
import { createRun, listRuns, type RunInput } from '@/lib/db/runs'

export const GET: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const db = getDb()!
  return json(await listRuns(db))
}

export const POST: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const body = await parseJson<RunInput>(context.request)
  if (!body?.title || !body?.location || !body?.dateLabel) {
    return json({ error: 'title, location, and dateLabel are required.' }, 400)
  }
  const db = getDb()!
  const run = await createRun(db, {
    title: body.title,
    location: body.location,
    dateLabel: body.dateLabel,
    note: body.note ?? '',
  })
  return json(run, 201)
}
