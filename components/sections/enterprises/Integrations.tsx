import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import TermList from "@/components/ui/TermList";

const systems = [
  "Reservation systems",
  "Property management systems",
  "Ticketing platforms",
  "Access control",
  "CRM",
  "Loyalty/membership platforms",
  "Point-of-sale",
  "Payment platforms",
  "EHR systems",
  "Mobile & web apps",
  "Security/monitoring platforms",
];

export default function Integrations() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-[72px]">
        <div className="flex flex-col items-center gap-4">
          <SectionLabel>Integrations</SectionLabel>
          <h2 className="heading-xl max-w-[700px] text-center">Works With the Systems You Already Run</h2>
        </div>
        <div className="flex w-full flex-col gap-10 lg:flex-row">
          {/* A diagram, so it's shown whole; the white box blends with its near-white edges wherever the frame's shape differs */}
          <Photo
            src="/images/enterprises/integrations-v2.webp"
            alt="TruePas connected to reservation, property management, ticketing, access control, CRM, loyalty, point-of-sale, payment, EHR, mobile and security systems"
            className="h-64 rounded-2xl bg-white shadow-card-strong md:h-[417px] lg:flex-1"
            fit="contain"
          />
          <div className="flex flex-col justify-between gap-8 lg:min-h-[417px] lg:flex-1">
            <div className="flex flex-col gap-6 text-base leading-6">
              <p>TruePas is built to slot into your existing stack, no rip-and-replace required.</p>
              <TermList label="Connects with" items={systems} />
              <p>
                Our API-first architecture lets merchants add identity verification without rebuilding their core business
                platform.
              </p>
            </div>
            <div>
              <Button variant="secondary" icon href="/contact?inquiry=api-integration#inquiry">
                Speak with an Integration Specialist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
