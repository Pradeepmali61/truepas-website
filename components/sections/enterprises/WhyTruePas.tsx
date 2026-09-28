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
    <section className="bg-white px-40 py-20">
      <div className="container-page flex flex-col gap-16">
        <div className="flex items-center gap-16">
          <div className="flex w-[532px] flex-col gap-6">
            <h2 className="text-[56px] leading-[72px] font-bold">Why TruePas</h2>
            <p className="text-base leading-6 whitespace-pre-line text-ink-3">
              {"TruePas replaces fragmented identity checks with one secure, reusable digital identity, making every interaction faster, safer and more convenient\n\nWhether customers are checking into a hotel, boarding a flight or entering a venue, TruePas helps businesses verify identity in seconds."}
            </p>
          </div>
          <div className="flex h-60 flex-1 items-center justify-center rounded-lg bg-sky-50">
            <div className="flex items-center gap-[18px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/image-8.svg" alt="" width={71} height={72} />
              <span className="text-[54px] leading-[58.6px] font-bold text-primary">TRUEPAS</span>
            </div>
          </div>
        </div>

        <VideoPlayer className="h-[630px]" />

        <div className="flex flex-col gap-10">
          <SectionLabel>How it works</SectionLabel>
          <div className="grid grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.title} className="flex flex-col gap-6">
                <Placeholder className="h-[277px] rounded-sm shadow-card" label={s.title} />
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
