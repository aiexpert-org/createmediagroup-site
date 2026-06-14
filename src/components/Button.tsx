import Link from 'next/link'
import { cn } from '@/lib/cn'
import { MarkerSwipe } from '@/components/MarkerSwipe'

type Variant = 'primary' | 'secondary' | 'ghost'
type Tone = 'light' | 'dark'

type ButtonProps = {
  variant?: Variant
  /**
   * Background the CTA sits on. `light` (default) keeps the text near-black so
   * it reads on white. `dark` flips the text to white so it stays legible over
   * the yellow marker on a `bg-neutral-950` panel (the marker itself stays
   * yellow either way).
   */
  tone?: Tone
  withArrow?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

/**
 * CTAs read as marker-swiped text rather than filled rectangles.
 *
 * - primary: larger, semibold text with the highlighter swipe behind the whole
 *   phrase (always visible). Optional trailing arrow.
 * - secondary / ghost: body-weight text with a dashed underline at rest that
 *   gives way to the swipe on hover.
 *
 * `isolate` keeps the swipe's negative z-index scoped to the button so it sits
 * above the button's own (transparent) background but never escapes behind a
 * dark section like the contact block.
 */
export function Button({
  variant = 'primary',
  tone = 'light',
  withArrow = variant === 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary'
  const isDark = tone === 'dark'

  const merged = cn(
    'group relative isolate inline-flex items-center justify-center gap-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
    isDark
      ? 'text-white focus-visible:outline-white'
      : 'text-neutral-950 focus-visible:outline-neutral-950',
    isPrimary
      ? 'text-lg font-semibold sm:text-xl'
      : 'text-base font-medium',
    className,
  )

  const content = (
    <>
      <MarkerSwipe
        className={cn(
          isPrimary
            ? 'scale-x-100 opacity-100'
            : 'scale-x-0 opacity-0 transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100 group-hover:opacity-70',
        )}
      />
      <span
        className={cn(
          'relative',
          !isPrimary &&
            'underline decoration-dashed underline-offset-4 transition-colors group-hover:decoration-transparent',
          !isPrimary && (isDark ? 'decoration-neutral-500' : 'decoration-neutral-400'),
        )}
      >
        {children}
      </span>
      {withArrow ? (
        <span
          aria-hidden="true"
          className="relative transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      ) : null}
    </>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={merged} {...props}>
        {content}
      </button>
    )
  }

  return (
    <Link className={merged} {...props}>
      {content}
    </Link>
  )
}
