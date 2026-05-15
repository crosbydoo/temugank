import { motion } from 'framer-motion'

import { fadeUp, staggerContainer } from '@/animations/variants'
import { quickTransition, softTransition } from '@/animations/transitions'
import { MotionSection } from '@/components/common/MotionSection'
import { Container } from '@/components/ui/Container'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SECTION_IDS } from '@/constants/site'
import { UPCOMING_RUNS } from '@/data/runs'
import { usePreferReducedMotion } from '@/hooks/usePreferReducedMotion'

export function RunsSection() {
  const reduceMotion = usePreferReducedMotion()

  return (
    <MotionSection
      id={SECTION_IDS.runs}
      className="border-t border-paper/10 bg-bg-deep py-16 sm:py-24 md:py-28 lg:py-32"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:gap-8 md:flex-row md:items-end">
          <div className="min-w-0">
            <SectionLabel>Upcoming runs</SectionLabel>
            <h2 className="mt-3 max-w-xl font-display text-2xl uppercase leading-tight tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-4 sm:text-3xl md:text-4xl">
              Scheduled miles, minimal noise
            </h2>
          </div>
          <p className="max-w-full font-body text-sm leading-relaxed text-stone sm:max-w-sm md:text-base">
            No check-ins, no apps. Arrive on time, leave no trace except breath
            in the cold air.
          </p>
        </div>

        {reduceMotion ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
            {UPCOMING_RUNS.map((run) => (
              <EditorialCard key={run.id}>
                <p className="font-display text-[0.6rem] uppercase tracking-[var(--tracking-ultra)] text-sage">
                  {run.dateLabel}
                </p>
                <h3 className="mt-3 font-display text-base uppercase tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-4 sm:text-lg">
                  {run.title}
                </h3>
                <p className="mt-3 font-body text-sm text-stone">{run.location}</p>
                <p className="mt-6 font-body text-sm leading-relaxed text-paper/70">
                  {run.note}
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
            {UPCOMING_RUNS.map((run) => (
              <motion.div key={run.id} variants={fadeUp} transition={softTransition}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={quickTransition}
                >
                  <EditorialCard>
                    <p className="font-display text-[0.6rem] uppercase tracking-[var(--tracking-ultra)] text-sage">
                      {run.dateLabel}
                    </p>
                    <h3 className="mt-3 font-display text-base uppercase tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-4 sm:text-lg">
                      {run.title}
                    </h3>
                    <p className="mt-3 font-body text-sm text-stone">
                      {run.location}
                    </p>
                    <p className="mt-6 font-body text-sm leading-relaxed text-paper/70">
                      {run.note}
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
