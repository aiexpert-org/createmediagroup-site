import type { Metadata } from 'next'

import { siteConfig } from '@/lib/site-config'

type BuildMetadataOptions = {
  /** Short page title. Omit on the home page. */
  title?: string
  /** Unique meta + og description for the page. */
  description: string
  /** Path beginning with a slash. Drives the self-referential canonical and og:url. */
  path: string
  /** Override the default og image. Defaults to the site card. */
  ogImage?: string
  /** og type, defaults to website. Use 'article' on resource and case-study pages. */
  type?: 'website' | 'article'
}

/**
 * Single source of truth for per-page metadata. Guarantees a self-referential
 * canonical on the canonical host, a unique og:title / og:description, a
 * matching og:url, and an og:image + twitter:image on every page. Pass the short
 * title and the framework appends the brand via the title template; the og:title
 * is composed to the full brand string here so social cards read correctly.
 * Separator is ` | ` to match the layout title template; the home title uses a
 * colon since the brand leads the string.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  type = 'website',
}: BuildMetadataOptions): Metadata {
  const isHome = path === '/'
  const fullTitle = isHome
    ? `${siteConfig.brand}: Unlimited graphic design for churches`
    : `${title} | ${siteConfig.brand}`
  const image = ogImage ?? siteConfig.ogImage

  return {
    // Home sets an absolute title so the template suffix is not doubled. Inner
    // pages pass the short title and let the layout template add the brand.
    title: isHome ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: fullTitle,
      description,
      siteName: siteConfig.brand,
      locale: 'en_US',
      url: path,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.brand}, unlimited church graphic design`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}
