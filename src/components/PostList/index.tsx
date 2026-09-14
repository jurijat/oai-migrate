import Link from 'next/link';
import { getAuthors, type Post } from '@/lib/content';

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export async function PostList({ posts }: { posts: Post[] }) {
  const authors = await getAuthors();
  const nameOf = (slug: string) => authors.find((a) => a.slug === slug)?.name ?? slug;

  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))].sort().reverse();

  return (
    <div className="space-y-12">
      {years.map((year) => (
        <section key={year}>
          <h2 className="mb-4 border-b border-brand-separator pb-2 text-2xl font-semibold tracking-oai">
            {year}
          </h2>
          <ul className="space-y-4">
            {posts
              .filter((p) => p.date.startsWith(year))
              .map((post) => (
                <li key={post.permalink}>
                  <Link href={post.permalink} className="font-medium hover:text-brand-green">
                    {post.title}
                  </Link>
                  <p className="text-sm text-brand-muted">
                    {nameOf(post.author)} ·{' '}
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
