import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";
import VideoPlayer from "@/components/ui/VideoPlayer";

const steps = [
  { title: "Enrol Once", text: "Customers create a secure digital identity through the TruePas app." },
  { title: "Verify Instantly", text: "A quick facial verification confirms identity at any TruePas-enabled location." },
  { title: "Complete the Journey", text: "Check in, access services from bookings to memberships with single verification." },
];

export default function WhyTruePas() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6 lg:w-[532px] lg:shrink-0">
            <h2 className="heading-xl">Why TruePas</h2>
            <p className="text-base leading-6 whitespace-pre-line text-ink-3">
              {"TruePas replaces fragmented identity checks with one secure, reusable digital identity, making every interaction faster, safer and more convenient\n\nWhether customers are checking into a hotel, boarding a flight or entering a venue, TruePas helps businesses verify identity in seconds."}
            </p>
          </div>
          <div className="flex h-40 items-center justify-center rounded-lg bg-sky-50 md:h-60 lg:flex-1">
            <div className="flex items-center gap-3 md:gap-[18px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/image-8.svg" alt="" width={71} height={72} className="size-12 md:h-[72px] md:w-[71px]" />
              <span className="text-4xl font-bold text-primary md:text-[54px] md:leading-[58.6px]">TRUEPAS</span>
            </div>
          </div>
        </div>

        <VideoPlayer className="aspect-video w-full" />

        <div className="flex flex-col gap-10">
          <SectionLabel>How it works</SectionLabel>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="flex flex-col gap-6">
                <Placeholder className="h-56 rounded-sm shadow-card md:h-[277px]" label={s.title} />
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl leading-8 font-semibold">{s.title}</h3>
                  <p className="text-base leading-6">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
