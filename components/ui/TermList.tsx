// Labelled list of short items ("Connects with:", "Monitor:"), two columns from sm. Replaces the "a · b · c" run-on
// lines, which left a "·" dangling at line ends and split items like "Mobile & / web apps" across lines (BUG-TP-005/006)
export default function TermList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">{label}:</p>
      <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
