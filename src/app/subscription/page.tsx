import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { ServiceJsonLd, FaqJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { Check, Sparkle } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscription + pricing",
  description: `Unlimited graphic design for churches — flat $${siteConfig.pricing.monthly.amount}/month, or $${siteConfig.pricing.annual.amount.toLocaleString()}/year (twelve for the price of eleven). Sermon series, social, signage, kids + youth, announcements, brand.`,
  alternates: { canonical: "/subscription" },
};

const subscriptionFaqs = [
  {
    q: "What does “unlimited” actually mean?",
    a: "Unlimited requests, unlimited revisions, no point system, no per-project pricing. There's a single shared queue with one designer (Emily). She works the queue one item at a time — most small requests go same week, often same day. Larger pieces like full sermon series or brand systems get the runway they need.",
  },
  {
    q: "Is there a contract?",
    a: "Month-to-month for the monthly tier — pause or cancel anytime, your files are yours. The annual prepay tier is 12 months upfront for the price of 11.",
  },
  {
    q: "What if I have a slow month?",
    a: "Pause the subscription. We don't bill you for months you're not using. Pick it back up when you ramp up again for a series, event, or busy season.",
  },
  {
    q: "What about file ownership?",
    a: "You own everything I make for you — final files, source files, Figma, brand assets. They live in a shared folder you control. If we ever part ways, you keep the library.",
  },
  {
    q: "Will I work with the same designer every time?",
    a: "Yes. That's the whole point. Emily is the designer on every request. No account managers, no rotating cast of contractors, no “let me hand this off to our specialist.”",
  },
  {
    q: "Do you do websites?",
    a: "Brand and design system work yes; full custom site builds no. I'll happily make sure your site visuals are on-brand, and I work with a few church-friendly web developers I can refer you to if you need a full rebuild.",
  },
  {
    q: "How do I send requests?",
    a: "However works for your team. Most churches use a shared Notion or Google Doc; some just text or Slack me. I'll match your pace — what matters is one place to see the queue, not a specific app.",
  },
  {
    q: "What happens if you take on too many churches?",
    a: "I don't. I cap the number of churches on subscription so that every church gets real attention. When the roster is full, new churches go on a short waitlist.",
  },
];

export default function SubscriptionPage() {
  return (
    <>
      <ServiceJsonLd />
      <FaqJsonLd items={subscriptionFaqs} />

      <Section className="pt-16 pb-12">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Subscription</Eyebrow>
            <h1 className="mt-5 font-serif text-[length:var(--text-display)] leading-[1.0] tracking-tight">
              One flat fee.
              <br />
              <span className="font-serif-italic">Everything your church needs designed.</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              No per-project pricing. No ticket points. No upsells on revisions.
              Just a flat monthly subscription and a designer who actually knows
              your church.
            </p>
          </div>
        </Container>
      </Section>

      {/* PRICING TIERS */}
      <Section className="pt-0">
        <Container>
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Monthly */}
            <article className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8 lg:p-10">
              <header className="flex items-baseline justify-between">
                <h2 className="font-serif text-3xl tracking-tight text-[color:var(--color-ink)]">
                  Monthly
                </h2>
                <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  Most flexible
                </span>
              </header>
              <p className="mt-6 font-serif text-6xl tracking-tight text-[color:var(--color-ink)]">
                ${siteConfig.pricing.monthly.amount}
                <span className="text-base text-[color:var(--color-muted)] font-sans font-normal">
                  /month
                </span>
              </p>
              <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                {siteConfig.pricing.monthly.blurb}
              </p>
              <Includes />
              <ButtonLink
                href="/contact?tier=monthly"
                variant="ink"
                size="lg"
                className="mt-8 w-full"
                withArrow
              >
                Start monthly
              </ButtonLink>
            </article>

            {/* Annual prepay */}
            <article className="relative rounded-2xl border-2 border-[color:var(--color-accent)] bg-[color:var(--color-card)] p-8 lg:p-10">
              <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-accent)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-accent-foreground)] font-semibold">
                <Sparkle className="h-3 w-3" /> Best value
              </div>
              <header className="flex items-baseline justify-between">
                <h2 className="font-serif text-3xl tracking-tight text-[color:var(--color-ink)]">
                  Annual prepay
                </h2>
                <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                  Save ${siteConfig.pricing.annual.savings}
                </span>
              </header>
              <p className="mt-6 font-serif text-6xl tracking-tight text-[color:var(--color-ink)]">
                ${siteConfig.pricing.annual.amount.toLocaleString()}
                <span className="text-base text-[color:var(--color-muted)] font-sans font-normal">
                  /year
                </span>
              </p>
              <p className="mt-1 text-sm text-[color:var(--color-accent)]">
                ~${siteConfig.pricing.annual.perMonth}/month · twelve months for
                the price of eleven
              </p>
              <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                {siteConfig.pricing.annual.blurb}
              </p>
              <Includes />
              <ButtonLink
                href="/contact?tier=annual"
                variant="primary"
                size="lg"
                className="mt-8 w-full"
                withArrow
              >
                Start annual
              </ButtonLink>
            </article>
          </div>

          <p className="mt-8 text-center text-sm text-[color:var(--color-muted)]">
            Both tiers include the same designer, the same access, the same
            turnaround. Annual saves you $800.
          </p>
        </Container>
      </Section>

      {/* SERVICES DETAIL */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Included</Eyebrow>
            <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
              Six service categories,
              <br />
              <span className="font-serif-italic">all under one subscription.</span>
            </h2>
          </div>

          <ul className="mt-12 grid sm:grid-cols-2 gap-5">
            {siteConfig.services.map((service) => (
              <li
                key={service.slug}
                id={service.slug}
                className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 scroll-mt-24"
              >
                <h3 className="font-serif text-2xl tracking-tight text-[color:var(--color-ink)]">
                  {service.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {service.blurb}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-24">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Things pastors ask.
              </h2>
              <p className="mt-5 text-[color:var(--color-ink-soft)] leading-relaxed">
                Missing something?{" "}
                <a
                  className="text-[color:var(--color-accent)] underline underline-offset-4"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  Just email me.
                </a>
              </p>
            </div>
            <ul className="space-y-6">
              {subscriptionFaqs.map((item) => (
                <li
                  key={item.q}
                  className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6"
                >
                  <h3 className="font-serif text-xl tracking-tight text-[color:var(--color-ink)]">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-[color:var(--color-ink-soft)] leading-relaxed">
                    {item.a}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-[color:var(--color-ink)] text-[color:var(--color-background)]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
              Ready to subscribe?
            </h2>
            <p className="mt-5 text-[color:var(--color-background)]/75 leading-relaxed">
              Send me a note about your church and I&rsquo;ll reply within a day.
              Onboarding usually takes a week.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
                Start the conversation
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Includes() {
  const items = [
    "One dedicated designer (Emily)",
    "Unlimited requests",
    "Unlimited revisions",
    "Same-week turnarounds (small things often same day)",
    "All six service categories included",
    "Source files + brand library",
    "Pause anytime",
  ];
  return (
    <ul className="mt-7 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-[color:var(--color-ink)]">
          <span
            aria-hidden
            className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] shrink-0"
          >
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
