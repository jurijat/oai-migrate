import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostList } from '@/components/PostList';
import { categoryName, getPosts, getTaxonomy } from '@/lib/content';

type Params = { category: string };

export async function generateStaticParams(): Promise<Params[]> {
  const { categories } = await getTaxonomy();
  return [...categories.keys()].map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `Category: ${categoryName(category)}`,
    alternates: { canonical: `/category/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const posts = (await getPosts()).filter((post) => post.category === category);
  if (!posts.length) notFound();

  return (
    <div className="mx-auto max-w-content px-6 pb-20 pt-10">
      <header className="mb-6 border-b border-[#ddd] px-5 pb-[35px]">
        <p className="m-0 text-base tracking-normal text-black/[0.45]">Category</p>
        <h1 className="m-0 text-3xl font-bold tracking-normal text-[#444] md:text-4xl">
          {categoryName(category)}
        </h1>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
