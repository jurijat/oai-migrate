'use client';

import type { ReactNode } from 'react';
import { useCopy } from '@/components/Calendar/Dialog';
import { DocumentIcon, IdCardIcon, LinkIcon, MapPinIcon, UsersIcon } from '@/components/Icons';
import type { CalendarMeeting, CalendarOccurrence } from '@/lib/content';

const startFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'medium' });

function registerUrl(url: string) {
  return `${url}${url.includes('?') ? '&' : '?'}invite=true`;
}

function Row({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="pt-0.5 text-[#334155]">
        {icon}
      </div>
      <div className="min-w-0">{children}</div>
    </>
  );
}

export function MeetingDetails({
  meeting,
  occurrence,
  past,
}: {
  meeting: CalendarMeeting;
  occurrence: CalendarOccurrence;
  past: boolean;
}) {
  const { copied, copy } = useCopy();
  const upcoming = !past && meeting.url !== null;
  const participants = occurrence.participants;

  return (
    <div data-meeting-details className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 gap-y-4">
      <Row icon={<DocumentIcon size={20} />}>
        <p className="calendar-slab m-0 text-lg">{meeting.title}</p>
        <p className="m-0 mt-1 text-[#334155]">
          <time dateTime={occurrence.start}>{startFormat.format(new Date(occurrence.start))}</time>
        </p>
        {upcoming && meeting.recurrence ? (
          <p className="m-0 text-[#334155]">{meeting.recurrence}</p>
        ) : null}
      </Row>

      {upcoming && meeting.url ? (
        <>
          <Row icon={<MapPinIcon size={20} />}>
            <a
              href={meeting.url}
              target="_blank"
              rel="noreferrer"
              className="break-all text-[#006fc2] hover:underline"
            >
              {meeting.url}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Row>
          <Row icon={<IdCardIcon size={20} />}>
            <span className="inline-flex items-center gap-2">
              <span>
                <span className="sr-only">Meeting ID </span>
                {meeting.id}
              </span>
              <button
                type="button"
                onClick={() => copy(meeting.url!)}
                aria-label="Copy meeting link"
                className="calendar-icon-button grid h-7 w-7 place-items-center text-[#006fc2]"
              >
                <LinkIcon size={16} />
              </button>
              <span role="status" className="text-sm text-[#15803d]">
                {copied ? 'Copied!' : ''}
              </span>
            </span>
          </Row>
        </>
      ) : null}

      {participants !== null ? (
        <Row icon={<UsersIcon size={20} />}>
          {participants} {participants === 1 ? 'Participant' : 'Participants'}
        </Row>
      ) : null}

      {upcoming && meeting.url ? (
        <Row>
          <a
            href={registerUrl(meeting.url)}
            target="_blank"
            rel="noreferrer"
            className="calendar-primary-button"
          >
            Register
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Row>
      ) : null}
    </div>
  );
}

export function IcalLinks({ projectId, projectName }: { projectId: string; projectName: string }) {
  const { copied, copy } = useCopy();
  const base = `https://webcal.prod.itx.linuxfoundation.org/lfx/${projectId}`;
  const feeds = [
    { label: `${projectName} Only`, url: base },
    { label: `${projectName} and subprojects`, url: `${base}_sub` },
  ];

  return (
    <div className="space-y-7">
      {feeds.map((feed) => (
        <div key={feed.url}>
          <label className="block">
            <span className="mb-3 block font-bold text-[#334155]">{feed.label}</span>
            <input
              readOnly
              name={feed.url.endsWith('_sub') ? 'ical-with-subprojects' : 'ical-project'}
              value={feed.url}
              onFocus={(event) => event.currentTarget.select()}
              className="w-full rounded-md border border-[#cbd5e1] px-2.5 py-1.5 text-[#006fc2] focus:border-[#006fc2] focus:outline-none"
            />
          </label>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => copy(feed.url)}
              className="calendar-primary-button"
              aria-label={`Copy ${feed.label} link`}
            >
              Copy
            </button>
            <span role="status" className="text-sm text-[#15803d]">
              {copied === feed.url ? 'Copied!' : ''}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
