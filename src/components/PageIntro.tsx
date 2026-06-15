import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { HeroMosaic, HeroMosaicBackground } from '@/components/HeroMosaic'

// White glow behind hero copy so the headline stays legible over the mosaic
// tiles, the same treatment used on the home and how-it-works heroes.
const HERO_TEXT_SHADOW = '[text-shadow:0_0_6px_rgba(255,255,255,0.8)]'

export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
  centered?: boolean
}) {
  return (
    // Full-bleed portfolio mosaic hero, identical to the home page: a desktop
    // edge-to-edge tile grid masked by a right-to-left white gradient, with a
    // compact tile grid on mobile. The copy sits at the same vertical height as
    // the home hero (mt-8/12/16), so every page's eyebrow + title + subtitle
    // line up instead of dropping lower on inner pages.
    <div className="relative isolate overflow-hidden">
      <div className="hidden md:block">
        <HeroMosaicBackground />
      </div>

      <Container
        className={cn(
          'pointer-events-none mt-8 pb-12 sm:mt-12 sm:pb-20 lg:mt-16 lg:pb-28',
          centered && 'text-center',
        )}
      >
        <FadeIn className="relative z-10">
          <h1>
            {eyebrow && (
              <>
                <span
                  className={cn(
                    'block font-display text-base font-semibold tracking-wider uppercase text-neutral-950',
                    HERO_TEXT_SHADOW,
                  )}
                >
                  {eyebrow}
                </span>
                <span className="sr-only"> - </span>
              </>
            )}
            <span
              className={cn(
                'mt-6 block max-w-5xl font-display text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4rem] lg:leading-[1.1] font-medium tracking-tight text-balance text-neutral-950',
                HERO_TEXT_SHADOW,
                centered && 'mx-auto',
              )}
            >
              {title}
            </span>
          </h1>
          {children && (
            <div
              className={cn(
                'pointer-events-auto mt-6 max-w-3xl text-xl text-neutral-600',
                HERO_TEXT_SHADOW,
                centered && 'mx-auto',
              )}
            >
              {children}
            </div>
          )}
        </FadeIn>

        {/* Mobile-only mosaic, rendered below the copy as on the home hero. */}
        <FadeIn className="mt-12 md:hidden">
          <HeroMosaic />
        </FadeIn>
      </Container>
    </div>
  )
}
