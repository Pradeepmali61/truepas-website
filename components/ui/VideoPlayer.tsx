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
        <Image src={POSTER} alt="" fill unoptimized className="object-cover" />
        {/* Client's pick from the play-button options (option 1, 30 Oct 2026): brand gradient with pulsing rings */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play the TruePas brand video"
          className="relative flex size-20 items-center justify-center rounded-full bg-linear-135 from-cyan to-play-blue shadow-[0_12px_30px_rgba(10,124,255,0.38)] transition-transform hover:scale-105 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-primary md:size-[120px]"
        >
          <span aria-hidden className="absolute inset-0 rounded-full border-2 border-cyan opacity-0 motion-safe:animate-play-pulse" />
          <span aria-hidden className="absolute inset-0 rounded-full border-2 border-cyan opacity-0 motion-safe:animate-play-pulse motion-safe:[animation-delay:1.3s]" />
          <svg viewBox="0 0 24 28" aria-hidden className="w-7 translate-x-1 fill-white md:w-[42px] md:translate-x-1.5">
            <path d="M3 2.6a2 2 0 013-1.7l16 11.4a2 2 0 010 3.4L6 27.1a2 2 0 01-3-1.7z" />
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
