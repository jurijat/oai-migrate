import { Roboto_Slab } from 'next/font/google';
import { CommunityCalendar as Widget } from '@/components/Calendar/CommunityCalendar';
import { getCalendar } from '@/lib/content';

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-slab',
  display: 'swap',
});

const LINK = 'text-[color:var(--brand-link)] underline underline-offset-4';

export async function CommunityCalendar() {
  const calendar = await getCalendar();
  const regular = calendar.meetings.filter((meeting) => meeting.url !== null);

  return (
    <div className={robotoSlab.variable}>
      <Widget calendar={calendar} />

      <noscript>
        <style>{'[data-calendar-placeholder]{display:none}'}</style>
        <div className="rounded-md bg-white p-6">
          <p className="m-0 mb-4">
            The interactive calendar needs JavaScript. These are the regular meetings:
          </p>
          <ul className="m-0 list-none space-y-3 p-0">
            {regular.map((meeting) => (
              <li key={meeting.id} className="m-0">
                <a href={meeting.url!} className={`font-semibold ${LINK}`}>
                  {meeting.title}
                </a>
                <span className="block text-sm text-brand-muted">
                  {meeting.recurrence ?? 'One-time meeting'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </noscript>

      <p className="m-0 mt-10 text-brand-muted">
        To view the full page, follow this link:{' '}
        <a href={calendar.source} target="_blank" rel="noreferrer" className={LINK}>
          LFX Meetings
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  );
}
