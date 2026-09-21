'use client';

import Script from 'next/script';

const AIRGAP = 'https://transcend-cdn.com/cm/f484e2d0-ad2e-43a9-9d64-d07f6fa20966/airgap.js';

declare global {
  interface Window {
    transcend?: { showConsentManager: () => void };
  }
}

export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.transcend?.showConsentManager()}
      className="cookie-settings-link bg-transparent p-0 underline hover:text-white"
    >
      Cookie settings
    </button>
  );
}

export function ConsentManager({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return <Script src={AIRGAP} strategy="afterInteractive" />;
}
