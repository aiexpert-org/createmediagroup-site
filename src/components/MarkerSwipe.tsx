import { cn } from '@/lib/cn'

/**
 * Hand-drawn yellow highlighter pass, in the Greg Isenberg "Blog" style.
 *
 * It is a closed, filled blob (not a stroke) with subtly wavy top and bottom
 * edges so it reads like a real marker swipe rather than a pill. The fill is
 * slightly translucent and the whole shape sits a touch low and tilted, so the
 * bottom ~70% of the letterforms land inside the highlight while the tops peek
 * above it.
 *
 * Rendered as an absolutely positioned layer behind its content. Callers place
 * the text in a `relative` span on top; pass opacity classes via `className`
 * (e.g. for hover reveal) or a numeric `opacity`.
 */
export function MarkerSwipe({
  className,
  opacity,
}: {
  className?: string
  opacity?: number
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
    >
      <svg
        viewBox="0 0 100 26"
        preserveAspectRatio="none"
        className="absolute top-[14%] left-[-7%] h-[82%] w-[114%]"
        style={{
          transform: 'rotate(-1.5deg)',
          ...(opacity != null ? { opacity } : {}),
        }}
      >
        <path
          d="M 2,8 Q 12,4 28,6 Q 50,3 72,7 Q 88,5 98,9 L 97,22 Q 80,24 60,21 Q 35,25 12,22 Q 4,23 3,20 Z"
          fill="var(--color-cta)"
          opacity="0.92"
        />
      </svg>
    </span>
  )
}
