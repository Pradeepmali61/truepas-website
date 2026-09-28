"use client";

import { useId, useState } from "react";

type Item = { title: string; content: string };

export function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M12 15.4 6 9.4 7.4 8l4.6 4.6L16.6 8 18 9.4z" fill="currentColor" />
    </svg>
  );
}

export default function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.title}
            className={`rounded-lg border bg-white transition-colors ${isOpen ? "border-primary" : "border-line hover:border-line-2"}`}
          >
            <h3>
              <button
                type="button"
                id={`${id}-h${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start gap-6 rounded-lg px-[19px] pt-[15px] text-left focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="flex-1 text-base leading-6 font-semibold">{item.title}</span>
                <ChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-ink"}`} />
              </button>
            </h3>
            <div
              id={`${id}-p${i}`}
              role="region"
              aria-labelledby={`${id}-h${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="mt-1 pr-[67px] pl-[19px] text-sm leading-5">{item.content}</p>
              </div>
            </div>
            <div className="h-[15px]" />
          </div>
        );
      })}
    </div>
  );
}
