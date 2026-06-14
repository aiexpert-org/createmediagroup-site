import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import { HeroMosaic, HeroMosaicCluster } from '@/components/HeroMosaic'
import { MarkerSwipe } from '@/components/MarkerSwipe'
import { ChurchLogos } from '@/components/ChurchLogos'
import { ContactBlock } from '@/components/ContactBlock'
import { ServiceJsonLd } from '@/components/JsonLd'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Unlimited graphic design for churches',
  description: siteConfig.description,
}

const FEATURES = [
  {
    title: 'Match your church branding.',
    body:
      'I match your church brand and customize every design to fit who you are. Every design file is yours to keep.',
  },
  {
    title: 'Unlimited projects, unlimited revisions.',
    body:
      'Send as many projects as you need completed within each month and submit as many revisions as you need until you love the finished design. Receive sizes of each design for every platform you use.',
  },
  {
    title: 'Fast turn around times.',
    body:
      'I ask for a one-week lead time on project requests, but completely understand when things need to be designed or changed last minute. Same-day revisions are offered when needed. You are always free to email me anytime.',
  },
]

export default function HomePage() {
  return (
    <>
      <ServiceJsonLd />

      {/* Hero with a corner cluster of portfolio tiles */}
      <div className="relative isolate">
        {/* Desktop mosaic, tucked into the upper-right corner */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 -z-10 hidden w-1/3 opacity-[0.4] md:block lg:opacity-[0.45]"
        >
          <HeroMosaicCluster />
        </div>

        <Container className="mt-8 sm:mt-12 lg:mt-16">
          <FadeIn className="relative z-10 max-w-4xl">
            <span className="mb-5 block font-display text-sm font-semibold tracking-wider text-neutral-600 uppercase">
              Church design subscription
            </span>
            <h1 className="font-display text-[2.75rem] leading-[1.05] font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              Unlimited{' '}
              <span className="relative inline-block whitespace-nowrap">
                <MarkerSwipe className="-inset-x-1 inset-y-1" />
                <span className="relative">graphic design</span>
              </span>{' '}
              for churches.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-neutral-600">
              Hi, I&rsquo;m Emily. I offer unlimited graphic design for churches on a monthly subscription. I would love to help you build toward your vision.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={siteConfig.bookingUrl}>Book a call with Emily</Button>
              <Button href="/portfolio" variant="ghost">
                See the work
              </Button>
            </div>
          </FadeIn>

          {/* Mobile-only mosaic, rendered below the hero text */}
          <FadeIn className="mt-16 md:hidden">
            <HeroMosaic />
          </FadeIn>
        </Container>
      </div>

      {/* Churches trust block */}
      <ChurchLogos />

      {/* Offer block */}
      <SectionIntro
        eyebrow="The offer"
        title="One designer. One flat fee. Fast turn around times."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          I design for churches on a flat $997 a month subscription. I become your remote graphic designer, on call, with fast turn around times.
        </p>
      </SectionIntro>

      {/* Three features */}
      <Container className="mt-16">
        <FadeInStagger faster>
          <ul role="list" className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <FadeIn as="li" key={feature.title}>
                <Border className="pt-8">
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-neutral-950">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    {feature.body}
                  </p>
                </Border>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>

      {/* See the work */}
      <SectionIntro
        eyebrow="See the work"
        title="Custom graphic design for churches."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Sermon series. Branding. Social media. Announcements. Signage. Custom built around your church and your voice.
        </p>
      </SectionIntro>
      <Container className="mt-10">
        <FadeIn>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-base font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
          >
            See the full portfolio
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </FadeIn>
      </Container>

      <ContactBlock heading="Tell me about your church.">
        <p>
          Tell me about your church and your design needs. I will reply quickly and share with you what onboarding looks like.
        </p>
      </ContactBlock>
    </>
  )
}
