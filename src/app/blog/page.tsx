import type { Metadata } from 'next';
import { PostList } from '@/components/PostList';
import { getPosts, isOnBlogIndex } from '@/lib/content';
import { listingMetadata } from '@/lib/metadata';

export const metadata: Metadata = listingMetadata(
  'Blog',
  'News, announcements and technical writing from the OpenAPI Initiative community.',
  '/blog',
);

export default async function BlogIndex() {
  const posts = (await getPosts()).filter(isOnBlogIndex);

  return (
    <div className="mx-auto max-w-content px-6 pb-20 pt-10">
      <h1 className="sr-only">Blog</h1>
      <PostList posts={posts} />
    </div>
  );
}
