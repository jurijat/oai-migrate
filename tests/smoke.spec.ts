import { expect, test } from '@playwright/test';

test('home renders with site chrome', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/OpenAPI Initiative/);
  await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'The Linux Foundation Projects' })).toBeVisible();
});

test('prose page renders content and internal links', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
  await expect(page.getByText('The OpenAPI Initiative (OAI) was created')).toBeVisible();
  await page.getByRole('link', { name: 'What is OpenAPI page' }).click();
  await expect(page).toHaveURL(/\/what-is-openapi\/?$/);
});

test('blog post keeps its WordPress permalink, byline and code blocks', async ({ page }) => {
  await page.goto('/blog/2026/05/19/announcing-arazzo-specification-1-1/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Announcing Arazzo Specification 1.1',
  );
  await expect(page.getByText('Chris Wood')).toBeVisible();
  await expect(page.locator('pre code').first()).toContainText('sourceDescriptions:');
});

test('blog index lists posts by year', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.getByRole('heading', { level: 2, name: '2026' })).toBeVisible();
  expect(await page.locator('article, main li a').count()).toBeGreaterThan(50);
});

test('taxonomy archives resolve', async ({ page }) => {
  await page.goto('/category/blog/');
  await expect(page.getByRole('heading', { level: 1, name: 'blog' })).toBeVisible();
});

test('dropped WordPress page serves a redirect stub', async ({ page }) => {
  const response = await page.request.get('/login/');
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('rel="canonical"');
  expect(html).toContain('http-equiv="refresh"');
});

test('there is no dark mode', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.getByRole('button', { name: 'Toggle colour theme' })).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/);
});

test('home page renders composed sections in the site rhythm', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    "The world's most widely used API description standard",
  );
  await expect(page.locator('[data-section="hero"].hero-artwork')).toBeVisible();
  await expect(page.locator('.band-brand')).toBeVisible();
  await expect(page.getByRole('heading', { name: '3 Benefits of OpenAPI' })).toBeVisible();
  expect(await page.locator('.btn-green, .btn-outline').count()).toBeGreaterThan(4);
});

test('testimonials render from data', async ({ page }) => {
  await page.goto('/testimonials/');
  expect(await page.locator('blockquote').count()).toBe(21);
});

test('technical steering committee renders from data', async ({ page }) => {
  await page.goto('/about/technical-developer-community/');
  await expect(page.getByText('Darrell Miller')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Former members' })).toBeVisible();
});

test('membership tables converted to markdown, not raw html', async ({ page }) => {
  await page.goto('/membershipjoin/');
  await expect(page.locator('table thead th').first()).toHaveText('Participation Level *');
  await expect(page.locator('table').nth(1).locator('thead th').first()).toHaveText(
    'Employees at Company',
  );
  expect(await page.locator('table tbody tr').count()).toBeGreaterThan(6);
});

test('search finds a post by title', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search' }).click();
  const dialog = page.getByRole('dialog', { name: 'Search' });
  await expect(dialog).toBeVisible();
  await dialog.getByPlaceholder('Search posts and pages').fill('arazzo');
  await expect(dialog.getByRole('link').first()).toBeVisible();
  await dialog.getByRole('link').first().click();
  await expect(page).toHaveURL(/arazzo/i);
});

test('embedded video is upgraded to an iframe', async ({ page }) => {
  await page.goto(
    '/blog/2023/11/06/apidays-paris-2023-with-an-openapi-track-is-coming-this-december/',
  );
  await expect(page.locator('iframe[src*="youtube-nocookie"]')).toBeVisible();
});

test('percent-encoded permalink resolves', async ({ page }) => {
  const response = await page.goto(
    '/blog/2018/05/14/stoplight-%e2%9d%a4%ef%b8%8f-the-openapi-initiative/',
  );
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Stoplight');
});

test('an html comment in an mdx page does not break the build', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
  expect(await page.content()).not.toContain('Editors: HTML comments are safe');
});

test('navbar shows the official logo and the social links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header img[src*="openapi-logo.webp"]')).toBeVisible();
  await expect(page.locator('header img[src*="openapi-logo-dark.webp"]')).toHaveCount(0);

  const nav = page.getByRole('navigation', { name: 'Main' });
  await expect(nav.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/company/open-api-initiative/',
  );
  await expect(nav.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/oai',
  );
});

test('hero uses the real background artwork', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('[data-section="hero"]');
  const image = await hero.evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(image).toContain('hero-background.webp');
  const src = /url\("?([^")]+)"?\)/.exec(image)?.[1];
  const response = await page.request.get(new URL(src!, page.url()).pathname);
  expect(response.status()).toBe(200);
});

test('footer is the linux foundation copyright bar', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toContainText('Copyright © The Linux Foundation');
  await expect(footer).toContainText('Linux is a registered trademark of Linus Torvalds');
  for (const name of ['Trademark Usage', 'Privacy Policy', 'Terms of Use', 'LinkedIn', 'GitHub']) {
    await expect(footer.getByRole('link', { name })).toBeVisible();
  }
  await expect(footer.getByRole('button', { name: 'Cookie settings' })).toBeVisible();
  expect(await footer.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(
    'rgb(28, 28, 28)',
  );
});

test('members embed uses the live landscape parameters', async ({ page }) => {
  await page.goto('/membershipmembers/');
  const frame = page.locator('iframe[src*="embed.html"]');
  const src = await frame.getAttribute('src');
  const params = new URL(src!).searchParams;
  expect(params.get('bg-color')).toBe('#016bcc');
  expect(params.get('fg-color')).toBe('#ffffff');
  expect(params.get('iframe-resizer')).toBe('true');
  await expect(page.locator('iframe[src*="embed-item.html"]')).toHaveCount(1);
});

test('wordpress shortcodes do not reach the page', async ({ page }) => {
  await page.goto('/participatehow-to-contribute/');
  const text = await page.locator('article').innerText();
  expect(text).not.toMatch(/\[icon\b|\[tmm\b|\[gravityform\b/);
  await expect(page.getByText('Evolve the Spec', { exact: true })).toBeVisible();
});

test('pages carry opengraph, twitter and icon metadata', async ({ page }) => {
  await page.goto('/blog/2026/05/19/announcing-arazzo-specification-1-1/');
  const head = page.locator('head');
  await expect(head.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Announcing Arazzo Specification 1.1',
  );
  await expect(head.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(head.locator('link[rel="canonical"]')).toHaveCount(1);
  expect(await head.locator('link[rel="icon"]').count()).toBeGreaterThan(0);
  expect(await head.locator('link[rel="apple-touch-icon"]').count()).toBeGreaterThan(0);

  const ogImage = await head.locator('meta[property="og:image"]').first().getAttribute('content');
  expect(ogImage).toMatch(/^https?:\/\//);
  const response = await page.request.get(new URL(ogImage!).pathname);
  expect(response.status()).toBe(200);
});

test('linux foundation bar uses the official banner', async ({ page }) => {
  await page.goto('/');
  const banner = page.getByRole('link', { name: 'The Linux Foundation Projects' }).locator('img');
  await expect(banner).toBeVisible();
  await expect(banner).toHaveAttribute('src', /lfprojects-banner\.svg$/);
  const src = await banner.getAttribute('src');
  const response = await page.request.get(new URL(src!, page.url()).pathname);
  expect(response.status()).toBe(200);
});

test('paired wordpress shortcodes become links', async ({ page }) => {
  await page.goto(
    '/blog/presentation/2017/03/08/api-design-and-whats-new-with-open-api-google-cloud-next-17/',
  );
  const text = await page.locator('article').innerText();
  expect(text).not.toContain('embedyt');
  await expect(page.locator('iframe[src*="youtube-nocookie"]')).toBeVisible();
});

test('tonal bands keep prose readable', async ({ page }) => {
  await page.goto('/membership-benefits/');

  const readable = await page.evaluate(() => {
    const luminance = (colour: string) => {
      const [r, g, b] = colour
        .match(/\d+/g)!
        .slice(0, 3)
        .map(Number)
        .map((value) => {
          const channel = value / 255;
          return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    return [...document.querySelectorAll('section.band-dark, section.band-brand')]
      .map((band) => {
        const text = band.querySelector('.prose p, .prose li');
        if (!text) return null;
        const a = luminance(getComputedStyle(text).color);
        const b = luminance(getComputedStyle(band).backgroundColor);
        return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      })
      .filter((value): value is number => value !== null);
  });

  expect(readable.length).toBeGreaterThan(0);
  for (const ratio of readable) expect(ratio).toBeGreaterThan(4.5);
});
