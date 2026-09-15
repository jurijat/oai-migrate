import Link from 'next/link';
import { getAuthorName, type Post } from '@/lib/content';

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export async function PostHeader({ post }: { post: Post }) {
  const author = await getAuthorName(post.author);

  return (
    <header className="mb-10">
      <h1 className="mb-4 text-4xl font-semibold tracking-oai">{post.title}</h1>
      <p className="text-brand-muted">
        By{' '}
        <Link href={`/author/${post.author}`} className="hover:text-[color:var(--brand-link)]">
          {author}
        </Link>
        {' · '}
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {' · '}
        <Link href={`/category/${post.category}`} className="hover:text-[color:var(--brand-link)]">
          {post.category}
        </Link>
      </p>
    </header>
  );
}
