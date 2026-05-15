/**
 * Central brand copy + IDs for in-page anchors.
 * Separating copy from UI keeps sections dumb and easy to translate later.
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
  membership: 'join',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const PRIMARY_NAV = [
  { label: 'Manifesto', href: `#${SECTION_IDS.about}` },
  { label: 'Philosophy', href: `#${SECTION_IDS.philosophy}` },
  { label: 'Runs', href: `#${SECTION_IDS.runs}` },
  { label: 'Gallery', href: `#${SECTION_IDS.gallery}` },
  { label: 'Field Notes', href: `#${SECTION_IDS.journal}` },
] as const

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Strava', href: 'https://www.strava.com' },
  { label: 'Email', href: 'mailto:hello@temugank.local' },
] as const

/** Compact utility links — Satisfy-style footer band inside the mobile drawer. */
export const MOBILE_DRAWER_SECONDARY = [
  { label: 'Membership', href: `#${SECTION_IDS.membership}` },
  { label: 'Route calendar', href: `#${SECTION_IDS.runs}` },
  { label: 'Customer line', href: 'mailto:hello@temugank.local' },
  { label: 'Field archive', href: `#${SECTION_IDS.gallery}` },
  { label: 'Signal room', href: '#footer' },
] as const
