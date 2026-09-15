import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { LfBar } from '@/components/LfBar';
import { Navbar } from '@/components/Navbar';
import { Providers } from '@/app/providers';
import { getNav } from '@/lib/content';
import { siteUrl } from '@/lib/site';
import '@/app/globals.css';

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-onest',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OpenAPI Initiative',
    template: '%s – OpenAPI Initiative',
  },
  description:
    'The OpenAPI Initiative provides an open source, technical community within which industry participants may easily contribute to building a vendor-neutral, portable and open specification for providing technical metadata for REST APIs.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const nav = await getNav();

  return (
    <html lang="en" className={onest.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <LfBar />
          <Navbar nav={nav} />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
