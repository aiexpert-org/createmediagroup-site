import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { StepList, type Step } from '@/components/StepList'
import { ContactBlock } from '@/components/ContactBlock'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import { HeroMosaicBackground } from '@/components/HeroMosaic'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'From inquiry to a finished file. The five-step process Emily uses to design unlimited church graphics on a monthly subscription.',
  alternates: { canonical: '/how-it-works' },
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Onboard',
    body:
      'We start with a kickoff call. I learn your church, your voice, your colors, your style, your team’s pace. By the end I have what I need to work like I’ve been on staff for years.',
  },
  {
    number: '02',
    title: 'Request',
    body:
      'You send requests through one email. One thing at a time, or a stack for the month. I ask for a one-week lead time, but same-day requests are offered if urgent.',
  },
  {
    number: '03',
    title: 'Design',
    body:
      'I design the project and can send you one idea or multiple options to choose from.',
  },
  {
    number: '04',
    title: 'Review',
    body:
      'You reply with thoughts and revisions, if you have any. We revise until it’s right. Unlimited revisions. No upcharge, no waiting on a project manager.',
  },
  {
    number: '05',
    title: 'Deliver',
    body:
      'Final files are sent to you when the project is finalized. Sized for all platforms you use.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero with the same full-bleed portfolio mosaic + right-to-left white
          gradient used on the home page. Headline sits left where the gradient
          keeps the tiles clean; per-tile color pop on hover. The hero pins
          (md:sticky) so the dark step section scrolls up over it. */}
      <div className="relative">
      <div className="relative isolate overflow-hidden md:sticky md:top-0 md:z-0">
        <div className="hidden md:block">
          <HeroMosaicBackground />
        </div>
        {/* `pointer-events-none` so the cursor reaches the mosaic tiles behind
            the headline and every tile lights up on hover (the hero has no
            interactive elements of its own). The right-to-left white gradient
            keeps the left clean where the H1 lives; the colorful mosaic fills
            the right. No portrait here, per Emily. */}
        <div className="pointer-events-none relative z-10">
          <Container className="mt-8 pb-12 sm:mt-12 sm:pb-20 lg:mt-16 lg:pb-28">
            <FadeIn>
              <h1>
                <span className="block font-display text-base font-semibold tracking-wider uppercase text-neutral-950 [text-shadow:0_0_6px_rgba(255,255,255,0.8)]">
                  How it works
                </span>
                <span className="mt-6 block max-w-3xl font-display text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4rem] lg:leading-[1.1] font-medium tracking-tight text-balance text-neutral-950 [text-shadow:0_0_6px_rgba(255,255,255,0.8)]">
                  From inquiry to a finished file, start to finish.
                </span>
              </h1>
              <div className="mt-6 max-w-2xl text-xl text-neutral-600 [text-shadow:0_0_6px_rgba(255,255,255,0.8)]">
                <p className="italic text-neutral-700">Simple and efficient.</p>
                <p className="mt-4">
                  You send me what you need. I design it. You review. I revise and send you the completed files.
                </p>
              </div>
              <div className="pointer-events-auto mt-10">
                <JoinWaitListButton source="how-it-works-hero" />
              </div>
            </FadeIn>
          </Container>
        </div>
      </div>

      {/* Dark step section rises over the pinned hero for the parallax reveal.
          It shares the parallax stage wrapper above so the sticky hero has
          scroll range to pin against. */}
      <div className="relative z-10 bg-white">
        <StepList steps={STEPS} />
      </div>
      </div>

      <SectionIntro
        eyebrow="What you get"
        title="Your remote, on call designer."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          After onboarding I’m part of your team, the same way a remote graphic designer on staff would be. Instead of a salary you pay a flat subscription. I get added to your shared drive. I learn your church brand and work with you to build your vision and create a cohesive look for all your design elements.
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <FadeIn className="rounded-3xl bg-[var(--color-cta)]/15 p-10 ring-1 ring-inset ring-[var(--color-cta)]/30">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
            See if we&rsquo;re a fit.
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-neutral-700">
            Tell me about your church. I will reply quickly about what onboarding looks like.
          </p>
        </FadeIn>
      </Container>

      <ContactBlock heading="Join the wait list." source="how-it-works">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
