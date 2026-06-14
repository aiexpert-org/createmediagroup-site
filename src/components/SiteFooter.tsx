import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { navItems, siteConfig } from '@/lib/site-config'

export function SiteFooter() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              aria-label={`${siteConfig.brand} home`}
              className="inline-block"
            >
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-neutral-600">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase text-neutral-950">
              Site
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-neutral-950 hover:underline underline-offset-4 decoration-[var(--color-cta)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase text-neutral-950">
              Contact Emily
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              <li>
                <Link
                  href={siteConfig.waitlistUrl}
                  className="font-semibold text-neutral-950 transition hover:underline underline-offset-4 decoration-[var(--color-cta)]"
                >
                  Join the wait list
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition hover:text-neutral-950 hover:underline underline-offset-4 decoration-[var(--color-cta)]"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-neutral-500">
                {siteConfig.city}, {siteConfig.state}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-200 pt-8 pb-12">
          <p className="text-sm text-neutral-500">
            © {siteConfig.brand} {new Date().getFullYear()}. All work designed by{' '}
            {siteConfig.designer}.
          </p>
          <p className="text-sm text-neutral-500">
            Made in {siteConfig.city}, {siteConfig.state}.
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
