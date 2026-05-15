import { motion } from 'framer-motion'

import { fadeUp, staggerContainer } from '@/animations/variants'
import { quickTransition, softTransition } from '@/animations/transitions'
import { MotionSection } from '@/components/common/MotionSection'
import { Container } from '@/components/ui/Container'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SECTION_IDS } from '@/constants/site'
import { JOURNAL_ARTICLES } from '@/data/journal'
import { usePreferReducedMotion } from '@/hooks/usePreferReducedMotion'

export function JournalSection() {
  const reduceMotion = usePreferReducedMotion()

  return (
    <MotionSection
      id={SECTION_IDS.journal}
      className="border-t border-paper/10 bg-bg-deep py-16 sm:py-24 md:py-28 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <SectionLabel>Journal / field notes</SectionLabel>
            <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-4 sm:text-3xl md:text-4xl">
              Slow publishing from the route
            </h2>
          </div>
          <p className="max-w-full font-body text-sm leading-relaxed text-stone sm:max-w-md md:text-base">
            Essays, fragments, and warnings written after cool-down — never
            during the ego spike.
          </p>
        </div>

        {reduceMotion ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
            {JOURNAL_ARTICLES.map((article) => (
              <EditorialCard key={article.id}>
                <p className="font-display text-[0.6rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
                  {article.date} · {article.readTime}
                </p>
                <h3 className="mt-4 font-body text-xl leading-snug text-paper sm:text-2xl">
                  {article.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-stone">
                  {article.dek}
                </p>
              </EditorialCard>
            ))}
          </div>
        ) : (
          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {JOURNAL_ARTICLES.map((article) => (
              <motion.div key={article.id} variants={fadeUp} transition={softTransition}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={quickTransition}
                >
                  <EditorialCard>
                    <p className="font-display text-[0.6rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
                      {article.date} · {article.readTime}
                    </p>
                    <h3 className="mt-4 font-body text-xl leading-snug text-paper sm:text-2xl">
                      {article.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-stone">
                      {article.dek}
                    </p>
                  </EditorialCard>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </MotionSection>
  )
}
