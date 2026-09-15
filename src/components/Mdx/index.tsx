import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';
import { rehypeEmbeds } from '@/lib/rehypeEmbeds';
import { withBasePath } from '@/lib/site';
import {
  GoogleForm,
  MailingListSignup,
  MemberLandscape,
  SlideShare,
  YouTube,
} from '@/components/Embeds';
import { Newsletter } from '@/components/Newsletter';
import {
  Action,
  AnnouncementBar,
  Benefit,
  BenefitGrid,
  CTA,
  Hero,
  PeopleGrid,
  Section,
  TestimonialGrid,
} from '@/components/Sections';

function MdxLink({ href = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
}

function MdxImage({ src = '', alt = '', ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img src={withBasePath(String(src))} alt={alt} loading="lazy" decoding="async" {...rest} />
  );
}

const components = {
  a: MdxLink,
  img: MdxImage,
  GoogleForm,
  MailingListSignup,
  MemberLandscape,
  SlideShare,
  YouTube,
  Action,
  AnnouncementBar,
  Benefit,
  BenefitGrid,
  CTA,
  Hero,
  Newsletter,
  PeopleGrid,
  Section,
  TestimonialGrid,
};

export function Mdx({ source, format = 'md' }: { source: string; format?: 'md' | 'mdx' }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          format,
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }], rehypeEmbeds],
        },
      }}
    />
  );
}
