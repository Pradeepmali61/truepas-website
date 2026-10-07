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

// md = feature lists (16px titles, blue border when open); lg = FAQ (20px titles, border stays grey)
const sizes = {
  md: {
    border: "border-line",
    openBorder: "border-primary",
    button: "items-start px-[19px]",
    title: "text-base leading-6",
    content: "pr-[67px] pl-[19px] text-sm leading-5",
  },
  lg: {
    border: "border-line-3",
    openBorder: "border-line-3",
    button: "items-center px-[23px]",
    title: "text-xl leading-8",
    content: "pr-[23px] pl-[23px] text-base leading-6 lg:pr-[71px]",
  },
};

type Props = {
  items: Item[];
  defaultOpen?: number | null;
  size?: keyof typeof sizes;
  /** Called with the newly opened item's index, or null when it was closed (e.g. to swap a section image) */
  onOpenChange?: (open: number | null) => void;
};

export default function Accordion({ items, defaultOpen = 0, size = "md", onOpenChange }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  const s = sizes[size];

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.title}
            className={`rounded-lg border bg-white transition-colors ${isOpen ? s.openBorder : `${s.border} hover:border-line-2`}`}
          >
            <h3>
              <button
                type="button"
                id={`${id}-h${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => {
                  const next = isOpen ? null : i;
                  setOpen(next);
                  onOpenChange?.(next);
                }}
                className={`flex w-full gap-6 rounded-lg pt-[15px] text-left focus-visible:outline-2 focus-visible:outline-primary ${s.button}`}
              >
                <span className={`flex-1 font-semibold ${s.title}`}>{item.title}</span>
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
                <p className={`mt-1 ${s.content}`}>{item.content}</p>
              </div>
            </div>
            <div className="h-[15px]" />
          </div>
        );
      })}
    </div>
  );
}
