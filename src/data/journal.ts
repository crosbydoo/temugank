import type { JournalArticle } from '@/types/content'

export const JOURNAL_ARTICLES: readonly JournalArticle[] = [
  {
    id: 'j-1',
    title: 'Notes on silence between intervals',
    dek: 'What we do not say at the water fountain is part of the training.',
    date: 'Field Log 014',
    readTime: '6 min',
  },
  {
    id: 'j-2',
    title: 'Pacing as patience',
    dek: 'The collective learns restraint before it learns speed.',
    date: 'Field Log 011',
    readTime: '4 min',
  },
  {
    id: 'j-3',
    title: 'Night routes, documented poorly on purpose',
    dek: 'Some miles are not for sharing. They are for remembering.',
    date: 'Field Log 009',
    readTime: '5 min',
  },
] as const
