import Link from "next/link";
import { Container } from "./container";
import { siteConfig } from "@/lib/site-config";

const footerNav = [
  {
    heading: "Work",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/subscription", label: "Pricing" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/subscription#sermon-series", label: "Sermon series" },
      { href: "/subscription#social-media", label: "Social media" },
      { href: "/subscription#announcements", label: "Announcements" },
      { href: "/subscription#youth-and-kids", label: "Youth and kids" },
      { href: "/subscription#logos", label: "Logos and branding" },
      { href: "/subscription#signage", label: "Signage and print" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Emily" },
      { href: "/resources", label: "Resources" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-serif text-xl tracking-tight text-[color:var(--color-ink)]"
            >
              Create Media Group
            </Link>
            <p className="mt-5 max-w-sm text-sm text-[color:var(--color-muted)] leading-relaxed">
              Unlimited graphic design for pastors and churches. Sermon series,
              signage, social, kids and youth, announcements, brand. One flat
              monthly subscription.
            </p>
            <div className="mt-6 space-y-1.5 text-sm text-[color:var(--color-muted)]">
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
              <p className="pt-2">
                {siteConfig.location.city}, {siteConfig.location.region}. Working with churches nationwide.
              </p>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink)] font-medium">
                {group.heading}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[color:var(--color-border)] pt-6 text-xs text-[color:var(--color-muted)]">
          <p>
            © {year} {siteConfig.legalName}. Designed in Indiana. Working with churches everywhere.
          </p>
          <p className="italic font-serif">Unlimited graphic design for pastors and churches.</p>
        </div>
      </Container>
    </footer>
  );
}
