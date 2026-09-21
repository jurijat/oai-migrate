'use client';

import { useEffect, useRef, useState } from 'react';

const PARAMS = new URLSearchParams({
  key: 'openapi-initiative-members',
  headers: 'false',
  'category-header': 'false',
  'category-in-subcategory': 'false',
  'title-uppercase': 'false',
  'title-alignment': 'left',
  'title-font-family': 'sans-serif',
  'title-font-size': '13',
  style: 'clean',
  'bg-color': '#016bcc',
  'fg-color': '#ffffff',
  'item-modal': 'true',
  'item-name': 'false',
  size: 'lg',
  'items-alignment': 'center',
  'iframe-resizer': 'true',
});

const EMBED = `https://landscape.openapis.org/embed/embed.html?${PARAMS}`;
const ITEM_EMBED = 'https://landscape.openapis.org/embed/embed-item.html';
const MIN_HEIGHT = 640;

export function MemberLandscapeFrame() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes('landscape.openapis.org')) return;

      const raw = typeof event.data === 'string' ? event.data : '';
      const match = /\[iFrameSizer\]\S*?:(\d+(?:\.\d+)?)/.exec(raw);
      const reported = match
        ? Number(match[1])
        : typeof event.data === 'object' && event.data !== null
          ? Number((event.data as { height?: number }).height)
          : Number.NaN;

      if (Number.isFinite(reported) && reported > 0) setHeight(Math.max(MIN_HEIGHT, reported));
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <>
      <iframe
        ref={frame}
        src={EMBED}
        title="OpenAPI Initiative members"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full border-0"
        style={{ height }}
      />
      <iframe src={ITEM_EMBED} title="Member details" className="hidden" aria-hidden="true" />
    </>
  );
}
