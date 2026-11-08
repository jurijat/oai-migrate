import { writeFile } from 'node:fs/promises';
import prettier from 'prettier';
import { z } from 'zod';

const PROJECT = 'openapi';
const API = `https://pcc-bff.platform.linuxfoundation.org/production/api/v2/itx-services/public/meetings/${PROJECT}`;
const OUTPUT = 'data/calendar.json';
const MONTHS_BACK = 1;
const MONTHS_AHEAD = 6;

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ORDINALS = { '-1': 'last', 1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth' };

const recurrenceSchema = z
  .object({
    type: z.number().int(),
    repeat_interval: z.number().int().positive().optional(),
    weekly_days: z.string().optional(),
    monthly_day: z.number().int().optional(),
    monthly_week: z.number().int().optional(),
    monthly_week_day: z.number().int().min(1).max(7).optional(),
  })
  .passthrough();

const occurrenceFields = {
  title: z.string().min(1),
  start: z.string().datetime({ offset: true }),
  end: z.string().datetime({ offset: true }),
};

const commonProps = {
  meeting_id: z.coerce.string(),
  project_slug: z.string(),
  visibility: z.string(),
  restricted: z.boolean(),
  registrant_count: z.number().int().nonnegative().optional(),
};

const upcomingSchema = z.object({
  project: z.object({
    ID: z.string(),
    Name: z.string(),
    Slug: z.string(),
    Projects: z.array(z.object({ Name: z.string(), Slug: z.string() })).default([]),
  }),
  meetings: z.array(
    z.object({
      ...occurrenceFields,
      extendedProps: z.object({
        ...commonProps,
        share_url: z.string().url(),
        recurrence: recurrenceSchema.nullish(),
      }),
    }),
  ),
});

const pastSchema = z.object({
  meetings: z.array(z.object({ ...occurrenceFields, extendedProps: z.object(commonProps) })),
});

function monthStart(date, offset) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + offset, 1));
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function instant(value) {
  return new Date(value).toISOString().replace('.000Z', 'Z');
}

async function fetchJson(url, schema) {
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  const result = schema.safeParse(await response.json());
  if (!result.success) {
    const detail = result.error.issues
      .slice(0, 10)
      .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`${url}: unexpected response shape\n${detail}`);
  }
  return result.data;
}

function describe(rule) {
  if (!rule) return null;
  const every = rule.repeat_interval ?? 1;
  if (rule.type === 1) return `Daily meeting every ${every} day(s)`;
  if (rule.type === 2) {
    const days = (rule.weekly_days ?? '')
      .split(',')
      .map((day) => WEEKDAYS[Number(day) - 1])
      .filter(Boolean)
      .join(', ');
    return `Weekly meeting${days ? ` on ${days}` : ''} every ${every} week(s)`;
  }
  if (rule.type === 3) {
    const on = rule.monthly_day
      ? `day ${rule.monthly_day}`
      : `${ORDINALS[rule.monthly_week] ?? ''} ${WEEKDAYS[(rule.monthly_week_day ?? 0) - 1] ?? ''}`.trim();
    return `Monthly meeting${on ? ` on ${on}` : ''} every ${every} month(s)`;
  }
  return null;
}

const isPublic = (entry) =>
  entry.extendedProps.visibility === 'public' && !entry.extendedProps.restricted;

async function main() {
  const today = new Date();
  const from = monthStart(today, -MONTHS_BACK);
  const until = monthStart(today, MONTHS_AHEAD + 1);

  const upcoming = await fetchJson(`${API}?view=pcc&pageSize=9999`, upcomingSchema);
  const past = await fetchJson(
    `${API}/past?start_date=${isoDate(from)}&end_date=${isoDate(today)}`,
    pastSchema,
  );

  const root = upcoming.project;
  const projectOrder = [root.Slug, ...root.Projects.map((sub) => sub.Slug)];
  const meetings = new Map();
  const occurrences = new Map();
  const inWindow = (start) => start >= from && start < until;

  const addOccurrence = (entry) => {
    const key = `${entry.extendedProps.meeting_id}@${instant(entry.start)}`;
    if (!inWindow(new Date(entry.start)) || occurrences.has(key)) return;
    occurrences.set(key, {
      meeting: entry.extendedProps.meeting_id,
      start: instant(entry.start),
      end: instant(entry.end),
      participants: entry.extendedProps.registrant_count ?? null,
    });
  };

  for (const entry of upcoming.meetings.filter(isPublic)) {
    const props = entry.extendedProps;
    meetings.set(props.meeting_id, {
      id: props.meeting_id,
      title: entry.title.trim(),
      project: props.project_slug,
      url: props.share_url,
      recurrence: describe(props.recurrence),
    });
    addOccurrence(entry);
  }

  if (!meetings.size) {
    throw new Error('LFX returned no upcoming public meetings; refusing to empty the calendar');
  }

  for (const entry of past.meetings.filter(isPublic)) {
    const props = entry.extendedProps;
    if (!inWindow(new Date(entry.start))) continue;
    if (!meetings.has(props.meeting_id)) {
      meetings.set(props.meeting_id, {
        id: props.meeting_id,
        title: entry.title.trim(),
        project: props.project_slug,
        url: null,
        recurrence: null,
      });
    }
    addOccurrence(entry);
  }

  const rank = (slug) => {
    const index = projectOrder.indexOf(slug);
    return index === -1 ? projectOrder.length : index;
  };

  const calendar = {
    source: `https://zoom-lfx.platform.linuxfoundation.org/meetings/${PROJECT}`,
    window: { from: isoDate(from), until: isoDate(until) },
    project: {
      id: root.ID,
      slug: root.Slug,
      name: root.Name,
      subprojects: root.Projects.map((sub) => ({ slug: sub.Slug, name: sub.Name })),
    },
    meetings: [...meetings.values()].sort(
      (a, b) => rank(a.project) - rank(b.project) || a.title.localeCompare(b.title),
    ),
    occurrences: [...occurrences.values()].sort(
      (a, b) => a.start.localeCompare(b.start) || a.meeting.localeCompare(b.meeting),
    ),
  };

  const json = await prettier.format(JSON.stringify(calendar), { parser: 'json' });
  await writeFile(OUTPUT, json);
  console.log(
    `calendar: ${calendar.meetings.length} meetings, ${calendar.occurrences.length} occurrences, ${calendar.window.from} to ${calendar.window.until}`,
  );
}

await main();
