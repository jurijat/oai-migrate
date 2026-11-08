import type { Locator, Page } from '@playwright/test';
import { expect, test } from './fixtures';

const VIMIUM_CLICK = [
  'pointerover',
  'mouseover',
  'pointerdown',
  'mousedown',
  'pointerup',
  'mouseup',
  'click',
];

async function syntheticClick(target: Locator) {
  await target.evaluate((element, sequence) => {
    for (const type of sequence) {
      const Event = type.startsWith('pointer') ? PointerEvent : MouseEvent;
      element.dispatchEvent(new Event(type, { bubbles: true, cancelable: true, view: window }));
    }
  }, VIMIUM_CLICK);
}

function topLevel(page: Page, name: string) {
  return page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name, exact: true });
}

function menuOf(page: Page, button: Locator) {
  return button
    .evaluate((el) => el.getAttribute('aria-controls')!)
    .then((id) => page.locator(`#${id}`));
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
});

test('a synthetic click, as Vimium sends it, opens and closes a menu', async ({ page }) => {
  const about = topLevel(page, 'About');
  const menu = await menuOf(page, about);
  await expect(about).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();

  await syntheticClick(about);
  await expect(about).toHaveAttribute('aria-expanded', 'true');
  await expect(menu.getByRole('link', { name: 'Technical Steering Committee' })).toBeVisible();

  await syntheticClick(about);
  await expect(about).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();
});

test('opening one menu closes the other', async ({ page }) => {
  const about = topLevel(page, 'About');
  const participate = topLevel(page, 'Participate');

  await syntheticClick(about);
  await syntheticClick(participate);

  await expect(about).toHaveAttribute('aria-expanded', 'false');
  await expect(participate).toHaveAttribute('aria-expanded', 'true');
  await expect(await menuOf(page, about)).toBeHidden();
  await expect(
    (await menuOf(page, participate)).getByRole('link', { name: 'Calendar' }),
  ).toBeVisible();
});

test('Enter opens a menu, Tab walks into it, Escape closes it', async ({ page }) => {
  const about = topLevel(page, 'About');
  await about.focus();
  await expect(await menuOf(page, about)).toBeHidden();

  await page.keyboard.press('Enter');
  await expect(about).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('Tab');
  await expect((await menuOf(page, about)).getByRole('link', { name: 'About' })).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(about).toHaveAttribute('aria-expanded', 'false');
  await expect(about).toBeFocused();
});

test('focus leaving a menu closes it', async ({ page }) => {
  const governance = topLevel(page, 'Governance');
  await governance.focus();
  await page.keyboard.press('Enter');
  await expect(governance).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('Shift+Tab');
  await expect(governance).toHaveAttribute('aria-expanded', 'false');
});

test('a click outside closes an open menu', async ({ page }) => {
  const about = topLevel(page, 'About');
  await about.click();
  await expect(about).toHaveAttribute('aria-expanded', 'true');

  await page.locator('main').click({ position: { x: 5, y: 5 } });
  await expect(about).toHaveAttribute('aria-expanded', 'false');
});

test('hovering still reveals a menu without expanding it', async ({ page }) => {
  const membership = topLevel(page, 'Membership');
  await membership.hover();
  await expect(
    (await menuOf(page, membership)).getByRole('link', { name: 'Current Members' }),
  ).toBeVisible();
  await expect(membership).toHaveAttribute('aria-expanded', 'false');
});
