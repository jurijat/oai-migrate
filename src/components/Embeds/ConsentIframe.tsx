'use client';

import { useState, type IframeHTMLAttributes } from 'react';
import { grantConsent, useConsent } from '@/lib/consent';

type Provider = { name: string; kind: string };

const BUTTON =
  'inline-flex items-center justify-center rounded-full border-2 border-[color:var(--brand-button)] bg-transparent px-5 py-2 text-sm font-semibold text-brand-fg transition-colors hover:bg-[color:var(--brand-button)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-link)]';

function hostOf(src: string): string | null {
  try {
    return new URL(src, 'https://www.openapis.org').hostname;
  } catch {
    return null;
  }
}

export function providerOf(src: string): Provider | null {
  const host = hostOf(src);
  if (!host) return { name: 'a third party', kind: 'content' };
  if (host === 'openapis.org' || host.endsWith('.openapis.org')) return null;
  if (/(^|\.)youtube(-nocookie)?\.com$/.test(host)) return { name: 'YouTube', kind: 'video' };
  if (/(^|\.)slideshare\.net$/.test(host)) return { name: 'SlideShare', kind: 'presentation' };
  if (/(^|\.)google\.com$/.test(host)) return { name: 'Google', kind: 'form' };
  return { name: host, kind: 'content' };
}

function externalUrl(src: string) {
  const youtube = /youtube(?:-nocookie)?\.com\/embed\/([\w-]+)/.exec(src);
  if (youtube) return `https://www.youtube.com/watch?v=${youtube[1]}`;
  return src.replace(/([?&])embedded=true&?/, '$1').replace(/[?&]$/, '');
}

export function ConsentIframe({
  src = '',
  title,
  ...rest
}: IframeHTMLAttributes<HTMLIFrameElement>) {
  const consent = useConsent();
  const [loadedOnce, setLoadedOnce] = useState(false);
  const provider = providerOf(src);

  if (!provider || consent?.functional || loadedOnce) {
    return <iframe src={src} title={title} {...rest} />;
  }

  return (
    <div
      data-consent-placeholder="functional"
      className="flex h-full min-h-56 w-full flex-col items-center justify-center gap-4 bg-brand-card p-6 text-center"
    >
      <p className="m-0 max-w-md text-sm text-brand-muted">
        This {provider.kind} is hosted by {provider.name}, which may set cookies when it loads.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => setLoadedOnce(true)} className={BUTTON}>
          Load {provider.kind}
        </button>
        <button
          type="button"
          onClick={() => grantConsent('functional')}
          className="bg-transparent p-0 text-sm text-brand-muted underline underline-offset-4 hover:text-brand-fg"
        >
          Always allow embedded content
        </button>
      </div>
      <a
        href={externalUrl(src)}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-[color:var(--brand-link)] underline underline-offset-4"
      >
        Open on {provider.name}
      </a>
    </div>
  );
}
