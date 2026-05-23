import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { LinkCard } from "@/components/card";
import { ServiceJsonLd, FaqJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "What's the difference between Create Media Group and a service like Penji or DesignJoy?",
    a: "Those are queues. You drop in a ticket and a different designer picks it up each time. Create Media Group is one designer (Emily) building your church's brand the way an in-house hire would. After a month she knows your sermon cadence, your pastor's voice, your kids ministry color palette, and your printer's file specs.",
  },
  {
    q: "How much does it cost?",
    a: `$800 a month, flat, with no per-project pricing. If you prepay for a year it's $8,800, which is twelve months for the price of eleven.`,
  },
  {
    q: "What can I request?",
    a: "Sermon series art, weekly slides, social posts, announcements, kids and youth graphics, lobby signs, banners, business cards, full logo and brand systems, and anything else a designer would do for a church. Unlimited requests. Unlimited revisions.",
  },
  {
    q: "Where are you based?",
    a: `${siteConfig.location.city}, ${siteConfig.location.region}. We serve churches in the ${siteConfig.location.metro} metro and nationwide. Most of the work is remote, and Emily becomes part of your team the same way a remote staff designer would.`,
  },
];

export default function HomePage() {
  return (
    <>
      <ServiceJsonLd />
      <FaqJsonLd items={homeFaqs} />

      {/* HERO - 5/7 two-column. Text left, still-life right. Emily-headshot as the CTA's visual signature. */}
      {/* Per brand-direction memo Section 6. Bridge fallback: three existing portfolio JPGs composed as a triptych. */}
      {/* TODO: replace right-column composition with a photographed still-life of three real Emily artifacts */}
      {/*       (sermon-series poster, folded bulletin on a pew, iPhone showing a social tile) per Section 6. */}
      <Section className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN: 5/12 — text */}
            <div className="lg:col-span-5">
              <h1 className="font-serif font-normal text-[44px] md:text-[80px] leading-[1.06] tracking-[-0.02em] text-[color:var(--color-ink)] text-balance max-w-[14ch]">
                Unlimited graphic design for pastors and churches.
              </h1>
              {/* Voice corpus Translation 2. Overrides the DECISIONS-locked subhead. */}
              {/* Locked version was: "Your churchs design team, on a monthly subscription. Same-day rush available." */}
              {/* Brett to confirm: keep voiced version below, or revert to locked. */}
              <p className="mt-7 text-xl leading-[1.55] text-[color:var(--color-ink)]/80 max-w-[44ch]">
                I&rsquo;m Emily. I do unlimited graphic design for churches on
                a monthly subscription. Same-day rush is part of it.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Primary CTA — the one visual signature: Emily's headshot as a 36px round avatar */}
                {/*  on the leading edge. Hand-rolled here instead of ButtonLink to keep the avatar slot */}
                {/*  scoped to the home hero only (per brand memo Section 5). */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-lg bg-[color:var(--color-accent)] pl-2 pr-7 h-14 text-base font-medium text-[color:var(--color-accent-foreground)] hover:bg-[color:var(--color-accent-hover)] transition-colors"
                >
                  <Image
                    src="/about/emily-headshot.webp"
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full object-cover h-9 w-9"
                  />
                  Book a call with Emily.
                </Link>
                {/* Tertiary CTA — underlined text, letterpress-feel link treatment */}
                <Link
                  href="/portfolio"
                  className="text-base font-medium text-[color:var(--color-ink)] underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4 hover:decoration-[color:var(--color-ink)] transition-colors"
                >
                  See the work
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: 7/12 — still-life triptych of three real Emily portfolio pieces. */}
            {/* Bridge fallback per Section 6: three existing JPGs from /public/portfolio composed with shadows + slight rotation. */}
            <div className="lg:col-span-7">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:pl-8">
                {/* Primary artifact: sermon-series poster, large vertical */}
                <div className="relative aspect-[3/4] overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[0_24px_48px_-18px_rgba(26,25,22,0.22)]">
                  <Image
                    src="/portfolio/sermon-malachi.webp"
                    alt="Malachi sermon-series poster designed by Emily Farmer for a church."
                    fill
                    sizes="(min-width: 1024px) 40vw, 80vw"
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Secondary artifact: announcement card, top-right, slight clockwise tilt */}
                <div className="absolute -top-6 -right-2 sm:-right-4 lg:-right-6 w-[40%] aspect-[4/5] overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[0_18px_36px_-12px_rgba(26,25,22,0.22)] rotate-[3deg]">
                  <Image
                    src="/portfolio/announcements-baptism.webp"
                    alt="Baptism announcement graphic designed by Emily Farmer."
                    fill
                    sizes="(min-width: 1024px) 18vw, 35vw"
                    className="object-cover"
                  />
                </div>
                {/* Tertiary artifact: social tile, bottom-left, slight counter-clockwise tilt */}
                <div className="absolute -bottom-8 -left-2 sm:-left-4 lg:-left-6 w-[38%] aspect-square overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[0_18px_36px_-12px_rgba(26,25,22,0.22)] -rotate-[4deg]">
                  <Image
                    src="/portfolio/social-summer-sundays.webp"
                    alt="Summer Sundays social media tile designed by Emily Farmer."
                    fill
                    sizes="(min-width: 1024px) 18vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

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
                announcement slide needs to be on-brand. Every Tuesday the kids
                ministry has a new flyer that has to look like it came from the
                same church as last week&rsquo;s.
              </p>
              <p>
                It all lands on one person. Usually you. You&rsquo;re in Canva
                at 11 PM Saturday, the worship lead just texted you a new logo
                idea, the senior pastor wants the bulletin redesigned, and a
                parent volunteer is asking for camp shirt mockups by Friday.
              </p>
              <p>
                The two ways out have always been hiring a full-time designer
                you can&rsquo;t afford, or hiring a freelancer per project who
                never quite gets your voice.
              </p>
              <p className="text-[color:var(--color-ink)] font-medium">
                There&rsquo;s a third way.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* THE OFFER - card chrome stripped, rule-divided list */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>The offer</Eyebrow>
            <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
              One designer. Flat monthly fee.
              <br />
              <span className="font-serif-italic">In-house, without the in-house hire.</span>
            </h2>
            <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
              Emily Farmer designs for your church on a flat $800 a month
              subscription. She onboards once, learns your voice, your visual
              system, your team&rsquo;s pace. Then she just designs. The way an
              on-staff designer would, if you had an on-staff designer.
            </p>
          </div>

          <dl className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {[
              {
                title: "Unlimited requests",
                body:
                  "Send as many as you need. One designer, one queue, one round-trip. There&rsquo;s no ticketing system.",
              },
              {
                title: "Unlimited revisions",
                body:
                  "Until it&rsquo;s right. No upcharge. No project-manager-mediated scope arguments.",
              },
              {
                title: "Same-day rush",
                body:
                  "When something has to ship today, it ships today. Available on small requests when you flag the urgency.",
              },
              {
                title: "Flat monthly fee",
                body:
                  "$800 a month. Predictable, budgetable, doesn&rsquo;t spike when you launch a new series or rebrand a ministry.",
              },
              {
                title: "One dedicated designer",
                body:
                  "Emily. Every project. After a month she knows your church better than most agencies ever will.",
              },
              {
                title: "Pause or cancel anytime",
                body:
                  "Quiet summer? Pause. Done? Cancel. Your files are yours to keep either way.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="border-t border-[color:var(--color-border)] py-6"
              >
                <dt className="font-serif text-xl tracking-tight text-[color:var(--color-ink)]">
                  {feature.title}
                </dt>
                <dd
                  className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]"
                  dangerouslySetInnerHTML={{ __html: feature.body }}
                />
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* SERVICES PREVIEW - card chrome stripped, items rule-divided */}
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
              className="text-sm font-medium text-[color:var(--color-ink)] underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4 hover:decoration-[color:var(--color-ink)]"
            >
              See full pricing
            </Link>
          </div>

          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {siteConfig.services.map((service) => (
              <li
                key={service.slug}
                id={service.slug}
                className="border-t border-[color:var(--color-border)] py-6"
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

      {/* MEET YOUR DESIGNER - kept for commit 2, will move onto clay band in future pass */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="relative aspect-[4/5] max-w-md rounded-lg overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                <Image
                  src="/about/emily-headshot.webp"
                  alt="Emily Farmer, founder and lead designer of Create Media Group."
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <Eyebrow>Meet your designer</Eyebrow>
              {/* Voice corpus Translation 3 — Meet Your Designer block intro. */}
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Hello, I&rsquo;m Emily.
              </h2>
              <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                I&rsquo;m a graphic designer in Indianapolis and I&rsquo;ve
                been designing for churches for the last 10 years. When you
                sign up I become your remote designer, on call whenever you
                need something.
              </p>
              <p className="mt-4 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                Sermon series, weekly announcements, social, logos, signage.
                Whatever you need that week, I get to work on it right away.
              </p>
              <div className="mt-8">
                <ButtonLink href="/about" variant="outline" size="md">
                  More about Emily
                </ButtonLink>
              </div>
            </div>
          </div>
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
              className="text-sm font-medium text-[color:var(--color-ink)] underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4 hover:decoration-[color:var(--color-ink)]"
            >
              All case studies
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
                  "A small-team church gets the design ops of a much larger one. Without the headcount.",
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

      {/* PRICING TEASER - Sparkle badge dropped, rounded-lg */}
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
                <ButtonLink href="/subscription" variant="ink" size="lg">
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
                      "rounded-lg border p-7 " +
                      (i === 1
                        ? "border-[color:var(--color-accent)] bg-[color:var(--color-card)]"
                        : "border-[color:var(--color-border)] bg-[color:var(--color-card)]")
                    }
                  >
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
                        ~${siteConfig.pricing.annual.perMonth}/mo. Save $
                        {siteConfig.pricing.annual.savings}.
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

      {/* FINAL CTA - cream substrate */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <div>
              <h2 className="font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight text-[color:var(--color-ink)]">
                Tell me about your church.
              </h2>
              <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-xl">
                Send me a note about your church and what you need. I&rsquo;ll
                reply within a day with whether we&rsquo;re a fit and what
                onboarding looks like.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Start the conversation
              </ButtonLink>
              <ButtonLink href="/subscription" variant="outline" size="lg">
                See the subscription
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
