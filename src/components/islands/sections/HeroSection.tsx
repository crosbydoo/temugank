import { motion } from 'framer-motion'

import { softTransition } from '@/lib/motion/transitions'
import { fadeUp } from '@/lib/motion/variants'
import { ParallaxBackdrop } from '@/components/islands/motion/ParallaxBackdrop'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TextCta } from '@/components/ui/TextCta'
import { SECTION_IDS, SITE } from '@/config/site'
import { usePreferReducedMotion } from '@/lib/motion/usePreferReducedMotion'

const heroImage = '/hero.jpg'

const headlineClass =
  'mt-4 font-display uppercase leading-[1.08] tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-5 ' +
  'text-[1.65rem] sm:text-3xl md:text-4xl lg:text-5xl'

const dekClass =
  'mt-5 max-w-lg font-body text-base leading-relaxed text-paper/75 sm:mt-6 sm:text-lg'

export function HeroSection() {
  const reduceMotion = usePreferReducedMotion()

  const content = (
    <div className="max-w-2xl">
      <SectionLabel>Field unit</SectionLabel>
      <h1 className={headlineClass}>
        The city is the track. Silence is the coach.
      </h1>
      <p className={dekClass}>{SITE.manifestoLine}</p>
      <div className="mt-8">
        <TextCta href={`#${SECTION_IDS.about}`} className="sm:w-auto">
          Read manifesto
        </TextCta>
      </div>
    </div>
  )

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative flex min-h-[85svh] items-end overflow-hidden pb-16 pt-24 sm:min-h-dvh sm:pb-20 sm:pt-28"
    >
      <ParallaxBackdrop
        src={heroImage}
        alt="Wide landscape backdrop in muted tones"
        className="z-0"
      />

      <Container className="relative z-10 pb-2">
        {reduceMotion ? (
          content
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} transition={softTransition}>
              <SectionLabel>Field unit</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={softTransition}
              className={headlineClass}
            >
              The city is the track. Silence is the coach.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={softTransition}
              className={dekClass}
            >
              {SITE.manifestoLine}
            </motion.p>
            <motion.div variants={fadeUp} transition={softTransition} className="mt-8">
              <TextCta href={`#${SECTION_IDS.about}`} className="sm:w-auto">
                Read manifesto
              </TextCta>
            </motion.div>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
