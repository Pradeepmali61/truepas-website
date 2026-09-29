"use client";

import { useRef } from "react";

type Props = {
  /** Prefix for tab/panel ids: tabs are `${id}-t${i}`, the panel is `${id}-panel` */
  id: string;
  label: string;
  tabs: string[];
  active: number;
  onChange: (i: number) => void;
};

export default function Tabs({ id, label, tabs, active, onChange }: Props) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (active + dir + tabs.length) % tabs.length;
    onChange(next);
    tabRefs.current[next]?.focus();
  };

  return (
    // Scrolls horizontally below lg; negative margins let it run edge to edge, py/-my keep the glass shadow unclipped
    <div className="-mx-5 -my-3 w-[calc(100%+40px)] overflow-x-auto px-5 py-3 [scrollbar-width:none] md:-mx-10 md:w-[calc(100%+80px)] md:px-10 lg:mx-0 lg:w-full lg:px-0">
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="mx-auto flex w-max items-center gap-2">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => onChange(i)}
            className={`rounded-lg px-3 py-2 text-base leading-6 whitespace-nowrap text-ink-3 transition-colors ${
              i === active ? "glass font-semibold text-ink-3/80" : "hover:text-primary"
            }`}
          >
            {/* Invisible semibold copy reserves width so tabs don't shift when switching */}
            <span className="grid">
              <span className="col-start-1 row-start-1">{tab}</span>
              <span aria-hidden className="invisible col-start-1 row-start-1 font-semibold">
                {tab}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
