import { useSyncExternalStore } from "react";

// Cookie consent stored per browser. The site sets no optional cookies today (audit 11 Oct 2026);
// when an analytics or marketing tool is added, initialise it only after checking its category here.
export type CookieConsent = { functional: boolean; analytics: boolean; marketing: boolean };

export const NO_OPTIONAL: CookieConsent = { functional: false, analytics: false, marketing: false };
export const ALL_OPTIONAL: CookieConsent = { functional: true, analytics: true, marketing: true };

const KEY = "truepas-cookie-consent";
const CHANGED = "truepas:consent-changed";
const OPEN = "truepas:open-cookie-settings";

// Fallback when storage is blocked (private mode), so the banner still closes for this visit
let memory: string | null = null;

function read() {
  try {
    return window.localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

function parse(raw: string | null): CookieConsent | null {
  try {
    const v = raw ? (JSON.parse(raw) as CookieConsent) : null;
    return v && { functional: !!v.functional, analytics: !!v.analytics, marketing: !!v.marketing };
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGED, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGED, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Saved choice: `undefined` while server rendering, `null` when the visitor hasn't chosen yet */
export function useStoredConsent() {
  const raw = useSyncExternalStore(subscribe, read, () => undefined);
  return raw === undefined ? undefined : parse(raw);
}

export function saveConsent(consent: CookieConsent) {
  memory = JSON.stringify({ ...consent, necessary: true, timestamp: new Date().toISOString() });
  try {
    window.localStorage.setItem(KEY, memory);
  } catch {
    // Storage blocked: the in-memory copy covers this visit
  }
  window.dispatchEvent(new Event(CHANGED));
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN));

export function onOpenCookieSettings(cb: () => void) {
  window.addEventListener(OPEN, cb);
  return () => window.removeEventListener(OPEN, cb);
}
