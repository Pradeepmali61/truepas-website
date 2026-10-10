"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import CookieOptions, { CookieActions } from "@/components/ui/CookieOptions";
import { ALL_OPTIONAL, NO_OPTIONAL, onOpenCookieSettings, openCookieSettings, saveConsent, useStoredConsent, type CookieConsent as Consent } from "@/lib/consent";

/** Footer link that reopens the preferences dialog */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={`cursor-pointer ${className}`}>
      Cookie Settings
    </button>
  );
}

// First-visit cookie banner plus the preferences dialog (also opened from the footer)
export default function CookieConsent() {
  const id = useId();
  const stored = useStoredConsent();
  const [draft, setDraft] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(
    () =>
      onOpenCookieSettings(() => {
        setDraft(null);
        setOpen(true);
      }),
    [],
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const apply = (next: Consent) => {
    saveConsent(next);
    setOpen(false);
  };
  const consent = draft ?? stored ?? NO_OPTIONAL;

  return (
    <>
      {stored === null && !open && (
        <section
          aria-labelledby={`${id}-banner`}
          className="fixed inset-x-5 bottom-5 z-[60] flex flex-col gap-3.5 rounded-2xl border border-line bg-white p-5 shadow-[0_16px_48px_rgba(0,0,0,0.2)] md:left-auto md:w-[560px]"
        >
          <div>
            <h2 id={`${id}-banner`} className="mb-1.5 text-lg leading-7 font-semibold">
              Cookies &amp; Your Choices
            </h2>
            <p className="text-sm leading-[22px] text-ink-3">
              We use necessary cookies to operate the website. Optional functional, analytics and marketing cookies are used only with your consent.
            </p>
          </div>
          <CookieActions size="sm" onAcceptAll={() => apply(ALL_OPTIONAL)} onReject={() => apply(NO_OPTIONAL)} third={{ label: "Manage Preferences", onClick: () => setOpen(true) }} />
          <Link href="/cookie-policy" className="w-fit text-sm font-semibold text-primary hover:underline">
            Read the Cookie Policy
          </Link>
        </section>
      )}

      {open && (
        <div role="presentation" className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-5" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-dialog`}
            className="flex max-h-[calc(100svh-40px)] w-full max-w-[640px] flex-col gap-[22px] overflow-auto rounded-2xl bg-white p-7 shadow-[0_24px_64px_rgba(0,0,0,0.25)]"
          >
            <div className="flex justify-between gap-5">
              <div>
                <h2 id={`${id}-dialog`} className="mb-2 text-2xl leading-8 font-semibold">
                  Cookie Preferences
                </h2>
                <p className="text-base leading-6 text-ink-3">Strictly necessary cookies are always active. Optional categories are enabled only with your consent.</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close cookie preferences"
                onClick={() => setOpen(false)}
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line-2 bg-white text-[22px] leading-none hover:bg-surface focus-visible:outline-primary"
              >
                ×
              </button>
            </div>
            <CookieOptions consent={consent} onChange={setDraft} />
            <CookieActions onAcceptAll={() => apply(ALL_OPTIONAL)} onReject={() => apply(NO_OPTIONAL)} third={{ label: "Save Preferences", onClick: () => apply(consent) }} />
          </section>
        </div>
      )}
    </>
  );
}
