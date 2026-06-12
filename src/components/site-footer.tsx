import Link from "next/link";
import { Container } from "./container";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/subscription", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <Container className="py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-serif text-xl tracking-tight text-[color:var(--color-ink)]"
            >
              Create
            </Link>
            <p className="mt-4 text-sm text-[color:var(--color-muted)] leading-relaxed">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-[color:var(--color-muted)]">
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="pt-1.5">
                {siteConfig.location.city}, {siteConfig.location.region}. Working with churches nationwide.
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[color:var(--color-border)] pt-6 text-xs text-[color:var(--color-muted)]">
          <p>
            © {year} {siteConfig.legalName}. Designed in Indiana.
          </p>
          <p className="italic font-serif">Unlimited graphic design for pastors and churches.</p>
        </div>
      </Container>
    </footer>
  );
}
