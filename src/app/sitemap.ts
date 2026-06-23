import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { getAllPosts } from '@/lib/blog'
import { getAllCaseStudySlugs } from '@/lib/case-studies'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const routes = ['/', '/how-it-works', '/subscription', '/portfolio', '/case-studies', '/resources', '/contact']

  const baseEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))

  // Per-article lastmod from each post's own publish date, not the build time.
  const posts = await getAllPosts()
  const articleEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/resources/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudySlugs().map((slug) => ({
    url: `${siteConfig.url}/case-studies/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...baseEntries, ...articleEntries, ...caseStudyEntries]
}
