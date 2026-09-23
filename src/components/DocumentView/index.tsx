import { Mdx } from '@/components/Mdx';
import { PostHeader } from '@/components/PostHeader';
import { isPost, type Page, type Post } from '@/lib/content';

export function DocumentView({ doc }: { doc: Post | Page }) {
  const format = doc.file.endsWith('.mdx') ? 'mdx' : 'md';

  if (!isPost(doc) && doc.layout === 'composed') {
    return (
      <article>
        <Mdx source={doc.body} format={format} />
      </article>
    );
  }

  if (isPost(doc)) {
    return (
      <article className="mx-auto max-w-content px-6 pb-20 pt-10">
        <PostHeader post={doc} />
        <div className="post-body prose mx-auto max-w-[1000px] md:prose-lg">
          <Mdx source={doc.body} format={format} />
        </div>
      </article>
    );
  }

  const archived = doc.layout === 'cfp';

  return (
    <article className="mx-auto max-w-prose px-6 py-16">
      <h1 className="mb-8 text-4xl font-semibold tracking-oai">{doc.title}</h1>
      {archived ? (
        <p className="mb-10 rounded-4xl bg-brand-card px-6 py-4 text-brand-muted">
          This call for proposals has closed and is kept for reference. Current events are listed on{' '}
          <a
            href="https://events.openapis.org"
            className="text-[color:var(--brand-link)] hover:underline"
          >
            events.openapis.org
          </a>
          .
        </p>
      ) : null}
      <div className="prose max-w-none md:prose-lg">
        <Mdx source={doc.body} format={format} />
      </div>
    </article>
  );
}
