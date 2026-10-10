import type { CookieConsent } from "@/lib/consent";

const categories = [
  { key: "necessary", title: "Strictly Necessary", text: "Always active. Required for core website operation." },
  { key: "functional", title: "Functional", text: "Remember preferences and support enhanced functionality." },
  { key: "analytics", title: "Analytics", text: "Measure and improve website performance." },
  { key: "marketing", title: "Marketing", text: "Support relevant messaging and campaign measurement." },
] as const;

function Switch({ checked, disabled, label, onChange }: { checked: boolean; disabled?: boolean; label: string; onChange?: (v: boolean) => void }) {
  return (
    <label className="relative inline-block h-7 w-12 shrink-0">
      <input
        type="checkbox"
        className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        checked={checked}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-line-2 transition-colors peer-checked:bg-primary peer-disabled:opacity-65 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary" />
      <span className="pointer-events-none absolute top-[3px] left-[3px] size-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform peer-checked:translate-x-5" />
    </label>
  );
}

const btn = "inline-flex items-center justify-center rounded-lg border font-semibold transition-colors focus-visible:outline-primary";
const sizes = { md: "min-h-12 px-[19px] py-[11px] text-base leading-6", sm: "min-h-[42px] px-3.5 py-2 text-sm leading-5" };
const variants = { primary: "border-primary bg-primary text-white hover:bg-[#006ae0]", secondary: "border-line-2 bg-white text-ink hover:bg-surface" };

type ActionsProps = {
  size?: "md" | "sm";
  onAcceptAll: () => void;
  onReject: () => void;
  /** Third button: "Save Preferences" in the panels, "Manage Preferences" in the banner */
  third: { label: string; onClick: () => void };
};

export function CookieActions({ size = "md", onAcceptAll, onReject, third }: ActionsProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <button type="button" className={`${btn} ${sizes[size]} ${variants.primary}`} onClick={onAcceptAll}>
        Accept All
      </button>
      <button type="button" className={`${btn} ${sizes[size]} ${variants.secondary}`} onClick={onReject}>
        Reject Optional
      </button>
      <button type="button" className={`${btn} ${sizes[size]} ${variants.secondary}`} onClick={third.onClick}>
        {third.label}
      </button>
    </div>
  );
}

// Category switches shared by the Cookie Policy panel and the cookie banner's preferences dialog
export default function CookieOptions({ consent, onChange }: { consent: CookieConsent; onChange: (next: CookieConsent) => void }) {
  return (
    <ul className="flex flex-col gap-3">
      {categories.map((c) => (
        <li key={c.key} className="flex items-center justify-between gap-[15px] rounded-lg border border-line p-[15px]">
          <div>
            <strong className="mb-1 block font-semibold">{c.title}</strong>
            <p className="text-[13px] leading-[21px] text-[#525455]">{c.text}</p>
          </div>
          {c.key === "necessary" ? (
            <Switch checked disabled label="Strictly necessary cookies are always active" />
          ) : (
            <Switch checked={consent[c.key]} label={`Allow ${c.title.toLowerCase()} cookies`} onChange={(v) => onChange({ ...consent, [c.key]: v })} />
          )}
        </li>
      ))}
    </ul>
  );
}
