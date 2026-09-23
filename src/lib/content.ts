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
  wordpressId: z.number().int().positive().optional(),
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
      return posts.sort(
        (a, b) =>
          b.date.localeCompare(a.date) ||
          (b.wordpressId ?? Infinity) - (a.wordpressId ?? Infinity) ||
          a.title.localeCompare(b.title),
      );
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

function fullyDecode(path: string): string {
  let current = path;
  for (let i = 0; i < 3; i += 1) {
    let next: string;
    try {
      next = decodeURIComponent(current);
    } catch {
      return current;
    }
    if (next === current) return current;
    current = next;
  }
  return current;
}

export function decodedPermalink(path: string): string {
  return fullyDecode(`/${path.replace(/^\/+|\/+$/g, '')}`);
}

export function normalizePermalink(path: string): string {
  return decodedPermalink(path).toLowerCase();
}

export async function findByPermalink(path: string): Promise<Post | Page | null> {
  const normalized = normalizePermalink(path);
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  const match = (doc: Post | Page) => normalizePermalink(doc.permalink) === normalized;
  return posts.find(match) ?? pages.find(match) ?? null;
}

const EXCERPT_LENGTH = 200;

const EXCERPT_WORDS = 30;

const CATEGORY_NAMES: Record<string, string> = {
  announcement: 'Announcement',
  blog: 'Blog',
  events: 'Events',
  news: 'News',
  presentation: 'Presentations',
  uncategorized: 'Uncategorized',
};

const BLOG_INDEX_CATEGORIES = new Set(['blog', 'announcement', 'news', 'presentation']);

export function isOnBlogIndex(post: Post): boolean {
  return BLOG_INDEX_CATEGORIES.has(post.category);
}

export function categoryName(slug: string): string {
  return CATEGORY_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

function plainText(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\\([\\`*_{}[\]()#+\-.!|<>])/g, '$1')
    .replace(/^\s*\|?\s*:?-{3,}.*$/gm, ' ')
    .replace(/[#>*_`|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(body: string, limit = EXCERPT_LENGTH): string {
  const text = plainText(body);
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(' ')).trimEnd()}…`;
}

export function wordExcerpt(body: string, words = EXCERPT_WORDS): string {
  const all = plainText(body).split(' ').filter(Boolean);
  if (all.length <= words) return all.join(' ');
  return `${all
    .slice(0, words)
    .join(' ')
    .replace(/[,;:.–—-]+$/, '')}…`;
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

const navSchema = z.array(
  z.object({
    label: z.string(),
    href: z.string().optional(),
    children: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
  }),
);

export type NavItem = z.infer<typeof navSchema>[number];

export async function getNav(): Promise<NavItem[]> {
  return navSchema.parse(yaml.load(await readFile('data/nav.yaml', 'utf8')));
}

const socialSchema = z.array(
  z.object({
    label: z.string(),
    href: z.string(),
    icon: z.enum(['linkedin', 'github']),
  }),
);

export type SocialLink = z.infer<typeof socialSchema>[number];

export async function getSocial(): Promise<SocialLink[]> {
  return socialSchema.parse(yaml.load(await readFile('data/social.yaml', 'utf8')));
}

const testimonialSchema = z.array(
  z.object({
    slug: z.string(),
    logo: z.string(),
    logoAlt: z.string().optional(),
    quote: z.string(),
  }),
);

const peopleSchema = z.object({
  current: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      term: z.string().optional(),
      photo: z.string(),
    }),
  ),
  former: z.array(z.object({ slug: z.string(), name: z.string(), term: z.string() })),
});

export type Testimonial = z.infer<typeof testimonialSchema>[number];
export type People = z.infer<typeof peopleSchema>;

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialSchema.parse(yaml.load(await readFile('data/testimonials.yaml', 'utf8')));
}

export async function getPeople(): Promise<People> {
  return peopleSchema.parse(yaml.load(await readFile('data/people.yaml', 'utf8')));
}
