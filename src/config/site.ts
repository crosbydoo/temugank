/**
 * Site-wide configuration: brand, navigation, and section anchor IDs.
 * Editable page copy lives in src/content/ — not here.
 */
export const SITE = {
  name: 'Temugank',
  tagline: 'Field Unit',
  manifestoLine:
    'We train in plain sight. We disappear on purpose. Movement is our liturgy.',
} as const

export const SECTION_IDS = {
  hero: 'top',
  about: 'manifesto',
  philosophy: 'philosophy',
  runs: 'runs',
  gallery: 'gallery',
  journal: 'journal',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const PRIMARY_NAV = [
  { label: 'Manifesto', href: `#${SECTION_IDS.about}` },
  { label: 'Runs', href: `#${SECTION_IDS.runs}` },
  { label: 'Gallery', href: `#${SECTION_IDS.gallery}` },
  { label: 'Notes', href: `#${SECTION_IDS.journal}` },
] as const

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Strava', href: 'https://www.strava.com' },
  { label: 'Email', href: 'mailto:hello@temugank.local' },
] as const
