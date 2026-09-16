import type { Metadata } from 'next';
import { PostList } from '@/components/PostList';
import { getPosts } from '@/lib/content';
import { listingMetadata } from '@/lib/metadata';

export const metadata: Metadata = listingMetadata(
  'Blog',
  'News, announcements and technical writing from the OpenAPI Initiative community.',
  '/blog',
);

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-content px-6 py-16">
      <h1 className="mb-10 text-4xl font-semibold tracking-oai">Blog</h1>
      <PostList posts={posts} />
    </main>
  );
}
