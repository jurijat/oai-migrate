export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.openapis.org').replace(
  /\/+$/,
  '',
);

export const PRODUCTION_URL = 'https://www.openapis.org';

export const isProduction = siteUrl === PRODUCTION_URL;

export function withBasePath(path: string): string {
  if (!basePath || !path.startsWith('/')) return path;
  if (path.startsWith(`${basePath}/`) || path === basePath) return path;
  return `${basePath}${path}`;
}
