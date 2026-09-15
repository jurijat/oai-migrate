import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

type Embed = { src: string; title: string; ratio: string };

const MATCHERS: { re: RegExp; build: (id: string) => Embed }[] = [
  {
    re: /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube(?:-nocookie)?\.com\/embed\/)([\w-]{6,})/,
    build: (id) => ({
      src: `https://www.youtube-nocookie.com/embed/${id}`,
      title: 'Video',
      ratio: '16 / 9',
    }),
  },
  {
    re: /slideshare\.net\/slideshow\/embed_code\/key\/([\w-]+)/,
    build: (id) => ({
      src: `https://www.slideshare.net/slideshow/embed_code/key/${id}`,
      title: 'Presentation',
      ratio: '4 / 3',
    }),
  },
];

function match(href: string): Embed | null {
  for (const matcher of MATCHERS) {
    const found = matcher.re.exec(href);
    if (found) return matcher.build(found[1]);
  }
  return null;
}

function frame({ src, title, ratio }: Embed): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['my-8', 'overflow-hidden', 'rounded-2xl', 'border', 'border-brand-separator'],
      style: `aspect-ratio:${ratio}`,
    },
    children: [
      {
        type: 'element',
        tagName: 'iframe',
        properties: {
          src,
          title,
          loading: 'lazy',
          allowFullScreen: true,
          referrerPolicy: 'strict-origin-when-cross-origin',
          className: ['h-full', 'w-full'],
        },
        children: [],
      },
    ],
  };
}

export function rehypeTableScroll() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === undefined) return;
      if (parent.type === 'element' && (parent as Element).tagName === 'div') {
        const cls = (parent as Element).properties?.className;
        if (Array.isArray(cls) && cls.includes('table-scroll')) return;
      }

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'] },
        children: [node],
      };
    });
  };
}

export function rehypeEmbeds() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === undefined) return;

      const children = node.children.filter(
        (child) => child.type !== 'text' || child.value.trim() !== '',
      );
      if (children.length !== 1) return;

      const link = children[0];
      if (link.type !== 'element' || link.tagName !== 'a') return;

      const href = typeof link.properties?.href === 'string' ? link.properties.href : '';
      const embed = match(href);
      if (!embed) return;

      parent.children[index] = frame(embed);
    });
  };
}
