import type { Metadata } from 'next';
import { PostList } from '@/components/PostList';
import { getPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  alternates: { canonical: '/blog' },
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-content px-6 py-16">
      <h1 className="mb-10 text-4xl font-semibold tracking-oai">Blog</h1>
      <PostList posts={posts} />
    </main>
  );
}
