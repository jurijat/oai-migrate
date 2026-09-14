import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { z } from 'zod';

const BLOG_DIR = 'content/blog';
const PAGES_DIR = 'content/pages';
const CFP_DIR = 'content/cfp';

const permalink = z.string().regex(/^\/(?:[\w%().-]+\/?)*$/);

const postFrontmatter = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  permalink,
  generated: z.boolean().default(false),
});

const pageFrontmatter = z.object({
  title: z.string().min(1),
  permalink,
  layout: z.enum(['prose', 'composed', 'cfp']),
  draft: z.boolean().default(false),
  generated: z.boolean().default(false),
});

const authorSchema = z.array(z.object({ slug: z.string(), name: z.string() }));
const redirectSchema = z.array(
  z.object({ from: z.string(), to: z.string(), reason: z.string().optional() }),
);

export type Post = z.infer<typeof postFrontmatter> & { body: string; file: string };
export type Page = z.infer<typeof pageFrontmatter> & { body: string; file: string };
export type Author = { slug: string; name: string };
export type Redirect = { from: string; to: string; reason?: string };

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  let items;
  try {
    items = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const item of items) {
    const full = join(dir, item.name);
    if (item.isDirectory()) out.push(...(await walk(full)));
    else if (/\.mdx?$/.test(item.name)) out.push(full);
  }
  return out;
}

async function parse<S extends z.ZodTypeAny>(
  file: string,
  schema: S,
): Promise<z.infer<S> & { body: string; file: string }> {
  const raw = await readFile(file, 'utf8');
  const { data, content } = matter(raw);
  const result = schema.safeParse(data);
  if (!result.success) {
    const detail = result.error.issues
      .map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`${file}: invalid frontmatter\n${detail}`);
  }
  return { ...result.data, body: content, file };
}

let postsCache: Promise<Post[]> | null = null;
let pagesCache: Promise<Page[]> | null = null;

export function getPosts(): Promise<Post[]> {
  if (!postsCache) {
    postsCache = (async () => {
      const files = await walk(BLOG_DIR);
      const posts = await Promise.all(files.map((f) => parse(f, postFrontmatter)));
      return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
    })();
  }
  return postsCache;
}

export function getPages(): Promise<Page[]> {
  if (!pagesCache) {
    pagesCache = (async () => {
      const files = [...(await walk(PAGES_DIR)), ...(await walk(CFP_DIR))];
      return Promise.all(files.map((f) => parse(f, pageFrontmatter)));
    })();
  }
  return pagesCache;
}

export async function getAuthors(): Promise<Author[]> {
  return authorSchema.parse(yaml.load(await readFile('data/authors.yaml', 'utf8')));
}

export async function getRedirects(): Promise<Redirect[]> {
  return redirectSchema.parse(yaml.load(await readFile('data/redirects.yaml', 'utf8')));
}

export async function getAuthorName(slug: string): Promise<string> {
  const authors = await getAuthors();
  return authors.find((a) => a.slug === slug)?.name ?? slug;
}

export async function findByPermalink(path: string): Promise<Post | Page | null> {
  const normalized = `/${path.replace(/^\/+|\/+$/g, '')}`;
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  return (
    posts.find((p) => p.permalink === normalized) ??
    pages.find((p) => p.permalink === normalized) ??
    null
  );
}

export function isPost(doc: Post | Page): doc is Post {
  return 'date' in doc;
}

export async function getTaxonomy() {
  const posts = await getPosts();
  const categories = new Map<string, number>();
  const tags = new Map<string, number>();
  const authors = new Map<string, number>();
  for (const post of posts) {
    categories.set(post.category, (categories.get(post.category) ?? 0) + 1);
    authors.set(post.author, (authors.get(post.author) ?? 0) + 1);
    for (const tag of post.tags) tags.set(tag, (tags.get(tag) ?? 0) + 1);
  }
  return { categories, tags, authors };
}
