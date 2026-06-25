/** Hidden desk route — not linked from public navigation. */
export const DESK_PATH = '/desk' as const

export const DESK_DOCS = [
  {
    label: 'Documentation hub',
    href: '/docs',
    description: 'All project guides in one place.',
  },
  {
    label: 'Architecture',
    href: '/docs/architecture',
    description: 'Layers, folders, and data flow.',
  },
  {
    label: 'Contributing',
    href: '/docs/contributing',
    description: 'Setup, conventions, and PR checklist.',
  },
  {
    label: 'Content guide',
    href: '/docs/content',
    description: 'JSON schemas for runs, journal, and gallery.',
  },
] as const

export type DeskTab = 'events' | 'articles' | 'docs'
