import type { APIRoute } from 'astro'

import { json } from '@/lib/api/helpers'

export const GET: APIRoute = ({ locals }) => {
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, 401)
  }
  return json(locals.user)
}
