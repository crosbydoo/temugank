import type { APIRoute } from 'astro'

import { json, parseJson, requireAdmin } from '@/lib/api/helpers'
import { getDb } from '@/lib/db/client'
import { createDocLink, listDocLinks, type DocLinkInput } from '@/lib/db/docLinks'

export const GET: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const db = getDb()!
  return json(await listDocLinks(db))
}

export const POST: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const body = await parseJson<DocLinkInput>(context.request)
  if (!body?.label || !body?.href) {
    return json({ error: 'label and href are required.' }, 400)
  }
  const db = getDb()!
  const link = await createDocLink(db, {
    label: body.label,
    href: body.href,
    description: body.description ?? '',
    sortOrder: body.sortOrder,
  })
  return json(link, 201)
}
