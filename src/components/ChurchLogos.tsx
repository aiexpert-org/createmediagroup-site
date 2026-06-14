import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

// Real church logos extracted from each church's live site, recolored to a
// monochrome set in public/church-logos/<slug>-{black,white,yellow}.png.
// This trust band sits on a black background (the hard white -> black break
// below the hero), so the logos display in WHITE and cross-fade to Emily's
// brand yellow on hover.
// `url: null` = the church's site is offline, so the mark renders without a link.
type Church = { name: string; url: string | null; slug: string }

const CHURCHES: Church[] = [
  { name: 'First Christian Church Santa Maria', url: 'https://fccsantamaria.org', slug: 'fcc-santa-maria' },
  { name: 'Faith Community Fellowship', url: 'https://fcffamily.com', slug: 'faith-community-fellowship' },
  { name: 'The Grove Church', url: 'https://grove.church', slug: 'the-grove-church' },
  { name: 'Sanibel Community Church', url: 'https://sanibelchurch.com', slug: 'sanibel-community-church' },
  { name: 'Community Christian Church', url: 'https://communitycc.net', slug: 'community-christian-church' },
  { name: 'Centerpoint Church Utah', url: 'https://centerpointutah.org', slug: 'centerpoint-utah' },
  { name: 'Cornerstone Church Buzz', url: 'https://cornerstonebuzz.org', slug: 'cornerstone-buzz' },
  { name: 'For The One Church', url: 'https://fortheone.church', slug: 'for-the-one-church' },
  { name: 'Shelby Church', url: 'https://shelbychurch.org', slug: 'shelby-church' },
  { name: 'Faith Bible Church OK', url: 'https://faithbibleok.com', slug: 'faith-bible-ok' },
  { name: 'Northpointe Community Church', url: 'https://northpointecc.org', slug: 'northpointe-community-church' },
  { name: 'Eastown Church', url: 'https://eastown.church', slug: 'eastown-church' },
  { name: 'Lifepoint Church', url: 'https://lifepointnow.com', slug: 'lifepoint-church' },
  { name: 'Ignite Church', url: 'https://ignitechurch.org', slug: 'ignite-church' },
  { name: 'Holland Chapel', url: null, slug: 'holland-chapel' },
  { name: 'Central Coast Young Adults', url: null, slug: 'central-coast-young-adults' },
  { name: 'SWG Leadership', url: 'https://swgleadership.com', slug: 'swg-leadership' },
  { name: 'Calvary Fort Worth', url: 'https://calvaryftw.com', slug: 'calvary-fort-worth' },
  { name: 'Cornerstone Manteca', url: 'https://cornerstonemanteca.com', slug: 'cornerstone-manteca' },
  { name: 'The Crossing Church', url: 'https://thecrossingchurch.info', slug: 'the-crossing-church' },
  { name: 'LifeChurch Atlanta', url: 'https://lifechurchatl.com', slug: 'lifechurch-atlanta' },
  { name: 'YIT Indianapolis', url: 'https://yitindy.org', slug: 'yit-indianapolis' },
]

function ChurchLogo({ church }: { church: Church }) {
  return (
    <span className="relative block h-14 w-full">
      <Image
        src={`/church-logos/${church.slug}-white.png`}
        alt={`${church.name} logo`}
        fill
        sizes="160px"
        className="object-contain transition-opacity duration-200 ease-out group-hover:opacity-0"
      />
      <Image
        src={`/church-logos/${church.slug}-yellow.png`}
        alt=""
        aria-hidden="true"
        fill
        sizes="160px"
        className="object-contain opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
      />
    </span>
  )
}

export function ChurchLogos() {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40 rounded-4xl bg-neutral-950 py-20 sm:py-24">
      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Churches I&rsquo;ve worked with.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-400">
            Churches across the country who have trusted Emily with their visual identity, week after week.
          </p>
        </FadeIn>

        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5"
          >
            {CHURCHES.map((church) => (
              <FadeIn key={church.slug} as="li" className="flex">
                {church.url ? (
                  <a
                    href={church.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full flex-col items-center gap-3 rounded-2xl p-4 ring-1 ring-inset ring-transparent transition hover:bg-white/5 hover:ring-[var(--color-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label={`Visit ${church.name}`}
                  >
                    <ChurchLogo church={church} />
                    <span className="text-center text-xs font-medium text-neutral-400 group-hover:text-white">
                      {church.name}
                    </span>
                  </a>
                ) : (
                  <div className="group flex w-full flex-col items-center gap-3 rounded-2xl p-4">
                    <ChurchLogo church={church} />
                    <span className="text-center text-xs font-medium text-neutral-400">
                      {church.name}
                    </span>
                  </div>
                )}
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
