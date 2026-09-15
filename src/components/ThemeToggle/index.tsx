'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@/components/Icons';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle colour theme"
      className="grid h-10 w-10 place-items-center rounded-full border border-brand-separator transition-colors hover:border-brand-green"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
