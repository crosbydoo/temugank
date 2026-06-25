import type { APIRoute } from 'astro'

import { json } from '@/lib/api/helpers'
import { COOKIE_NAME } from '@/lib/auth/session'

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete(COOKIE_NAME, { path: '/' })
  return json({ ok: true })
}
