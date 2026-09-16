'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CloseIcon, MenuIcon } from '@/components/Icons';
import { Search } from '@/components/Search';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { NavItem } from '@/lib/content';
import { withBasePath } from '@/lib/site';

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
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const close = () => setOpenedAt(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';

    const setOffset = () => {
      const bottom = header.current?.getBoundingClientRect().bottom ?? 0;
      document.documentElement.style.setProperty('--menu-top', `${Math.max(0, bottom)}px`);
    };

    setOffset();
    window.addEventListener('resize', setOffset);
    window.addEventListener('orientationchange', setOffset);

    return () => {
      body.style.overflow = previous;
      window.removeEventListener('resize', setOffset);
      window.removeEventListener('orientationchange', setOffset);
      document.documentElement.style.removeProperty('--menu-top');
    };
  }, [open]);

  return (
    <>
      <header
        ref={header}
        className="bg-brand-bg/90 sticky top-0 z-50 border-b border-brand-separator backdrop-blur"
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-4"
        >
          <Link href="/" className="shrink-0" aria-label="OpenAPI Initiative home">
            <img
              src={withBasePath('/brand/openapi-logo.webp')}
              alt="OpenAPI Initiative"
              width={560}
              height={152}
              className="h-9 w-auto dark:hidden"
            />
            <img
              src={withBasePath('/brand/openapi-logo-dark.webp')}
              alt=""
              aria-hidden="true"
              width={560}
              height={152}
              className="hidden h-9 w-auto dark:block"
            />
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
            <Search />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpenedAt(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-separator md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-nav"
        hidden={!open}
        className="mobile-menu border-t border-brand-separator bg-brand-bg md:hidden"
      >
        <ul className="mx-auto max-w-content space-y-1 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          {nav.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <ItemLink
                  href={item.href}
                  label={item.label}
                  className="block py-2 font-medium"
                  onNavigate={close}
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
                        onNavigate={close}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
