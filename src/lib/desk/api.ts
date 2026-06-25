import type { JournalArticle, RunEvent } from '@/types/content'

import type { DocLink } from '@/lib/db/docLinks'

export interface DeskStats {
  runs: number
  articles: number
  gallery: number
  docLinks: number
}

async function parse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & { error?: string }
  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? 'Request failed')
  }
  return data as T
}

export async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return parse<{ email: string; role: string }>(response)
}

export async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' })
}

export async function fetchMe() {
  const response = await fetch('/api/auth/me')
  if (response.status === 401) return null
  return parse<{ email: string; role: string }>(response)
}

export async function fetchStats() {
  return parse<DeskStats>(await fetch('/api/stats'))
}

export async function fetchRuns() {
  return parse<RunEvent[]>(await fetch('/api/runs'))
}

export async function createRun(input: Omit<RunEvent, 'id'>) {
  return parse<RunEvent>(
    await fetch('/api/runs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  )
}

export async function updateRun(id: string, input: Omit<RunEvent, 'id'>) {
  return parse<RunEvent>(
    await fetch(`/api/runs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  )
}

export async function deleteRun(id: string) {
  await parse<{ ok: boolean }>(
    await fetch(`/api/runs/${id}`, { method: 'DELETE' }),
  )
}

export async function fetchArticles() {
  return parse<JournalArticle[]>(await fetch('/api/journal'))
}

export async function createArticle(input: Omit<JournalArticle, 'id'>) {
  return parse<JournalArticle>(
    await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input.title,
        dek: input.dek,
        date: input.date,
        readTime: input.readTime,
      }),
    }),
  )
}

export async function updateArticle(id: string, input: Omit<JournalArticle, 'id'>) {
  return parse<JournalArticle>(
    await fetch(`/api/journal/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input.title,
        dek: input.dek,
        date: input.date,
        readTime: input.readTime,
      }),
    }),
  )
}

export async function deleteArticle(id: string) {
  await parse<{ ok: boolean }>(
    await fetch(`/api/journal/${id}`, { method: 'DELETE' }),
  )
}

export async function fetchDocLinks() {
  return parse<DocLink[]>(await fetch('/api/doc-links'))
}

export async function createDocLink(input: {
  label: string
  href: string
  description: string
}) {
  return parse<DocLink>(
    await fetch('/api/doc-links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  )
}

export async function updateDocLink(
  id: string,
  input: { label: string; href: string; description: string },
) {
  return parse<DocLink>(
    await fetch(`/api/doc-links/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  )
}

export async function deleteDocLink(id: string) {
  await parse<{ ok: boolean }>(
    await fetch(`/api/doc-links/${id}`, { method: 'DELETE' }),
  )
}
