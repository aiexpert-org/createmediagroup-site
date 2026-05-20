import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work for churches across the U.S. — sermon series, ministry brands, social systems, and signage. Updated regularly.",
  alternates: { canonical: "/portfolio" },
};

const portfolioCategories = [
  { name: "Sermon series", count: 24 },
  { name: "Brand identity", count: 8 },
  { name: "Social systems", count: 16 },
  { name: "Kids + youth", count: 12 },
  { name: "Signage + print", count: 11 },
  { name: "Event campaigns", count: 9 },
];

const portfolioItems = [
  { title: "Built on the Rock", church: "First Christian Church", category: "Sermon series" },
  { title: "Anchored Kids", church: "Faith Christian Fellowship", category: "Kids + youth" },
  { title: "Made New", church: "NewSpring", category: "Sermon series" },
  { title: "Summer Camp '25", church: "Faith Christian Fellowship", category: "Event campaigns" },
  { title: "Brand refresh", church: "First Christian Church", category: "Brand identity" },
  { title: "Social system v2", church: "NewSpring", category: "Social systems" },
  { title: "Lobby signage", church: "First Christian Church", category: "Signage + print" },
  { title: "Advent series", church: "Faith Christian Fellowship", category: "Sermon series" },
  { title: "Volunteer recruitment", church: "NewSpring", category: "Social systems" },
];

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
              A small slice of work for churches across the U.S. — sermon series,
              ministry brands, social systems, signage. Polished case-study pages
              and full sets of files are landing here weekly.
            </p>
          </div>
        </Container>
      </Section>

      {/* Category filter strip */}
      <Section className="pt-0 pb-8">
        <Container>
          <div className="flex flex-wrap gap-2.5">
            {[{ name: "All work", count: portfolioItems.length }, ...portfolioCategories].map((cat) => (
              <span
                key={cat.name}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-4 py-2 text-sm text-[color:var(--color-ink)]"
              >
                {cat.name}
                <span className="text-[color:var(--color-muted)] text-xs">
                  {cat.count}
                </span>
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Portfolio grid — placeholder tiles, asset extraction in progress */}
      <Section className="pt-0 pb-16">
        <Container>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolioItems.map((item, idx) => (
              <li key={`${item.title}-${idx}`}>
                <article className="group rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] overflow-hidden transition-colors hover:border-[color:var(--color-accent)]/60">
                  <PortfolioTile idx={idx} />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                      {item.category}
                    </p>
                    <h2 className="mt-1.5 font-serif text-xl tracking-tight text-[color:var(--color-ink)]">
                      {item.title}
                    </h2>
                    <p className="mt-0.5 text-sm text-[color:var(--color-ink-soft)]">
                      {item.church}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center text-sm text-[color:var(--color-muted)]">
            More work landing as case study pages roll out.
          </div>
        </Container>
      </Section>

      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-10 lg:p-14 flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Looking for specifics?</Eyebrow>
              <h2 className="mt-3 font-serif text-[length:var(--text-h2)] leading-[1.1] tracking-tight">
                Tell me what you&rsquo;d like to see.
              </h2>
              <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                Happy to send specific samples — sermon series, kids branding,
                full social systems — based on what your church needs.
              </p>
            </div>
            <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
              Request samples
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* A few warm placeholder tile treatments while real images get extracted. */
function PortfolioTile({ idx }: { idx: number }) {
  const palettes = [
    { bg: "#b85c38", fg: "#faf7f2", label: "CMG" },
    { bg: "#1a1916", fg: "#faf7f2", label: "CMG" },
    { bg: "#5a6b4d", fg: "#faf7f2", label: "CMG" },
    { bg: "#f3eee4", fg: "#1a1916", label: "CMG" },
    { bg: "#c98b5b", fg: "#faf7f2", label: "CMG" },
    { bg: "#2c2b27", fg: "#f5d9cb", label: "CMG" },
  ];
  const p = palettes[idx % palettes.length];
  return (
    <div
      className="aspect-[4/3] flex items-center justify-center text-3xl font-serif tracking-tight"
      style={{ background: p.bg, color: p.fg }}
      aria-label="Portfolio piece placeholder"
    >
      <span className="font-serif-italic opacity-90">{p.label}</span>
    </div>
  );
}
