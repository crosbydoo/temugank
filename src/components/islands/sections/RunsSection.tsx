import { motion } from 'framer-motion'

import { fadeUp, staggerContainer } from '@/lib/motion/variants'
import { softTransition } from '@/lib/motion/transitions'
import { Container } from '@/components/ui/Container'
import { EditorialRow } from '@/components/ui/EditorialRow'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/config/site'
import type { RunEvent } from '@/types/content'
import { usePreferReducedMotion } from '@/lib/motion/usePreferReducedMotion'

export interface RunsSectionProps {
  upcomingRuns: readonly RunEvent[]
}

function RunRows({ runs }: { runs: readonly RunEvent[] }) {
  return (
    <>
      {runs.map((run) => (
        <EditorialRow
          key={run.id}
          meta={run.dateLabel}
          heading={run.title}
          detail={`${run.location} — ${run.note}`}
        />
      ))}
    </>
  )
}

export function RunsSection({ upcomingRuns }: RunsSectionProps) {
  const reduceMotion = usePreferReducedMotion()

  return (
    <section
      id={SECTION_IDS.runs}
      className="border-t border-paper/10 bg-bg-deep py-14 sm:py-20"
    >
      <Container>
        <SectionHeader
          label="Upcoming runs"
          title="Scheduled miles"
          description="Arrive on time. No apps, no check-ins."
        />

        <div className="mt-8 border-t border-paper/10">
          {reduceMotion ? (
            <RunRows runs={upcomingRuns} />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {upcomingRuns.map((run) => (
                <motion.div key={run.id} variants={fadeUp} transition={softTransition}>
                  <EditorialRow
                    meta={run.dateLabel}
                    heading={run.title}
                    detail={`${run.location} — ${run.note}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}
