import { motion } from 'framer-motion'

import { fadeUp } from '@/animations/variants'
import { softTransition } from '@/animations/transitions'
import { MotionSection } from '@/components/common/MotionSection'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TextCta } from '@/components/ui/TextCta'
import { SECTION_IDS } from '@/constants/site'
import { usePreferReducedMotion } from '@/hooks/usePreferReducedMotion'

export function MembershipSection() {
  const reduceMotion = usePreferReducedMotion()

  return (
    <MotionSection
      id={SECTION_IDS.membership}
      className="border-t border-paper/10 bg-gradient-to-b from-bg-elevated to-bg-deep py-20 sm:py-28 md:py-32 lg:py-36"
    >
      <Container className="max-w-3xl text-center xl:max-w-4xl">
        {reduceMotion ? (
          <>
            <SectionLabel>Membership</SectionLabel>
            <h2 className="mt-4 font-display text-2xl uppercase leading-tight tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-6 sm:text-3xl md:text-4xl">
              If you need hype, we are the wrong room.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-stone sm:mt-6 sm:text-lg md:max-w-3xl">
              Request an introduction. We answer slowly, on purpose — endurance
              begins with patience for correspondence too.
            </p>
            <div className="mt-8 flex max-w-md flex-col gap-3 self-center sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <TextCta href="mailto:hello@temugank.local">
                Request introduction
              </TextCta>
              <TextCta href={`#${SECTION_IDS.about}`}>
                Read the pace charter
              </TextCta>
            </div>
          </>
        ) : (
          <>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={softTransition}
            >
              <SectionLabel>Membership</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              transition={softTransition}
              className="mt-4 font-display text-2xl uppercase leading-tight tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-6 sm:text-3xl md:text-4xl"
            >
              If you need hype, we are the wrong room.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              transition={{ ...softTransition, delay: 0.05 }}
              className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-stone sm:mt-6 sm:text-lg md:max-w-3xl"
            >
              Request an introduction. We answer slowly, on purpose — endurance
              begins with patience for correspondence too.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              transition={{ ...softTransition, delay: 0.1 }}
              className="mt-8 flex max-w-md flex-col gap-3 self-center sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
            >
              <TextCta href="mailto:hello@temugank.local">
                Request introduction
              </TextCta>
              <TextCta href={`#${SECTION_IDS.about}`}>
                Read the pace charter
              </TextCta>
            </motion.div>
          </>
        )}
      </Container>
    </MotionSection>
  )
}
