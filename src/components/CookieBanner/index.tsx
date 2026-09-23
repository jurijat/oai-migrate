'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { CloseIcon, CookieIcon } from '@/components/Icons';
import {
  CONSENT_CATEGORIES,
  FULL_CONSENT,
  NO_CONSENT,
  closeConsentPreferences,
  getConsent,
  openConsentPreferences,
  revokes,
  saveConsent,
  useConsent,
  useConsentPreferencesOpen,
  type ConsentCategory,
  type ConsentChoice,
} from '@/lib/consent';

const PRIVACY_POLICY = 'https://www.linuxfoundation.org/legal/privacy-policy';

const CATEGORY_COPY: Record<ConsentCategory, { title: string; body: string }> = {
  functional: {
    title: 'Functional',
    body: 'Embedded videos, presentations and forms from YouTube, SlideShare and Google. Those services may set their own cookies.',
  },
  analytics: {
    title: 'Analytics',
    body: 'Helps the Linux Foundation understand how the site is used, through LFX Segment. Sets a visitor ID cookie.',
  },
  marketing: {
    title: 'Marketing',
    body: 'Loads the HubSpot newsletter sign-up form, which sets HubSpot cookies.',
  },
};

const BUTTON =
  'inline-flex items-center justify-center rounded-full border-2 border-[color:var(--brand-button)] bg-transparent px-5 py-2.5 text-sm font-semibold text-brand-fg transition-colors hover:bg-[color:var(--brand-button)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-link)]';

function apply(choice: ConsentChoice) {
  const previous = getConsent();
  saveConsent(choice);
  closeConsentPreferences();
  if (revokes(previous, choice)) window.location.reload();
}

function Toggle({
  id,
  title,
  body,
  checked,
  disabled = false,
  onChange,
}: {
  id: string;
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <li className="m-0 p-0">
      <label
        htmlFor={id}
        className={`flex items-start justify-between gap-6 py-4 ${disabled ? '' : 'cursor-pointer'}`}
      >
        <span>
          <span id={`${id}-title`} className="block font-semibold">
            {title}
          </span>
          <span id={`${id}-body`} className="mt-1 block text-sm text-brand-muted">
            {body}
          </span>
        </span>
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            id={id}
            type="checkbox"
            role="switch"
            checked={checked}
            disabled={disabled}
            onChange={(event) => onChange?.(event.target.checked)}
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-body`}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="h-7 w-12 rounded-full bg-[#8a8f94] transition-colors peer-checked:bg-[color:var(--brand-link)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[color:var(--brand-link)] peer-disabled:opacity-60"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
          />
        </span>
      </label>
    </li>
  );
}

function Summary({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
}) {
  return (
    <>
      <h2 className="m-0 text-xl font-semibold tracking-oai">We use cookies</h2>
      <p className="mb-0 mt-3 text-sm leading-relaxed text-brand-muted">
        We use cookies and similar technologies for embedded media, usage analytics and our
        newsletter sign-up. Choose which you allow. You can change this at any time under
        &ldquo;Cookie settings&rdquo; at the bottom of every page.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="button" onClick={onAcceptAll} className={BUTTON}>
          Accept all
        </button>
        <button type="button" onClick={onRejectAll} className={BUTTON}>
          Reject all
        </button>
        <button type="button" onClick={onCustomize} className={BUTTON}>
          Customize
        </button>
        <a
          href={PRIVACY_POLICY}
          target="_blank"
          rel="noreferrer"
          className="text-center text-sm text-brand-muted underline underline-offset-4 hover:text-brand-fg sm:ml-auto"
        >
          Privacy Policy
        </a>
      </div>
    </>
  );
}

function Preferences({
  initial,
  dismissible,
  onSave,
  onClose,
}: {
  initial: ConsentChoice;
  dismissible: boolean;
  onSave: (choice: ConsentChoice) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<ConsentChoice>(initial);
  const heading = useRef<HTMLHeadingElement>(null);
  const baseId = useId();

  useEffect(() => {
    heading.current?.focus();
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && dismissible) onClose();
  };

  return (
    <div onKeyDown={onKeyDown}>
      <div className="flex items-start justify-between gap-4">
        <h2
          ref={heading}
          tabIndex={-1}
          className="m-0 text-xl font-semibold tracking-oai outline-none"
        >
          Cookie settings
        </h2>
        {dismissible ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cookie settings"
            className="-m-2 rounded-full p-2 text-brand-muted hover:text-brand-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--brand-link)]"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>

      <ul className="m-0 mt-2 list-none divide-y divide-brand-separator p-0">
        <Toggle
          id={`${baseId}-essential`}
          title="Essential"
          body="Needed for the site to work, including remembering this choice. Always on."
          checked
          disabled
        />
        {CONSENT_CATEGORIES.map((category) => (
          <Toggle
            key={category}
            id={`${baseId}-${category}`}
            title={CATEGORY_COPY[category].title}
            body={CATEGORY_COPY[category].body}
            checked={draft[category]}
            onChange={(value) => setDraft((current) => ({ ...current, [category]: value }))}
          />
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="button" onClick={() => onSave(draft)} className={BUTTON}>
          Save choices
        </button>
        <button type="button" onClick={() => onSave(FULL_CONSENT)} className={BUTTON}>
          Accept all
        </button>
        <a
          href={PRIVACY_POLICY}
          target="_blank"
          rel="noreferrer"
          className="text-center text-sm text-brand-muted underline underline-offset-4 hover:text-brand-fg sm:ml-auto"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

export function CookieBadge() {
  const consent = useConsent();
  if (consent === undefined) return null;

  return (
    <button
      type="button"
      onClick={() => openConsentPreferences()}
      aria-label="Cookie settings"
      data-cookie-badge
      className="fixed bottom-5 left-5 z-30 block h-10 w-10 rounded-full bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-link)]"
    >
      <CookieIcon className="block h-full w-full" />
    </button>
  );
}

export function CookieBanner() {
  const consent = useConsent();
  const reopened = useConsentPreferencesOpen();
  const [customizing, setCustomizing] = useState(false);

  if (consent === undefined) return null;
  if (consent !== null && !reopened) return null;

  const decide = (choice: ConsentChoice) => {
    setCustomizing(false);
    apply(choice);
  };

  return (
    <section
      aria-label="Cookie consent"
      data-consent-banner
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 text-brand-fg shadow-2xl ring-1 ring-black/10 sm:inset-x-6 sm:bottom-6 sm:p-8"
    >
      {customizing || reopened ? (
        <Preferences
          initial={consent ?? NO_CONSENT}
          dismissible={consent !== null}
          onSave={decide}
          onClose={() => {
            setCustomizing(false);
            closeConsentPreferences();
          }}
        />
      ) : (
        <Summary
          onAcceptAll={() => decide(FULL_CONSENT)}
          onRejectAll={() => decide(NO_CONSENT)}
          onCustomize={() => setCustomizing(true)}
        />
      )}
    </section>
  );
}

export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => openConsentPreferences()}
      className="bg-transparent p-0 underline hover:text-white"
    >
      Cookie settings
    </button>
  );
}
