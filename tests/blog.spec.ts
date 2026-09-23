import { expect, test } from './fixtures';

const NAV_ACTIVE = 'rgb(109, 166, 67)';

test.describe('blog index', () => {
  test('lists the same posts as the live site, newest first', async ({ page }) => {
    await page.goto('/blog/');
    const cards = page.locator('[data-post-card]');
    await expect(cards).toHaveCount(180);
    await expect(cards.first().getByRole('heading', { level: 2 })).toHaveText(
      'New Outreach Co-Chairs Announced',
    );

    const hrefs = await cards
      .getByRole('heading', { level: 2 })
      .getByRole('link')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
    const position = (slug: string) => hrefs.findIndex((href) => href.includes(slug));
    expect(position('asc2022-cfp-early-bird')).toBeLessThan(position('/asc2022-cfp/'));
    expect(position('/890/')).toBeLessThan(position('join-cristiano-betts'));
    for (const unlisted of [
      'oscon-contract-first-api-development',
      'devsum17-openapi-v3',
      'tony-tam-recounts-the-history-of-swagger',
      'launches-openapi-spec-ambassador-program',
    ]) {
      expect(position(unlisted)).toBe(-1);
    }
  });

  test('cards carry the live meta line, excerpt and read more', async ({ page }) => {
    await page.goto('/blog/');
    const card = page.locator('[data-post-card]').first();

    await expect(card.locator('p').first()).toHaveText('July 22, 2026 in Blog');
    await expect(card.getByRole('link', { name: 'Blog', exact: true })).toHaveAttribute(
      'href',
      '/category/blog/',
    );
    await expect(card.locator('p').nth(1)).toHaveText(
      'The OpenAPI Initiative is pleased to announce the appointment of two new co-Chairs of the Outreach Committee. Chris Wood and Pavel Kornev have been nominated to assume the role from…',
    );
    await expect(card.getByText('Read more')).toBeVisible();
  });

  test('the whole card opens the post', async ({ page }) => {
    await page.goto('/blog/');
    await page.locator('[data-post-card]').first().click();
    await expect(page).toHaveURL(/\/blog\/2026\/07\/22\/new-outreach-co-chairs-announced\/$/);
  });

  test('the category link inside a card opens the archive', async ({ page }) => {
    await page.goto('/blog/');
    await page
      .locator('[data-post-card]')
      .first()
      .getByRole('link', { name: 'Blog', exact: true })
      .click();
    await expect(page).toHaveURL(/\/category\/blog\/$/);
  });

  test('marks BLOG as the current page', async ({ page }) => {
    await page.goto('/blog/');
    const blog = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Blog' });
    await expect(blog).toHaveAttribute('aria-current', 'page');
    await expect(blog).toHaveCSS('color', NAV_ACTIVE);
  });
});

test.describe('blog post', () => {
  const POST = '/blog/2026/05/19/announcing-arazzo-specification-1-1/';

  test('header shows author, date and category like the live site', async ({ page }) => {
    await page.goto(POST);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText([
      'Announcing Arazzo Specification 1.1',
    ]);
    const header = page.locator('article > header');
    await expect(header.getByRole('link', { name: 'Chris Wood' })).toHaveAttribute(
      'href',
      '/author/sensiblewood/',
    );
    await expect(header.locator('time')).toHaveText('May 19, 2026');
    await expect(header.getByRole('link', { name: 'Blog', exact: true })).toHaveAttribute(
      'href',
      '/category/blog/',
    );
    await expect(header).toHaveCSS('border-bottom-color', 'rgb(221, 221, 221)');
  });

  test('body uses the live text colours', async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('.post-body p').first()).toHaveCSS('color', 'rgb(103, 103, 103)');
  });

  test('does not mark BLOG as the current page', async ({ page }) => {
    await page.goto(POST);
    const blog = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Blog' });
    await expect(blog).not.toHaveAttribute('aria-current', 'page');
  });
});

test.describe('archives', () => {
  for (const path of ['/blog/', '/category/blog/', '/tag/arazzo/', '/author/sensiblewood/']) {
    test(`${path} has exactly one main landmark`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('main')).toHaveCount(1);
    });
  }

  test('posts left off the index keep their category archive', async ({ page }) => {
    await page.goto('/category/events/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Events');
    await expect(page.locator('[data-post-card]')).toHaveCount(2);
  });
});
