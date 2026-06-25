import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/config/site'
import type { GalleryItem } from '@/types/content'

export interface GallerySectionProps {
  galleryItems: readonly GalleryItem[]
}

/** Static gallery strip — first three frames only, no motion chrome. */
export function GallerySection({ galleryItems }: GallerySectionProps) {
  const items = galleryItems.slice(0, 3)

  return (
    <section
      id={SECTION_IDS.gallery}
      className="border-t border-paper/10 bg-bg-elevated py-14 sm:py-20"
    >
      <Container>
        <SectionHeader
          label="Gallery"
          title="Field evidence"
          description="Imperfect light. Honest fatigue."
        />

        <ul className="mt-8 grid grid-cols-1 gap-4 border-t border-paper/10 pt-8 sm:grid-cols-3 sm:gap-5">
          {items.map((item) => (
            <li key={item.id}>
              <figure className="flex flex-col gap-2">
                <div className="aspect-[4/5] overflow-hidden border border-paper/10 bg-bg-deep">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="font-display text-[0.55rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
