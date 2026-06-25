import { motion } from 'framer-motion'

import { fadeUp, staggerContainer } from '@/lib/motion/variants'
import { softTransition } from '@/lib/motion/transitions'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/config/site'
import { usePreferReducedMotion } from '@/lib/motion/usePreferReducedMotion'

export interface AboutSectionProps {
  manifestoBlocks: readonly string[]
  philosophyStatements: readonly string[]
}

export function AboutSection({
  manifestoBlocks,
  philosophyStatements,
}: AboutSectionProps) {
  const reduceMotion = usePreferReducedMotion()

  return (
    <section
      id={SECTION_IDS.about}
      className="border-t border-paper/10 bg-bg-deep py-14 sm:py-20"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeader
            label="Manifesto"
            title="We do not chase trends. We accumulate mornings."
          />

          {reduceMotion ? (
            <div className="space-y-6">
              {manifestoBlocks.map((block) => (
                <p
                  key={block}
                  className="font-body text-base leading-relaxed text-paper/80 sm:text-lg"
                >
                  {block}
                </p>
              ))}
            </div>
          ) : (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {manifestoBlocks.map((block) => (
                <motion.p
                  key={block}
                  variants={fadeUp}
                  transition={softTransition}
                  className="font-body text-base leading-relaxed text-paper/80 sm:text-lg"
                >
                  {block}
                </motion.p>
              ))}
            </motion.div>
          )}
        </div>

        <div
          id={SECTION_IDS.philosophy}
          className="mt-12 border-t border-paper/10 bg-paper px-5 py-8 text-bg-deep sm:mt-14 sm:px-8 sm:py-10"
        >
          <SectionHeader
            label="Community"
            title="Culture over metrics"
            labelClassName="text-bg-deep/50"
            titleClassName="text-bg-deep"
          />
          <ul className="mt-8 divide-y divide-bg-deep/10 border-t border-bg-deep/10">
            {philosophyStatements.map((line) => (
              <li
                key={line}
                className="py-4 font-body text-base leading-snug text-bg-deep sm:text-lg"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
