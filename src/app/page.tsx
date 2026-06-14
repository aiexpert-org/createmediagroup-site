import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import { HeroMosaic, HeroMosaicBackground } from '@/components/HeroMosaic'
import { EmilyAvatar, EmilyPortrait } from '@/components/EmilyAvatar'
import { WorkShowcase } from '@/components/WorkShowcase'
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

      {/* Hero with a full-bleed Studio-style portfolio mosaic background.
          The outer wrapper supplies the scroll range; the inner hero pins
          (md:sticky) at the top so the black trust block below scrolls up and
          over it, instead of the hero scrolling out of view. */}
      <div className="relative">
      <div className="relative isolate overflow-hidden md:sticky md:top-0 md:z-0">
        {/* Desktop: edge-to-edge mosaic behind the copy, masked by a
            right-to-left white gradient so the left side stays clean. */}
        <div className="hidden md:block">
          <HeroMosaicBackground />
        </div>

        {/* `pointer-events-none` lets the cursor reach the mosaic tiles behind
            this copy column so every tile (not just the row above the headline)
            lights up on hover. The interactive CTAs below re-enable pointer
            events on themselves. */}
        <Container className="pointer-events-none mt-8 pb-12 sm:mt-12 sm:pb-20 lg:mt-16 lg:pb-28">
          <FadeIn className="relative z-10 max-w-2xl lg:max-w-3xl">
            <span className="mb-5 block font-display text-sm font-semibold tracking-wider text-neutral-600 uppercase">
              Church design subscription
            </span>
            <h1 className="font-display text-[2.75rem] leading-[1.05] font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              Unlimited graphic design for churches.
            </h1>
            <div className="mt-6 flex max-w-2xl items-start gap-4">
              <EmilyAvatar size={72} priority className="mt-1" />
              <p className="text-xl text-neutral-600">
                Hi, I&rsquo;m Emily. I offer unlimited graphic design for churches on a monthly subscription. I would love to help you build toward your vision.
              </p>
            </div>
            <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-6">
              <Button href={siteConfig.waitlistUrl}>Join the wait list</Button>
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

      {/* Churches trust block — sits above the pinned hero (z-10) so it scrolls
          up and over it for the parallax reveal. It shares the parallax stage
          wrapper above so the sticky hero has scroll range to pin against. */}
      <div className="relative z-10 bg-white">
        <ChurchLogos />
      </div>
      </div>

      {/* Offer block — portrait of Emily balances the right side */}
      <SectionIntro
        eyebrow="The offer"
        title="One designer. One flat fee. Fast turn around times."
        className="mt-24 sm:mt-32 lg:mt-40"
        aside={
          <FadeIn
            scaleIn
            className="mx-auto w-full max-w-[460px] lg:mx-0 lg:ml-auto"
          >
            <EmilyPortrait width={460} />
          </FadeIn>
        }
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

      {/* See the work — a strong sermon series piece with subtle scroll parallax */}
      <SectionIntro
        eyebrow="See the work"
        title="Custom graphic design for churches."
        className="mt-24 sm:mt-32 lg:mt-40"
        aside={
          <WorkShowcase
            src="/portfolio/sermon-malachi.webp"
            alt="Sermon series art for a Malachi series, designed by Emily Farmer"
          />
        }
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

      <ContactBlock heading="Join the wait list.">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
