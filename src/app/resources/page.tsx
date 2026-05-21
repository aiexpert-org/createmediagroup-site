import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { getAllResourcesMeta } from "@/lib/resources";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Articles, lessons, and training on church design. Sermon series art, brand consistency, comms director burnout, subscription versus freelance.",
  alternates: { canonical: "/resources" },
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResourcesIndexPage() {
  const posts = getAllResourcesMeta();
  return (
    <>
      <Section className="pt-16 pb-10">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Resources</Eyebrow>
            <h1 className="mt-5 font-serif text-[length:var(--text-display)] leading-[1.0] tracking-tight">
              Notes on church design
              <br />
              <span className="font-serif-italic">from inside the work.</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Articles, lessons, and training for church communications teams.
              Sermon series art, brand consistency, comms director burnout,
              subscription versus freelance. What I&rsquo;m learning across the
              churches I design for.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 pb-20">
        <Container>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/resources/${post.slug}`}
                  className="group block h-full rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] overflow-hidden transition-colors hover:border-[color:var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]"
                >
                  {post.image && (
                    <div className="relative aspect-[16/9] bg-[color:var(--color-surface)]">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-7">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>·</span>
                      <span>{post.readTime} min</span>
                    </div>
                    <h2 className="mt-3 font-serif text-2xl tracking-tight text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[color:var(--color-surface)] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-[color:var(--color-muted)]">
            More resources landing weekly.
          </p>
        </Container>
      </Section>

      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="rounded-2xl bg-[color:var(--color-ink)] text-[color:var(--color-background)] p-10 lg:p-14 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <h2 className="font-serif text-[length:var(--text-h2)] leading-[1.1] tracking-tight">
                Want this stuff in your inbox?
              </h2>
              <p className="mt-4 text-[color:var(--color-background)]/75 leading-relaxed max-w-xl">
                I send a short note every couple of weeks with one observation
                from the design work I&rsquo;m doing for churches. No pitch, no
                upsell.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <ButtonLink
                href={`mailto:${siteConfig.contact.email}?subject=Add me to the resources list`}
                variant="primary"
                size="lg"
                withArrow
              >
                Subscribe
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
