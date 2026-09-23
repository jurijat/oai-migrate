import { devices } from '@playwright/test';
import { CONSENT_KEY } from '@/lib/consent';
import { expect, test } from './fixtures';

const VIDEO_POST =
  '/blog/2023/11/06/apidays-paris-2023-with-an-openapi-track-is-coming-this-december/';

const THIRD_PARTY = /youtube|ytimg|hsforms|segment|slideshare|googleapis/;

function stored(page: import('@playwright/test').Page) {
  return page.evaluate(
    (key) => JSON.parse(window.localStorage.getItem(key) ?? 'null'),
    CONSENT_KEY,
  );
}

test.describe('first visit', () => {
  test.use({ consent: 'unset' });

  test('shows the banner and contacts no third party before a choice', async ({ page }) => {
    const contacted: string[] = [];
    page.on('request', (request) => {
      const host = new URL(request.url()).hostname;
      if (THIRD_PARTY.test(host)) contacted.push(host);
    });

    await page.goto(VIDEO_POST);
    const banner = page.getByRole('region', { name: 'Cookie consent' });
    await expect(banner).toBeVisible();
    for (const name of ['Accept all', 'Reject all', 'Customize']) {
      await expect(banner.getByRole('button', { name })).toBeVisible();
    }
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
    await expect(page.locator('[data-consent-placeholder="functional"]')).toBeVisible();

    await page.waitForLoadState('networkidle');
    expect(contacted).toEqual([]);
  });

  test('static html carries no third-party iframe', async ({ page }) => {
    const html = await (await page.request.get(VIDEO_POST)).text();
    expect(html).not.toMatch(/<iframe[^>]+src="https:\/\/www\.youtube/);
    expect(html).toContain('data-consent-placeholder');
  });

  test('reject all is remembered and keeps embeds blocked', async ({ page }) => {
    await page.goto(VIDEO_POST);
    await page.getByRole('button', { name: 'Reject all' }).click();
    await expect(page.getByRole('region', { name: 'Cookie consent' })).toHaveCount(0);

    await page.reload();
    await expect(page.getByRole('region', { name: 'Cookie consent' })).toHaveCount(0);
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
    expect(await stored(page)).toMatchObject({
      functional: false,
      analytics: false,
      marketing: false,
    });
  });

  test('accept all loads embedded media without a reload', async ({ page }) => {
    await page.goto(VIDEO_POST);
    await page.getByRole('button', { name: 'Accept all' }).click();
    await expect(page.locator('iframe[src*="youtube-nocookie"]')).toBeVisible();
    expect(await stored(page)).toMatchObject({
      functional: true,
      analytics: true,
      marketing: true,
    });
  });

  test('customize saves individual categories', async ({ page }) => {
    await page.goto(VIDEO_POST);
    await page.getByRole('button', { name: 'Customize' }).click();

    const functional = page.getByRole('switch', { name: 'Functional' });
    await expect(functional).not.toBeChecked();
    await page.locator('label', { hasText: 'Functional' }).click();
    await expect(functional).toBeChecked();

    await page.getByRole('button', { name: 'Save choices' }).click();
    await expect(page.locator('iframe[src*="youtube-nocookie"]')).toBeVisible();
    expect(await stored(page)).toMatchObject({
      functional: true,
      analytics: false,
      marketing: false,
    });
  });

  test('banner fits a phone screen', async ({ browser }) => {
    const iPhone = { ...devices['iPhone 13'] };
    delete (iPhone as { defaultBrowserType?: string }).defaultBrowserType;
    const context = await browser.newContext(iPhone);
    const page = await context.newPage();
    await page.goto('/');

    const banner = page.getByRole('region', { name: 'Cookie consent' });
    await expect(banner).toBeVisible();
    const fits = await banner.evaluate((el) => {
      const box = el.getBoundingClientRect();
      return box.top >= 0 && box.bottom <= window.innerHeight;
    });
    expect(fits).toBe(true);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
    await context.close();
  });
});

test.describe('after rejecting', () => {
  test.use({ consent: 'none' });

  test('load video shows one embed without granting consent', async ({ page }) => {
    await page.goto(VIDEO_POST);
    await page.getByRole('button', { name: 'Load video' }).click();
    await expect(page.locator('iframe[src*="youtube-nocookie"]')).toBeVisible();
    expect(await stored(page)).toMatchObject({ functional: false });

    await page.reload();
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
  });

  test('always allow persists functional consent', async ({ page }) => {
    await page.goto(VIDEO_POST);
    await page.getByRole('button', { name: 'Always allow embedded content' }).click();
    await expect(page.locator('iframe[src*="youtube-nocookie"]')).toBeVisible();
    expect(await stored(page)).toMatchObject({ functional: true });
  });

  test('newsletter waits for marketing consent', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const notice = page.locator('[data-consent-placeholder="marketing"]');
    await expect(notice).toBeVisible();
    await expect(page.locator('script[src*="js.hsforms.net"]')).toHaveCount(0);

    await notice.getByRole('button', { name: /Allow marketing cookies/ }).click();
    await expect(notice).toHaveCount(0);
    await expect(page.locator('script[src*="js.hsforms.net"]')).toHaveCount(1, { timeout: 15_000 });
    expect(await stored(page)).toMatchObject({ marketing: true, functional: false });
  });

  test('cookie settings reopens preferences and returns focus on escape', async ({ page }) => {
    await page.goto('/about/');
    const trigger = page.locator('footer').getByRole('button', { name: 'Cookie settings' });
    await trigger.click();

    const heading = page.getByRole('heading', { name: 'Cookie settings' });
    await expect(heading).toBeFocused();
    await expect(page.getByRole('switch', { name: 'Functional' })).not.toBeChecked();
    await expect(page.getByRole('switch', { name: 'Essential' })).toBeDisabled();

    await page.keyboard.press('Escape');
    await expect(heading).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});

test.describe('after accepting', () => {
  test.use({ consent: 'all' });

  test('revoking a category reloads so its scripts unload', async ({ page }) => {
    await page.goto('/about/');
    await page.locator('footer').getByRole('button', { name: 'Cookie settings' }).click();
    await expect(page.getByRole('switch', { name: 'Analytics' })).toBeChecked();

    await page.locator('label', { hasText: 'Analytics' }).click();
    const reloaded = page.waitForEvent('load');
    await page.getByRole('button', { name: 'Save choices' }).click();
    await reloaded;

    expect(await stored(page)).toMatchObject({ analytics: false, functional: true });
    await expect(page.getByRole('region', { name: 'Cookie consent' })).toHaveCount(0);
  });
});
