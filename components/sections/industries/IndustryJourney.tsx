import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Industry } from "@/lib/industries";

// Numbered version of the Users "How TruePas works" step grid
export default function IndustryJourney({ journey }: { journey: Industry["journey"] }) {
  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>{journey.label}</SectionLabel>
          <h2 className="heading-xl max-w-[654px]">{journey.title}</h2>
          <p className="max-w-[654px] text-base leading-6 text-ink-3">{journey.intro}</p>
        </div>
        <ol className="grid w-full gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {journey.steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-6">
              <div className="relative">
                <Photo src={`/images/${s.image}.webp`} alt={s.alt} className="h-56 rounded-sm shadow-card md:h-[277px]" />
                <span className="absolute top-4 left-4 flex size-9 items-center justify-center rounded-full bg-primary text-base leading-6 font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl leading-8 font-semibold">{s.title}</h3>
                <p className="text-base leading-6">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
