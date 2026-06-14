import type { Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { ContactBlock } from '@/components/ContactBlock'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'See the work. Sermon series, branding, social media, announcements and signage designed by Emily Farmer for churches across the country.',
}

type Piece = {
  src: string
  alt: string
  category: 'Sermon series' | 'Announcement' | 'Logos'
}

const PIECES: Piece[] = [
  { src: '/portfolio/sermon-malachi.webp', alt: 'Sermon series art for a Malachi series', category: 'Sermon series' },
  { src: '/portfolio/sermon-love-your-neighbor.webp', alt: 'Sermon series art for Love Your Neighbor', category: 'Sermon series' },
  { src: '/portfolio/sermon-joy-in-every-season.webp', alt: 'Sermon series art for Joy in Every Season', category: 'Sermon series' },
  { src: '/portfolio/sermon-matters-of-the-heart.webp', alt: 'Sermon series art for Matters of the Heart', category: 'Sermon series' },
  { src: '/portfolio/sermon-drive-in-church.webp', alt: 'Drive-in church sermon graphic', category: 'Sermon series' },
  { src: '/portfolio/sermon-me-i-want-to-be.webp', alt: 'Sermon series art for Me I Want To Be', category: 'Sermon series' },
  { src: '/portfolio/sermon-foster-care-christmas.webp', alt: 'Sermon series art for Foster Care Christmas', category: 'Sermon series' },
  { src: '/portfolio/sermon-faq.webp', alt: 'Sermon series FAQ graphic', category: 'Sermon series' },
  { src: '/portfolio/announcements-baptism.webp', alt: 'Baptism Sunday announcement graphic', category: 'Announcement' },
  { src: '/portfolio/announcements-easter-services.webp', alt: 'Easter services announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-21-day-focus.webp', alt: '21 Day Focus announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-spring-slides.webp', alt: 'Spring announcement slide', category: 'Announcement' },
  { src: '/portfolio/announcements-welcome-dinner.webp', alt: 'Welcome dinner announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-men-made-strong.webp', alt: 'Men Made Strong ministry announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-connection-sunday.webp', alt: 'Connection Sunday announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-food-pantry.webp', alt: 'Food Pantry announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-clothing-drive.webp', alt: 'Clothing drive announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-august-bbq.webp', alt: 'August BBQ announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-follow-the-leader.webp', alt: 'Follow the Leader kids ministry announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-virtual-group.webp', alt: 'Virtual small group announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-garage.webp', alt: 'Garage event announcement', category: 'Announcement' },
  { src: '/portfolio/announcements-slide-shot.webp', alt: 'Worship slide announcement', category: 'Announcement' },
  { src: '/portfolio/logos-logo-1.webp', alt: 'Church logo design', category: 'Logos' },
  { src: '/portfolio/logos-logo-2.webp', alt: 'Church sub-brand logo design', category: 'Logos' },
  { src: '/portfolio/logos-logo-3.webp', alt: 'Church logo design', category: 'Logos' },
  { src: '/portfolio/logos-logo-4.webp', alt: 'Church ministry logo design', category: 'Logos' },
  { src: '/portfolio/logos-logo-5.webp', alt: 'Church logo design', category: 'Logos' },
  { src: '/portfolio/logos-logo-6.webp', alt: 'Church logo design', category: 'Logos' },
  { src: '/portfolio/logos-logo-7.webp', alt: 'Church logo design', category: 'Logos' },
  { src: '/portfolio/logos-logo-8.webp', alt: 'Church logo design', category: 'Logos' },
]

export default function PortfolioPage() {
  return (
    <>
      <PageIntro eyebrow="Portfolio" title="See the work.">
        <p>
          Sermon series, branding, social media, announcements and signage.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-24">
        <FadeInStagger faster>
          <ul
            role="list"
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
          >
            {PIECES.map((piece, i) => (
              <FadeIn as="li" key={piece.src}>
                <figure className="group relative overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-900/5">
                  <div className="relative aspect-square">
                    <Image
                      src={piece.src}
                      alt={piece.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      priority={i < 3}
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-neutral-950/70 to-transparent px-4 py-3 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                    <span>{piece.category}</span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>

      <SectionIntro
        eyebrow="More on request"
        title="Tell me what you’d like to see."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          I’m happy to send specific samples. Let me know what you are looking for.
        </p>
      </SectionIntro>

      <ContactBlock heading="Join the wait list.">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
