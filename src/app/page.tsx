import { notFound } from 'next/navigation';
import { DocumentView } from '@/components/DocumentView';
import { findByPermalink } from '@/lib/content';

export default async function HomePage() {
  const doc = await findByPermalink('/');
  if (!doc) notFound();

  return <DocumentView doc={doc} />;
}
