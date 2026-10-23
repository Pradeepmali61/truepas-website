import Link from "next/link";
import type { ReactNode } from "react";
import { openDemoBooking } from "@/components/ui/BookDemoButton";
import { publicRoutes } from "@/lib/site";

// Renders the small Markdown subset the assistant may write (lib/chat/knowledge.ts rule 4): paragraphs, "-" and "1."
// lists, **bold**, *italic*, `code` and [label](/path) links. It builds React elements, never HTML strings, so reply
// text can't inject markup, and a link only becomes clickable when it points to one of the site's own pages; any other
// target shows as plain text. A "**" still open at the end of a streaming reply renders as bold, so it doesn't flash.
// A demo link opens the Calendly popup like every other demo CTA: "#book-demo" is the target the prompt asks for, and
// a "Book a demo" label counts too, since the model sometimes points it at /contact instead

const isDemoLink = (label: string, href: string) => href === "#book-demo" || /\b(book|schedule)\b.{0,12}\bdemo\b/i.test(label);
const linkClass = "font-semibold text-primary underline underline-offset-2";

const inlinePattern = /\*\*([^*]+?)(?:\*\*|$)|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`|\*([^*\s][^*]*?)\*/g;

function inline(text: string, onLink: (href: string) => void): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(inlinePattern)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = m.index;
    const [, bold, label, href, code, italic] = m;
    if (bold !== undefined) out.push(<strong key={key}>{bold}</strong>);
    else if (label !== undefined) {
      const path = href.split("#")[0];
      out.push(
        isDemoLink(label, href) ? (
          <button key={key} type="button" onClick={() => openDemoBooking()} className={`${linkClass} cursor-pointer`}>
            {label}
          </button>
        ) : publicRoutes.includes(path) ? (
          <Link key={key} href={href} onClick={() => onLink(href)} className={linkClass}>
            {label}
          </Link>
        ) : (
          label
        ),
      );
    } else if (code !== undefined) out.push(<code key={key} className="rounded bg-white/70 px-1 text-[0.92em]">{code}</code>);
    else out.push(<em key={key}>{italic}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type Block = { kind: "p"; text: string } | { kind: "ul" | "ol"; items: string[] };

function blocks(text: string): Block[] {
  const out: Block[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.+)$/);
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    const prev = out.at(-1);
    if (bullet || numbered) {
      const kind = bullet ? "ul" : "ol";
      const item = (bullet ?? numbered)![1];
      if (prev?.kind === kind) prev.items.push(item);
      else out.push({ kind, items: [item] });
    } else if (line && !/^(-{3,}|={3,}|\*{3,})$/.test(line)) {
      // Headings the model writes despite the rules show as a bold line, not as "##"
      const heading = line.match(/^#{1,6}\s+(.+)$/);
      out.push({ kind: "p", text: heading ? `**${heading[1].replace(/\*\*/g, "")}**` : line });
    }
  }
  return out;
}

export default function ChatMarkdown({ text, onLink }: { text: string; onLink: (href: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {blocks(text).map((b, i) =>
        b.kind === "p" ? (
          <p key={i}>{inline(b.text, onLink)}</p>
        ) : b.kind === "ul" ? (
          <ul key={i} className="flex list-disc flex-col gap-1 pl-5 marker:text-primary">
            {b.items.map((item, j) => (
              <li key={j}>{inline(item, onLink)}</li>
            ))}
          </ul>
        ) : (
          <ol key={i} className="flex list-decimal flex-col gap-1 pl-5 marker:text-primary">
            {b.items.map((item, j) => (
              <li key={j}>{inline(item, onLink)}</li>
            ))}
          </ol>
        ),
      )}
    </div>
  );
}
