import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { ContactBlock } from '@/components/ContactBlock'
import { ArticleJsonLd, FaqJsonLd } from '@/components/JsonLd'
import { ArticleByline } from '@/components/EmilyAvatar'
import {
  getAllPostSlugs,
  getPostBySlug,
  formatPostDate,
} from '@/lib/blog'
import { siteConfig } from '@/lib/site-config'

type RouteParams = { slug: string }

export function generateStaticParams(): RouteParams[] {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const url = `${siteConfig.url}/resources/${slug}`
  const image = post.image ? `${siteConfig.url}${post.image}` : undefined

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.brand,
      publishedTime: post.date,
      authors: [siteConfig.designer],
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<RouteParams>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        date={post.date}
        image={post.image}
      />
      {post.faqs && post.faqs.length > 0 ? <FaqJsonLd faqs={post.faqs} /> : null}

      <Container className="mt-12 sm:mt-20">
        <FadeIn className="mx-auto max-w-3xl">
          <p className="text-sm text-neutral-500">
            <Link
              href="/resources"
              className="underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
            >
              Resources
            </Link>
            <span aria-hidden="true"> / </span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true"> &middot; </span>
            {post.readTimeMinutes} min read
          </p>
          <h1 className="mt-4 font-display text-[2.25rem] leading-[1.05] font-medium tracking-tight text-balance text-neutral-950 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-6 text-xl text-neutral-600">{post.description}</p>
          <ArticleByline
            className="mt-6"
            trailing={
              <>
                {' '}in {siteConfig.city}, {siteConfig.state}
                {siteConfig.googleBusinessUrl ? (
                  <>
                    {' '}
                    <span aria-hidden="true">&middot;</span>{' '}
                    <a
                      href={siteConfig.googleBusinessUrl}
                      className="underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google
                    </a>
                  </>
                ) : null}
              </>
            }
          />
        </FadeIn>
      </Container>

      {post.image ? (
        <Container className="mt-12">
          <FadeIn className="mx-auto max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-neutral-900/5">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </Container>
      ) : null}

      {post.tldr ? (
        <Container className="mt-12">
          <FadeIn className="mx-auto max-w-3xl">
            <Border className="pt-8">
              <p className="text-sm font-semibold tracking-wider uppercase text-neutral-500">
                TL;DR
              </p>
              <p className="mt-3 text-lg leading-8 text-neutral-800">{post.tldr}</p>
            </Border>
          </FadeIn>
        </Container>
      ) : null}

      <Container className="mt-12 sm:mt-16">
        <FadeIn className="mx-auto max-w-3xl">
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </FadeIn>
      </Container>

      {post.faqs && post.faqs.length > 0 ? (
        <Container className="mt-16 sm:mt-20">
          <FadeIn className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950">
              Frequently asked
            </h2>
            <dl className="mt-8 space-y-8">
              {post.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-display text-xl font-semibold tracking-tight text-neutral-950">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-neutral-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </Container>
      ) : null}

      <Container className="mt-16">
        <FadeIn className="mx-auto max-w-3xl">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-base font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
          >
            <span aria-hidden="true">&larr;</span>
            Back to all resources
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
