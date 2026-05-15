import { motion } from 'framer-motion'

import { fadeUp, staggerContainer } from '@/animations/variants'
import { softTransition } from '@/animations/transitions'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SECTION_IDS } from '@/constants/site'
import { PHILOSOPHY_STATEMENTS } from '@/data/manifesto'
import { usePreferReducedMotion } from '@/hooks/usePreferReducedMotion'

export function PhilosophySection() {
  const reduceMotion = usePreferReducedMotion()

  return (
    <section
      id={SECTION_IDS.philosophy}
      className="bg-paper py-16 text-bg-deep sm:py-24 md:py-28 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-full sm:max-w-sm lg:max-w-md">
            <SectionLabel className="text-bg-deep/60">
              Community philosophy
            </SectionLabel>
            <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-[var(--tracking-wide-editorial)] sm:mt-4 sm:text-3xl md:text-4xl">
              Culture over metrics
            </h2>
          </div>
          <p className="max-w-full font-body text-sm leading-relaxed text-bg-deep/70 sm:max-w-md sm:text-base md:text-lg">
            This is a profile of a collective: how we think, how we hold space,
            and how we measure worth in breaths instead of badges.
          </p>
        </div>

        <div className="mt-12 border-t border-bg-deep/10 pt-10 sm:mt-16 sm:pt-12">
          {reduceMotion ? (
            <ul className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
              {PHILOSOPHY_STATEMENTS.map((line) => (
                <li
                  key={line}
                  className="font-body text-base leading-snug text-bg-deep sm:text-lg md:text-xl"
                >
                  {line}
                </li>
              ))}
            </ul>
          ) : (
            <motion.ul
              className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {PHILOSOPHY_STATEMENTS.map((line) => (
                <motion.li
                  key={line}
                  variants={fadeUp}
                  transition={softTransition}
                  className="font-body text-base leading-snug text-bg-deep sm:text-lg md:text-xl"
                >
                  {line}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </Container>
    </section>
  )
}
