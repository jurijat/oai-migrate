import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostList } from '@/components/PostList';
import { getPosts, getTaxonomy } from '@/lib/content';

type Params = { tag: string };

export async function generateStaticParams(): Promise<Params[]> {
  const { tags } = await getTaxonomy();
  return [...tags.keys()].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Tag: ${tag}`, alternates: { canonical: `/tag/${tag}` } };
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const posts = (await getPosts()).filter((post) => post.tags.includes(tag));
  if (!posts.length) notFound();

  return (
    <main className="mx-auto max-w-content px-6 py-16">
      <p className="text-brand-muted">Tag</p>
      <h1 className="mb-10 text-4xl font-semibold tracking-oai">{tag}</h1>
      <PostList posts={posts} />
    </main>
  );
}
