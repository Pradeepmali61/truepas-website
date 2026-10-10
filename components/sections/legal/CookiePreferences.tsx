"use client";

import { useEffect, useState } from "react";
import { getStoredConsent, saveConsent, type CookieConsent } from "@/lib/consent";

const none: CookieConsent = { functional: false, analytics: false, marketing: false };
const all: CookieConsent = { functional: true, analytics: true, marketing: true };

const categories = [
  { key: "necessary", title: "Strictly Necessary", text: "Always active. Required for core website operation." },
  { key: "functional", title: "Functional", text: "Remember preferences and support enhanced functionality." },
  { key: "analytics", title: "Analytics", text: "Measure and improve website performance." },
  { key: "marketing", title: "Marketing", text: "Support relevant messaging and campaign measurement." },
] as const;

const btn = "inline-flex min-h-12 items-center justify-center rounded-lg border px-[19px] py-[11px] text-base leading-6 font-semibold transition-colors focus-visible:outline-primary";
const primary = `${btn} border-primary bg-primary text-white hover:bg-[#006ae0]`;
const secondary = `${btn} border-line-2 bg-white text-ink hover:bg-surface`;

function Switch({ checked, disabled, label, onChange }: { checked: boolean; disabled?: boolean; label: string; onChange?: (v: boolean) => void }) {
  return (
    <label className="relative inline-block h-7 w-12 shrink-0">
      <input
        type="checkbox"
        className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        checked={checked}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-line-2 transition-colors peer-checked:bg-primary peer-disabled:opacity-65 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary" />
      <span className="pointer-events-none absolute top-[3px] left-[3px] size-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform peer-checked:translate-x-5" />
    </label>
  );
}

// Preference panel embedded in the Cookie Policy ("Manage Cookie Preferences")
export default function CookiePreferences() {
  const [consent, setConsent] = useState(none);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    // localStorage is only readable after hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setConsent({ functional: stored.functional, analytics: stored.analytics, marketing: stored.marketing });
  }, []);

  useEffect(() => {
    if (!saved) return;
    const t = window.setTimeout(() => setSaved(false), 3000);
    return () => window.clearTimeout(t);
  }, [saved]);

  const apply = (next: CookieConsent) => {
    setConsent(next);
    saveConsent(next);
    setSaved(true);
  };

  return (
    <div id="preferences" className="mt-2 flex scroll-mt-28 flex-col gap-2 rounded-2xl border border-line/75 bg-white p-7 shadow-card-strong">
      <h3 className="text-2xl leading-8 font-semibold">Manage Cookie Preferences</h3>
      <p className="text-base leading-[26px] text-ink-3">
        Choose which optional cookie categories may be used. Strictly necessary cookies remain active because they are required for core site functionality.
      </p>

      <ul className="my-[22px] flex flex-col gap-3">
        {categories.map((c) => (
          <li key={c.key} className="flex items-center justify-between gap-[15px] rounded-lg border border-line p-[15px]">
            <div>
              <strong className="mb-1 block font-semibold">{c.title}</strong>
              <p className="text-[13px] leading-[21px] text-[#525455]">{c.text}</p>
            </div>
            {c.key === "necessary" ? (
              <Switch checked disabled label="Strictly necessary cookies are always active" />
            ) : (
              <Switch
                checked={consent[c.key]}
                label={`Allow ${c.title.toLowerCase()} cookies`}
                onChange={(v) => {
                  setConsent({ ...consent, [c.key]: v });
                  setSaved(false);
                }}
              />
            )}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={primary} onClick={() => apply(all)}>
          Accept All
        </button>
        <button type="button" className={secondary} onClick={() => apply(none)}>
          Reject Optional
        </button>
        <button type="button" className={secondary} onClick={() => apply(consent)}>
          Save Preferences
        </button>
      </div>

      <p role="status" aria-live="polite" className={saved ? "mt-4 rounded-lg border border-[#1f9d61] bg-[#edf9f3] px-3.5 py-3 text-sm font-medium text-[#14663f]" : "sr-only"}>
        {saved ? "Your cookie preferences have been saved." : ""}
      </p>
    </div>
  );
}
