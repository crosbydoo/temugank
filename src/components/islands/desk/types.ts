export type DeskView = 'overview' | 'events' | 'articles' | 'docs'

export const DESK_NAV: { id: DeskView; label: string; hint: string }[] = [
  { id: 'overview', label: 'Overview', hint: 'Summary' },
  { id: 'events', label: 'Events', hint: 'Runs' },
  { id: 'articles', label: 'Articles', hint: 'Field notes' },
  { id: 'docs', label: 'Doc links', hint: 'Guides' },
]

export function parseDeskView(value: string | undefined): DeskView {
  if (value === 'events' || value === 'articles' || value === 'docs') return value
  return 'overview'
}
