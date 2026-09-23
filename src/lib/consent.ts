import { useSyncExternalStore } from 'react';

export const CONSENT_KEY = 'oai-consent';
export const CONSENT_VERSION = 1;

export const CONSENT_CATEGORIES = ['functional', 'analytics', 'marketing'] as const;

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];
export type ConsentChoice = Record<ConsentCategory, boolean>;

type StoredConsent = ConsentChoice & { version: number; decidedAt: string };

export const NO_CONSENT: ConsentChoice = { functional: false, analytics: false, marketing: false };
export const FULL_CONSENT: ConsentChoice = { functional: true, analytics: true, marketing: true };

const listeners = new Set<() => void>();

let memory: string | null = null;
let cachedRaw: string | null | undefined;
let cachedChoice: ConsentChoice | null = null;
let preferencesOpen = false;
let returnFocus: HTMLElement | null = null;

function readRaw(): string | null {
  if (memory !== null) return memory;
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function writeRaw(value: string) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
    memory = null;
  } catch {
    memory = value;
  }
}

function parse(raw: string | null): ConsentChoice | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<StoredConsent>;
    if (value.version !== CONSENT_VERSION) return null;
    return {
      functional: value.functional === true,
      analytics: value.analytics === true,
      marketing: value.marketing === true,
    };
  } catch {
    return null;
  }
}

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function getConsent(): ConsentChoice | null {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedChoice = parse(raw);
  }
  return cachedChoice;
}

export function saveConsent(choice: ConsentChoice) {
  const record: StoredConsent = {
    ...choice,
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
  };
  writeRaw(JSON.stringify(record));
  notify();
}

export function grantConsent(category: ConsentCategory) {
  saveConsent({ ...(getConsent() ?? NO_CONSENT), [category]: true });
}

export function revokes(previous: ConsentChoice | null, next: ConsentChoice): boolean {
  if (!previous) return false;
  return CONSENT_CATEGORIES.some((category) => previous[category] && !next[category]);
}

export function useConsent(): ConsentChoice | null | undefined {
  return useSyncExternalStore<ConsentChoice | null | undefined>(
    subscribe,
    getConsent,
    () => undefined,
  );
}

export function openConsentPreferences() {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  preferencesOpen = true;
  notify();
}

export function closeConsentPreferences() {
  preferencesOpen = false;
  notify();
  returnFocus?.focus();
  returnFocus = null;
}

export function useConsentPreferencesOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => preferencesOpen,
    () => false,
  );
}
