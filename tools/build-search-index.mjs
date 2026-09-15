import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { ensureDir } from './migrate/lib.mjs';

const SOURCES = ['content/blog', 'content/pages', 'content/cfp'];
const TARGET = 'public/search-index.json';
const EXCERPT = 220;

async function walk(dir) {
  const out = [];
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

function plain(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  const entries = [];

  for (const dir of SOURCES) {
    for (const file of await walk(dir)) {
      const { data, content } = matter(await readFile(file, 'utf8'));
      if (!data.permalink || !data.title) continue;
      const text = plain(content);
      entries.push({
        title: data.title,
        permalink: data.permalink,
        kind: data.date ? 'post' : 'page',
        date: data.date ?? null,
        category: data.category ?? null,
        excerpt: text.slice(0, EXCERPT),
        text: text.slice(0, 1200).toLowerCase(),
      });
    }
  }

  entries.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  await ensureDir(TARGET);
  await writeFile(TARGET, JSON.stringify(entries));
  console.log(`search index: ${entries.length} documents`);
}

await main();
