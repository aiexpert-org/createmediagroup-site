import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { LinkCard } from "@/components/card";
import { ServiceJsonLd, FaqJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, Check, Sparkle } from "lucide-react";

export const metadata: Metadata = {
  title: `${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "What's the difference between Create Media Group and a design service like Penji or DesignJoy?",
    a: "Those are queues. You drop in a ticket and a different designer picks it up each time. Create Media Group is one designer — Emily — building your church's brand the way an in-house hire would. After a month she knows your sermon cadence, your pastor's voice, your kids ministry color palette, and your printer's file specs.",
  },
  {
    q: "How much does it cost?",
    a: `$800 per month, flat, with no per-project pricing. If you prepay for a year it's $8,800 — twelve months for the price of eleven.`,
  },
  {
    q: "What can I request?",
    a: "Sermon series art, weekly slides, social posts, announcements, kids and youth graphics, lobby signs, banners, business cards, full logo and brand systems, and anything else a designer would do for a church. Unlimited requests. Unlimited revisions.",
  },
  {
    q: "Where are you based?",
    a: `${siteConfig.location.city}, ${siteConfig.location.region}. We serve churches in the ${siteConfig.location.metro} metro and nationwide — most of the work is remote, and Emily becomes a part of your team the same way a remote staff designer would.`,
  },
];

export default function HomePage() {
  return (
    <>
      <ServiceJsonLd />
      <FaqJsonLd items={homeFaqs} />

      {/* HERO */}
      <Section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="max-w-4xl">
            <Eyebrow>Graphic design subscription for churches</Eyebrow>
            <h1 className="mt-5 font-serif text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.98] tracking-tight text-[color:var(--color-ink)]">
              Your church&rsquo;s designer.
              <br />
              <span className="font-serif-italic text-[color:var(--color-accent)]">
                Not a design queue.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Unlimited graphic design for pastors and churches — sermon series,
              social, signage, kids and youth, announcements, brand.{" "}
              <span className="text-[color:var(--color-ink)]">$800/month, flat.</span>{" "}
              One designer. No tickets. No per-project pricing. Essentially your
              remote staff designer.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <ButtonLink href="/subscription" variant="primary" size="lg" withArrow>
                See the subscription
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="outline" size="lg">
                How it works
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* STAT RIBBON */}
      <section className="border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        <Container className="py-8 sm:py-10">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 font-serif text-3xl sm:text-4xl tracking-tight text-[color:var(--color-ink)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* THE PROBLEM */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            <div>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                You&rsquo;re the comms team of one.
                <br />
                Or two. Or three roles in a trench coat.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              <p>
                Every Sunday a sermon series needs art. Every week the
                announcements slide needs to be on-brand. Every Tuesday the kids
                ministry has a new flyer that has to look like it came from the
                same church as last week&rsquo;s.
              </p>
              <p>
                And it all lands on one person — usually you. You&rsquo;re in
                Canva at 11 PM Saturday, the worship lead just texted you a new
                logo idea, the senior pastor wants the bulletin redesigned, and
                a parent volunteer is asking for camp shirt mockups by Friday.
              </p>
              <p>
                The two ways out have always been: hire a full-time designer
                (~$65k+/yr you don&rsquo;t have), or hire a freelancer per
                project (slow, expensive, never quite gets your voice).
              </p>
              <p className="text-[color:var(--color-ink)] font-medium">
                There&rsquo;s a third way.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* THE OFFER */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>The offer</Eyebrow>
            <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
              One designer. Flat monthly fee.
              <br />
              <span className="font-serif-italic">Essentially in-house — without the in-house hire.</span>
            </h2>
            <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
              Emily Farmer designs for your church on a flat $800/month
              subscription. She onboards once, learns your voice, your visual
              system, your team&rsquo;s pace — and then she just designs. The way
              an on-staff designer would, if you had an on-staff designer.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Unlimited requests",
                body:
                  "Send as many as you need. One designer, one queue, one round-trip — not a ticketing system.",
              },
              {
                title: "Unlimited revisions",
                body:
                  "Until it&rsquo;s right. No upcharge, no project-manager-mediated scope arguments.",
              },
              {
                title: "One dedicated designer",
                body:
                  "Emily. Every project. After a month she knows your church better than most agencies ever will.",
              },
              {
                title: "Flat monthly fee",
                body:
                  "$800/month. Predictable, budgetable, doesn&rsquo;t spike when you launch a new series or rebrand a ministry.",
              },
              {
                title: "Same-week turnarounds",
                body:
                  "Small things often same day. Sermon series and brand work get the runway they need.",
              },
              {
                title: "Pause or cancel anytime",
                body:
                  "Quiet summer? Pause. Done? Cancel. Your files are yours to keep either way.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]"
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl tracking-tight text-[color:var(--color-ink)]">
                      {feature.title}
                    </h3>
                    <p
                      className="mt-1.5 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]"
                      dangerouslySetInnerHTML={{ __html: feature.body }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section>
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>What we design</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Six categories. One subscription.
                <br />
                <span className="font-serif-italic">All of it.</span>
              </h2>
            </div>
            <Link
              href="/subscription"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hover)]"
            >
              See full pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {siteConfig.services.map((service) => (
              <li key={service.slug}>
                <article
                  id={service.slug}
                  className="h-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 transition-colors hover:border-[color:var(--color-accent)]/60"
                >
                  <h3 className="font-serif text-2xl tracking-tight text-[color:var(--color-ink)]">
                    {service.name}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                    {service.blurb}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* CASE STUDIES TEASER */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Churches we design for.
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hover)]"
            >
              All case studies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              {
                slug: "fcc-santa-maria",
                church: "First Christian Church",
                location: "Santa Maria, CA",
                blurb:
                  "From inconsistent series art to a coherent visual rhythm Sunday after Sunday.",
              },
              {
                slug: "fcf-trussville",
                church: "Faith Christian Fellowship",
                location: "Trussville, AL",
                blurb:
                  "A small-team church gets the design ops of a much larger one — without the headcount.",
              },
              {
                slug: "newspring",
                church: "NewSpring",
                location: "Multi-campus",
                blurb:
                  "Sermon series, ministry sub-brands, and event campaigns shipped weekly.",
              },
            ].map((cs) => (
              <LinkCard
                key={cs.slug}
                href={`/case-studies#${cs.slug}`}
                cta="Read the story"
                ariaLabel={`Case study: ${cs.church}`}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  {cs.location}
                </p>
                <h3 className="mt-2 font-serif text-2xl tracking-tight text-[color:var(--color-ink)]">
                  {cs.church}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {cs.blurb}
                </p>
              </LinkCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICING TEASER */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="max-w-xl">
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Two ways to subscribe.
                <br />
                <span className="font-serif-italic">Same designer. Same access.</span>
              </h2>
              <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                Prepay the year and get the twelfth month free.
              </p>
              <div className="mt-8">
                <ButtonLink href="/subscription" variant="ink" size="lg" withArrow>
                  See full pricing
                </ButtonLink>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[siteConfig.pricing.monthly, siteConfig.pricing.annual].map(
                (tier, i) => (
                  <div
                    key={tier.label}
                    className={
                      "rounded-xl border p-7 " +
                      (i === 1
                        ? "border-[color:var(--color-accent)] bg-[color:var(--color-card)] relative"
                        : "border-[color:var(--color-border)] bg-[color:var(--color-card)]")
                    }
                  >
                    {i === 1 && (
                      <div className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-[color:var(--color-accent)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-accent-foreground)] font-semibold">
                        <Sparkle className="h-3 w-3" /> Best value
                      </div>
                    )}
                    <h3 className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                      {tier.label}
                    </h3>
                    <p className="mt-3 font-serif text-4xl tracking-tight text-[color:var(--color-ink)]">
                      ${tier.amount.toLocaleString()}
                      <span className="text-base text-[color:var(--color-muted)] font-sans font-normal">
                        {tier.cadence}
                      </span>
                    </p>
                    {i === 1 && (
                      <p className="mt-1 text-sm text-[color:var(--color-accent)]">
                        ~${siteConfig.pricing.annual.perMonth}/mo · save $
                        {siteConfig.pricing.annual.savings}
                      </p>
                    )}
                    <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                      {tier.blurb}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-[color:var(--color-ink)] text-[color:var(--color-background)]">
        <Container>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <div>
              <h2 className="font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Ready for your church to look like
                <br />
                <span className="font-serif-italic">one church?</span>
              </h2>
              <p className="mt-5 text-lg text-[color:var(--color-background)]/75 leading-relaxed max-w-xl">
                Tell me about your church and what you need. I&rsquo;ll reply
                within a day with whether we&rsquo;re a fit and what onboarding
                looks like.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
                Start the conversation
              </ButtonLink>
              <ButtonLink href="/subscription" variant="ghost" size="lg" className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10">
                See the subscription
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
