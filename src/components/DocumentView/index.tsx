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

  return (
    <article className="mx-auto max-w-prose px-6 py-16">
      {isPost(doc) ? (
        <PostHeader post={doc} />
      ) : (
        <h1 className="mb-8 text-4xl font-semibold tracking-oai">{doc.title}</h1>
      )}
      <div className="prose prose-lg max-w-none">
        <Mdx source={doc.body} format={format} />
      </div>
    </article>
  );
}
