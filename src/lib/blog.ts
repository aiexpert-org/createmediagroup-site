import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  readTime: number; // minutes
  contentHtml: string;
};

export type BlogPostMeta = Omit<BlogPost, "contentHtml">;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getAllPostSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostMetaBySlug(slug: string): BlogPostMeta {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf8");
  const parsed = matter(file);
  const data = parsed.data as {
    title?: string;
    description?: string;
    date?: string;
    tags?: string[];
  };
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    tags: data.tags ?? [],
    readTime: Math.max(1, Math.round(wordCount(parsed.content) / 220)),
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(remarkHtml).process(content);
  const meta = data as {
    title?: string;
    description?: string;
    date?: string;
    tags?: string[];
  };
  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    date: meta.date ?? new Date().toISOString().slice(0, 10),
    tags: meta.tags ?? [],
    readTime: Math.max(1, Math.round(wordCount(content) / 220)),
    contentHtml: processed.toString(),
  };
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => getPostMetaBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
