import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Icon>
  );
}

export function ExternalLinkIcon({ size = 10, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.4} {...rest}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Icon>
  );
}

export function ChevronDownIcon({ size = 12, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.2} {...rest}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function ArrowRightIcon({ size = 12, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.4} {...rest}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function LinkedInIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.24 8.02h4.5V24H.24V8.02Zm7.86 0h4.31v2.18h.06a4.73 4.73 0 0 1 4.25-2.33c4.55 0 5.39 2.99 5.39 6.88V24h-4.5v-8.35c0-1.99-.04-4.55-2.78-4.55-2.78 0-3.21 2.17-3.21 4.41V24H8.1V8.02Z" />
    </svg>
  );
}

export function GitHubIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={(size * 480) / 512}
      height={size}
      viewBox="0 0 480 512"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z" />
    </svg>
  );
}

export function CookieIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" {...props}>
      <circle cx="200" cy="200" r="196.5" fill="#fff" stroke="#d5d5d5" strokeMiterlimit={10} />
      <path d="M354.5,169.9c-1.9.5-3.8.7-5.8.7-12.8,0-23.2-10.4-23.2-23.2s.3-4,.8-5.9c-5.6,3.7-12.2,5.9-19.5,5.9-19.3,0-34.9-15.6-34.9-34.9h0c-.9,0-1.8,0-2.8,0-24.3,0-43.9-19.7-43.9-43.9s1.8-14.2,4.9-20.2c-8.6-1.5-17.5-2.3-26.6-2.3-85.1,0-154,68.9-154,154s68.9,154,154,154,154-68.9,154-154-1-20.4-3-30.2ZM126.1,286.5c-11.2,0-20.3-9.1-20.3-20.3s9.1-20.3,20.3-20.3,20.3,9.1,20.3,20.3-9.1,20.3-20.3,20.3ZM129.9,193.1c-12.2,0-22.1-9.9-22.1-22.1s9.9-22.1,22.1-22.1,22.1,9.9,22.1,22.1-9.9,22.1-22.1,22.1ZM152.8,105.5c-7.8,0-14.1-6.3-14.1-14.1s6.3-14.1,14.1-14.1,14.1,6.3,14.1,14.1-6.3,14.1-14.1,14.1ZM191.3,135.1c0-9.1,7.4-16.5,16.5-16.5s16.5,7.4,16.5,16.5-7.4,16.5-16.5,16.5-16.5-7.4-16.5-16.5ZM225.1,308.8c-7.8,0-14.1-6.3-14.1-14.1s6.3-14.1,14.1-14.1,14.1,6.3,14.1,14.1-6.3,14.1-14.1,14.1ZM225.1,240.8c-10.5,0-19-8.5-19-19s8.5-19,19-19,19,8.5,19,19-8.5,19-19,19ZM295.6,259.3c-9.8,0-17.8-8-17.8-17.8s8-17.8,17.8-17.8,17.8,8,17.8,17.8-8,17.8-17.8,17.8Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}
