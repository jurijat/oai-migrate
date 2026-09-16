import type { Metadata } from 'next';
import { excerpt, isPost, type Page, type Post } from '@/lib/content';
import { siteUrl, withBasePath } from '@/lib/site';

export const SITE_NAME = 'OpenAPI Initiative';

export const SITE_DESCRIPTION =
  'The OpenAPI Initiative provides an open source, technical community within which industry participants may easily contribute to building a vendor-neutral, portable and open specification for providing technical metadata for REST APIs.';

export const OG_IMAGE = {
  url: '/brand/opengraph.png',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

export const ICONS: Metadata['icons'] = {
  icon: [
    { url: withBasePath('/brand/icon-32.png'), sizes: '32x32', type: 'image/png' },
    { url: withBasePath('/brand/icon-192.png'), sizes: '192x192', type: 'image/png' },
    { url: withBasePath('/brand/icon-512.png'), sizes: '512x512', type: 'image/png' },
  ],
  apple: [{ url: withBasePath('/brand/icon-180.png'), sizes: '180x180', type: 'image/png' }],
};

export function documentMetadata(doc: Post | Page): Metadata {
  const description = excerpt(doc.body) || SITE_DESCRIPTION;
  const url = `${siteUrl}${doc.permalink === '/' ? '' : doc.permalink}/`;

  return {
    title: doc.title,
    description,
    alternates: { canonical: doc.permalink },
    openGraph: {
      type: isPost(doc) ? 'article' : 'website',
      siteName: SITE_NAME,
      title: doc.title,
      description,
      url,
      images: [OG_IMAGE],
      ...(isPost(doc)
        ? { publishedTime: `${doc.date}T00:00:00.000Z`, tags: doc.tags, authors: [doc.author] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function listingMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: `${siteUrl}${path}/`,
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
  };
}
