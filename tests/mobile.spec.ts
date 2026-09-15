import { devices, expect, test } from '@playwright/test';

const PAGES = [
  ['home', '/'],
  ['prose page', '/about/'],
  ['long prose', '/participatehow-to-contribute/governance/'],
  ['blog index', '/blog/'],
  ['blog post', '/blog/2026/05/19/announcing-arazzo-specification-1-1/'],
  ['post with code', '/blog/2025/09/23/announcing-openapi-v3-2/'],
  [
    'post with video',
    '/blog/2023/11/06/apidays-paris-2023-with-an-openapi-track-is-coming-this-december/',
  ],
  ['testimonials', '/testimonials/'],
  ['people grid', '/about/technical-developer-community/'],
  ['membership tables', '/membershipjoin/'],
  ['membership benefits', '/membership-benefits/'],
  ['cfp', '/oai-at-apidays-4-4/'],
] as const;

const iPhone = { ...devices['iPhone 13'] };
delete (iPhone as { defaultBrowserType?: string }).defaultBrowserType;

test.use(iPhone);

for (const [label, path] of PAGES) {
  test(`${label} does not scroll horizontally on mobile`, async ({ page }) => {
    await page.goto(path);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, `${label} overflows by ${scrollWidth - clientWidth}px`).toBeLessThanOrEqual(
      clientWidth + 1,
    );
  });
}

test('wide tables scroll inside their own container', async ({ page }) => {
  await page.goto('/membershipjoin/');
  const wrapper = page.locator('.table-scroll').first();
  await expect(wrapper).toBeVisible();
  const scrollable = await wrapper.evaluate((el) => el.scrollWidth > el.clientWidth);
  expect(scrollable).toBe(true);
});

test('mobile navigation opens and closes', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('#mobile-nav');
  await expect(nav).toBeHidden();
  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  await expect(nav).toBeVisible();
  await expect(nav.getByRole('link', { name: 'FAQ' })).toBeVisible();
});
