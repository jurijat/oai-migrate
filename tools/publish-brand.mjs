import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'assets/brand/OpenAPI_Logo_Pantone-1.png';
const TARGET_DIR = 'public/brand';
const WIDTH = 560;

const GREY_SATURATION = 34;
const DARK_LUMINANCE = 150;
const LIGHT = 236;

async function base() {
  return sharp(SOURCE).trim().resize({ width: WIDTH, withoutEnlargement: true }).ensureAlpha();
}

async function light() {
  return (await base()).webp({ quality: 92 }).toBuffer();
}

async function dark() {
  const { data, info } = await (await base()).raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] < 24) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (saturation > GREY_SATURATION || luminance > DARK_LUMINANCE) continue;

    data[i] = LIGHT;
    data[i + 1] = LIGHT;
    data[i + 2] = LIGHT;
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .webp({ quality: 92 })
    .toBuffer();
}

async function main() {
  await mkdir(TARGET_DIR, { recursive: true });
  const [onLight, onDark] = await Promise.all([light(), dark()]);
  await writeFile(`${TARGET_DIR}/openapi-logo.webp`, onLight);
  await writeFile(`${TARGET_DIR}/openapi-logo-dark.webp`, onDark);

  const meta = await sharp(onLight).metadata();
  console.log(`brand logo: ${meta.width}x${meta.height}, light + dark variants`);
}

await main();
