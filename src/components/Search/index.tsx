'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchIcon } from '@/components/Icons';
import { withBasePath } from '@/lib/site';

type Entry = {
  title: string;
  permalink: string;
  kind: 'post' | 'page';
  date: string | null;
  category: string | null;
  excerpt: string;
  text: string;
};

const LIMIT = 12;

function score(entry: Entry, tokens: string[]) {
  const title = entry.title.toLowerCase();
  let total = 0;
  for (const token of tokens) {
    if (title.includes(token)) total += 10;
    else if (entry.text.includes(token)) total += 1;
    else return 0;
  }
  return total;
}

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    if (entries || loading) return;
    setLoading(true);
    try {
      const res = await fetch(withBasePath('/search-index.json'));
      setEntries((await res.json()) as Entry[]);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [entries, loading]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
        void load();
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [load]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = tokens.length
    ? (entries ?? [])
        .map((entry) => ({ entry, rank: score(entry, tokens) }))
        .filter((item) => item.rank > 0)
        .sort((a, b) => b.rank - a.rank)
        .slice(0, LIMIT)
    : [];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          void load();
        }}
        aria-label="Search"
        className="grid h-10 w-10 place-items-center rounded-full border border-brand-separator transition-colors hover:border-brand-green"
      >
        <SearchIcon />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-24"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-4xl bg-brand-bg shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              ref={input}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts and pages"
              className="w-full border-b border-brand-separator bg-transparent px-6 py-5 text-lg outline-none"
            />

            <div className="max-h-[60vh] overflow-y-auto">
              {loading ? <p className="px-6 py-5 text-brand-muted">Loading…</p> : null}

              {!loading && tokens.length > 0 && results.length === 0 ? (
                <p className="px-6 py-5 text-brand-muted">No results for “{query}”.</p>
              ) : null}

              <ul>
                {results.map(({ entry }) => (
                  <li
                    key={entry.permalink}
                    className="border-b border-brand-separator last:border-0"
                  >
                    <Link
                      href={entry.permalink}
                      onClick={() => setOpen(false)}
                      className="block px-6 py-4 hover:bg-brand-card"
                    >
                      <p className="font-medium">{entry.title}</p>
                      <p className="line-clamp-2 text-sm text-brand-muted">{entry.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
