'use client';

import Script from 'next/script';
import { useCallback, useRef } from 'react';

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
const ITEM_SCRIPT = 'https://landscape.openapis.org/embed/embed-item.js';
const RESIZER = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.9/iframeResizer.min.js';

declare global {
  interface Window {
    iFrameResize?: (options: Record<string, unknown>, target: string) => void;
  }
}

export function MemberLandscapeFrame() {
  const initialised = useRef(false);

  const startResizer = useCallback(() => {
    if (initialised.current || typeof window.iFrameResize !== 'function') return;
    initialised.current = true;
    window.iFrameResize({}, '#iframe-landscape');
  }, []);

  return (
    <>
      <iframe
        id="iframe-landscape"
        src={EMBED}
        title="OpenAPI Initiative members"
        scrolling="no"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full border-0"
        style={{ minHeight: '40rem' }}
      />

      <iframe
        id="embed-item"
        src={ITEM_EMBED}
        title="Member details"
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          zIndex: 2147483647,
        }}
      />

      <Script
        src={RESIZER}
        strategy="afterInteractive"
        onReady={startResizer}
        onLoad={startResizer}
      />
      <Script src={ITEM_SCRIPT} strategy="afterInteractive" />
    </>
  );
}
