import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { ContactBlock } from '@/components/ContactBlock'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
} from '@/lib/case-studies'
import { getChurchBySlug, churchLogo } from '@/lib/churches'
import { ArticleByline } from '@/components/EmilyAvatar'
import { SelectedWork } from '@/components/SelectedWork'
import { BreadcrumbJsonLd, CaseStudyJsonLd } from '@/components/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site-config'

type RouteParams = { slug: string }

export function generateStaticParams(): RouteParams[] {
  return getAllCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) return {}

  return buildMetadata({
    title: `${study.church} · Case Study`,
    description: clampDescription(study.excerpt),
    path: `/case-studies/${slug}`,
    type: 'article',
  })
}

// Keep meta descriptions in the ~155-char SERP window. Trim at a word boundary
// and add an ellipsis so longer case-study excerpts do not get cut mid-word.
function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).trim()}…`
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<RouteParams>
}) {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) notFound()

  const church = getChurchBySlug(slug)

  return (
    <>
      <CaseStudyJsonLd
        church={study.church}
        excerpt={study.excerpt}
        slug={slug}
        location={study.location}
        image={study.image || undefined}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' },
          { name: study.church, path: `/case-studies/${slug}` },
        ]}
      />
      <Container className="mt-12 sm:mt-20">
        <FadeIn className="mx-auto max-w-3xl">
          <p className="text-sm text-neutral-500">
            <Link
              href="/case-studies"
              className="underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
            >
              Case Studies
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{study.location}</span>
          </p>
          <h1 className="mt-4 font-display text-[2.25rem] leading-[1.05] font-medium tracking-tight text-balance text-neutral-950 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            {study.church}
          </h1>
          <p className="mt-6 text-xl text-neutral-600">{study.excerpt}</p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <dt className="font-semibold uppercase tracking-wider text-neutral-500">
                Location
              </dt>
              <dd className="mt-1 text-neutral-900">{study.location}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wider text-neutral-500">
                Engagement
              </dt>
              <dd className="mt-1 text-neutral-900">{study.engagement}</dd>
            </div>
            {church?.url ? (
              <div>
                <dt className="font-semibold uppercase tracking-wider text-neutral-500">
                  Website
                </dt>
                <dd className="mt-1">
                  <a
                    href={church.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
                  >
                    Visit site
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
          <ArticleByline className="mt-8" trailing={<> in {siteConfig.city}, {siteConfig.state}</>} />
          <div className="mt-8">
            <JoinWaitListButton source={`case-study:${slug}`} />
          </div>
        </FadeIn>
      </Container>

      <Container className="mt-12">
        <FadeIn className="mx-auto max-w-4xl">
          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-3xl bg-neutral-950 ring-1 ring-neutral-900/5">
            {/* White logo variant on the black hero panel so it stays visible
                (the black variant would vanish into the background). */}
            <div className="relative h-1/2 w-2/3">
              <Image
                src={churchLogo(study.slug, 'white')}
                alt={`${study.church} logo`}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </FadeIn>
      </Container>

      <Container className="mt-12 sm:mt-16">
        <FadeIn className="mx-auto max-w-3xl">
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: study.contentHtml }}
          />
        </FadeIn>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <SelectedWork slug={slug} church={study.church} />
      </Container>

      <Container className="mt-16">
        <FadeIn className="mx-auto max-w-3xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-base font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
          >
            <span aria-hidden="true">&larr;</span>
            Back to all case studies
          </Link>
        </FadeIn>
      </Container>

      <ContactBlock
        heading="Join the wait list."
        source={`case-study:${slug}`}
      >
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
