import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Border } from '@/components/Border'
import { ContactBlock } from '@/components/ContactBlock'
import { getAllPosts, formatPostDate } from '@/lib/blog'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Resources',
  description:
    'Notes from Emily Farmer on church design, brand consistency, comms team workflows, and the subscription model.',
  path: '/resources',
})

export default async function ResourcesPage() {
  const posts = await getAllPosts()

  return (
    <>
      <PageIntro eyebrow="Resources" title="Notes from the design desk.">
        <p>
          Quick reads on church branding, comms team workflows, and why sermon series art compounds over time. Written from where the work actually happens, here in Indianapolis.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32">
        <div className="space-y-16 lg:space-y-20">
          {posts.length === 0 && (
            <p className="text-base text-neutral-600">
              New articles are on the way. Check back soon.
            </p>
          )}

          {posts.map((post) => (
            <FadeIn key={post.slug}>
              <article>
                <Border className="pt-10">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                    {post.image ? (
                      <Link
                        href={`/resources/${post.slug}`}
                        className="block lg:col-span-1"
                        aria-label={`Read ${post.title}`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-900/5">
                          <Image
                            src={post.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 33vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    ) : null}
                    <div className={post.image ? 'lg:col-span-2' : 'lg:col-span-3'}>
                      <p className="text-sm text-neutral-500">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        <span aria-hidden="true"> &middot; </span>
                        {post.readTimeMinutes} min read
                      </p>
                      <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                        <Link href={`/resources/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-4 text-base leading-7 text-neutral-600">
                        {post.description}
                      </p>
                      <Link
                        href={`/resources/${post.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
                      >
                        Read the article
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16">
          <p className="text-sm text-neutral-500">
            <Link
              href="/resources/feed.xml"
              className="underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
            >
              Subscribe via RSS
            </Link>
          </p>
        </FadeIn>
      </Container>

      <ContactBlock heading="Join the wait list." source="resources-index">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
