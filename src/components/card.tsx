import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";

export function Card({
  className,
  children,
  as: As = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "li";
}) {
  return (
    <As
      className={cn(
        "rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 transition-colors hover:border-[color:var(--color-accent)]/60",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function LinkCard({
  href,
  className,
  children,
  ariaLabel,
  cta = "Read more",
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group block rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 transition-colors hover:border-[color:var(--color-accent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]",
        className,
      )}
    >
      {children}
      <div className="mt-6 inline-flex items-center gap-1.5 text-[color:var(--color-accent)] text-sm font-medium">
        {cta}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
