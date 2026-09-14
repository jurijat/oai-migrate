import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostList } from '@/components/PostList';
import { getPosts, getTaxonomy } from '@/lib/content';

type Params = { category: string };

export async function generateStaticParams(): Promise<Params[]> {
  const { categories } = await getTaxonomy();
  return [...categories.keys()].map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  return { title: `Category: ${category}`, alternates: { canonical: `/category/${category}` } };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const posts = (await getPosts()).filter((post) => post.category === category);
  if (!posts.length) notFound();

  return (
    <main className="mx-auto max-w-content px-6 py-16">
      <p className="text-brand-muted">Category</p>
      <h1 className="mb-10 text-4xl font-semibold tracking-oai">{category}</h1>
      <PostList posts={posts} />
    </main>
  );
}
