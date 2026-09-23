'use client';

import Script from 'next/script';
import { useConsent } from '@/lib/consent';

const LFX_SEGMENT =
  'https://lfx-segment.platform.linuxfoundation.org/latest/lfx-segment-analytics.min.js';

declare global {
  interface Window {
    LfxAnalytics?: {
      LfxSegmentsAnalytics: { getInstance: () => { init: () => void } };
    };
  }
}

export function Analytics({ enabled }: { enabled: boolean }) {
  const consent = useConsent();
  if (!enabled || consent?.analytics !== true) return null;

  return (
    <Script
      src={LFX_SEGMENT}
      strategy="afterInteractive"
      onLoad={() => window.LfxAnalytics?.LfxSegmentsAnalytics.getInstance().init()}
    />
  );
}
