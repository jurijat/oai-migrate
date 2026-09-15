import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { ORIGIN } from './config.mjs';

export function toPath(url) {
  return new URL(url).pathname.replace(/\/+$/, '');
}

export function toSlug(url) {
  return toPath(url).replace(/^\//, '');
}

export function cacheKey(url) {
  const slug = toSlug(url);
  return slug === '' ? '__home' : slug.replace(/\//g, '__');
}

export function isInternal(href) {
  if (!href) return false;
  if (href.startsWith('//')) return false;
  if (href.startsWith('/')) return true;
  return href.startsWith(ORIGIN) || href.startsWith('http://www.openapis.org');
}

export function toRelative(href) {
  if (!href) return href;
  if (href.startsWith('//')) return `https:${href}`;
  if (href.startsWith('/')) return href;
  try {
    const u = new URL(href);
    if (u.hostname !== 'www.openapis.org' && u.hostname !== 'openapis.org') return href;
    return `${u.pathname.replace(/\/+$/, '') || '/'}${u.search}${u.hash}`;
  } catch {
    return href;
  }
}

export function stripSizeSuffix(url) {
  return url.replace(/-(\d+)x(\d+)(\.[a-zA-Z0-9]+)(?=$|\?)/, '$3');
}

const UPLOADS = /\/wp-content\/uploads\/sites\/31\/(.+)$/;
const RASTER = /\.(png|jpe?g|gif|webp)$/i;

export function localAssetPath(src) {
  const match = UPLOADS.exec(stripSizeSuffix(src.split('?')[0]));
  if (!match) return null;
  const rest = match[1];
  return `/img/uploads/${RASTER.test(rest) ? rest.replace(RASTER, '.webp') : rest}`;
}

export function localDocumentPath(href) {
  const match = UPLOADS.exec(href.split('?')[0]);
  if (!match) return null;
  if (RASTER.test(match[1])) return null;
  return `/img/uploads/${match[1]}`;
}

export async function ensureDir(file) {
  await mkdir(dirname(file), { recursive: true });
}

export async function writeJson(file, data) {
  await ensureDir(file);
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

export async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

export async function pool(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
