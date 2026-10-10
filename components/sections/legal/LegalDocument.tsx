import type { ReactNode } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import type { LegalBlock, LegalDoc } from "@/lib/legal";

// "3. How TruePas Works" -> "how-truepas-works"
const slug = (title: string) =>
  title
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const text = "text-base leading-[27px] text-ink-3";
const list = `flex flex-col gap-2 pl-6 ${text}`;

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p className={text}>{block}</p>;
  if ("h3" in block) return <h3 className="mt-2 text-lg leading-7 font-semibold">{block.h3}</h3>;
  if ("ul" in block)
    return (
      <ul className={`list-disc ${list}`}>
        {block.ul.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    );
  if ("ol" in block)
    return (
      <ol className={`list-decimal ${list}`}>
        {block.ol.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ol>
    );
  return (
    <div className="flex flex-col gap-1 border-l-[3px] border-primary bg-sky-50 px-[15px] py-[13px] text-base leading-[27px] font-semibold break-words text-ink-3">
      {block.box.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

const pill = "rounded-[40px] bg-white px-3 py-[7px] text-[13px] leading-5 font-semibold text-[#525455]";

type Props = {
  doc: LegalDoc;
  /** Extra content rendered at the end of a section, keyed by the section's slug */
  extras?: Record<string, ReactNode>;
};

// Shared layout for the Privacy Policy, Terms & Conditions and Cookie Policy pages
export default function LegalDocument({ doc, extras = {} }: Props) {
  return (
    <>
      <section className="bg-linear-to-b from-sky-200 to-white px-5 pt-36 pb-8 text-center md:px-10 lg:pb-10">
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4">
          <SectionLabel>{doc.eyebrow}</SectionLabel>
          <h1 className="heading-xl">{doc.title}</h1>
          <p className="text-base leading-[26px] text-ink-3">{doc.description}</p>
          <div className="flex flex-wrap justify-center gap-2.5" aria-label="Policy dates">
            <span className={pill}>Effective date: {doc.effective}</span>
            <span className={pill}>Last updated: {doc.updated}</span>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pt-8 pb-14 md:px-10 lg:pt-10 lg:pb-20">
        <div className="container-page grid gap-[38px] lg:grid-cols-[260px_1fr] lg:items-start">
          <nav aria-labelledby="legal-toc" className="rounded-2xl border border-line bg-sky-50 p-6 lg:sticky lg:top-28">
            <h2 id="legal-toc" className="mb-3.5 text-base font-semibold">
              Table of Contents
            </h2>
            <ol className="flex flex-col gap-2 text-sm leading-5 text-ink-3">
              {doc.sections.map((s) => (
                <li key={s.title}>
                  <a href={`#${slug(s.title)}`} className="hover:text-primary">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 max-w-[760px]">
            {doc.sections.map((s) => {
              const id = slug(s.title);
              return (
                <section key={id} id={id} className="flex scroll-mt-28 flex-col gap-3 border-b border-line py-6 first:pt-0 lg:py-7">
                  <h2 className="text-[26px] leading-[34px] font-semibold">{s.title}</h2>
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                  {extras[id]}
                </section>
              );
            })}
          </article>
        </div>
      </section>
    </>
  );
}
