'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle colour theme"
      className="grid h-10 w-10 place-items-center rounded-full border border-brand-separator transition-colors hover:border-brand-green"
    >
      <span aria-hidden="true" className="dark:hidden">
        {'☾'}
      </span>
      <span aria-hidden="true" className="hidden dark:inline">
        {'☀'}
      </span>
    </button>
  );
}
