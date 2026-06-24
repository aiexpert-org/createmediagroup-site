import type { MetadataRoute } from 'next'
import fsSync from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

import { siteConfig } from '@/lib/site-config'
import { getAllPostSlugs } from '@/lib/blog'
import { getAllCaseStudySlugs } from '@/lib/case-studies'

// Force the sitemap to be generated at build time as a static asset so it is
// always served as valid XML at /sitemap.xml. Without this, edge runtimes can
// occasionally return a binary-encoded payload that breaks crawler parsing.
export const dynamic = 'force-static'
export const revalidate = 3600

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function readPostDate(slug: string): Date {
  try {
    const raw = fsSync.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8')
    const { data } = matter(raw)
    if (data?.date) {
      const d = new Date(String(data.date))
      if (!Number.isNaN(d.getTime())) return d
    }
  } catch {
    // fall through to default
  }
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date()
  const routes = [
    '/',
    '/how-it-works',
    '/subscription',
    '/portfolio',
    '/case-studies',
    '/resources',
    '/contact',
  ]

  const baseEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route === '/' ? '' : route}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))

  const articleEntries: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: `${siteConfig.url}/resources/${slug}`,
    lastModified: readPostDate(slug),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudySlugs().map((slug) => ({
    url: `${siteConfig.url}/case-studies/${slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...baseEntries, ...articleEntries, ...caseStudyEntries]
}
