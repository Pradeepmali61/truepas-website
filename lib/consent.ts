// Cookie consent stored per browser. No analytics or marketing scripts are loaded yet; when one is
// added, initialise it only after checking the matching category here.
export type CookieConsent = { functional: boolean; analytics: boolean; marketing: boolean };

const KEY = "truepas-cookie-consent";

export function getStoredConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...consent, necessary: true, timestamp: new Date().toISOString() }));
  } catch {
    // Storage blocked (private mode): the choice applies to this visit only
  }
}
