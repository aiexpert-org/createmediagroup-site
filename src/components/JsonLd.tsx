import { siteConfig } from '@/lib/site-config'

export function OrganizationJsonLd() {
  const sameAs: string[] = []
  if (siteConfig.googleBusinessUrl) sameAs.push(siteConfig.googleBusinessUrl)

  // Service-area business (no storefront), publicly based in Indianapolis and
  // serving the surrounding metro. areaServed drives which local Map Pack
  // queries CCM can surface for.
  // Local Indianapolis-metro signals for the Map Pack, plus the United States
  // since the client roster spans 11+ states (the work is remote-first).
  const areaServed = [
    { '@type': 'City', name: 'Indianapolis' },
    { '@type': 'City', name: 'Carmel' },
    { '@type': 'City', name: 'Fishers' },
    { '@type': 'City', name: 'Noblesville' },
    { '@type': 'City', name: 'Westfield' },
    { '@type': 'City', name: 'Greenwood' },
    { '@type': 'AdministrativeArea', name: 'Hamilton County, IN' },
    { '@type': 'State', name: 'Indiana' },
    { '@type': 'Country', name: 'United States' },
  ]

  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteConfig.url}#organization`,
    name: siteConfig.brand,
    alternateName: siteConfig.shortBrand,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    priceRange: '$$',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: siteConfig.email,
        contactType: 'customer support',
        availableLanguage: 'English',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: 'US',
    },
    areaServed,
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 39.7684,
        longitude: -86.1581,
      },
      // ~50 mile radius around Indianapolis, covering the metro.
      geoRadius: 80467,
    },
    founder: {
      '@type': 'Person',
      name: siteConfig.designer,
      jobTitle: 'Graphic Designer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.state,
        addressCountry: 'US',
      },
    },
    sameAs,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ServiceJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Unlimited graphic design for churches',
    provider: {
      '@type': 'Organization',
      name: siteConfig.brand,
      url: siteConfig.url,
    },
    serviceType: 'Graphic design subscription',
    areaServed: [
      { '@type': 'City', name: 'Indianapolis' },
      { '@type': 'City', name: 'Carmel' },
      { '@type': 'City', name: 'Fishers' },
      { '@type': 'City', name: 'Noblesville' },
      { '@type': 'City', name: 'Westfield' },
      { '@type': 'City', name: 'Greenwood' },
      { '@type': 'AdministrativeArea', name: 'Hamilton County, IN' },
      { '@type': 'Country', name: 'United States' },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Monthly subscription',
        price: siteConfig.pricing.monthly,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: siteConfig.pricing.monthly,
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
      },
      {
        '@type': 'Offer',
        name: 'Annual prepay',
        price: siteConfig.pricing.annual,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: siteConfig.pricing.annual,
          priceCurrency: 'USD',
          unitText: 'YEAR',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

type ArticleJsonLdProps = {
  title: string
  description: string
  slug: string
  date: string
  image?: string
}

export function ArticleJsonLd({ title, description, slug, date, image }: ArticleJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: siteConfig.designer,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brand,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/resources/${slug}`,
    },
  }
  if (image) data.image = `${siteConfig.url}${image}`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

type BreadcrumbItem = { name: string; path: string }

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

type CaseStudyJsonLdProps = {
  church: string
  excerpt: string
  slug: string
  location: string
  image?: string
}

export function CaseStudyJsonLd({
  church,
  excerpt,
  slug,
  location,
  image,
}: CaseStudyJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${church} church design case study`,
    description: excerpt,
    about: {
      '@type': 'Organization',
      name: church,
      location,
    },
    author: {
      '@type': 'Person',
      name: siteConfig.designer,
      url: siteConfig.url,
    },
    creator: {
      '@type': 'Person',
      name: siteConfig.designer,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brand,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.ogImage}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/case-studies/${slug}`,
    },
  }
  if (image) data.image = `${siteConfig.url}${image}`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
