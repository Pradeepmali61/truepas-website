"use client";

import { useEffect, useState } from "react";

// Set each store page once the app is published; until then the store links show a "coming soon" notice
export const APP_STORE_URL: string | null = null;
export const PLAY_STORE_URL: string | null = null;

export function AppleLogo({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`shrink-0 fill-current ${className}`}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export function PlayLogo({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`shrink-0 ${className}`}>
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
  const box = "flex h-16 min-w-[200px] items-center gap-3 rounded-xl border border-line bg-white px-5";
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

// "Download on the App Store" / "Get it on Google Play" badges (download dialog, Users use cases)
export function StoreBadges({ className = "flex flex-wrap gap-4" }: { className?: string }) {
  return (
    <div className={className}>
      <StoreBadge href={APP_STORE_URL} logo={<AppleLogo />} small="Download on the" store="App Store" />
      <StoreBadge href={PLAY_STORE_URL} logo={<PlayLogo />} small="GET IT ON" store="Google Play" />
    </div>
  );
}

const stores = [
  { name: "App Store", on: "the App Store", url: APP_STORE_URL, logo: <AppleLogo className="size-6" /> },
  { name: "Google Play", on: "Google Play", url: PLAY_STORE_URL, logo: <PlayLogo className="size-6" /> },
];

// Icon-only store links (Users hero). Without a store URL a click shows a short notice instead
export function StoreIconLinks() {
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(t);
  }, [notice]);

  return (
    <>
      <div className="flex items-center gap-2">
        {stores.map((s) => (
          <a
            key={s.name}
            href={s.url ?? "#"}
            aria-label={s.name}
            {...(s.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={(e) => {
              if (s.url) return;
              e.preventDefault();
              setNotice(`The TruePas app is coming soon to ${s.on}.`);
            }}
            className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-white/70"
          >
            {s.logo}
          </a>
        ))}
      </div>
      <p
        role="status"
        aria-live="polite"
        className={
          notice
            ? "fixed inset-x-5 bottom-6 z-[60] mx-auto w-fit max-w-[480px] rounded-lg bg-ink-2 px-5 py-3 text-center text-base leading-6 text-white shadow-card-strong"
            : "sr-only"
        }
      >
        {notice ?? ""}
      </p>
    </>
  );
}
