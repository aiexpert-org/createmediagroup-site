import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StepList, type Step } from '@/components/StepList'
import { ContactBlock } from '@/components/ContactBlock'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'From inquiry to a finished file. The five-step process Emily uses to design unlimited church graphics on a monthly subscription.',
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
      <PageIntro eyebrow="How it works" title="From inquiry to a finished file, start to finish.">
        <p className="italic text-neutral-700">Simple and efficient.</p>
        <p className="mt-4">
          You send me what you need. I design it. You review. I revise and send you the completed files.
        </p>
      </PageIntro>

      <StepList steps={STEPS} />

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

      <ContactBlock heading="Join the wait list.">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
