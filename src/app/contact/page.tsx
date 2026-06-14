import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { WaitListForm } from '@/components/WaitListForm'
import { EmilyPortrait } from '@/components/EmilyAvatar'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Join the wait list',
  description:
    'Emily takes on a small number of new churches each quarter. Join the Create Church Media wait list and she will reach out by email when a spot opens.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Wait list" title="Join the wait list.">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your
          church name and email here, and Emily will reach out when a spot opens.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <FadeIn>
            <WaitListForm />
          </FadeIn>

          <FadeIn>
            <div className="mb-10 max-w-md">
              <EmilyPortrait width={440} />
              <div className="mt-5 rounded-2xl bg-neutral-50 p-5 ring-1 ring-inset ring-neutral-900/5">
                <p className="text-base text-neutral-700">
                  This is who reads every signup. Emily will reach out personally
                  by email when a spot opens.
                </p>
              </div>
            </div>

            <h2 className="font-display text-base font-semibold text-neutral-950">
              How it works
            </h2>
            <p className="mt-6 text-base text-neutral-600">
              Spots open as Emily&rsquo;s schedule allows. When one does, she
              emails you personally to talk through your church, your design
              needs, and what onboarding looks like. No automated sequences, no
              sales calls you did not ask for.
            </p>

            <Border className="mt-10 pt-10">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                Prefer email?
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                You can also reach Emily directly at{' '}
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
                >
                  {siteConfig.email}
                </Link>
                .
              </p>
            </Border>

            <Border className="mt-10 pt-10">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                The offer
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                Unlimited church graphic design on a flat ${siteConfig.pricing.monthly} a
                month subscription. One designer, unlimited requests and
                revisions, every file yours to keep.
              </p>
            </Border>
          </FadeIn>
        </div>
      </Container>
    </>
  )
}
