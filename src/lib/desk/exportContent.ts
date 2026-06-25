/** Kebab-case filename slug from a human title. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Trigger a JSON file download in the browser. */
export function downloadJson(filename: string, data: Record<string, string>): void {
  const blob = new Blob([`${JSON.stringify(data, null, 2)}\n`], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

/** Suggested content path after export. */
export function contentPath(collection: 'runs' | 'journal', slug: string): string {
  return `src/content/${collection}/${slug}.json`
}
