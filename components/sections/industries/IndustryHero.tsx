import BookDemoButton from "@/components/ui/BookDemoButton";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Industry } from "@/lib/industries";

// Same layout as the Enterprises hero
export default function IndustryHero({ industry }: { industry: Industry }) {
  return (
    <section className="bg-linear-to-b from-sky-200 to-white px-5 pt-32 pb-16 md:px-10 lg:pt-[200px] lg:pb-[120px]">
      <div className="container-page flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-6 lg:w-[540px] lg:shrink-0">
          <div className="flex flex-col gap-4">
            <SectionLabel>{industry.label}</SectionLabel>
            <h1 className="heading-xl">{industry.title}</h1>
            <p className="max-w-[468px] text-base leading-6 text-ink-3">{industry.intro}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <BookDemoButton />
            <Button variant="secondary" href={`/contact?industry=${industry.contact}&inquiry=request-demo#inquiry`}>
              Talk to Our Team
            </Button>
          </div>
        </div>
        <Photo
          src={`/images/${industry.heroImage}.webp`}
          alt={industry.heroAlt}
          className="h-64 rounded-2xl shadow-card-strong md:h-[376px] lg:flex-1"
          eager
        />
      </div>
    </section>
  );
}
