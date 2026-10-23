"use client";

import { useEffect, useId, useRef, useState } from "react";
import { StoreBadges } from "./StoreLinks";

// DownloadButton fires this; the dialog lives once in the root layout, so it stays open when the button that opened
// it unmounts (the mobile menu closes on click)
const OPEN_EVENT = "truepas:download";
export const openDownloadDialog = () => window.dispatchEvent(new Event(OPEN_EVENT));

// Plain text trigger for server components (the footer)
export function DownloadLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={openDownloadDialog} className={`cursor-pointer ${className}`}>
      {children}
    </button>
  );
}

export default function DownloadDialog() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Focus moves into the dialog and goes back to the button that opened it
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div onClick={() => setOpen(false)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[520px] flex-col gap-4 rounded-2xl bg-white p-7 shadow-card-strong md:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-2xl text-ink-3 hover:bg-sky-50"
        >
          ×
        </button>
        <h2 id={titleId} className="text-[32px] leading-10 font-bold md:text-[40px] md:leading-[48px]">
          Download <span className="text-primary">and Sign Up</span>
        </h2>
        <p className="text-lg leading-7 text-ink-3">Download the app and enter a few details to create your account in seconds.</p>
        <StoreBadges className="mt-4 grid gap-4 sm:grid-cols-2" />
      </div>
    </div>
  );
}
