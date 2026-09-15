import Link from 'next/link';
import type { ReactNode } from 'react';
import { getPeople, getTestimonials } from '@/lib/content';
import { withBasePath } from '@/lib/site';

export function Action({
  href,
  primary = false,
  children,
}: {
  href: string;
  primary?: boolean;
  children?: ReactNode;
}) {
  const className = primary ? 'btn-green' : 'btn-outline';
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

export function AnnouncementBar({ href, children }: { href: string; children: ReactNode }) {
  return (
    <div className="band-notice">
      <div className="mx-auto max-w-content px-6 py-4 text-center">
        <a href={href} className="font-medium underline-offset-4 hover:underline">
          {children}
        </a>
      </div>
    </div>
  );
}

export function Hero({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section data-section="hero" className="band-dark hero-arcs">
      <div className="mx-auto max-w-content px-6 py-28 text-center">
        <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-tight tracking-oai md:text-6xl">
          {title}
        </h1>
        {children ? (
          <div className="mt-10 flex flex-wrap justify-center gap-4">{children}</div>
        ) : null}
      </div>
    </section>
  );
}

const TONES = {
  default: '',
  dark: 'band-dark',
  brand: 'band-brand',
} as const;

export function Section({
  title,
  lead,
  tone = 'default',
  center = false,
  prose = false,
  children,
}: {
  title?: string;
  lead?: string;
  tone?: keyof typeof TONES;
  center?: boolean;
  prose?: boolean;
  children?: ReactNode;
}) {
  const muted = tone === 'default' ? 'text-brand-muted' : 'band-muted';

  return (
    <section className={TONES[tone]}>
      <div className={`mx-auto max-w-content px-6 py-20 ${center ? 'text-center' : ''}`.trimEnd()}>
        {title ? (
          <h2 className="mb-4 text-3xl font-semibold tracking-oai md:text-4xl">{title}</h2>
        ) : null}
        {lead ? (
          <p className={`max-w-3xl text-lg ${muted} ${center ? 'mx-auto' : ''}`.trimEnd()}>
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className={prose ? 'prose prose-lg mt-10 max-w-none' : 'mt-10'}>{children}</div>
        ) : null}
      </div>
    </section>
  );
}

export function BenefitGrid({ children }: { children?: ReactNode }) {
  return <ul className="grid list-none gap-6 p-0 md:grid-cols-3">{children}</ul>;
}

export function Benefit({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children?: ReactNode;
}) {
  return (
    <li className="text-center">
      {icon ? (
        <img
          src={withBasePath(icon)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="mx-auto mb-6 h-24 w-24"
        />
      ) : null}
      <h3 className="mb-3 text-xl font-semibold tracking-oai">{title}</h3>
      <div className="band-muted mx-auto max-w-sm">{children}</div>
    </li>
  );
}

export function CTA({
  title,
  tone = 'default',
  children,
}: {
  title: string;
  tone?: keyof typeof TONES;
  children?: ReactNode;
}) {
  const surface = tone === 'default' ? 'bg-brand-card' : TONES[tone];

  return (
    <section className="mx-auto max-w-content px-6 pb-20">
      <div className={`rounded-5xl px-8 py-16 text-center ${surface}`}>
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-oai">{title}</h2>
        {children ? (
          <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>
        ) : null}
      </div>
    </section>
  );
}

export async function TestimonialGrid() {
  const testimonials = await getTestimonials();

  return (
    <ul className="grid list-none gap-6 p-0 md:grid-cols-2">
      {testimonials.map((item) => (
        <li key={item.slug} className="flex flex-col gap-5 rounded-4xl bg-brand-card p-8">
          <img
            src={withBasePath(item.logo)}
            alt={item.logoAlt ?? ''}
            loading="lazy"
            decoding="async"
            className="h-10 w-auto max-w-[180px] object-contain object-left"
          />
          <blockquote className="m-0 border-0 p-0 not-italic text-brand-muted">
            {item.quote}
          </blockquote>
        </li>
      ))}
    </ul>
  );
}

export async function PeopleGrid() {
  const { current, former } = await getPeople();

  return (
    <div className="space-y-14">
      <ul className="grid list-none gap-8 p-0 sm:grid-cols-2 md:grid-cols-4">
        {current.map((person) => (
          <li key={person.slug} className="text-center">
            <img
              src={withBasePath(person.photo)}
              alt={person.name}
              loading="lazy"
              decoding="async"
              className="mx-auto mb-4 aspect-square w-full max-w-[200px] rounded-4xl object-cover"
            />
            <p className="m-0 font-semibold tracking-oai">{person.name}</p>
            {person.term ? <p className="m-0 text-sm text-brand-muted">{person.term}</p> : null}
          </li>
        ))}
      </ul>

      <div>
        <h3 className="mb-4 text-xl font-semibold tracking-oai">Former members</h3>
        <ul className="flex list-none flex-wrap gap-x-8 gap-y-2 p-0 text-brand-muted">
          {former.map((person) => (
            <li key={person.slug} className="m-0">
              {person.name} <span className="text-sm">({person.term})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
