import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'assets/uploads';
const TARGET_DIR = 'public/img/uploads';
const RASTER = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);
const MAX_WIDTH = 1600;
const QUALITY = 82;

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
    else out.push(full);
  }
  return out;
}

async function isStale(source, target) {
  try {
    const [a, b] = await Promise.all([stat(source), stat(target)]);
    return a.mtimeMs > b.mtimeMs;
  } catch {
    return true;
  }
}

async function main() {
  const files = await walk(SOURCE_DIR);
  if (!files.length) {
    console.log('no source assets; run npm run migrate:assets');
    return;
  }

  await rm(TARGET_DIR, { recursive: true, force: true });

  let converted = 0;
  let copied = 0;

  for (const source of files) {
    const rel = relative(SOURCE_DIR, source);
    const ext = extname(rel).toLowerCase();
    const isRaster = RASTER.has(ext);
    const target = join(TARGET_DIR, isRaster ? rel.replace(/\.[^.]+$/, '.webp') : rel);

    await mkdir(dirname(target), { recursive: true });
    if (!(await isStale(source, target))) continue;

    if (isRaster) {
      const image = sharp(source, { animated: ext === '.gif' });
      const meta = await image.metadata();
      const pipeline =
        meta.width && meta.width > MAX_WIDTH
          ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
          : image;
      await writeFile(target, await pipeline.webp({ quality: QUALITY }).toBuffer());
      converted += 1;
    } else {
      await writeFile(target, await readFile(source));
      copied += 1;
    }
  }

  console.log(`published ${converted} converted, ${copied} copied to ${TARGET_DIR}`);
}

await main();
