import type { RunEvent } from '@/types/content'

export const UPCOMING_RUNS: readonly RunEvent[] = [
  {
    id: 'r-1',
    title: 'Silent City — 12k',
    location: 'North embankment',
    dateLabel: 'Sat 24 — 05:15',
    note: 'No music. Headlamps optional.',
  },
  {
    id: 'r-2',
    title: 'Tempo Clinic — small circle',
    location: 'Industrial district loop',
    dateLabel: 'Wed 28 — 19:30',
    note: 'Bring layers. Wind is honest.',
  },
  {
    id: 'r-3',
    title: 'Long slow distance',
    location: 'River trail out-and-back',
    dateLabel: 'Sun 02 — 06:00',
    note: 'Conversational pace only.',
  },
] as const
