import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';
import { categoryName, wordExcerpt, type Post } from '@/lib/content';

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="m-0 list-none space-y-[25px] p-0">
      {posts.map((post) => {
        const summary = wordExcerpt(post.body);
        return (
          <li key={post.permalink} data-post-card className="group relative m-0 p-5">
            <p className="m-0 mb-[13px] text-lg leading-8 tracking-normal text-[#676767]">
              <time dateTime={post.date}>{formatDate(post.date)}</time> in{' '}
              <Link
                href={`/category/${post.category}`}
                className="relative z-10 hover:text-nav-active"
              >
                {categoryName(post.category)}
              </Link>
            </p>
            <h2 className="m-0 mb-3 text-2xl font-bold leading-9 tracking-normal text-[#444] transition-colors group-hover:text-nav-active">
              <Link href={post.permalink} className="after:absolute after:inset-0">
                {post.title}
              </Link>
            </h2>
            {summary ? (
              <p className="m-0 mb-[5px] text-lg leading-8 tracking-normal text-[#676767]">
                {summary}
              </p>
            ) : null}
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase leading-8 tracking-[2px] text-[color:var(--brand-button)]"
            >
              Read more
              <ArrowRightIcon
                size={15}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
