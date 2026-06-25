import { motion } from 'framer-motion'

import { fadeUp, staggerContainer } from '@/lib/motion/variants'
import { softTransition } from '@/lib/motion/transitions'
import { Container } from '@/components/ui/Container'
import { EditorialRow } from '@/components/ui/EditorialRow'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/config/site'
import type { JournalArticle } from '@/types/content'
import { usePreferReducedMotion } from '@/lib/motion/usePreferReducedMotion'

export interface JournalSectionProps {
  journalArticles: readonly JournalArticle[]
}

export function JournalSection({ journalArticles }: JournalSectionProps) {
  const reduceMotion = usePreferReducedMotion()

  return (
    <section
      id={SECTION_IDS.journal}
      className="border-t border-paper/10 bg-bg-deep py-14 sm:py-20"
    >
      <Container>
        <SectionHeader
          label="Field notes"
          title="Slow publishing from the route"
          description="Written after cool-down — never during the ego spike."
        />

        {reduceMotion ? (
          <div className="mt-8 border-t border-paper/10">
            {journalArticles.map((article) => (
              <EditorialRow
                key={article.id}
                meta={`${article.date} · ${article.readTime}`}
                heading={article.title}
                detail={article.dek}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="mt-8 border-t border-paper/10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {journalArticles.map((article) => (
              <motion.div key={article.id} variants={fadeUp} transition={softTransition}>
                <EditorialRow
                  meta={`${article.date} · ${article.readTime}`}
                  heading={article.title}
                  detail={article.dek}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  )
}
