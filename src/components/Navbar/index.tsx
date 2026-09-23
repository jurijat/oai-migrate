'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ChevronDownIcon,
  CloseIcon,
  ExternalLinkIcon,
  GitHubIcon,
  LinkedInIcon,
  MenuIcon,
} from '@/components/Icons';
import { Search } from '@/components/Search';
import type { NavItem, SocialLink } from '@/lib/content';
import { withBasePath } from '@/lib/site';

export function isExternal(href: string) {
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
    const split = label.lastIndexOf(' ');
    const lead = split === -1 ? '' : label.slice(0, split + 1);
    const last = split === -1 ? label : label.slice(split + 1);
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} onClick={onNavigate}>
        {lead}
        <span className="whitespace-nowrap">
          {last}
          <ExternalLinkIcon data-external-icon className="ml-[5px] inline-block align-baseline" />
        </span>
        <span className="sr-only normal-case"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}

const SOCIAL_ICONS = { linkedin: LinkedInIcon, github: GitHubIcon };

const TOP_LEVEL =
  'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium uppercase tracking-normal text-nav transition-colors hover:text-nav-active group-hover:text-nav-active group-focus-within:text-nav-active';

const DROPDOWN_ITEM =
  'block px-1.5 py-1.5 text-sm leading-6 tracking-normal text-nav-sub transition-colors hover:bg-nav-highlight hover:text-nav-active focus-visible:bg-nav-highlight focus-visible:text-nav-active focus-visible:outline-none';

export function Navbar({ nav, social }: { nav: NavItem[]; social: SocialLink[] }) {
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
      <header ref={header} className="sticky top-0 z-50 border-b border-brand-separator bg-white">
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
              className="h-9 w-auto"
            />
          </Link>

          <ul className="hidden items-center md:flex">
            {nav.map((item) => (
              <li key={item.label} className="group relative">
                {item.href ? (
                  <ItemLink href={item.href} label={item.label} className={TOP_LEVEL} />
                ) : (
                  <button type="button" className={TOP_LEVEL} aria-haspopup="true">
                    {item.label}
                    <ChevronDownIcon />
                  </button>
                )}

                {item.children?.length ? (
                  <ul className="invisible absolute left-0 top-full z-10 w-60 bg-white px-4 py-5 opacity-0 shadow-[0_6px_28px_rgba(0,0,0,0.08)] transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={`${child.label}-${child.href}`}>
                        <ItemLink href={child.href} label={child.label} className={DROPDOWN_ITEM} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-3 md:flex">
              {social.map((item) => {
                const Glyph = SOCIAL_ICONS[item.icon];
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="block p-1 text-nav transition-colors hover:text-nav-active"
                    >
                      <Glyph />
                    </a>
                  </li>
                );
              })}
            </ul>
            <Search />
            <button
              type="button"
              onClick={() => setOpenedAt(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-separator text-nav md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-nav"
        hidden={!open}
        className="mobile-menu border-t border-brand-separator bg-white md:hidden"
      >
        <ul className="mx-auto max-w-content space-y-1 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          {nav.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <ItemLink
                  href={item.href}
                  label={item.label}
                  className="block py-2 text-sm font-medium uppercase tracking-normal text-nav hover:text-nav-active"
                  onNavigate={close}
                />
              ) : (
                <p className="py-2 text-sm font-medium uppercase tracking-normal text-nav">
                  {item.label}
                </p>
              )}
              {item.children?.length ? (
                <ul className="mb-2 ml-4 space-y-1 border-l border-brand-separator pl-4">
                  {item.children.map((child) => (
                    <li key={`${child.label}-${child.href}`}>
                      <ItemLink
                        href={child.href}
                        label={child.label}
                        className="block py-1.5 text-sm tracking-normal text-nav-sub hover:text-nav-active"
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
