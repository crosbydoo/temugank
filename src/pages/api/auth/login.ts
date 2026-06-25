import type { APIRoute } from 'astro'

import { json, parseJson } from '@/lib/api/helpers'
import { env } from 'cloudflare:workers'
import {
  COOKIE_NAME,
  sessionCookieOptions,
  signSession,
  verifyAdminCredentials,
} from '@/lib/auth/session'

interface LoginBody {
  email?: string
  password?: string
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    return json({ error: 'Admin credentials not configured.' }, 503)
  }

  const body = await parseJson<LoginBody>(request)
  if (!body?.email || !body?.password) {
    return json({ error: 'Email and password are required.' }, 400)
  }

  if (!verifyAdminCredentials(body.email, body.password, env.ADMIN_EMAIL, env.ADMIN_PASSWORD)) {
    return json({ error: 'Invalid credentials.' }, 401)
  }

  const token = await signSession({ email: body.email, role: 'admin' }, env.SESSION_SECRET)
  const secure = new URL(request.url).protocol === 'https:'
  cookies.set(COOKIE_NAME, token, sessionCookieOptions(secure))

  return json({ email: body.email, role: 'admin' })
}
