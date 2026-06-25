import type { D1Database } from '@cloudflare/workers-types'
import { env } from 'cloudflare:workers'

/** Resolve D1 from Cloudflare bindings or null for JSON fallback. */
export function getDb(): D1Database | null {
  return env.DB ?? null
}

export function getEnv(): Env | null {
  if (!env.SESSION_SECRET && !env.ADMIN_EMAIL && !env.DB) {
    return null
  }
  return env
}

export function nowUnix(): number {
  return Math.floor(Date.now() / 1000)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
