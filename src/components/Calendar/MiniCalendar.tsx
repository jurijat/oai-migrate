'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';

const WEEKDAYS = [
  ['Su', 'Sunday'],
  ['Mo', 'Monday'],
  ['Tu', 'Tuesday'],
  ['We', 'Wednesday'],
  ['Th', 'Thursday'],
  ['Fr', 'Friday'],
  ['Sa', 'Saturday'],
] as const;

const DAY = 86_400_000;

const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' });
const fullDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' });

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function sameDay(a: Date, b: Date) {
  return a.getTime() === b.getTime();
}

function isoWeek(date: Date) {
  const thursday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  thursday.setUTCDate(thursday.getUTCDate() + 4 - (thursday.getUTCDay() || 7));
  const yearStart = Date.UTC(thursday.getUTCFullYear(), 0, 1);
  return Math.ceil(((thursday.getTime() - yearStart) / DAY + 1) / 7);
}

export function MiniCalendar({ today, onSelect }: { today: Date; onSelect: (date: Date) => void }) {
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [focused, setFocused] = useState<Date | null>(null);
  const grid = useRef<HTMLTableSectionElement>(null);

  const first = addDays(month, -month.getDay());
  const weeks = Math.ceil(
    (month.getDay() + new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()) / 7,
  );
  const days = Array.from({ length: weeks * 7 }, (_, index) => addDays(first, index));
  const todayStart = startOfDay(today);
  const inMonth = (date: Date) => date.getMonth() === month.getMonth();
  const tabbable =
    days.find((date) => focused && sameDay(date, focused)) ??
    days.find((date) => sameDay(date, todayStart) && inMonth(date)) ??
    month;

  const shift = (months: number) =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + months, 1));

  const moveFocus = (target: Date) => {
    setFocused(target);
    if (target.getMonth() !== month.getMonth() || target.getFullYear() !== month.getFullYear()) {
      setMonth(new Date(target.getFullYear(), target.getMonth(), 1));
    }
    requestAnimationFrame(() => {
      grid.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${target.toDateString()}"]`)
        ?.focus();
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    const steps: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (event.key in steps) {
      event.preventDefault();
      moveFocus(addDays(date, steps[event.key]));
    } else if (event.key === 'Home') {
      event.preventDefault();
      moveFocus(addDays(date, -date.getDay()));
    } else if (event.key === 'End') {
      event.preventDefault();
      moveFocus(addDays(date, 6 - date.getDay()));
    }
  };

  return (
    <div className="mini-calendar">
      <div className="flex items-center justify-between border-b border-[#e5e7eb] px-2 pb-3">
        <button
          type="button"
          aria-label="Previous Month"
          onClick={() => shift(-1)}
          className="calendar-icon-button grid h-9 w-9 place-items-center"
        >
          <ChevronLeftIcon size={18} />
        </button>
        <p aria-live="polite" className="m-0 flex gap-6 text-base text-[#334155]">
          <span>{monthName.format(month)}</span>
          <span>{month.getFullYear()}</span>
        </p>
        <button
          type="button"
          aria-label="Next Month"
          onClick={() => shift(1)}
          className="calendar-icon-button grid h-9 w-9 place-items-center"
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>
      <table className="mt-2 w-full table-fixed border-collapse text-center text-base">
        <thead>
          <tr>
            <th scope="col" className="w-[12.5%] py-2 font-bold text-[#64748b]">
              <abbr title="Week" className="no-underline">
                Wk
              </abbr>
            </th>
            {WEEKDAYS.map(([short, long]) => (
              <th key={short} scope="col" className="py-2 font-normal text-[#334155]">
                <abbr title={long} className="no-underline">
                  {short}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody ref={grid}>
          {Array.from({ length: weeks }, (_, week) => {
            const row = days.slice(week * 7, week * 7 + 7);
            return (
              <tr key={row[0].toDateString()}>
                <td className="py-0.5 text-[#64748b]">{isoWeek(row[0])}</td>
                {row.map((date) => {
                  const isToday = sameDay(date, todayStart);
                  return (
                    <td key={date.toDateString()} className="py-0.5">
                      <button
                        type="button"
                        data-date={date.toDateString()}
                        tabIndex={sameDay(date, tabbable) ? 0 : -1}
                        aria-label={fullDate.format(date)}
                        aria-current={isToday ? 'date' : undefined}
                        onClick={() => {
                          setFocused(date);
                          onSelect(date);
                        }}
                        onKeyDown={(event) => onKeyDown(event, date)}
                        className={`mx-auto grid h-8 w-8 place-items-center rounded-full transition-colors ${
                          isToday
                            ? 'bg-[#006fc2] text-white'
                            : inMonth(date)
                              ? 'text-[#1e293b] hover:bg-[#f1f5f9]'
                              : 'text-[#6b7280] hover:bg-[#f1f5f9]'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
