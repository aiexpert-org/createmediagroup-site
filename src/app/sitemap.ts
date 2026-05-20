import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllPostsMeta } from "@/lib/blog";

const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/subscription", priority: 0.95, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.85, changeFrequency: "weekly" },
  { path: "/case-studies", priority: 0.85, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = staticRoutes.map((r) => ({
    url: `${siteConfig.url}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const blogEntries = getAllPostsMeta().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date + "T00:00:00"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
