"use client";

import { useState } from "react";
import Accordion from "@/components/ui/Accordion";
import BookDemoButton from "@/components/ui/BookDemoButton";
import PhotoSwap from "@/components/ui/PhotoSwap";
import SectionLabel from "@/components/ui/SectionLabel";

// Only the first item has copy in Figma; the rest reuse the matching App Features text
const benefits = [
  {
    title: "Quicker Check-In and Entry",
    content:
      "Swap manual document and ticket checks for instant identity recognition — at reception, security, gates, and service counters\nalike.",
    image: "benefit-quicker-check-in",
    alt: "Football fan verifying their identity at a stadium entry kiosk as a staff member assists",
  },
  { title: "Lighter Operational Load", content: "Automate repetitive verification tasks so staff can focus on customer support.", image: "benefit-operational-load", alt: "Airport staff member helping a traveller while self-service kiosks verify identities" },
  { title: "Sharper Fraud Prevention", content: "Verify with true identity, reduce unauthorized access, duplication and manual errors.", image: "benefit-fraud-prevention", alt: "Traveller verifying their identity at an airport security gate while an officer monitors" },
  { title: "A More Consistent Experience", content: "Give customers one consistent identity experience across locations and services.", image: "benefit-consistent-experience", alt: "Returning visitor verifying their identity at a theme park gate as a staff member welcomes them" },
  { title: "Higher Throughput at Peak Times", content: "Scan more customers during peak periods with unmatched security and efficiency.", image: "benefit-throughput", alt: "Customers verifying their identities at kiosks along busy car rental counters" },
  { title: "Recognition That Feels Personal", content: "Recognize authorized users at the touchpoints.", image: "benefit-personal-recognition", alt: "Returning hotel guest verifying their identity at reception while the receptionist greets them" },
  { title: "Grows With You", content: "Start with single location and expand across properties, departments, and journeys.", image: "benefit-grows-with-you", alt: "Airport with identity verification devices at check-in, security and service counters" },
];

const images = benefits.map((b) => (b.image ? { src: `/images/enterprises/${b.image}.webp`, alt: b.alt } : undefined));

export default function MerchantBenefits() {
  // Last opened item; the image stays when every item is closed
  const [shown, setShown] = useState(0);

  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <SectionLabel>Merchant Benefits</SectionLabel>
            <h2 className="heading-lg max-w-[654px] text-center">One Identity, Less Friction, Every Step of the Way</h2>
          </div>
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start">
            <PhotoSwap
              images={images}
              active={shown}
              className="h-64 rounded-2xl shadow-card-strong md:h-[417px] lg:flex-1"
              label={`${benefits[shown].title} illustration`}
            />
            <div className="lg:flex-1 lg:whitespace-pre-line">
              <Accordion items={benefits} onOpenChange={(i) => i !== null && setShown(i)} />
            </div>
          </div>
        </div>
        <BookDemoButton />
      </div>
    </section>
  );
}
