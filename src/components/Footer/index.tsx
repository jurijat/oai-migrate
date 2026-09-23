import { GitHubIcon, LinkedInIcon } from '@/components/Icons';
import { CookieSettingsLink } from '@/components/CookieBanner';
import { getSocial } from '@/lib/content';

const SOCIAL_ICONS = { linkedin: LinkedInIcon, github: GitHubIcon };

const LEGAL = {
  trademark: 'https://www.linuxfoundation.org/trademark-usage',
  privacy: 'https://www.linuxfoundation.org/privacy',
  terms: 'https://www.linuxfoundation.org/terms',
};

export async function Footer() {
  const social = await getSocial();

  return (
    <footer className="bg-[#1c1c1c] text-[#777777]">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 text-xs leading-relaxed">
        <p className="m-0 max-w-4xl">
          Copyright &copy; The Linux Foundation&reg;. All rights reserved. The Linux Foundation has
          registered trademarks and uses trademarks. For a list of trademarks of The Linux
          Foundation, please see our{' '}
          <a
            href={LEGAL.trademark}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white"
          >
            Trademark Usage
          </a>{' '}
          page. Linux is a registered trademark of Linus Torvalds.{' '}
          <a
            href={LEGAL.privacy}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href={LEGAL.terms}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white"
          >
            Terms of Use
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <CookieSettingsLink />
          <ul className="flex items-center gap-4">
            {social.map((item) => {
              const Glyph = SOCIAL_ICONS[item.icon];
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="block transition-colors hover:text-white"
                  >
                    <Glyph />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
