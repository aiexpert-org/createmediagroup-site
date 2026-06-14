import Link from 'next/link'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  variant?: Variant
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-cta)] text-[var(--color-cta-ink)] hover:bg-[var(--color-cta-hover)] focus-visible:outline-[var(--color-cta-ink)]',
  secondary:
    'bg-neutral-950 text-white hover:bg-neutral-800 focus-visible:outline-neutral-950',
  ghost:
    'bg-transparent text-neutral-950 ring-1 ring-inset ring-neutral-900/15 hover:ring-[var(--color-cta)] hover:bg-[var(--color-cta)]/10 focus-visible:outline-neutral-950',
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const merged = cn(
    'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variants[variant],
    className,
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={merged} {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link className={merged} {...props}>
      {children}
    </Link>
  )
}
