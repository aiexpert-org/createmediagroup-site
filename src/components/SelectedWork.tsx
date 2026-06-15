import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { churchLogo } from '@/lib/churches'
import { getSelectedWork } from '@/lib/selected-work'

// "Selected work" block at the foot of a case study. When the church has curated
// pieces (see src/lib/selected-work.ts) it renders a real image grid. Otherwise
// it shows the church mark on a soft panel and points to the full portfolio, so
// the section never falls back to bare category labels.
export function SelectedWork({
  slug,
  church,
}: {
  slug: string
  church: string
}) {
  const pieces = getSelectedWork(slug)

  return (
    <FadeIn className="mx-auto max-w-4xl">
      <Border className="pt-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
          Selected work
        </h2>

        {pieces.length > 0 ? (
          <>
            <p className="mt-3 max-w-2xl text-sm text-neutral-600">
              A few representative pieces from Emily&rsquo;s church design work,
              across sermon series, announcements, social, signage, and branding.
            </p>
            <ul
              role="list"
              className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              {pieces.map((piece) => (
                <li key={piece.src}>
                  <figure className="flex flex-col">
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-inset ring-neutral-900/5">
                      <Image
                        src={piece.src}
                        alt={piece.alt}
                        fill
                        sizes="(min-width: 640px) 30vw, 45vw"
                        className="object-contain p-3"
                      />
                    </div>
                    <figcaption className="mt-2.5 text-xs font-medium uppercase tracking-wider text-neutral-500">
                      {piece.label}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-base font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
              >
                See the full portfolio
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 max-w-2xl text-sm text-neutral-600">
              Finished pieces from the {church} engagement are being added to the
              site. In the meantime, the full portfolio shows the range of sermon
              series, announcements, social, signage, and branding work.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center rounded-3xl bg-neutral-50 px-6 py-16 ring-1 ring-inset ring-neutral-900/5">
              <div className="relative h-20 w-48">
                <Image
                  src={churchLogo(slug, 'black')}
                  alt={`${church} logo`}
                  fill
                  sizes="192px"
                  className="object-contain opacity-80"
                />
              </div>
              <div className="mt-8">
                <Button href="/portfolio">See the full portfolio</Button>
              </div>
            </div>
          </>
        )}
      </Border>
    </FadeIn>
  )
}
