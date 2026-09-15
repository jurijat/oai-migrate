import typography from '@tailwindcss/typography';

const config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '1024px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        onest: ['var(--font-onest)', 'Onest', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: 'var(--brand-bg)',
          green: '#65D100',
          'green-dark': '#50BD00',
          'green-light': '#76DD2A',
          'green-pressed': '#356D00',
          card: 'var(--brand-card)',
          separator: 'var(--brand-separator)',
          muted: 'var(--brand-muted)',
          'card-dark': 'var(--brand-card-dark)',
          'footer-bg': 'var(--brand-footer-bg)',
        },
      },
      borderRadius: {
        '4xl': '40px',
        '5xl': '80px',
      },
      letterSpacing: {
        oai: '-0.04em',
      },
      maxWidth: {
        content: '1425px',
        prose: '72ch',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--brand-fg)',
            '--tw-prose-headings': 'var(--brand-fg)',
            '--tw-prose-lead': 'var(--brand-muted)',
            '--tw-prose-links': 'var(--brand-link)',
            '--tw-prose-bold': 'var(--brand-fg)',
            '--tw-prose-counters': 'var(--brand-muted)',
            '--tw-prose-bullets': 'var(--brand-muted)',
            '--tw-prose-hr': 'var(--brand-separator)',
            '--tw-prose-quotes': 'var(--brand-fg)',
            '--tw-prose-quote-borders': 'var(--brand-link)',
            '--tw-prose-captions': 'var(--brand-muted)',
            '--tw-prose-code': 'var(--brand-fg)',
            '--tw-prose-pre-code': 'var(--brand-fg)',
            '--tw-prose-pre-bg': 'var(--brand-card)',
            '--tw-prose-th-borders': 'var(--brand-separator)',
            '--tw-prose-td-borders': 'var(--brand-separator)',
            maxWidth: 'none',
            a: { textDecoration: 'none', fontWeight: '500' },
            'a:hover': { textDecoration: 'underline' },
            'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
              color: 'inherit',
              fontWeight: 'inherit',
              textDecoration: 'none',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: 'var(--brand-card)',
              borderRadius: '0.25rem',
              padding: '0.15em 0.35em',
              fontWeight: '400',
            },
            pre: { border: '1px solid var(--brand-separator)' },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
