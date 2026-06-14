import Image from 'next/image'
import { cn } from '@/lib/cn'

export const EMILY_ALT = 'Emily Farmer, designer and owner of Create Church Media'

// Source headshots live in public/team/. The -sm file (594x720) is used for the
// small circular avatars; the full file (891x1080) is for the larger portrait
// placements on /contact and /how-it-works.
const SMALL = '/team/emily-farmer-headshot-sm.webp'

/**
 * Circular avatar of Emily. `size` is the rendered diameter in px. The source is
 * a portrait crop, so object-cover centers it inside the circle. Lazy by default
 * everywhere except the home hero, which passes `priority`.
 */
export function EmilyAvatar({
  size = 48,
  priority = false,
  className,
}: {
  size?: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={SMALL}
      alt={EMILY_ALT}
      width={size}
      height={size}
      priority={priority}
      sizes={`${size}px`}
      className={cn(
        'inline-block shrink-0 rounded-full object-cover ring-1 ring-neutral-900/10',
        className,
      )}
      style={{ width: size, height: size }}
    />
  )
}

// Full headshot at native portrait ratio (891x1080 -> 0.825). Used for the
// larger placements on /contact and /how-it-works.
const FULL = '/team/emily-farmer-headshot.webp'
const FULL_RATIO = 1080 / 891

/**
 * Larger rectangular portrait of Emily, rounded. `width` is the rendered px
 * width; height follows the native portrait ratio.
 */
export function EmilyPortrait({
  width = 440,
  priority = false,
  className,
}: {
  width?: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={FULL}
      alt={EMILY_ALT}
      width={width}
      height={Math.round(width * FULL_RATIO)}
      priority={priority}
      sizes={`(min-width: 1024px) ${width}px, 100vw`}
      className={cn('h-auto w-full rounded-3xl object-cover', className)}
    />
  )
}

/**
 * Byline used on blog posts (/resources/[slug]) and case studies
 * (/case-studies/[slug]): a small avatar next to "By Emily Farmer" and optional
 * trailing metadata (location, a Google link, etc.).
 */
export function ArticleByline({
  trailing,
  className,
}: {
  trailing?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <EmilyAvatar size={40} />
      <p className="text-sm text-neutral-500">
        By <span className="font-medium text-neutral-700">Emily Farmer</span>
        {trailing ? <>{trailing}</> : null}
      </p>
    </div>
  )
}
