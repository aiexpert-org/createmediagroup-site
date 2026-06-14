import { cn } from '@/lib/cn'

/**
 * Straight yellow highlighter pass, Greg Isenberg "Blog" style.
 *
 * A clean tape strip with lightly chamfered ends (straight top and bottom,
 * short angled ends), tilted ~1.5deg so it reads like a quick marker swipe
 * rather than a pill or a blob. Sized to bisect the middle ~75% of the text it
 * sits behind: ascenders peek above the strip, descenders below, like a real
 * highlighter pass straight through the letterforms.
 *
 * Rendered as an absolutely positioned layer behind its content. Callers place
 * the text in a `relative` span on top and drive the reveal via `className`:
 * pass `scale-x-0 ... group-hover:scale-x-100` for the center-expand animation,
 * or `scale-x-100 opacity-100` for an always-on swipe.
 */
export function MarkerSwipe({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 origin-center',
        className,
      )}
    >
      <svg
        viewBox="0 0 100 22"
        preserveAspectRatio="none"
        className="absolute top-1/2 left-1/2 h-[75%] w-[110%]"
        style={{
          transform: 'translate(-50%, -50%) rotate(-1.5deg)',
          overflow: 'visible',
        }}
      >
        <path
          d="M 1,11 L 6,3.5 L 94,3.5 L 99,11 L 94,18.5 L 6,18.5 Z"
          fill="var(--color-cta)"
          opacity="0.85"
        />
      </svg>
    </span>
  )
}
