import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { Button } from '@/components/Button'
import { Border } from '@/components/Border'
import { ContactBlock } from '@/components/ContactBlock'
import {
  PortfolioCategories,
  type Piece,
  type PortfolioCategory,
} from '@/components/PortfolioGallery'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'See the work. Sermon series, announcements, logos and branding, social media, signage and print designed by Emily Farmer for churches across the country.',
  alternates: { canonical: '/portfolio' },
}

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map((w) => (w.length <= 2 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ')
}

// Build the Piece list for a category from bare file slugs (without the
// /portfolio/ prefix or extension). `label` is the per-tile caption; `altLead`
// is woven into each alt string.
function build(
  files: string[],
  label: string,
  altLead: string,
  ext = 'webp',
): Piece[] {
  return files.map((file) => {
    const name = titleCase(file.replace(/^[a-z]+-/, '').replace(/-/g, ' '))
    return {
      src: `/portfolio/${file}.${ext}`,
      alt: `${altLead}: ${name}`,
      category: label,
    }
  })
}

const CATEGORIES: PortfolioCategory[] = [
  {
    key: 'sermon-series',
    title: 'Sermon series',
    description:
      'Custom series art built around your church and your message, sized for ProPresenter, screens, print and social.',
    aspectClass: 'aspect-video',
    items: [
      ...build(
        [
          'sermon-malachi',
          'sermon-love-your-neighbor',
          'sermon-joy-in-every-season',
          'sermon-matters-of-the-heart',
          'sermon-drive-in-church',
          'sermon-me-i-want-to-be',
          'sermon-foster-care-christmas',
          'sermon-reset',
          'sermon-this-is-church',
          'sermon-faq',
          'sermon-series-asset',
          'sermon-series-shot-1',
          'sermon-series-shot-2',
          'sermon-series-shot-3',
          'sermon-series-shot-4',
        ],
        'Sermon series',
        'Sermon series art',
      ),
      ...build(['sermon-trees-11'], 'Sermon series', 'Sermon series art', 'jpg'),
    ],
  },
  {
    key: 'announcements',
    title: 'Announcements',
    description:
      'Weekly screen and social graphics for everything happening at your church, formatted for every platform you use.',
    aspectClass: 'aspect-video',
    items: build(
      [
        'announcements-baptism',
        'announcements-easter-services',
        'announcements-21-day-focus',
        'announcements-spring-slides',
        'announcements-welcome-dinner',
        'announcements-men-made-strong',
        'announcements-connection-sunday',
        'announcements-food-pantry',
        'announcements-clothing-drive',
        'announcements-august-bbq',
        'announcements-follow-the-leader',
        'announcements-virtual-group',
        'announcements-garage',
        'announcements-slide-shot',
      ],
      'Announcement',
      'Announcement graphic',
    ),
  },
  {
    key: 'logos-branding',
    title: 'Logos and branding',
    description:
      'Church logos, sub-brands and full identity systems built to last across every surface.',
    aspectClass: 'aspect-[4/3]',
    items: build(
      [
        'logos-logo-1',
        'logos-logo-2',
        'logos-logo-3',
        'logos-logo-4',
        'logos-logo-5',
        'logos-logo-6',
        'logos-logo-7',
        'logos-logo-8',
      ],
      'Logo & branding',
      'Logo design',
    ),
  },
  {
    key: 'social-media',
    title: 'Social media',
    description:
      'On-brand posts and story templates for every ministry, consistent across every platform.',
    aspectClass: 'aspect-square',
    items: [
      ...build(
        [
          'social-1-peter',
          'social-strong-men',
          'social-summer-sundays',
          'social-asset-1',
          'social-asset-2',
          'social-smp-1',
          'social-smp-8',
          'social-smp-9',
          'social-smp-10',
          'social-smp-18',
          'social-smp-21',
          'social-smp-23',
          'social-smp-26',
          'social-smp-28',
          'social-smp-35',
          'social-smp-40',
        ],
        'Social media',
        'Social media graphic',
      ),
      ...build(
        [
          'youth-timothy',
          'youth-open-conversations',
          'youth-shot-1',
          'youth-shot-2',
          'youth-shot-3',
          'youth-shot-4',
          'youth-shot-5',
        ],
        'Youth & kids',
        'Youth ministry graphic',
      ),
    ],
  },
  {
    key: 'signage-print',
    title: 'Signage and print',
    description:
      'Lobby signs, banners and print-ready collateral, formatted for your printer at the right size.',
    aspectClass: 'aspect-[3/4]',
    items: build(
      [
        'signage-guest-reception',
        'signage-holiday-food',
        'signage-service-announcement',
        'signage-shot-1',
        'signage-shot-2',
        'signage-shot-3',
        'signage-shot-4',
        'signage-shot-5',
      ],
      'Signage & print',
      'Signage and print',
    ),
  },
]

export default function PortfolioPage() {
  return (
    <>
      <PageIntro eyebrow="Portfolio" title="See the work.">
        <p>
          Sermon series, announcements, logos and branding, social media, signage and print. Click any piece to see it full size.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-24">
        <PortfolioCategories categories={CATEGORIES} />
      </Container>

      <Container className="mt-24 sm:mt-32">
        <Border className="pt-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              See more in detail.
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Each church I work with gets a custom approach. Browse the case studies for the story behind each engagement.
            </p>
            <div className="mt-8">
              <Button href="/case-studies">Browse case studies</Button>
            </div>
          </div>
        </Border>
      </Container>

      <ContactBlock heading="Join the wait list." source="portfolio">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
