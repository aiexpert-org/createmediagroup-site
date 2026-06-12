import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { ServiceJsonLd, FaqJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact/contact-form";

export const metadata: Metadata = {
  // Leads with the brand display name "Create", keeps the legal entity
  // "Create Media Group" as a trailing clarifier so existing SEO holds.
  title: {
    absolute: `Create. ${siteConfig.tagline} | ${siteConfig.legalName}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "How much does it cost?",
    a: "$997 a month, flat, with no per-project pricing. Prepay for a year and it's $9,997, which works out to about $833 a month.",
  },
  {
    q: "What can I request?",
    a: "Sermon series art, weekly slides, social posts, announcements, kids and youth graphics, lobby signs, banners, business cards, full logo and brand systems, and anything else a designer would do for a church. Unlimited requests. Unlimited revisions.",
  },
  {
    q: "Will I work with the same designer every time?",
    a: "Yes. Emily designs every request. After a month she knows your sermon cadence, your pastor's voice, your kids ministry palette, and your printer's file specs.",
  },
  {
    q: "Where are you based?",
    a: `${siteConfig.location.city}, ${siteConfig.location.region}. Emily works with churches in the ${siteConfig.location.metro} metro and nationwide. Most of the work is remote.`,
  },
];

// A small, real-work gallery for the homepage. Emily's own designs, so there's
// no client-permission question on the indexed home page. The named-church
// case studies live at /case-studies (noindex until permissions are confirmed).
const selectedWork = [
  { file: "/portfolio/sermon-this-is-church.webp", title: "This is Church sermon series" },
  { file: "/portfolio/social-summer-sundays.webp", title: "Summer Sundays social tile" },
  { file: "/portfolio/announcements-baptism.webp", title: "Baptism announcement" },
  { file: "/portfolio/youth-open-conversations.webp", title: "Open Conversations youth campaign" },
  { file: "/portfolio/sermon-reset.webp", title: "Reset sermon series" },
  { file: "/portfolio/announcements-easter-services.webp", title: "Easter services announcement" },
];

export default function HomePage() {
  return (
    <>
      <ServiceJsonLd />
      <FaqJsonLd items={homeFaqs} />

      {/* HERO */}
      <Section className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <h1 className="font-serif font-normal text-[44px] md:text-[80px] leading-[1.06] tracking-[-0.02em] text-[color:var(--color-ink)] text-balance max-w-[14ch]">
                Unlimited graphic design for pastors and churches.
              </h1>
              <p className="mt-7 text-xl leading-[1.55] text-[color:var(--color-ink)]/80 max-w-[44ch]">
                I&rsquo;m Emily. I do unlimited graphic design for churches on a
                monthly subscription. Same-day rush is part of it.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
                <Link
                  href="#start"
                  className="inline-flex items-center gap-3 rounded-lg bg-[color:var(--color-cta)] pl-2 pr-7 h-14 text-base font-medium text-[color:var(--color-cta-foreground)] hover:bg-[color:var(--color-cta-hover)] transition-colors"
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
                <Link
                  href="/portfolio"
                  className="text-base font-medium text-[color:var(--color-ink)] underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4 hover:decoration-[color:var(--color-ink)] transition-colors"
                >
                  See the work
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:pl-8">
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
                <div className="absolute -top-6 -right-2 sm:-right-4 lg:-right-6 w-[40%] aspect-[4/5] overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[0_18px_36px_-12px_rgba(26,25,22,0.22)] rotate-[3deg]">
                  <Image
                    src="/portfolio/announcements-baptism.webp"
                    alt="Baptism announcement graphic designed by Emily Farmer."
                    fill
                    sizes="(min-width: 1024px) 18vw, 35vw"
                    className="object-cover"
                  />
                </div>
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

      {/* THE OFFER. Three blocks. */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>The offer</Eyebrow>
            <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
              One designer. One flat fee.
              <br />
              <span className="font-serif-italic">In-house, without the in-house hire.</span>
            </h2>
            <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
              Emily designs for your church on a flat $997 a month subscription.
              She onboards once, learns your voice and your visual system, then
              she just designs.
            </p>
          </div>

          <dl className="mt-12 grid sm:grid-cols-3 gap-x-10">
            {[
              {
                title: "Your church's own designer",
                body:
                  "One designer, Emily, on every request. After a month she knows your sermon cadence, your colors, and your team's pace the way an on-staff hire would.",
              },
              {
                title: "Unlimited, one flat fee",
                body:
                  "Unlimited requests and unlimited revisions for a flat $997 a month. Pause or cancel anytime. Every file is yours to keep.",
              },
              {
                title: "Same-day when it counts",
                body:
                  "Most requests come back the same week, often the same day. Same-day rush is part of the subscription when something has to ship now.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="border-t border-[color:var(--color-border-strong)] py-6"
              >
                <dt className="font-serif text-xl tracking-tight text-[color:var(--color-ink)]">
                  {feature.title}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {feature.body}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-sm text-[color:var(--color-muted)]">
            Everything Emily designs:{" "}
            <span className="text-[color:var(--color-ink-soft)]">
              {siteConfig.services.map((s) => s.name).join(". ")}.
            </span>{" "}
            <Link
              href="/subscription"
              className="text-[color:var(--color-accent)] underline underline-offset-4"
            >
              See full pricing
            </Link>
          </p>
        </Container>
      </Section>

      {/* SELECTED WORK */}
      <Section>
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Real design for real churches.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-[color:var(--color-ink)] underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4 hover:decoration-[color:var(--color-ink)]"
            >
              See the full portfolio
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-5">
            {selectedWork.map((item) => (
              <li key={item.file}>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                  <Image
                    src={item.file}
                    alt={`${item.title}. Designed by Emily Farmer for a church.`}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* MEET EMILY */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="relative aspect-[4/5] max-w-md rounded-lg overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-card)]">
                <Image
                  src="/about/emily-headshot.webp"
                  alt="Emily Farmer, founder and lead designer of Create."
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <Eyebrow>Meet your designer</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Hello, I&rsquo;m Emily.
              </h2>
              <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                I&rsquo;m a graphic designer in Indianapolis and I&rsquo;ve been
                designing for churches for the last 10 years. When you sign up I
                become your remote designer, on call whenever you need something.
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

      {/* CONTACT. Embedded form. */}
      <Section id="start" as="div">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <Eyebrow>Start here</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight text-[color:var(--color-ink)]">
                Tell me about your church.
              </h2>
              <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-md">
                Send me a note about your church and what you need. I&rsquo;ll
                reply within a business day with whether we&rsquo;re a fit and
                what onboarding looks like. You can also text{" "}
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="text-[color:var(--color-accent)] underline underline-offset-4"
                >
                  {siteConfig.contact.phone}
                </a>
                .
              </p>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
