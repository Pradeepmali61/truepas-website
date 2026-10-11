"use client";

import { useEffect, useState } from "react";
import Button, { DownloadIcon } from "./Button";

// Set to the store page once the app is published; until then the button explains it is coming soon
const STORE_URL: string | null = null;

type Props = {
  size?: "md" | "lg";
  className?: string;
  iconClassName?: string;
  /** Runs alongside the click, e.g. to close the mobile menu */
  onClick?: () => void;
};

export default function DownloadButton({ size, className, iconClassName, onClick }: Props) {
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(false), 4000);
    return () => window.clearTimeout(t);
  }, [notice]);

  return (
    <>
      <Button
        href={STORE_URL ?? "#"}
        size={size}
        icon={<DownloadIcon className={iconClassName} />}
        className={className}
        onClick={(e) => {
          if (!STORE_URL) {
            e.preventDefault();
            setNotice(true);
          }
          onClick?.();
        }}
      >
        Download the app
      </Button>
      <p
        role="status"
        aria-live="polite"
        className={
          notice
            ? "fixed inset-x-5 bottom-6 z-[60] mx-auto w-fit max-w-[480px] rounded-lg bg-ink-2 px-5 py-3 text-center text-base leading-6 text-white shadow-card-strong"
            : "sr-only"
        }
      >
        {notice ? "The TruePas app is coming soon to the App Store and Google Play." : ""}
      </p>
    </>
  );
}
