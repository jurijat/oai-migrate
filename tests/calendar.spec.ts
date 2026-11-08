import { readFileSync } from 'node:fs';
import type { Locator, Page } from '@playwright/test';
import type { Calendar } from '@/lib/content';
import { expect, test } from './fixtures';

const TIME_ZONE = 'America/New_York';
const calendar: Calendar = JSON.parse(readFileSync('data/calendar.json', 'utf8'));
const meetings = new Map(calendar.meetings.map((meeting) => [meeting.id, meeting]));

function partsIn(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h12',
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)!.value;
  return {
    year: Number(value('year')),
    month: Number(value('month')),
    day: Number(value('day')),
    isoDate: `${value('year')}-${value('month')}-${value('day')}`,
    hour: value('hour'),
    minute: value('minute'),
    period: value('dayPeriod').toLowerCase(),
  };
}

function narrowTime(date: Date) {
  const { hour, minute, period } = partsIn(date);
  return `${hour}${minute === '00' ? '' : `:${minute}`}${period[0]}`;
}

function escape(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const [fromYear, fromMonth] = calendar.window.from.split('-').map(Number);
const syncMonth = fromYear * 12 + fromMonth;
const monthOf = (iso: string) => {
  const { year, month } = partsIn(new Date(iso));
  return year * 12 + month - 1;
};

const target = calendar.occurrences.find(
  (occurrence) =>
    monthOf(occurrence.start) === syncMonth &&
    partsIn(new Date(occurrence.start)).day > 7 &&
    meetings.get(occurrence.meeting)?.url &&
    meetings.get(occurrence.meeting)?.recurrence &&
    occurrence.participants !== null,
)!;
const targetMeeting = meetings.get(target.meeting)!;
const targetStart = new Date(target.start);
const now = new Date(targetStart.getTime() - 2 * 60 * 60 * 1000);
const earlier = calendar.occurrences.find(
  (occurrence) => monthOf(occurrence.start) === syncMonth && Date.parse(occurrence.end) < +now,
)!;

const monthTitle = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, month: 'long', year: 'numeric' }).format(
    date,
  );

function widget(page: Page) {
  return page.locator('[data-community-calendar]');
}

function main(page: Page) {
  return page.getByRole('region', { name: 'Meetings' });
}

function viewButton(page: Page, name: string) {
  return main(page)
    .getByRole('group', { name: 'Calendar view' })
    .getByRole('button', { name, exact: true });
}

function meetingIn(scope: Locator, title: string) {
  return scope.getByRole('button', { name: new RegExp(`${escape(title)},`) });
}

function dayCell(page: Page, iso: string) {
  return widget(page).locator(`.fc-daygrid-day[data-date="${partsIn(new Date(iso)).isoDate}"]`);
}

test.use({ timezoneId: TIME_ZONE });

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(now);
  await page.setViewportSize({ width: 1440, height: 1000 });
});

test('the data has meetings to anchor the calendar tests on', () => {
  expect(target, 'an upcoming recurring occurrence in the synced month').toBeTruthy();
  expect(earlier, 'a past occurrence earlier in the synced month').toBeTruthy();
});

test('month view lists meetings at local time, Monday first', async ({ page }) => {
  await page.goto('/get-involved/about/');
  await expect(page).toHaveTitle(/^Calendar/);
  await expect(page.getByRole('heading', { level: 2, name: 'Community Calendar' })).toBeVisible();

  const calendarWidget = widget(page);
  await expect(calendarWidget.getByRole('heading', { level: 3 }).last()).toHaveText(
    monthTitle(now),
  );
  await expect(viewButton(page, 'Month')).toHaveAttribute('aria-pressed', 'true');
  await expect(calendarWidget.locator('.fc-col-header-cell').first()).toHaveText('Monday');

  const event = meetingIn(dayCell(page, target.start), targetMeeting.title);
  await expect(event).toContainText(narrowTime(targetStart));
  await expect(event).toContainText(targetMeeting.title);
  await expect(page.locator('iframe')).toHaveCount(0);
});

test('clicking a meeting opens its details with Register', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/get-involved/about/');
  await meetingIn(dayCell(page, target.start), targetMeeting.title).click();

  const dialog = page.getByRole('dialog', { name: 'Meeting Details' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(targetMeeting.title);
  await expect(dialog).toContainText(targetMeeting.recurrence!);
  await expect(dialog).toContainText(`${target.participants} Participant`);
  await expect(dialog.getByRole('link', { name: /Register/ })).toHaveAttribute(
    'href',
    `${targetMeeting.url}&invite=true`,
  );
  await expect(dialog.getByRole('link', { name: /zoom-lfx/ })).toHaveAttribute(
    'href',
    targetMeeting.url!,
  );

  await dialog.getByRole('button', { name: 'Copy meeting link' }).click();
  await expect(dialog.getByRole('status')).toHaveText('Copied!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(targetMeeting.url);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('a past meeting shows its time and participants but no Register', async ({ page }) => {
  await page.goto('/get-involved/about/');
  const meeting = meetings.get(earlier.meeting)!;
  await meetingIn(dayCell(page, earlier.start), meeting.title).first().click();

  const dialog = page.getByRole('dialog', { name: 'Meeting Details' });
  await expect(dialog).toContainText(meeting.title);
  await expect(dialog.getByRole('link', { name: /Register/ })).toHaveCount(0);
  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();
});

test('Day, 4 Days, Week and List views show the meeting', async ({ page }) => {
  await page.goto('/get-involved/about/');
  const calendarWidget = widget(page);
  const title = calendarWidget.locator('.calendar-title');

  await viewButton(page, 'Week').click();
  await expect(title).toContainText('–');
  await expect(calendarWidget.locator('.fc-col-header-cell')).toHaveCount(7);
  await expect(
    meetingIn(calendarWidget.locator('.fc-timegrid'), targetMeeting.title),
  ).toBeVisible();

  await viewButton(page, '4 Days').click();
  await expect(calendarWidget.locator('.fc-col-header-cell')).toHaveCount(4);

  await viewButton(page, 'Day').click();
  await expect(calendarWidget.locator('.fc-col-header-cell')).toHaveCount(1);
  await expect(calendarWidget.locator('.fc-timegrid-now-indicator-line')).toBeVisible();

  await viewButton(page, 'List').click();
  const row = calendarWidget.locator('.fc-list-event').filter({ hasText: targetMeeting.title });
  await expect(row.first()).toBeVisible();
  await expect(calendarWidget.locator('.fc-list-day-cushion').first()).toBeVisible();
});

test('Previous, Next and Today move through months', async ({ page }) => {
  await page.goto('/get-involved/about/');
  const calendarWidget = widget(page);
  const title = calendarWidget.locator('.calendar-title');
  const today = main(page).getByRole('button', { name: 'Today', exact: true });

  await expect(today).toBeDisabled();
  await main(page).getByRole('button', { name: 'Next Month', exact: true }).click();
  await expect(title).not.toHaveText(monthTitle(now));
  await expect(today).toBeEnabled();
  await today.click();
  await expect(title).toHaveText(monthTitle(now));
  await expect(today).toBeDisabled();
});

test('the mini calendar jumps the main calendar to a date', async ({ page }) => {
  await page.goto('/get-involved/about/');
  const sidebar = page.getByRole('complementary', { name: 'Calendar navigation' });
  await expect(sidebar.locator('[aria-current="date"]')).toHaveText(String(partsIn(now).day));

  await sidebar.getByRole('button', { name: 'Next Month' }).click();
  const nextMonth = new Date(partsIn(now).year, partsIn(now).month, 15);
  await sidebar
    .getByRole('button', {
      name: new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(nextMonth),
    })
    .click();
  await expect(widget(page).locator('.calendar-title')).toHaveText(monthTitle(nextMonth));
});

test('the project filter hides and shows meetings', async ({ page }) => {
  await page.goto('/get-involved/about/');
  const sidebar = page.getByRole('complementary', { name: 'Calendar navigation' });
  const total = 1 + calendar.project.subprojects.length;
  const project = [calendar.project, ...calendar.project.subprojects].find(
    (entry) => entry.slug === targetMeeting.project,
  )!;
  const event = meetingIn(dayCell(page, target.start), targetMeeting.title);

  await expect(sidebar.getByText(`${total} projects`)).toBeVisible();
  await sidebar.getByRole('checkbox', { name: project.name, exact: true }).uncheck();
  await expect(event).toHaveCount(0);
  await expect(sidebar.getByText(`${total - 1} projects`)).toBeVisible();

  await sidebar.getByRole('checkbox', { name: project.name, exact: true }).check();
  await expect(event).toBeVisible();

  await sidebar.getByRole('button', { name: 'Clear project selection' }).click();
  await expect(widget(page).locator('.fc-event')).toHaveCount(0);
  await expect(sidebar.getByText(/\d+ projects?/)).toHaveCount(0);

  await sidebar.getByRole('searchbox', { name: 'Search projects' }).fill('overlay');
  await expect(sidebar.getByRole('checkbox')).toHaveCount(2);
  await sidebar.getByRole('searchbox', { name: 'Search projects' }).fill('zzz');
  await expect(sidebar.getByText('No results found')).toBeVisible();
});

test('the iCal dialog offers both subscription feeds', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/get-involved/about/');
  await main(page).getByRole('button', { name: 'iCal', exact: true }).click();

  const dialog = page.getByRole('dialog', { name: 'iCal Link' });
  const feed = `https://webcal.prod.itx.linuxfoundation.org/lfx/${calendar.project.id}`;
  await expect(dialog.getByRole('textbox', { name: `${calendar.project.name} Only` })).toHaveValue(
    feed,
  );
  await expect(
    dialog.getByRole('textbox', { name: `${calendar.project.name} and subprojects` }),
  ).toHaveValue(`${feed}_sub`);

  await dialog
    .getByRole('button', { name: `Copy ${calendar.project.name} and subprojects link` })
    .click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(`${feed}_sub`);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('meetings open from the keyboard and from a Vimium-style click', async ({ page }) => {
  await page.goto('/get-involved/about/');
  const event = meetingIn(dayCell(page, target.start), targetMeeting.title);
  const dialog = page.getByRole('dialog', { name: 'Meeting Details' });

  await event.focus();
  await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  await event.evaluate((element) => {
    for (const type of [
      'pointerover',
      'mouseover',
      'pointerdown',
      'mousedown',
      'pointerup',
      'mouseup',
      'click',
    ]) {
      const Event = type.startsWith('pointer') ? PointerEvent : MouseEvent;
      element.dispatchEvent(new Event(type, { bubbles: true, cancelable: true, view: window }));
    }
  });
  await expect(dialog).toBeVisible();
});

test('phones start in the list view without horizontal scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/get-involved/about/');
  const calendarWidget = widget(page);

  await expect(viewButton(page, 'List')).toHaveAttribute('aria-pressed', 'true');
  await expect(
    calendarWidget.locator('.fc-list-event').filter({ hasText: targetMeeting.title }).first(),
  ).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the regular meetings and the LFX link are still there', async ({ page }) => {
    await page.goto('/get-involved/about/');
    await expect(page.locator('[data-calendar-placeholder]')).toBeHidden();
    for (const meeting of calendar.meetings.filter((entry) => entry.url)) {
      await expect(page.getByRole('link', { name: meeting.title }).first()).toHaveAttribute(
        'href',
        meeting.url!,
      );
    }
    await expect(page.getByRole('link', { name: /LFX Meetings/ })).toHaveAttribute(
      'href',
      calendar.source,
    );
  });
});

test('the nav and the legacy /calendar URL lead to the calendar page', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  await nav.getByRole('button', { name: 'Participate', exact: true }).click();
  await nav.getByRole('link', { name: 'Calendar' }).click();
  await expect(page).toHaveURL(/\/get-involved\/about\/?$/);

  await page.goto('/calendar/');
  await expect(page).toHaveURL(/\/get-involved\/about\/?$/);
});
