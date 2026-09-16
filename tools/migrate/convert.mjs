import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import yaml from 'js-yaml';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { CFP, CFP_TITLES, HTML_DIR, MANIFEST_FILE, URLS_FILE, classifyPage } from './config.mjs';
import {
  ensureDir,
  localAssetPath,
  localDocumentPath,
  readJson,
  stripSizeSuffix,
  toRelative,
  writeJson,
} from './lib.mjs';
import { extract } from './extract.mjs';

function createTurndown(collected) {
  const service = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
  });
  service.use(gfm);

  service.remove(['form', 'input', 'button', 'svg']);

  service.addRule('embed', {
    filter: 'iframe',
    replacement: (_content, node) => {
      const src = (node.getAttribute('src') ?? '').replace(/^\/\//, 'https://');
      if (!src) return '';

      const youtube = /youtube(?:-nocookie)?\.com\/embed\/([\w-]+)/.exec(src);
      if (youtube)
        return `\n\n[Watch the video](https://www.youtube.com/watch?v=${youtube[1]})\n\n`;

      const slideshare = /slideshare\.net\/slideshow\/embed_code\/key\/([\w-]+)/.exec(src);
      if (slideshare) {
        return `\n\n[View the presentation](https://www.slideshare.net/slideshow/embed_code/key/${slideshare[1]})\n\n`;
      }

      const form = /docs\.google\.com\/forms\/d\/e\/([\w-]+)/.exec(src);
      if (form) {
        return `\n\n[Open the form](https://docs.google.com/forms/d/e/${form[1]}/viewform)\n\n`;
      }

      collected.unhandledEmbeds.add(src);
      return `\n\n[Open embedded content](${src})\n\n`;
    },
  });

  service.addRule('link', {
    filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
    replacement: (content, node) => {
      const raw = node.getAttribute('href') ?? '';
      const document = localDocumentPath(raw);
      if (document) collected.assets.set(raw.split('?')[0], document);
      const href = document ?? toRelative(raw);
      if (href.startsWith('/')) collected.internalLinks.add(href);
      const text = content.replace(/\s+/g, ' ').trim();
      if (!text) return '';
      return `[${text}](${href})`;
    },
  });

  service.addRule('image', {
    filter: 'img',
    replacement: (_content, node) => {
      const src = node.getAttribute('src') ?? '';
      const alt = (node.getAttribute('alt') ?? '').replace(/\s+/g, ' ').trim();
      const local = localAssetPath(src);
      if (local) collected.assets.set(stripSizeSuffix(src.split('?')[0]), local);
      return `![${alt}](${local ?? src})`;
    },
  });

  service.addRule('cellBreak', {
    filter: (node) => node.nodeName === 'BR' && !!node.closest?.('td, th'),
    replacement: () => '<br />',
  });

  service.addRule('figure', {
    filter: 'figure',
    replacement: (content) => `\n\n${content.replace(/\s+/g, ' ').trim()}\n\n`,
  });

  service.addRule('figcaption', {
    filter: 'figcaption',
    replacement: (content) => {
      const text = content.replace(/\s+/g, ' ').trim();
      return text ? `\n\n_${text}_\n\n` : '';
    },
  });

  return service;
}

const ALLOWED_HTML = new Set([
  'a',
  'b',
  'br',
  'code',
  'div',
  'em',
  'figcaption',
  'figure',
  'hr',
  'i',
  'img',
  'li',
  'mark',
  'ol',
  'pre',
  's',
  'span',
  'strong',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'ul',
]);

const TAG = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s[^<>]*)?)(\/?)>/g;

export function escapeStrayTags(markdown) {
  return markdown.replace(TAG, (match, _close, name) =>
    ALLOWED_HTML.has(name.toLowerCase()) ? match : match.replace('<', '&lt;'),
  );
}

const PAIRED_SHORTCODE = /\\?\[([a-z][a-z0-9_]*)(?:\s[^\]\n]*?)?\\?\]([\s\S]*?)\\?\[\/\1\\?\]/g;
const SHORTCODE = /\\?\[(\/?[a-z][a-z0-9_]*)(?=[\s\\\]])([^\]\n]*?)\\?\](?!\()/g;
const BARE_URL = /^<?(https?:\/\/[^\s<>]+)>?$/;

function unescapeAttr(value) {
  return value
    .replace(/\\([_*[\]()])/g, '$1')
    .replace(/[\u201c\u201d\u2033]/g, '"')
    .replace(/[\u2018\u2019\u2032]/g, "'");
}

export function stripShortcodes(markdown) {
  const removed = [];

  const unpaired = markdown.replace(PAIRED_SHORTCODE, (_match, name, inner) => {
    const body = unescapeAttr(inner).trim();
    const url = BARE_URL.exec(body);
    if (url) {
      removed.push(`${name} -> ${url[1]}`);
      return `\n\n[Watch the video](${url[1]})\n\n`;
    }
    removed.push(name);
    return body;
  });

  const cleaned = unpaired.replace(SHORTCODE, (match, name, attrs) => {
    const source = /src=["']([^"']+)["']/.exec(unescapeAttr(attrs));
    if (source) {
      removed.push(`${name} -> ${source[1]}`);
      return `[Open the embedded content](${source[1]})`;
    }
    removed.push(name);
    return '';
  });

  return { markdown: cleaned, removed };
}

export function mergeAdjacentCode(markdown) {
  let previous;
  let current = markdown;
  do {
    previous = current;
    current = current.replace(/```\n\n```\n/g, '\n');
  } while (current !== previous);
  return current;
}

export function balanceEmphasis(markdown) {
  let fenced = false;

  return markdown
    .split('\n')
    .map((line) => {
      if (line.trimStart().startsWith('```')) {
        fenced = !fenced;
        return line;
      }
      if (fenced) return line;

      const marks = line.match(/\*\*/g);
      if (!marks || marks.length % 2 === 0) return line;

      const index = line.lastIndexOf('**');
      return `${line.slice(0, index)}${line.slice(index + 2)}`;
    })
    .join('\n');
}

function tidy(markdown) {
  return `${mergeAdjacentCode(
    balanceEmphasis(escapeStrayTags(markdown).replace(/\*\*\s*\*\*/g, '')),
  )
    .replace(/ /g, ' ')
    .replace(/^[ \t]*\\[ \t]*$/gm, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`;
}

function frontmatter(data) {
  const body = yaml.dump(data, { lineWidth: 100, noRefs: true, quotingType: '"' });
  return `---\n${body}---\n\n`;
}

function outputFor(record) {
  if (record.kind === 'post') {
    const [year, month, day] = record.date.split('-');
    const slug = record.slug.split('/').pop();
    return join('content/blog', year, month, day, `${slug}.md`);
  }
  if (record.pageKind === 'cfp') return join('content/cfp', `${CFP[record.slug]}.md`);
  const name = record.slug === '' ? 'index' : record.slug;
  return join('content/pages', `${name}.mdx`);
}

function postFrontmatter(record) {
  return {
    title: record.title,
    date: record.date,
    author: record.author,
    category: record.category,
    ...(record.tags.length ? { tags: record.tags } : {}),
    permalink: record.permalink,
    generated: true,
  };
}

function pageTitle(record) {
  if (record.pageKind !== 'cfp') return record.title;
  const event = CFP_TITLES[CFP[record.slug]];
  return event ? `Call for Proposals: ${event}` : record.title;
}

function pageFrontmatter(record) {
  return {
    title: pageTitle(record),
    permalink: record.permalink,
    layout: record.pageKind === 'composed' ? 'composed' : record.pageKind,
    ...(record.pageKind === 'composed' ? { draft: true } : {}),
    generated: true,
  };
}

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

async function clearGenerated(dirs) {
  const kept = [];
  for (const dir of dirs) {
    for (const file of await walk(dir)) {
      const head = (await readFile(file, 'utf8')).slice(0, 600);
      if (/^generated:\s*true\s*$/m.test(head)) await rm(file);
      else kept.push(file);
    }
  }
  return kept;
}

async function mergeAuthors(discovered) {
  let existing = [];
  try {
    existing = yaml.load(await readFile('data/authors.yaml', 'utf8')) ?? [];
  } catch {
    existing = [];
  }

  const merged = new Map();
  for (const entry of existing) merged.set(entry.slug, entry);
  for (const [slug, name] of discovered) {
    if (merged.has(slug)) continue;
    merged.set(slug, { slug, name });
  }

  const list = [...merged.values()].sort((a, b) => a.slug.localeCompare(b.slug));
  await ensureDir('data/authors.yaml');
  await writeFile('data/authors.yaml', yaml.dump(list, { lineWidth: 100, quotingType: '"' }));
  return list;
}

async function main() {
  const entries = await readJson(URLS_FILE);
  const handAuthored = await clearGenerated(['content/blog', 'content/pages', 'content/cfp']);
  const protectedFiles = new Set(handAuthored);

  const assets = new Map();
  const authors = new Map();
  const manifest = [];

  for (const entry of entries) {
    const kind = entry.type === 'page' ? classifyPage(entry.slug) : 'post';
    if (kind === 'dropped' || kind === 'generated' || kind === 'moved') {
      manifest.push({ url: entry.url, slug: entry.slug, kind, status: 'skipped' });
      continue;
    }

    const html = await readFile(join(HTML_DIR, `${entry.key}.html`), 'utf8');
    const record = extract(html, entry);
    const collected = {
      assets: new Map(),
      internalLinks: new Set(),
      unhandledEmbeds: new Set(),
    };
    const service = createTurndown(collected);
    const stripped = stripShortcodes(service.turndown(record.bodyHtml));
    const markdown = tidy(stripped.markdown);

    for (const [remote, local] of collected.assets) assets.set(remote, local);
    if (record.author && record.authorName) authors.set(record.author, record.authorName);

    const data = record.kind === 'post' ? postFrontmatter(record) : pageFrontmatter(record);
    const file = outputFor(record);
    if (protectedFiles.has(file)) {
      manifest.push({
        url: entry.url,
        slug: entry.slug,
        kind,
        status: 'hand-authored',
        permalink: record.permalink,
        title: record.title,
        file,
      });
      continue;
    }
    await ensureDir(file);
    await writeFile(file, frontmatter(data) + markdown);

    manifest.push({
      url: entry.url,
      slug: entry.slug,
      kind: record.kind === 'post' ? 'post' : record.pageKind,
      status: 'converted',
      permalink: record.permalink,
      title: record.title,
      file,
      chars: markdown.length,
      codeBlocks: record.codeBlocks ?? 0,
      dropped: record.dropped ?? [],
      shortcodes: stripped.removed,
      leftoverHtml: [
        ...new Set(
          [...markdown.matchAll(TAG)]
            .map((m) => m[2].toLowerCase())
            .filter((t) => ALLOWED_HTML.has(t)),
        ),
      ],
      warnings: record.warnings,
      internalLinks: [...collected.internalLinks],
      unhandledEmbeds: [...collected.unhandledEmbeds],
      assets: [...collected.assets.keys()],
    });
  }

  await writeJson(MANIFEST_FILE, {
    generatedAt: new Date().toISOString(),
    entries: manifest,
    assets: Object.fromEntries(assets),
  });

  const authorList = await mergeAuthors(authors);

  const converted = manifest.filter((m) => m.status === 'converted');
  const preserved = manifest.filter((m) => m.status === 'hand-authored');
  console.log(`converted ${converted.length}, skipped ${manifest.length - converted.length}`);
  if (preserved.length) console.log(`preserved hand-authored: ${preserved.length}`);
  console.log(`assets referenced: ${assets.size}`);
  console.log(`authors: ${authorList.length}`);
}

await main();
