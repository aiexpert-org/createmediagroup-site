import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Selected churches on the Create subscription, and what changed in their visual layer after they brought a designer inside.",
  alternates: { canonical: "/case-studies" },
  // Temporary noindex while we confirm written permission from each named
  // church. Remove this block once Emily and Brett have confirmed permissions
  // and the placeholder language has been replaced with the cleared write-ups.
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

const caseStudies = [
  {
    slug: "fcc-santa-maria",
    church: "First Christian Church",
    location: "Santa Maria, California",
    headline: "From inconsistent series art to a coherent visual rhythm.",
    body: [
      "First Christian Church had what most mid-sized churches have. A long history, a passionate volunteer base, and a brand that drifted a little further each year as different people made different graphics with different fonts.",
      "Sermon series art looked like it came from three different churches. The kids ministry palette had nothing to do with the main brand. The bulletin was set in a font no one could remember choosing. None of it was bad. It just wasn't talking to itself.",
      "We started with an onboarding pass to lock down the visual system. Typeface stack, color foundation, a sermon-series template language, and a kids sub-brand that was clearly its own thing while still belonging to FCC. From there it became a weekly rhythm. Series art, slides, social cutdowns, event flyers. Same designer, same standards, week after week.",
    ],
    metrics: [
      { label: "Months on subscription", value: "12+" },
      { label: "Sermon series shipped", value: "9" },
      { label: "Sub-brand systems built", value: "2" },
    ],
    note: "Case study expanded narrative pending client permission.",
  },
  {
    slug: "fcf-trussville",
    church: "Faith Christian Fellowship",
    location: "Trussville, Alabama",
    headline: "Small-team church, large-church design ops.",
    body: [
      "FCF Trussville is the kind of church that punches above its size. A lean staff, a creative pastor, a worship leader who designs better than most pastors will admit. They didn't need a designer to be “a designer.” They needed someone to take the weekly drag off the comms team and leave bandwidth for the ministry work.",
      "What that looked like in practice. A sermon series system that anyone on staff could plug a title into and get on-brand graphics from. A kids ministry sub-brand. A summer camp campaign that ran across web, social, signage, and merch. Lobby signs. Event posters. Whatever the week needed.",
      "Six months in, the comms director said the thing every comms director eventually says. “I forgot what it felt like to not be doing this in Canva on Saturday night.”",
    ],
    metrics: [
      { label: "Months on subscription", value: "10+" },
      { label: "Event campaigns shipped", value: "6" },
      { label: "Bulletin templates standardized", value: "3" },
    ],
    note: "Case study expanded narrative pending client permission.",
  },
  {
    slug: "newspring",
    church: "NewSpring",
    location: "Multi-campus",
    headline: "Sermon series, ministry sub-brands, event campaigns shipped every week.",
    body: [
      "NewSpring runs at a velocity most churches don't. Multiple campuses, multiple ministries, sermon series stacking on top of event campaigns stacking on top of seasonal pushes. The kind of cadence that breaks a typical freelance arrangement and overwhelms a small in-house team.",
      "The subscription model fit because the volume was steady. Series art every few weeks. Social cutdowns every week. Ministry sub-brands as they launched. Event campaigns ramping up months in advance.",
      "The win wasn't any one piece. It was the fact that every piece, across multiple campuses and ministries, started to feel like it came from one church. Which it did.",
    ],
    metrics: [
      { label: "Months on subscription", value: "14+" },
      { label: "Sermon series shipped", value: "12+" },
      { label: "Sub-brand systems built", value: "4" },
    ],
    note: "Case study expanded narrative pending client permission.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Section className="pt-16 pb-12">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Case studies</Eyebrow>
            <h1 className="mt-5 font-serif text-[length:var(--text-display)] leading-[1.0] tracking-tight">
              Three churches.
              <br />
              <span className="font-serif-italic">One designer.</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              A snapshot of churches Emily designs for on subscription. What
              changed in their visual layer once they brought a designer inside
              the room.
            </p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">
              Expanded write-ups, real metrics, and screenshot galleries are
              landing as each church confirms permissions to publish.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 pb-16">
        <Container>
          <div className="space-y-12 lg:space-y-16">
            {caseStudies.map((cs) => (
              <article
                key={cs.slug}
                id={cs.slug}
                className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8 lg:p-12 scroll-mt-24"
              >
                <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
                  <header>
                    <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                      {cs.location}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl lg:text-4xl tracking-tight text-[color:var(--color-ink)]">
                      {cs.church}
                    </h2>
                    <dl className="mt-8 space-y-4">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                            {m.label}
                          </dt>
                          <dd className="mt-1 font-serif text-2xl tracking-tight text-[color:var(--color-ink)]">
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </header>

                  <div>
                    <p className="font-serif text-2xl lg:text-3xl tracking-tight text-[color:var(--color-ink)] leading-[1.2]">
                      &ldquo;{cs.headline}&rdquo;
                    </p>
                    <div className="mt-6 space-y-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                      {cs.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <p className="mt-8 text-xs italic text-[color:var(--color-muted)]">
                      {cs.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="rounded-lg bg-[color:var(--color-ink)] text-[color:var(--color-background)] p-10 lg:p-14 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <h2 className="font-serif text-[length:var(--text-h2)] leading-[1.1] tracking-tight">
                Want yours on this page next year?
              </h2>
              <p className="mt-4 text-[color:var(--color-background)]/75 leading-relaxed max-w-xl">
                The shortest path from &ldquo;our brand is everywhere&rdquo; to
                &ldquo;our brand is one thing&rdquo; is a designer who actually
                knows your church. That&rsquo;s the offer.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Talk to Emily
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
