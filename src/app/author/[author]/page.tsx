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
    <div className="mx-auto max-w-content px-6 pb-20 pt-10">
      <header className="mb-6 border-b border-[#ddd] px-5 pb-[35px]">
        <p className="m-0 text-base tracking-normal text-black/[0.45]">Author</p>
        <h1 className="m-0 text-3xl font-bold tracking-normal text-[#444] md:text-4xl">{name}</h1>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
