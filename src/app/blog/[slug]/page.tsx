import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import {
  getAllPostSlugs,
  getPostBySlug,
  getAllPostsMeta,
} from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        type: "article",
        title: post.title,
        description: post.description,
        url: `${siteConfig.url}/blog/${slug}`,
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  const all = getAllPostsMeta();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = idx > 0 ? all[idx - 1] : undefined;
  const prev = idx < all.length - 1 ? all[idx + 1] : undefined;

  return (
    <>
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        datePublished={post.date}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Journal", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <Section className="pt-16 pb-8">
        <Container>
          <article className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)]"
            >
              ← Journal
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readTime} min read</span>
              {post.tags.map((tag) => (
                <span key={tag} className="text-[color:var(--color-accent)]">
                  · {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)]">
              {post.title}
            </h1>
            <p className="mt-6 text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              {post.description}
            </p>
          </article>
        </Container>
      </Section>

      <Section className="pt-4 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="mt-16 rounded-2xl border border-[color:var(--color-accent)]/40 bg-[color:var(--color-card)] p-8">
              <Eyebrow>About Create Media Group</Eyebrow>
              <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                {siteConfig.shortDescription} Written by {siteConfig.owner.name}
                , founder and lead designer.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/subscription" variant="primary" size="md" withArrow>
                  See the subscription
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="md">
                  Talk to Emily
                </ButtonLink>
              </div>
            </div>

            <nav
              aria-label="More posts"
              className="mt-16 grid sm:grid-cols-2 gap-4"
            >
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 hover:border-[color:var(--color-accent)] transition-colors"
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
                  href={`/blog/${next.slug}`}
                  className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 hover:border-[color:var(--color-accent)] transition-colors text-right"
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
