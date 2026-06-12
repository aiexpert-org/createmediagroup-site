"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./container";
import { ButtonLink } from "./button";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/subscription", label: "Subscription" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-background)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-background)]/70">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
          aria-label="Create, home"
        >
          Create
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ButtonLink href="/contact" variant="primary" size="md">
            Start
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] hover:border-[color:var(--color-accent)] transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-[color:var(--color-border)] transition-[max-height,opacity] duration-300",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-6">
          <nav
            className="flex flex-col gap-4"
            aria-label="Mobile primary"
            onClick={() => setOpen(false)}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif text-2xl tracking-tight text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <ButtonLink
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Start
              </ButtonLink>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
