import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type Resource = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  readTime: number; // minutes
  image?: string; // public-relative path, e.g. /portfolio/sermon-trees-11.jpg
  contentHtml: string;
};

export type ResourceMeta = Omit<Resource, "contentHtml">;

const RESOURCES_DIR = path.join(process.cwd(), "content", "resources");

function ensureDir() {
  if (!fs.existsSync(RESOURCES_DIR)) {
    fs.mkdirSync(RESOURCES_DIR, { recursive: true });
  }
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getAllResourceSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(RESOURCES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getResourceMetaBySlug(slug: string): ResourceMeta {
  const filePath = path.join(RESOURCES_DIR, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf8");
  const parsed = matter(file);
  const data = parsed.data as {
    title?: string;
    description?: string;
    date?: string;
    tags?: string[];
    image?: string;
  };
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    tags: data.tags ?? [],
    image: data.image,
    readTime: Math.max(1, Math.round(wordCount(parsed.content) / 220)),
  };
}

export async function getResourceBySlug(slug: string): Promise<Resource> {
  const filePath = path.join(RESOURCES_DIR, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(remarkHtml).process(content);
  const meta = data as {
    title?: string;
    description?: string;
    date?: string;
    tags?: string[];
    image?: string;
  };
  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    date: meta.date ?? new Date().toISOString().slice(0, 10),
    tags: meta.tags ?? [],
    image: meta.image,
    readTime: Math.max(1, Math.round(wordCount(content) / 220)),
    contentHtml: processed.toString(),
  };
}

export function getAllResourcesMeta(): ResourceMeta[] {
  return getAllResourceSlugs()
    .map((slug) => getResourceMetaBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
