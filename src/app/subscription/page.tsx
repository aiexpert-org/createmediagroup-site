import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { ServiceJsonLd, FaqJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Subscription and pricing",
  description: `Unlimited graphic design for churches. Flat $${siteConfig.pricing.monthly.amount} a month, or $${siteConfig.pricing.annual.amount.toLocaleString()} a year (save almost $2,000). Sermon series, social, signage, kids and youth, announcements, brand.`,
  alternates: { canonical: "/subscription" },
};

const subscriptionFaqs = [
  {
    q: "What does “unlimited” actually mean?",
    a: "Unlimited requests, unlimited revisions, no point system, no per-project pricing. There's a single shared queue with one designer (Emily). She works the queue one item at a time. Most small requests go same week, often same day. Same-day rush is available when you flag the urgency. Larger pieces like full sermon series or brand systems get the runway they need.",
  },
  {
    q: "Is there a contract?",
    a: "Month-to-month for the monthly tier. Pause or cancel anytime. Your files are yours. The annual prepay tier is 12 months upfront and saves you almost $2,000.",
  },
  {
    q: "What if I have a slow month?",
    a: "Pause the subscription. We don't bill you for months you're not using. Pick it back up when you ramp up again for a series, event, or busy season.",
  },
  {
    q: "What about file ownership?",
    a: "You own everything I make for you. Final files, source files, Figma, brand assets. They live in a shared folder you control. If we ever part ways, you keep the library.",
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
    a: "However works for your team. Most churches use a shared Notion or Google Doc. Some just text or Slack me. I'll match your pace. What matters is having one place to see the queue. The app is up to you.",
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
            <h1 className="font-serif font-normal text-[44px] md:text-[64px] leading-[1.06] tracking-[-0.02em] text-[color:var(--color-ink)] text-balance max-w-[18ch]">
              One flat fee. Everything your church needs designed.
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              No per-project pricing. No ticket points. No upsells on revisions.
              Just a flat monthly subscription and a designer who actually knows
              your church.
            </p>
          </div>
        </Container>
      </Section>

      {/* PRICING TIERS - Sparkle badge dropped, rounded-lg, withArrow removed */}
      <Section className="pt-0">
        <Container>
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Monthly */}
            <article className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8 lg:p-10">
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
              >
                Start monthly
              </ButtonLink>
            </article>

            {/* Annual prepay */}
            <article className="rounded-lg border-2 border-[color:var(--color-accent)] bg-[color:var(--color-card)] p-8 lg:p-10">
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
                ~${siteConfig.pricing.annual.perMonth} a month. Save almost
                $2,000 on the year.
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
              >
                Start annual
              </ButtonLink>
            </article>
          </div>

          <p className="mt-8 text-center text-sm text-[color:var(--color-muted)]">
            Both tiers include the same designer, the same access, the same
            turnaround. Annual saves you almost $2,000.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="font-serif text-2xl md:text-3xl leading-[1.3] text-[color:var(--color-ink)]">
              I only work for a few churches at the same time. That&rsquo;s how
              I can get things back to you same day, and that&rsquo;s why
              you&rsquo;ll never wait behind a queue. When you send me a
              project, I&rsquo;m the one designing it. The files are yours to
              keep, and they will never be shared with any other church.
            </p>
          </div>
        </Container>
      </Section>

      {/* SERVICES DETAIL - card chrome stripped, rule-divided */}
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

          <ul className="mt-12 grid sm:grid-cols-2 gap-x-10">
            {siteConfig.services.map((service) => (
              <li
                key={service.slug}
                id={service.slug}
                className="border-t border-[color:var(--color-border)] py-6 scroll-mt-24"
              >
                <h3 className="font-serif text-2xl tracking-tight text-[color:var(--color-ink)]">
                  {service.name}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
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
            <ul className="divide-y divide-[color:var(--color-border)]">
              {subscriptionFaqs.map((item) => (
                <li
                  key={item.q}
                  className="py-6"
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

      {/* FINAL CTA - dark block deleted, replaced with cream-substrate quiet close */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Next step</Eyebrow>
            <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight text-[color:var(--color-ink)]">
              Start the conversation.
            </h2>
            <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              Send me a note about your church and I&rsquo;ll reply within a
              day. Onboarding usually takes a week.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="primary" size="lg">
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
    "Same-day rush available",
    "All six service categories included",
    "Source files and brand library",
    "Pause anytime",
  ];
  return (
    <ul className="mt-7 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="text-sm text-[color:var(--color-ink)] leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}
