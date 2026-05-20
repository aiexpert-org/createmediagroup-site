import { siteConfig } from "@/lib/site-config";

/**
 * JSON-LD structured data for Create Media Group.
 *
 * Multiple components so pages can compose only the schema they need:
 *   - OrganizationJsonLd       — root identity (sitewide)
 *   - LocalBusinessJsonLd      — local SEO (Noblesville / Indianapolis service area)
 *   - ServiceJsonLd            — pricing tiers
 *   - FaqJsonLd                — FAQ pages
 *   - BlogPostingJsonLd        — blog post pages
 *   - BreadcrumbJsonLd         — nested pages
 */

function jsonScript(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    founder: {
      "@type": "Person",
      name: siteConfig.owner.name,
      jobTitle: siteConfig.owner.title,
    },
    knowsAbout: [
      "Graphic design for churches",
      "Sermon series design",
      "Church branding",
      "Church social media design",
      "Church signage",
      "Ministry brand systems",
    ],
    sameAs: Object.values(siteConfig.links).filter(Boolean),
  });
}

export function LocalBusinessJsonLd() {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.shortDescription,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    areaServed: siteConfig.serviceArea.map((a) => ({
      "@type": "Place",
      name: a,
    })),
    serviceType: "Graphic design for churches",
  });
}

export function ServiceJsonLd() {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Unlimited graphic design subscription for churches",
    provider: { "@id": `${siteConfig.url}/#organization` },
    serviceType: "Graphic design subscription",
    areaServed: { "@type": "Country", name: "United States" },
    description:
      "Unlimited graphic design requests and revisions for pastors and churches — sermon series, social media, announcements, youth and kids, logos and branding, signage and print. One dedicated designer, flat monthly fee.",
    offers: [
      {
        "@type": "Offer",
        name: "Monthly",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: siteConfig.pricing.monthly.amount,
          priceCurrency: siteConfig.pricing.monthly.currency,
          unitText: "MON",
          billingIncrement: 1,
        },
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/subscription`,
      },
      {
        "@type": "Offer",
        name: "Annual prepay",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: siteConfig.pricing.annual.amount,
          priceCurrency: siteConfig.pricing.annual.currency,
          unitText: "ANN",
          billingIncrement: 1,
        },
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/subscription`,
      },
    ],
  });
}

export function FaqJsonLd({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  });
}

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  speakableSelectors = [".prose h2", ".prose p"],
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  speakableSelectors?: string[];
}) {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteConfig.url}/blog/${slug}#article`,
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.owner.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: speakableSelectors,
    },
    url: `${siteConfig.url}/blog/${slug}`,
  });
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  });
}
