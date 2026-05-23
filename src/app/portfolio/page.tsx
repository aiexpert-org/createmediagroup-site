import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import {
  portfolioCategories,
  portfolioItems,
  getPortfolioByCategory,
} from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work for churches. Sermon series art, social systems, announcements, signage, kids and youth, logos and brand systems.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <Section className="pt-16 pb-10">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className="mt-5 font-serif text-[length:var(--text-display)] leading-[1.0] tracking-tight">
              Selected work,
              <br />
              <span className="font-serif-italic">church by church.</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              A slice of {portfolioItems.length} pieces of work for churches.
              Sermon series, ministry brands, social systems, announcements,
              signage, and logos. New work lands here as it ships.
            </p>
          </div>
        </Container>
      </Section>

      {/* Sections by category - card chrome around tiles softened to rounded-lg */}
      {portfolioCategories.map((cat) => {
        const items = getPortfolioByCategory(cat.slug);
        if (items.length === 0) return null;
        return (
          <Section
            key={cat.slug}
            className="pt-2 pb-12 scroll-mt-24"
          >
            <Container>
              <div id={cat.slug} className="scroll-mt-24 flex items-baseline justify-between gap-4 border-b border-[color:var(--color-border)] pb-4">
                <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[color:var(--color-ink)]">
                  {cat.name}
                </h2>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  {items.length} pieces
                </p>
              </div>
              <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((item, idx) => (
                  <li key={`${item.file}-${idx}`}>
                    <article className="group rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] overflow-hidden transition-colors hover:border-[color:var(--color-accent)]/60">
                      <div className="relative aspect-[4/3] bg-[color:var(--color-surface)]">
                        <Image
                          src={item.file}
                          alt={`${item.title}. Designed by Emily Farmer for a church.`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                          {cat.name}
                        </p>
                        <h3 className="mt-1.5 font-serif text-lg tracking-tight text-[color:var(--color-ink)]">
                          {item.title}
                        </h3>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}

      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-10 lg:p-14 flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Looking for specifics?</Eyebrow>
              <h2 className="mt-3 font-serif text-[length:var(--text-h2)] leading-[1.1] tracking-tight">
                Tell me what you&rsquo;d like to see.
              </h2>
              <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                Happy to send specific samples. Sermon series, kids branding,
                full social systems, whatever fits what your church needs.
              </p>
            </div>
            <ButtonLink href="/contact" variant="primary" size="lg">
              Request samples
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
