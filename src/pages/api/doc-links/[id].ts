import type { APIRoute } from 'astro'

import { json, parseJson, requireAdmin } from '@/lib/api/helpers'
import { getDb } from '@/lib/db/client'
import { deleteDocLink, updateDocLink, type DocLinkInput } from '@/lib/db/docLinks'

export const PUT: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const id = context.params.id
  if (!id) return json({ error: 'Missing id.' }, 400)
  const body = await parseJson<DocLinkInput>(context.request)
  if (!body?.label || !body?.href) {
    return json({ error: 'label and href are required.' }, 400)
  }
  const db = getDb()!
  const updated = await updateDocLink(db, id, {
    label: body.label,
    href: body.href,
    description: body.description ?? '',
    sortOrder: body.sortOrder,
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
  const ok = await deleteDocLink(db, id)
  if (!ok) return json({ error: 'Not found.' }, 404)
  return json({ ok: true })
}
