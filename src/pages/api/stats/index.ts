import type { APIRoute } from 'astro'

import { json, requireAdmin } from '@/lib/api/helpers'
import { getDb } from '@/lib/db/client'
import { getDeskStats } from '@/lib/db/stats'

export const GET: APIRoute = async (context) => {
  const denied = await requireAdmin(context)
  if (denied) return denied
  const db = getDb()!
  return json(await getDeskStats(db))
}
