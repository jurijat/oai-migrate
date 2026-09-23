import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import type { ReactNode } from 'react';
import { Analytics } from '@/components/Analytics';
import { CookieBanner } from '@/components/CookieBanner';
import { Footer } from '@/components/Footer';
import { LfBar } from '@/components/LfBar';
import { Navbar } from '@/components/Navbar';
import { getNav, getSocial } from '@/lib/content';
import { ICONS, OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from '@/lib/metadata';
import { isProduction, siteUrl } from '@/lib/site';
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
    default: SITE_NAME,
    template: `%s – ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: ICONS,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: `${siteUrl}/`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [nav, social] = await Promise.all([getNav(), getSocial()]);

  return (
    <html lang="en" className={onest.variable}>
      <body className="flex min-h-screen flex-col">
        <CookieBanner />
        <LfBar />
        <Navbar nav={nav} social={social} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics enabled={isProduction} />
      </body>
    </html>
  );
}
