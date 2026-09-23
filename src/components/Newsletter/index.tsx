'use client';

import Script from 'next/script';
import { useEffect, useId, useRef, useState } from 'react';
import { grantConsent, useConsent } from '@/lib/consent';

const PORTAL_ID = '8112310';
const FORM_ID = '292f670f-56d8-4713-9e8d-6e3777caa8c9';

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: { portalId: string; formId: string; target: string }) => void;
      };
    };
  }
}

export function Newsletter({ title = 'Subscribe to the OpenAPI Newsletter' }: { title?: string }) {
  const consent = useConsent();
  const allowed = consent?.marketing === true;
  const domId = useId().replace(/:/g, '');
  const target = `hubspot-form-${domId}`;
  const container = useRef<HTMLDivElement>(null);
  const created = useRef(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!allowed) return;
    const node = container.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [allowed]);

  const create = () => {
    if (created.current || !window.hbspt) return;
    created.current = true;
    window.hbspt.forms.create({ portalId: PORTAL_ID, formId: FORM_ID, target: `#${target}` });
  };

  return (
    <section className="mx-auto max-w-content px-6 pb-20">
      <div className="rounded-5xl bg-brand-card px-8 py-14">
        <h2 className="mb-6 text-center text-3xl font-semibold tracking-oai">{title}</h2>

        {allowed ? (
          <div ref={container} id={target} className="mx-auto min-h-[18rem] max-w-xl" />
        ) : (
          <div
            data-consent-placeholder="marketing"
            className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center"
          >
            <p className="m-0 text-brand-muted">
              The sign-up form is provided by HubSpot and sets marketing cookies, so it only loads
              once you allow them.
            </p>
            <button
              type="button"
              onClick={() => grantConsent('marketing')}
              className="inline-flex items-center justify-center rounded-full border-2 border-[color:var(--brand-button)] bg-transparent px-6 py-3 font-semibold text-brand-fg transition-colors hover:bg-[color:var(--brand-button)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-link)]"
            >
              Allow marketing cookies and show the form
            </button>
          </div>
        )}

        {failed ? (
          <p className="text-center text-brand-muted">The subscription form could not be loaded.</p>
        ) : null}

        {allowed && visible ? (
          <Script
            src="https://js.hsforms.net/forms/embed/v2.js"
            strategy="afterInteractive"
            onReady={create}
            onLoad={create}
            onError={() => setFailed(true)}
          />
        ) : null}
      </div>
    </section>
  );
}
