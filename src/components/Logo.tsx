import Image from 'next/image'
import { cn } from '@/lib/cn'

/**
 * Emily's "create." wordmark. Black version on light surfaces, white version
 * when inverted. Source PNGs are trimmed to the glyph bounds at a 981x200
 * aspect ratio, rendered here at a 36px cap height.
 */
export function Logo({
  className,
  invert = false,
}: {
  className?: string
  invert?: boolean
}) {
  return (
    <Image
      src={invert ? '/logos/create-wordmark-white.png' : '/logos/create-wordmark-black.png'}
      alt="Create Church Media"
      width={981}
      height={200}
      priority
      className={cn('h-9 w-auto', className)}
    />
  )
}
