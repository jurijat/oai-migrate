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

test('theme toggle drives data-theme', async ({ page }) => {
  await page.goto('/about/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Toggle colour theme' }).click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
});
