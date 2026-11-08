'use client';

import type {
  DatesSetArg,
  DayCellMountArg,
  DayHeaderContentArg,
  EventClickArg,
  EventInput,
  EventMountArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Dialog } from '@/components/Calendar/Dialog';
import { IcalLinks, MeetingDetails } from '@/components/Calendar/MeetingDetails';
import { MiniCalendar } from '@/components/Calendar/MiniCalendar';
import { ProjectFilter } from '@/components/Calendar/ProjectFilter';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';
import type { Calendar } from '@/lib/content';
import { withBasePath } from '@/lib/site';
import './calendar.css';

const VIEWS = [
  { type: 'timeGridDay', label: 'Day', unit: 'Day', current: 'Today' },
  { type: 'timeGridFourDay', label: '4 Days', unit: '4 Days', current: 'Today' },
  { type: 'timeGridWeek', label: 'Week', unit: 'Week', current: 'This Week' },
  { type: 'dayGridMonth', label: 'Month', unit: 'Month', current: 'This Month' },
  { type: 'listMonth', label: 'List', unit: 'Month', current: 'This Month' },
] as const;

const PAST_COLOR = 'rgba(128, 128, 128, 0.5)';
const MINUTE = 60_000;
const NARROW = '(max-width: 639px)';

const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
const eventLabel = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

function subscribeToClock(onChange: () => void) {
  const timer = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(timer);
}

const currentMinute = () => Math.floor(Date.now() / MINUTE);
const noClock = () => null;

function subscribeToWidth(onChange: () => void) {
  const query = window.matchMedia(NARROW);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const isNarrow = () => window.matchMedia(NARROW).matches;
const wideOnServer = () => false;

function renderDayHeader(arg: DayHeaderContentArg) {
  if (arg.view.type === 'dayGridMonth') return arg.text;
  return (
    <span className="calendar-day-header">
      <span>{weekday.format(arg.date)}</span>
      <strong>{arg.date.getDate()}</strong>
    </span>
  );
}

function labelEvent({ el, event }: EventMountArg) {
  const target = el.matches('a') ? el : (el.querySelector<HTMLElement>('a') ?? el);
  target.setAttribute('role', 'button');
  target.setAttribute('aria-haspopup', 'dialog');
  target.setAttribute('tabindex', '0');
  const visible = (target.textContent ?? '').replace(/\s+/g, ' ').trim();
  if (event.start)
    target.setAttribute('aria-label', `${visible}, ${eventLabel.format(event.start)}`);
}

function labelDayCell({ el }: DayCellMountArg) {
  el.removeAttribute('aria-labelledby');
}

type ViewState = { type: string; title: string; showsToday: boolean };

export function CommunityCalendar({ calendar }: { calendar: Calendar }) {
  const minute = useSyncExternalStore(subscribeToClock, currentMinute, noClock);
  const narrow = useSyncExternalStore(subscribeToWidth, isNarrow, wideOnServer);
  const fullCalendar = useRef<FullCalendar>(null);
  const [selected, setSelected] = useState(
    () => new Set([calendar.project.slug, ...calendar.project.subprojects.map((p) => p.slug)]),
  );
  const [view, setView] = useState<ViewState | null>(null);
  const [openEvent, setOpenEvent] = useState<string | null>(null);
  const [icalOpen, setIcalOpen] = useState(false);

  const meetings = useMemo(
    () => new Map(calendar.meetings.map((meeting) => [meeting.id, meeting])),
    [calendar.meetings],
  );

  const occurrences = useMemo(
    () =>
      new Map(
        calendar.occurrences.map((occurrence) => [
          `${occurrence.meeting}@${occurrence.start}`,
          occurrence,
        ]),
      ),
    [calendar.occurrences],
  );

  const events = useMemo<EventInput[]>(() => {
    if (minute === null) return [];
    const now = minute * MINUTE;
    return [...occurrences].flatMap(([id, occurrence]) => {
      const meeting = meetings.get(occurrence.meeting);
      if (!meeting || !selected.has(meeting.project)) return [];
      const past = Date.parse(occurrence.end) <= now;
      return [
        {
          id,
          title: meeting.title,
          start: occurrence.start,
          end: occurrence.end,
          ...(past ? { backgroundColor: PAST_COLOR, borderColor: PAST_COLOR } : {}),
        },
      ];
    });
  }, [occurrences, meetings, selected, minute]);

  if (minute === null) {
    return (
      <div
        data-calendar-placeholder
        aria-busy="true"
        className="oai-calendar grid gap-4 lg:grid-cols-[330px_minmax(0,1fr)]"
      >
        <div className="calendar-card min-h-[24rem] lg:min-h-[48rem]" />
        <div className="calendar-card min-h-[48rem]" />
      </div>
    );
  }

  const now = minute * MINUTE;
  const api = () => fullCalendar.current?.getApi();
  const active = VIEWS.find((entry) => entry.type === view?.type) ?? VIEWS[3];
  const detailOccurrence = openEvent ? occurrences.get(openEvent) : undefined;
  const detailMeeting = detailOccurrence ? meetings.get(detailOccurrence.meeting) : undefined;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, ' ');

  const onDatesSet = (arg: DatesSetArg) => {
    const time = Date.now();
    setView({
      type: arg.view.type,
      title: arg.view.title,
      showsToday: arg.view.currentStart.getTime() <= time && time < arg.view.currentEnd.getTime(),
    });
  };

  const onEventClick = (arg: EventClickArg) => {
    arg.jsEvent.preventDefault();
    setOpenEvent(arg.event.id);
  };

  return (
    <div
      data-community-calendar
      className="oai-calendar grid gap-4 lg:grid-cols-[330px_minmax(0,1fr)] lg:items-start"
    >
      <aside aria-label="Calendar navigation" className="calendar-card space-y-6 p-4 sm:p-5">
        <div className="border-b border-[#e5e7eb] pb-3">
          <img
            src={withBasePath('/brand/openapi-logo.webp')}
            alt={calendar.project.name}
            width={560}
            height={152}
            className="h-[45px] w-auto"
          />
        </div>
        <MiniCalendar today={new Date(now)} onSelect={(date) => api()?.gotoDate(date)} />
        <div className="border-t border-[#e5e7eb] pt-8">
          <ProjectFilter
            root={calendar.project}
            subprojects={calendar.project.subprojects}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </aside>

      <section aria-label="Meetings" className="calendar-card min-w-0 p-4 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          <div className="flex gap-3">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setIcalOpen(true)}
              className="calendar-outline-button"
            >
              iCal
            </button>
            <button
              type="button"
              title={active.current}
              disabled={view?.showsToday ?? true}
              onClick={() => api()?.today()}
              className="calendar-outline-button"
            >
              Today
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={`Previous ${active.unit}`}
              onClick={() => api()?.prev()}
              className="calendar-icon-button grid h-10 w-10 place-items-center text-black"
            >
              <ChevronLeftIcon size={26} strokeWidth={2.6} />
            </button>
            <h3 aria-live="polite" className="calendar-title">
              {view?.title}
            </h3>
            <button
              type="button"
              aria-label={`Next ${active.unit}`}
              onClick={() => api()?.next()}
              className="calendar-icon-button grid h-10 w-10 place-items-center text-black"
            >
              <ChevronRightIcon size={26} strokeWidth={2.6} />
            </button>
          </div>
        </div>

        <div role="group" aria-label="Calendar view" className="mb-5 mt-3 flex flex-wrap gap-2">
          {VIEWS.map((entry) => (
            <button
              key={entry.type}
              type="button"
              aria-pressed={entry.type === active.type}
              title={`${entry.label} view`}
              onClick={() => api()?.changeView(entry.type)}
              className="calendar-view-button"
            >
              {entry.label}
            </button>
          ))}
        </div>

        <FullCalendar
          ref={fullCalendar}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView={narrow ? 'listMonth' : 'dayGridMonth'}
          headerToolbar={false}
          firstDay={1}
          height={narrow ? 'auto' : 650}
          events={events}
          eventInteractive
          nowIndicator
          allDaySlot={false}
          scrollTime="06:00:00"
          dayMaxEvents
          views={{
            timeGridFourDay: { type: 'timeGrid', duration: { days: 4 } },
            dayGridMonth: { dayHeaderFormat: { weekday: 'long' } },
            timeGrid: { eventTimeFormat: { hour: 'numeric', minute: '2-digit', meridiem: false } },
            list: {
              eventTimeFormat: { hour: 'numeric', minute: '2-digit', meridiem: 'short' },
              listDaySideFormat: false,
            },
          }}
          dayHeaderContent={renderDayHeader}
          datesSet={onDatesSet}
          eventClick={onEventClick}
          eventDidMount={labelEvent}
          dayCellDidMount={labelDayCell}
        />

        <p className="m-0 mt-4 text-sm text-[#64748b]">
          Times are shown in your time zone, {timeZone}.
        </p>
      </section>

      <Dialog
        open={Boolean(detailOccurrence && detailMeeting)}
        title="Meeting Details"
        onClose={() => setOpenEvent(null)}
      >
        {detailOccurrence && detailMeeting ? (
          <MeetingDetails
            meeting={detailMeeting}
            occurrence={detailOccurrence}
            past={Date.parse(detailOccurrence.end) <= now}
          />
        ) : null}
      </Dialog>

      <Dialog
        open={icalOpen}
        title="iCal Link"
        onClose={() => setIcalOpen(false)}
        className="calendar-dialog-wide"
      >
        <IcalLinks projectId={calendar.project.id} projectName={calendar.project.name} />
      </Dialog>
    </div>
  );
}
