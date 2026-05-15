import { motion } from 'framer-motion'

import { fadeUp, staggerContainer } from '@/animations/variants'
import { softTransition } from '@/animations/transitions'
import { MaskedMedia } from '@/components/common/MaskedMedia'
import { MotionSection } from '@/components/common/MotionSection'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SECTION_IDS } from '@/constants/site'
import { GALLERY_ITEMS } from '@/data/gallery'
import { usePreferReducedMotion } from '@/hooks/usePreferReducedMotion'

export function GallerySection() {
  const reduceMotion = usePreferReducedMotion()

  return (
    <MotionSection
      id={SECTION_IDS.gallery}
      className="border-t border-paper/10 bg-bg-elevated py-16 sm:py-24 md:py-28 lg:py-32"
    >
      <Container>
        <div className="max-w-full sm:max-w-xl lg:max-w-2xl">
          <SectionLabel>Community gallery</SectionLabel>
          <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-4 sm:text-3xl md:text-4xl">
            Field evidence, not content
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-stone sm:mt-6 sm:text-base md:text-lg">
            Frames from real sessions — imperfect light, honest fatigue, shared
            quiet.
          </p>
        </div>

        {reduceMotion ? (
          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-3">
            {GALLERY_ITEMS.map((item) => (
              <figure key={item.id} className="group flex flex-col gap-3">
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
            ))}
          </div>
        ) : (
          <motion.div
            className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {GALLERY_ITEMS.map((item) => (
              <motion.figure
                key={item.id}
                variants={fadeUp}
                transition={softTransition}
                className="group flex flex-col gap-3"
              >
                <div className="aspect-[4/5] border border-paper/10 bg-bg-deep">
                  <MaskedMedia
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full"
                  />
                </div>
                <figcaption className="font-display text-[0.55rem] uppercase tracking-[var(--tracking-ultra)] text-stone transition-colors duration-500 group-hover:text-paper">
                  {item.caption}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </Container>
    </MotionSection>
  )
}
