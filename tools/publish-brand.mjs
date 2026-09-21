import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'assets/brand/OpenAPI_Logo_Pantone-1.png';
const MARK = 'assets/brand/favicon-source.png';
const HERO = 'assets/brand/hero-background.jpg';
const TARGET_DIR = 'public/brand';
const WIDTH = 560;

const ICON_SIZES = [32, 180, 192, 512];
const OG = { width: 1200, height: 630, background: '#15191c' };

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

async function icons() {
  for (const size of ICON_SIZES) {
    const buffer = await sharp(MARK)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    await writeFile(`${TARGET_DIR}/icon-${size}.png`, buffer);
  }
  return ICON_SIZES.length;
}

async function hero() {
  const buffer = await sharp(HERO).webp({ quality: 82 }).toBuffer();
  await writeFile(`${TARGET_DIR}/hero-background.webp`, buffer);
  const meta = await sharp(buffer).metadata();
  return `${meta.width}x${meta.height}`;
}

async function openGraph() {
  const logo = await sharp(SOURCE)
    .trim()
    .resize({ width: Math.round(OG.width * 0.62), withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < logo.data.length; i += logo.info.channels) {
    if (logo.data[i + 3] < 24) continue;
    const r = logo.data[i];
    const g = logo.data[i + 1];
    const b = logo.data[i + 2];
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (saturation > GREY_SATURATION || luminance > DARK_LUMINANCE) continue;
    logo.data[i] = LIGHT;
    logo.data[i + 1] = LIGHT;
    logo.data[i + 2] = LIGHT;
  }

  const overlay = await sharp(logo.data, { raw: logo.info }).png().toBuffer();

  const image = await sharp({
    create: {
      width: OG.width,
      height: OG.height,
      channels: 4,
      background: OG.background,
    },
  })
    .composite([{ input: overlay, gravity: 'centre' }])
    .png()
    .toBuffer();

  await writeFile(`${TARGET_DIR}/opengraph.png`, image);
}

async function main() {
  await mkdir(TARGET_DIR, { recursive: true });
  const [onLight, onDark] = await Promise.all([light(), dark()]);
  await writeFile(`${TARGET_DIR}/openapi-logo.webp`, onLight);
  await writeFile(`${TARGET_DIR}/openapi-logo-dark.webp`, onDark);

  const iconCount = await icons();
  const heroSize = await hero();
  await openGraph();

  const meta = await sharp(onLight).metadata();
  console.log(
    `brand: logo ${meta.width}x${meta.height} light+dark, ${iconCount} icons, hero ${heroSize}, opengraph ${OG.width}x${OG.height}`,
  );
}

await main();
