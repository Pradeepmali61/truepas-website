"use client";

import { useEffect, useId, useRef, useState } from "react";

// Set each store page once the app is published; until then its badge shows "Coming soon" and links nowhere
const APP_STORE_URL: string | null = null;
const PLAY_STORE_URL: string | null = null;

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

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-7 shrink-0 fill-current">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-7 shrink-0">
      <path fill="#00d7fe" d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" />
      <path fill="#ffce00" d="M17.2 8.6 13.8 12l3.4 3.4 3.9-2.2c.9-.5.9-1.9 0-2.4z" />
      <path fill="#00f076" d="M3.6 1.8c.4-.2.8-.2 1.2 0l12.4 6.8-3.4 3.4z" />
      <path fill="#f83a4f" d="m13.8 12 3.4 3.4-12.4 6.8c-.4.2-.8.2-1.2 0z" />
    </svg>
  );
}

function StoreBadge({ href, logo, small, store }: { href: string | null; logo: React.ReactNode; small: string; store: string }) {
  const body = (
    <>
      {logo}
      <span className="flex flex-col text-left">
        <span className="text-[11px] leading-3">{small}</span>
        <span className="text-xl leading-6 font-semibold">{store}</span>
      </span>
    </>
  );
  const box = "flex h-16 items-center gap-3 rounded-xl border border-line bg-white px-5";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${box} transition-colors hover:border-primary`}>
      {body}
    </a>
  ) : (
    <div className={`${box} relative`} aria-label={`${store}: coming soon`}>
      {body}
      <span className="absolute -top-2.5 right-3 rounded-full bg-sky-100 px-2 py-0.5 text-[11px] leading-4 font-semibold text-primary">
        Coming soon
      </span>
    </div>
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
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StoreBadge href={APP_STORE_URL} logo={<AppleLogo />} small="Download on the" store="App Store" />
          <StoreBadge href={PLAY_STORE_URL} logo={<PlayLogo />} small="GET IT ON" store="Google Play" />
        </div>
      </div>
    </div>
  );
}
