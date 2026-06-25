import type { APIContext } from 'astro'

import { env } from 'cloudflare:workers'

import { getDb } from '@/lib/db/client'
import { COOKIE_NAME, verifySessionToken } from '@/lib/auth/session'

export async function requireAdmin(context: APIContext): Promise<Response | null> {
  const db = getDb()

  if (!env.SESSION_SECRET || !db) {
    return new Response(JSON.stringify({ error: 'Server not configured for database.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const token = context.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const user = await verifySessionToken(token, env.SESSION_SECRET)
  if (!user) {
    return new Response(JSON.stringify({ error: 'Session expired' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  context.locals.user = user
  return null
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function parseJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T
  } catch {
    return null
  }
}
