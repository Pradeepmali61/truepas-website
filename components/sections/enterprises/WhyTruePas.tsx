import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import VideoPlayer from "@/components/ui/VideoPlayer";

const steps = [
  { title: "Enroll Once", text: "Customers create a secure digital identity through the TruePas app.", image: "step-enroll", alt: "Customer creating a TruePas digital identity on his phone" },
  { title: "Verify Instantly", text: "A quick facial verification confirms identity at any TruePas-enabled location.", image: "step-verify", alt: "The same customer verifying his face at an airport TruePas kiosk" },
  { title: "Complete the Journey", text: "Check in and access services from bookings to memberships with a single verification.", image: "step-journey", alt: "The same customer checking in for his club membership booking at a TruePas kiosk" },
];

export default function WhyTruePas() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col gap-12 lg:gap-16">
        {/* Figma's logo card beside this text was removed on request (30 Oct 2026): the video thumbnail below shows the same logo */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="heading-xl">Why TruePas</h2>
          {/* Separate paragraphs so text-balance evens out each one's lines */}
          <div className="flex max-w-[800px] flex-col gap-7 text-lg leading-7 text-balance text-ink-3">
            <p>TruePas replaces fragmented identity checks with one secure, unified digital identity, making every interaction faster, safer, and more convenient.</p>
            <p>Whether customers are checking into a hotel, boarding a flight or entering a venue, TruePas helps businesses verify identity in seconds.</p>
          </div>
        </div>

        <VideoPlayer className="aspect-video w-full" />

        <div className="flex flex-col gap-10">
          <SectionLabel>How it works</SectionLabel>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="flex flex-col gap-6">
                <Photo src={`/images/enterprises/${s.image}.webp`} alt={s.alt} className="h-56 rounded-sm shadow-card md:h-[277px]" />
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
