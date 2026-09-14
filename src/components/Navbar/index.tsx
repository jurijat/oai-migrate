'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { NavItem } from '@/lib/content';

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function ItemLink({
  href,
  label,
  className,
  onNavigate,
}: {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} onClick={onNavigate}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}

export function Navbar({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="bg-brand-bg/90 sticky top-0 z-50 border-b border-brand-separator backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-4"
      >
        <Link href="/" className="shrink-0" aria-label="OpenAPI Initiative home">
          <img src="/brand/openapi-logo.svg" alt="OpenAPI Initiative" className="h-9 w-auto" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.label} className="group relative">
              {item.href ? (
                <ItemLink
                  href={item.href}
                  label={item.label}
                  className="rounded-full px-3 py-2 text-sm font-medium hover:text-brand-green"
                />
              ) : (
                <button
                  type="button"
                  className="rounded-full px-3 py-2 text-sm font-medium hover:text-brand-green"
                  aria-haspopup="true"
                >
                  {item.label}
                </button>
              )}

              {item.children?.length ? (
                <ul className="invisible absolute left-0 top-full z-10 w-72 rounded-2xl border border-brand-separator bg-brand-bg p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <li key={`${child.label}-${child.href}`}>
                      <ItemLink
                        href={child.href}
                        label={child.label}
                        className="block rounded-xl px-3 py-2 text-sm hover:bg-brand-card hover:text-brand-green"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-separator md:hidden"
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      <div id="mobile-nav" hidden={!open} className="border-t border-brand-separator md:hidden">
        <ul className="mx-auto max-w-content space-y-1 px-6 py-4">
          {nav.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <ItemLink
                  href={item.href}
                  label={item.label}
                  className="block py-2 font-medium"
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <p className="py-2 font-medium">{item.label}</p>
              )}
              {item.children?.length ? (
                <ul className="mb-2 ml-4 space-y-1 border-l border-brand-separator pl-4">
                  {item.children.map((child) => (
                    <li key={`${child.label}-${child.href}`}>
                      <ItemLink
                        href={child.href}
                        label={child.label}
                        className="block py-1.5 text-sm text-brand-muted"
                        onNavigate={() => setOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
