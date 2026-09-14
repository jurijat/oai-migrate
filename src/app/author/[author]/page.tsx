import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostList } from '@/components/PostList';
import { getAuthorName, getPosts, getTaxonomy } from '@/lib/content';

type Params = { author: string };

export async function generateStaticParams(): Promise<Params[]> {
  const { authors } = await getTaxonomy();
  return [...authors.keys()].map((author) => ({ author }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { author } = await params;
  const name = await getAuthorName(author);
  return { title: name, alternates: { canonical: `/author/${author}` } };
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { author } = await params;
  const posts = (await getPosts()).filter((post) => post.author === author);
  if (!posts.length) notFound();
  const name = await getAuthorName(author);

  return (
    <main className="mx-auto max-w-content px-6 py-16">
      <p className="text-brand-muted">Author</p>
      <h1 className="mb-10 text-4xl font-semibold tracking-oai">{name}</h1>
      <PostList posts={posts} />
    </main>
  );
}
