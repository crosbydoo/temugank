import { PageLayout } from '@/components/layout/PageLayout'
import { AboutSection } from '@/components/sections/AboutSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { HeroSection } from '@/components/sections/HeroSection'
import { JournalSection } from '@/components/sections/JournalSection'
import { MembershipSection } from '@/components/sections/MembershipSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { RunsSection } from '@/components/sections/RunsSection'

/**
 * Home route composes modular sections only — no data fetching here.
 * When APIs arrive, lift data providers to this level or to route loaders.
 */
export function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <RunsSection />
      <GallerySection />
      <JournalSection />
      <MembershipSection />
    </PageLayout>
  )
}
