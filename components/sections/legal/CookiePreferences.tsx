"use client";

import { useEffect, useState } from "react";
import CookieOptions, { CookieActions } from "@/components/ui/CookieOptions";
import { ALL_OPTIONAL, NO_OPTIONAL, saveConsent, useStoredConsent, type CookieConsent } from "@/lib/consent";

// Preference panel embedded in the Cookie Policy ("Manage Cookie Preferences")
export default function CookiePreferences() {
  const stored = useStoredConsent();
  // Unsaved edits; until the visitor touches a switch the panel mirrors the saved choice
  const [draft, setDraft] = useState<CookieConsent | null>(null);
  const [saved, setSaved] = useState(false);
  const consent = draft ?? stored ?? NO_OPTIONAL;

  useEffect(() => {
    if (!saved) return;
    const t = window.setTimeout(() => setSaved(false), 3000);
    return () => window.clearTimeout(t);
  }, [saved]);

  const apply = (next: CookieConsent) => {
    saveConsent(next);
    setDraft(null);
    setSaved(true);
  };

  return (
    <div id="preferences" className="mt-2 flex scroll-mt-28 flex-col gap-2 rounded-2xl border border-line/75 bg-white p-7 shadow-card-strong">
      <h3 className="text-2xl leading-8 font-semibold">Manage Cookie Preferences</h3>
      <p className="mb-[22px] text-base leading-[26px] text-ink-3">
        Choose which optional cookie categories may be used. Strictly necessary cookies remain active because they are required for core site functionality.
      </p>
      <CookieOptions
        consent={consent}
        onChange={(next) => {
          setDraft(next);
          setSaved(false);
        }}
      />
      <div className="mt-[22px]">
        <CookieActions onAcceptAll={() => apply(ALL_OPTIONAL)} onReject={() => apply(NO_OPTIONAL)} third={{ label: "Save Preferences", onClick: () => apply(consent) }} />
      </div>
      <p role="status" aria-live="polite" className={saved ? "mt-4 rounded-lg border border-[#1f9d61] bg-[#edf9f3] px-3.5 py-3 text-sm font-medium text-[#14663f]" : "sr-only"}>
        {saved ? "Your cookie preferences have been saved." : ""}
      </p>
    </div>
  );
}
