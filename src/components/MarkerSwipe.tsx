import { cn } from '@/lib/cn'

/**
 * Hand-drawn yellow marker swipe, sampled from the brand wordmark.
 * Renders as an absolutely positioned layer behind its content. The path
 * wiggles a touch and sits at a slight rotation so it reads like a real
 * highlighter stroke rather than a clean shape.
 */
export function MarkerSwipe({
  className,
  opacity,
}: {
  className?: string
  opacity?: number
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 48"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 -z-10 h-full w-full', className)}
      style={opacity != null ? { opacity } : undefined}
    >
      <path
        d="M7 29 C 56 19, 104 33, 152 25 C 204 16, 252 32, 293 23"
        fill="none"
        stroke="var(--color-cta)"
        strokeWidth="30"
        strokeLinecap="round"
        transform="rotate(-1.8 150 24)"
      />
    </svg>
  )
}
