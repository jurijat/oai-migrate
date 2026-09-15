'use client';

import Script from 'next/script';
import { useId, useRef, useState } from 'react';

const PORTAL_ID = '8112310';
const FORM_ID = '292f670f-56d8-4713-9e8d-6e3777caa8c9';

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          target: string;
          region?: string;
        }) => void;
      };
    };
  }
}

export function Newsletter({ title = 'Subscribe to the OpenAPI Newsletter' }: { title?: string }) {
  const domId = useId().replace(/:/g, '');
  const target = `hubspot-form-${domId}`;
  const created = useRef(false);
  const [failed, setFailed] = useState(false);

  const create = () => {
    if (created.current || !window.hbspt) return;
    created.current = true;
    window.hbspt.forms.create({ portalId: PORTAL_ID, formId: FORM_ID, target: `#${target}` });
  };

  return (
    <section className="mx-auto max-w-content px-6 pb-20">
      <div className="rounded-5xl bg-brand-card px-8 py-14">
        <h2 className="mb-6 text-center text-3xl font-semibold tracking-oai">{title}</h2>
        <div id={target} className="mx-auto max-w-xl" />
        {failed ? (
          <p className="text-center text-brand-muted">
            The subscription form could not be loaded.{' '}
            <a
              href={`https://share.hsforms.com/${FORM_ID}`}
              target="_blank"
              rel="noreferrer"
              className="text-brand-green hover:underline"
            >
              Open it in a new tab
            </a>
            .
          </p>
        ) : null}
        <Script
          src="https://js.hsforms.net/forms/embed/v2.js"
          strategy="lazyOnload"
          onReady={create}
          onLoad={create}
          onError={() => setFailed(true)}
        />
      </div>
    </section>
  );
}
