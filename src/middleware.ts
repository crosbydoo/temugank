import { defineMiddleware } from 'astro:middleware'

import { env } from 'cloudflare:workers'

import { COOKIE_NAME, verifySessionToken } from '@/lib/auth/session'

const PUBLIC_PATHS = new Set(['/desk/login', '/api/auth/login'])

const PROTECTED_API_PREFIXES = [
  '/api/runs',
  '/api/journal',
  '/api/doc-links',
  '/api/stats',
  '/api/auth/logout',
  '/api/auth/me',
]

function isProtectedApi(pathname: string): boolean {
  return PROTECTED_API_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

async function resolveUser(context: Parameters<Parameters<typeof defineMiddleware>[0]>[0]) {
  const token = context.cookies.get(COOKIE_NAME)?.value
  if (!env.SESSION_SECRET || !token) return null
  return verifySessionToken(token, env.SESSION_SECRET)
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url

  if (PUBLIC_PATHS.has(pathname)) {
    return next()
  }

  const needsAuth =
    (pathname.startsWith('/desk') && pathname !== '/desk/login') || isProtectedApi(pathname)

  if (!needsAuth) {
    return next()
  }

  const user = await resolveUser(context)
  if (user) {
    context.locals.user = user
    return next()
  }

  if (pathname.startsWith('/api/')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return context.redirect('/desk/login')
})
