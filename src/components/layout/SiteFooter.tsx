import { BrandWordmark } from '@/components/ui/BrandWordmark'
import { Container } from '@/components/ui/Container'
import { SITE, SOCIAL_LINKS } from '@/constants/site'

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="border-t border-paper/10 bg-bg-elevated py-12 text-stone sm:py-16 md:py-20"
    >
      <Container className="grid gap-10 sm:gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <div>
          <BrandWordmark className="text-paper block text-xl leading-none sm:text-2xl md:text-3xl" />
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-paper/80 sm:mt-6 sm:text-lg md:max-w-lg">
            {SITE.manifestoLine}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-8 md:items-end">
          <nav aria-label="Social">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] transition-colors duration-500 hover:text-paper sm:text-[0.6rem]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="max-w-[22rem] text-pretty font-display text-[0.5rem] uppercase leading-relaxed tracking-[var(--tracking-wide-editorial)] text-stone/80 sm:text-[0.55rem] md:max-w-none md:text-end">
            © {new Date().getFullYear()} {SITE.name} — field records on file
          </p>
        </div>
      </Container>
    </footer>
  )
}
