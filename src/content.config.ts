import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const runs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/runs' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    dateLabel: z.string(),
    note: z.string(),
  }),
})

const journal = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.string(),
    readTime: z.string(),
  }),
})

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery' }),
  schema: z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string(),
  }),
})

const manifesto = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/manifesto' }),
  schema: z.object({
    blocks: z.array(z.string()),
    philosophy: z.array(z.string()),
  }),
})

export const collections = { runs, journal, gallery, manifesto }
