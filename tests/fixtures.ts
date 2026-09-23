import { test as base, expect } from '@playwright/test';
import { CONSENT_KEY, CONSENT_VERSION, FULL_CONSENT, NO_CONSENT } from '@/lib/consent';

type ConsentOption = 'all' | 'none' | 'unset';

export const test = base.extend<{ consent: ConsentOption }>({
  consent: ['all', { option: true }],
  page: async ({ page, consent }, run) => {
    if (consent !== 'unset') {
      const record = JSON.stringify({
        ...(consent === 'all' ? FULL_CONSENT : NO_CONSENT),
        version: CONSENT_VERSION,
        decidedAt: '2026-01-01T00:00:00.000Z',
      });
      await page.addInitScript(
        ([key, value]) => {
          if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, value);
        },
        [CONSENT_KEY, record] as const,
      );
    }
    await run(page);
  },
});

export { expect };
