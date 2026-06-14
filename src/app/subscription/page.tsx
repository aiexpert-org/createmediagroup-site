import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { EmilyAvatar } from '@/components/EmilyAvatar'
import { ContactBlock } from '@/components/ContactBlock'
import { FaqJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Subscription',
  description:
    'One flat fee. Unlimited graphic design for churches. $997 a month or $9,997 annual prepay. Same designer, same access, same turn around times.',
}

const PLAN_BULLETS = [
  'One designer.',
  'Unlimited requests.',
  'Unlimited revisions.',
  'Same-day rush available.',
  'Source files included.',
]

const CATEGORIES = [
  {
    title: 'Sermon series',
    body:
      'Sermon series packages, all sizes included, custom built around your message and your church brand.',
  },
  {
    title: 'Announcements',
    body:
      'Weekly screen graphics for everything happening at your church. Events, baptisms, conferences, you name it. All sizes offered for every platform.',
  },
  {
    title: 'Logos and branding',
    body:
      'Church logos, color palettes, sub-brands for Youth, Kids, Women, Men, Missions, and more. Full brand identity built to last.',
  },
  {
    title: 'Social media',
    body:
      'Social media graphics and story templates. On-brand across every platform.',
  },
  {
    title: 'Youth and Kids',
    body:
      'Bright, on-brand graphics for your kids and youth ministries. Camp shirts, summer series, parent handouts, hallway signage.',
  },
  {
    title: 'Signage, mailers and print',
    body:
      'Lobby signs, exterior banners, large-format prints, business cards. Print-ready files formatted for your printer.',
  },
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'What does "unlimited" actually mean?',
    answer:
      'Unlimited requests, unlimited revisions, no per-project pricing. There’s a single shared queue with one designer. We work together until you are completely happy with the finished project. Same-day rush is available when you flag the urgency.',
  },
  {
    question: 'Is there a contract?',
    answer:
      'There is a month-to-month option. The annual prepay tier is 12 months upfront and saves you almost $2,000.',
  },
  {
    question: 'What if I have a slow month?',
    answer:
      'Usually churches have slower months and busier months, around holidays or big events. I have found that it generally ends up balancing out by the end of the year.',
  },
  {
    question: 'What about file ownership?',
    answer:
      'You own everything I design for you. Final files, source files, brand assets. If we ever part ways, you keep the library.',
  },
  {
    question: 'Will I work with the same designer every time?',
    answer:
      'Yes, I am the designer on every request. No account managers, no rotating cast of contractors, no “let me hand this off to our specialist.”',
  },
  {
    question: 'Do you do websites?',
    answer:
      'Brand and design system work, yes. Full custom site builds, no. I’ll happily make sure your site visuals are on-brand, and I work with a few church-friendly web developers I can refer you to if you need a full rebuild.',
  },
  {
    question: 'How do I send requests?',
    answer:
      'However works for your team. Some churches already have platforms in place like Basecamp, and if so, I am happy to jump on your team threads. Most churches just email me, putting the title of the project in the Email Subject, making it easy to go back and find projects conversations. I will match your rhythm and flow.',
  },
  {
    question: 'Can anyone on our staff request a project from Emily, or does she prefer one point-person to communicate through?',
    answer:
      'I have worked both ways depending on the preference of the church. I am happy to communicate with all your department heads on their individual design needs, or filter through one point-person if that is easier for your staff.',
  },
]

function PriceCard({
  header,
  price,
  period,
  tagline,
  featured = false,
}: {
  header: string
  price: string
  period: string
  tagline: string
  featured?: boolean
}) {
  return (
    <FadeIn
      className={
        featured
          ? 'rounded-3xl bg-neutral-950 p-10 text-white shadow-xl ring-1 ring-neutral-900'
          : 'rounded-3xl bg-white p-10 text-neutral-950 shadow-sm ring-1 ring-neutral-200'
      }
    >
      <p
        className={
          featured
            ? 'font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-cta)]'
            : 'font-display text-sm font-semibold uppercase tracking-wider text-neutral-500'
        }
      >
        {header}
      </p>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-5xl font-semibold tracking-tight">
          {price}
        </span>
        <span className={featured ? 'text-base text-neutral-300' : 'text-base text-neutral-500'}>
          / {period}
        </span>
      </p>
      <p className={featured ? 'mt-4 text-base text-neutral-300' : 'mt-4 text-base text-neutral-600'}>
        {tagline}
      </p>
      <ul role="list" className="mt-8 space-y-3 text-base">
        {PLAN_BULLETS.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-1 inline-block size-2 rounded-full bg-[var(--color-cta)]"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button
          href={siteConfig.waitlistUrl}
          variant={featured ? 'primary' : 'secondary'}
          tone={featured ? 'dark' : 'light'}
          className="w-full"
        >
          Join the wait list
        </Button>
      </div>
    </FadeIn>
  )
}

export default function SubscriptionPage() {
  return (
    <>
      <ServiceJsonLd />
      <FaqJsonLd faqs={FAQS} />

      <PageIntro eyebrow="Subscription" title="One flat fee.">
        <p className="text-2xl text-neutral-700">Everything your church needs designed.</p>
        <p className="mt-4">
          No long wait times. No per-project pricing. No upsells on revisions. Just a flat monthly subscription and a designer who actually knows your church.
        </p>
      </PageIntro>

      {/* Pricing cards */}
      <Container className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PriceCard
            header="Monthly"
            price="$997"
            period="month"
            tagline="Pay month to month. Every file is yours to keep."
          />
          <PriceCard
            header="Annual prepay"
            price="$9,997"
            period="year"
            tagline="Pay for the year and save almost $2,000. Same designer, same access, same turn around times."
            featured
          />
        </div>

        <FadeIn className="mt-10 flex items-center justify-center gap-4">
          <EmilyAvatar size={56} />
          <p className="max-w-sm text-base text-neutral-600">
            You&rsquo;re paying Emily directly. No agency, no account managers.
          </p>
        </FadeIn>
      </Container>

      {/* Categories */}
      <SectionIntro
        eyebrow="Categories"
        title="Many categories, all under one subscription."
        className="mt-24 sm:mt-32 lg:mt-40"
      />
      <Container className="mt-16">
        <FadeInStagger faster>
          <ul role="list" className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <FadeIn as="li" key={cat.title}>
                <Border className="pt-6">
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-neutral-950">
                    {cat.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-600">{cat.body}</p>
                </Border>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>

      {/* FAQ */}
      <SectionIntro
        eyebrow="FAQ"
        title="Common questions, answered honestly."
        className="mt-24 sm:mt-32 lg:mt-40"
      />
      <Container className="mt-16">
        <FadeIn>
          <dl className="divide-y divide-neutral-200">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-12"
              >
                <dt className="lg:col-span-5 font-display text-lg font-semibold tracking-tight text-neutral-950">
                  {faq.question}
                </dt>
                <dd className="lg:col-span-7 text-base leading-7 text-neutral-700">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </Container>

      <ContactBlock heading="Join the wait list.">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
