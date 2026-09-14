import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/Mdx';
import { PostHeader } from '@/components/PostHeader';
import { findByPermalink, getPages, getPosts, isPost } from '@/lib/content';

type Params = { slug: string[] };

export async function generateStaticParams(): Promise<Params[]> {
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  return [...posts, ...pages]
    .filter((doc) => doc.permalink !== '/')
    .map((doc) => ({ slug: doc.permalink.replace(/^\//, '').split('/') }));
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

  return (
    <article className="mx-auto max-w-prose px-6 py-16">
      {isPost(doc) ? (
        <PostHeader post={doc} />
      ) : (
        <h1 className="mb-8 text-4xl font-semibold tracking-oai">{doc.title}</h1>
      )}
      <div className="prose prose-lg max-w-none">
        <Mdx source={doc.body} format={doc.file.endsWith('.mdx') ? 'mdx' : 'md'} />
      </div>
    </article>
  );
}
