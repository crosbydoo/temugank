/**
 * Maps Astro content collection entries to plain objects with `id`.
 * Keeps pages and islands free of repetitive `.map()` boilerplate.
 */
export function mapCollectionEntries<
  TEntry extends { id: string; data: Record<string, unknown> },
>(entries: readonly TEntry[]) {
  return entries.map((entry) => ({
    id: entry.id,
    ...entry.data,
  }))
}
