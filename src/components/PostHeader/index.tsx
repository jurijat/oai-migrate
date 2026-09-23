import Link from 'next/link';
import { categoryName, getAuthorName, type Post } from '@/lib/content';

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
    <header className="mb-[35px] border-b border-[#ddd] pb-[35px]">
      <h1 className="m-0 mb-2 max-w-[800px] text-3xl font-bold leading-tight tracking-normal text-[#444] md:text-4xl md:leading-[48px]">
        {post.title}
      </h1>
      <p className="m-0 mb-[14px] flex flex-wrap items-center text-base leading-8 tracking-normal text-black/[0.45] [&>*+*]:ml-5 [&>*+*]:border-l [&>*+*]:border-black/10 [&>*+*]:pl-5">
        <span>
          By{' '}
          <Link href={`/author/${post.author}`} className="hover:text-nav-active">
            {author}
          </Link>
        </span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <Link href={`/category/${post.category}`} className="hover:text-nav-active">
          {categoryName(post.category)}
        </Link>
      </p>
    </header>
  );
}
