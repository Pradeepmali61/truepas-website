"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Brand video; regenerate both files with scripts/optimize-video.mjs
const VIDEO = "/videos/truepas-brand.mp4";
const POSTER = "/images/video-poster.webp";

export default function VideoPlayer({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-placeholder/80 ${className}`}>
        <Image src={POSTER} alt="" fill sizes="(min-width: 1024px) 1120px, 100vw" className="object-cover" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play the TruePas brand video"
          className="relative flex size-20 items-center justify-center rounded-full bg-danger transition-transform hover:scale-105 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-primary md:size-[120px]"
        >
          <svg width="40" height="47" viewBox="0 0 40 47" aria-hidden className="h-8 w-[27px] translate-x-1 md:h-[47px] md:w-10">
            <path d="M40 23.5 0 47V0z" fill="#fff" />
          </svg>
        </button>
      </div>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TruePas brand video"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-ink-2">
            {/* Opened by a click, so browsers allow it to start playing with sound */}
            <video src={VIDEO} poster={POSTER} controls autoPlay playsInline className="size-full" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-black/50 text-2xl text-white hover:bg-black/70"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
