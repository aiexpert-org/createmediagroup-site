import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "ghost" | "ink";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)] disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)] hover:bg-[color:var(--color-accent-hover)]",
  outline:
    "border border-[color:var(--color-border-strong)] text-[color:var(--color-ink)] bg-transparent hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]",
  ghost:
    "text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)]",
  ink:
    "bg-[color:var(--color-ink)] text-[color:var(--color-background)] hover:bg-[color:var(--color-ink-soft)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  withArrow,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  withArrow,
  children,
}: CommonProps & { href: string }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
      {withArrow ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
    </Link>
  );
}
