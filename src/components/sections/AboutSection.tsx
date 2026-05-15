import { motion } from 'framer-motion'

import { fadeUp, staggerContainer } from '@/animations/variants'
import { softTransition } from '@/animations/transitions'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SECTION_IDS } from '@/constants/site'
import { MANIFESTO_BLOCKS } from '@/data/manifesto'
import { usePreferReducedMotion } from '@/hooks/usePreferReducedMotion'

export function AboutSection() {
  const reduceMotion = usePreferReducedMotion()

  return (
    <section
      id={SECTION_IDS.about}
      className="border-t border-paper/10 bg-bg-deep py-16 sm:py-24 md:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div>
            <SectionLabel>Manifesto</SectionLabel>
            <h2 className="mt-4 font-display text-2xl uppercase leading-tight tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-6 sm:text-3xl md:text-4xl lg:text-[2.35rem]">
              We do not chase trends. We accumulate mornings.
            </h2>
          </div>

          {reduceMotion ? (
            <div className="space-y-8 sm:space-y-10">
              {MANIFESTO_BLOCKS.map((block) => (
                <p
                  key={block}
                  className="font-body text-lg leading-relaxed text-paper/80 sm:text-xl md:text-2xl"
                >
                  {block}
                </p>
              ))}
            </div>
          ) : (
            <motion.div
              className="space-y-8 sm:space-y-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {MANIFESTO_BLOCKS.map((block) => (
                <motion.p
                  key={block}
                  variants={fadeUp}
                  transition={softTransition}
                  className="font-body text-lg leading-relaxed text-paper/80 sm:text-xl md:text-2xl"
                >
                  {block}
                </motion.p>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}
