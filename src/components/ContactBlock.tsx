import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { siteConfig } from '@/lib/site-config'

type Props = {
  heading: string
  children: React.ReactNode
}

export function ContactBlock({ heading, children }: Props) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl text-balance">
              {heading}
            </h2>
            <div className="mt-6 text-xl text-neutral-300">{children}</div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={siteConfig.bookingUrl}>Book a call with Emily</Button>
            </div>
          </div>

          <Border className="mt-16 pt-10" invert>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 text-sm">
              <div>
                <dt className="font-display font-semibold uppercase tracking-wider text-white/70">
                  Email
                </dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-white hover:text-[var(--color-cta)]"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display font-semibold uppercase tracking-wider text-white/70">
                  Based in
                </dt>
                <dd className="mt-3 text-white">
                  {siteConfig.city}, {siteConfig.state}
                </dd>
              </div>
            </dl>
          </Border>
        </div>
      </FadeIn>
    </Container>
  )
}
