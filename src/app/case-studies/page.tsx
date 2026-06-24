import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { getAllCaseStudies } from '@/lib/case-studies'
import { churchLogo } from '@/lib/churches'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies',
  description:
    'Churches across the country Emily Farmer has designed for. Sermon series art, branding, social media, announcements and signage, week after week.',
  path: '/case-studies',
})

export default async function CaseStudiesPage() {
  const studies = await getAllCaseStudies()

  return (
    <>
      <PageIntro eyebrow="Case Studies" title="Churches Emily has designed for.">
        <p>
          A growing set of churches across the country who trust Emily with their visual identity. Each one is a work in progress as the full archive is added, but the partnership is real.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-24">
        <FadeInStagger faster>
          <ul
            role="list"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {studies.map((study) => (
              <FadeIn as="li" key={study.slug} scaleIn>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-neutral-900/5 transition hover:ring-neutral-900/15 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                >
                  {/* Dark card: logos render in WHITE and cross-fade to brand
                      yellow on hover (same treatment as the home trust marquee),
                      so they stay highly visible against the black panel rather
                      than disappearing as a black-on-black variant. */}
                  <div className="relative aspect-[16/10] bg-neutral-950">
                    <Image
                      src={churchLogo(study.slug, 'white')}
                      alt={`${study.church} logo`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-contain p-10 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-0"
                    />
                    <Image
                      src={churchLogo(study.slug, 'yellow')}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-contain p-10 opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
                      <span>{study.location}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{study.engagement}</span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-neutral-950">
                      {study.church}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">
                      {study.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                      Read the case study
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>

      <ContactBlock heading="Join the wait list." source="case-studies-index">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
