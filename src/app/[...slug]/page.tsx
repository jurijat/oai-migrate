import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocumentView } from '@/components/DocumentView';
import { decodedPermalink, findByPermalink, getPages, getPosts } from '@/lib/content';

type Params = { slug: string[] };

export async function generateStaticParams(): Promise<Params[]> {
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  return [...posts, ...pages]
    .filter((doc) => doc.permalink !== '/')
    .map((doc) => ({ slug: decodedPermalink(doc.permalink).replace(/^\//, '').split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await findByPermalink(slug.join('/'));
  if (!doc) return {};
  return { title: doc.title, alternates: { canonical: doc.permalink } };
}

export default async function DocumentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = await findByPermalink(slug.join('/'));
  if (!doc) notFound();

  return <DocumentView doc={doc} />;
}
