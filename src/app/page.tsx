import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocumentView } from '@/components/DocumentView';
import { findByPermalink } from '@/lib/content';
import { SITE_NAME, documentMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const doc = await findByPermalink('/');
  return doc ? { ...documentMetadata(doc), title: { absolute: SITE_NAME } } : {};
}

export default async function HomePage() {
  const doc = await findByPermalink('/');
  if (!doc) notFound();

  return <DocumentView doc={doc} />;
}
