import type { MetadataRoute } from 'next';
import { getPages, getPosts, getTaxonomy } from '@/lib/content';

export const dynamic = 'force-static';

const BASE = 'https://www.openapis.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages, taxonomy] = await Promise.all([getPosts(), getPages(), getTaxonomy()]);

  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  for (const page of pages) {
    if (page.permalink === '/') continue;
    entries.push({ url: `${BASE}${page.permalink}`, changeFrequency: 'monthly', priority: 0.7 });
  }
  for (const post of posts) {
    entries.push({ url: `${BASE}${post.permalink}`, lastModified: post.date, priority: 0.6 });
  }
  for (const category of taxonomy.categories.keys()) {
    entries.push({ url: `${BASE}/category/${category}`, priority: 0.3 });
  }
  for (const tag of taxonomy.tags.keys()) {
    entries.push({ url: `${BASE}/tag/${tag}`, priority: 0.2 });
  }
  for (const author of taxonomy.authors.keys()) {
    entries.push({ url: `${BASE}/author/${author}`, priority: 0.3 });
  }

  return entries;
}
