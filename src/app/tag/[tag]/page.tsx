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
    <div className="mx-auto max-w-content px-6 pb-20 pt-10">
      <header className="mb-6 border-b border-[#ddd] px-5 pb-[35px]">
        <p className="m-0 text-base tracking-normal text-black/[0.45]">Tag</p>
        <h1 className="m-0 text-3xl font-bold tracking-normal text-[#444] md:text-4xl">{tag}</h1>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
