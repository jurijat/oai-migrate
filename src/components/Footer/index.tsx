import Link from 'next/link';
import { getNav } from '@/lib/content';

const LEGAL = [
  { label: 'Trademark Usage', href: 'https://www.linuxfoundation.org/trademark-usage' },
  { label: 'Privacy Policy', href: 'https://www.linuxfoundation.org/privacy' },
  { label: 'Terms of Use', href: 'https://www.linuxfoundation.org/terms' },
];

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/open-api-initiative/' },
  { label: 'GitHub', href: 'https://github.com/oai' },
];

function NavLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className="hover:text-brand-green">
        {label}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className="hover:text-brand-green">
      {label}
    </a>
  );
}

export async function Footer() {
  const nav = await getNav();
  const columns = nav.filter((item) => item.children?.length).slice(0, 4);

  return (
    <footer className="mt-24 bg-brand-footer-bg">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {columns.map((column) => (
            <div key={column.label}>
              <h2 className="mb-3 font-semibold tracking-oai">{column.label}</h2>
              <ul className="space-y-2 text-sm text-brand-muted">
                {column.children?.map((child) => (
                  <li key={`${child.label}-${child.href}`}>
                    <NavLink href={child.href} label={child.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-separator pt-8 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright &copy; {new Date().getFullYear()} the Linux Foundation. The OpenAPI Initiative
            is a Linux Foundation project.
          </p>
          <ul className="flex flex-wrap gap-4">
            {[...LEGAL, ...SOCIAL].map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
