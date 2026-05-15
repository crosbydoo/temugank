import { motion } from 'framer-motion'

import { quickTransition, softTransition } from '@/animations/transitions'
import { fade, fadeUp, staggerContainer } from '@/animations/variants'
import { ParallaxBackdrop } from '@/components/common/ParallaxBackdrop'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TextCta } from '@/components/ui/TextCta'
import { SECTION_IDS, SITE } from '@/constants/site'
import { usePreferReducedMotion } from '@/hooks/usePreferReducedMotion'

/** Served from `public/hero.jpg` so the hero works offline and without hotlinking. */
const heroImage = '/hero.jpg'

const headlineClass =
  'mt-4 font-display uppercase leading-[1.08] tracking-[var(--tracking-wide-editorial)] text-paper sm:mt-6 ' +
  'text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.35rem]'

const dekClass =
  'mt-6 max-w-xl font-body leading-relaxed text-paper/75 sm:mt-8 ' +
  'text-base sm:text-lg md:max-w-2xl md:text-xl'

/**
 * Fullscreen hero: establishes tone (cinematic, quiet, disciplined).
 * Motion is entrance-only — no infinite loops.
 */
export function HeroSection() {
  const reduceMotion = usePreferReducedMotion()

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative flex min-h-dvh items-end overflow-hidden pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-24 sm:pb-20 sm:pt-28 md:pb-24 lg:pt-32"
    >
      <ParallaxBackdrop
        src={heroImage}
        alt="Wide landscape backdrop in muted tones"
        className="z-0"
      />

      <Container className="relative z-10 pb-2">
        {reduceMotion ? (
          <div className="max-w-3xl xl:max-w-4xl">
            <SectionLabel>Underground pace / public discipline</SectionLabel>
            <h1 className={headlineClass}>
              The city is the track. Silence is the coach.
            </h1>
            <p className={dekClass}>{SITE.manifestoLine}</p>
            <div className="mt-8 flex max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
              <TextCta href={`#${SECTION_IDS.about}`}>Read manifesto</TextCta>
              <TextCta href={`#${SECTION_IDS.membership}`}>Request membership</TextCta>
            </div>
          </div>
        ) : (
          <motion.div
            className="max-w-3xl xl:max-w-4xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} transition={softTransition}>
              <SectionLabel>Underground pace / public discipline</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={softTransition}
              className={headlineClass}
            >
              The city is the track. Silence is the coach.
            </motion.h1>
            <motion.p
              variants={fade}
              transition={{ ...softTransition, delay: 0.1 }}
              className={dekClass}
            >
              {SITE.manifestoLine}
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={quickTransition}
              className="mt-8 flex max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <TextCta href={`#${SECTION_IDS.about}`}>Read manifesto</TextCta>
              <TextCta href={`#${SECTION_IDS.membership}`}>
                Request membership
              </TextCta>
            </motion.div>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
