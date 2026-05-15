import type { GalleryItem } from '@/types/content'

/**
 * Static gallery data. Replace with CMS or API responses later;
 * components should not assume shape beyond the shared `GalleryItem` type.
 */
export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: 'g-1',
    src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Runners crossing a bridge in early fog',
    caption: '05:12 — river crossing',
  },
  {
    id: 'g-2',
    src: 'https://images.unsplash.com/photo-1552674605-5d2178b85608?auto=format&fit=crop&w=1200&q=80',
    alt: 'Athlete stretching calves on city curb',
    caption: 'warmth before the cold set',
  },
  {
    id: 'g-3',
    src: 'https://images.unsplash.com/photo-1517649763962-0c62306601b7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Track lanes at dusk',
    caption: 'lines are suggestions',
  },
  {
    id: 'g-4',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Group stretching in monochrome light',
    caption: 'collective quiet',
  },
  {
    id: 'g-5',
    src: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1200&q=80',
    alt: 'Runner mid-stride on wet pavement',
    caption: 'after the rain, before the city wakes',
  },
  {
    id: 'g-6',
    src: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Silhouette of runner against skyline',
    caption: 'horizon as finish line',
  },
] as const
