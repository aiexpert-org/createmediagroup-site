import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { ResourceArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import {
  getAllResourceSlugs,
  getResourceBySlug,
  getAllResourcesMeta,
} from "@/lib/resources";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getResourceBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: `/resources/${slug}` },
      openGraph: {
        type: "article",
        title: post.title,
        description: post.description,
        url: `${siteConfig.url}/resources/${slug}`,
        publishedTime: post.date,
      },
    };
  } catch {
    return { title: "Not found" };
  }
}

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = await getResourceBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  const all = getAllResourcesMeta();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = idx > 0 ? all[idx - 1] : undefined;
  const prev = idx < all.length - 1 ? all[idx + 1] : undefined;

  return (
    <>
      <ResourceArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        datePublished={post.date}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: post.title, url: `/resources/${post.slug}` },
        ]}
      />

      <Section className="pt-16 pb-8">
        <Container>
          <article className="max-w-3xl mx-auto">
            <Link
              href="/resources"
              className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)]"
            >
              ← Resources
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">/</span>
              <span>{post.readTime} min read</span>
              {post.tags.length > 0 && (
                <>
                  <span aria-hidden="true">/</span>
                  <span className="text-[color:var(--color-accent)]">{post.tags.join(", ")}</span>
                </>
              )}
            </div>
            <h1 className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)]">
              {post.title}
            </h1>
            <p className="mt-6 text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              {post.description}
            </p>
          </article>

          {post.image && (
            <figure className="mt-10 max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                <Image
                  src={post.image}
                  alt={`Featured design work for ${post.title}.`}
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </figure>
          )}
        </Container>
      </Section>

      <Section className="pt-4 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="mt-16 border-t border-[color:var(--color-border)] pt-8">
              <p className="font-serif-italic text-[color:var(--color-ink-soft)] leading-relaxed">
                {siteConfig.shortDescription} Written by {siteConfig.owner.name}.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/subscription" variant="primary" size="md">
                  See the subscription
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="md">
                  Talk to Emily
                </ButtonLink>
              </div>
            </div>

            <nav
              aria-label="More resources"
              className="mt-16 grid sm:grid-cols-2 gap-4"
            >
              {prev ? (
                <Link
                  href={`/resources/${prev.slug}`}
                  className="block border-t border-[color:var(--color-border)] pt-5 hover:text-[color:var(--color-accent)] transition-colors"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                    Previous
                  </p>
                  <p className="mt-2 font-serif text-lg tracking-tight text-[color:var(--color-ink)]">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/resources/${next.slug}`}
                  className="block border-t border-[color:var(--color-border)] pt-5 hover:text-[color:var(--color-accent)] transition-colors text-right"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                    Next
                  </p>
                  <p className="mt-2 font-serif text-lg tracking-tight text-[color:var(--color-ink)]">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>
        </Container>
      </Section>
    </>
  );
}
