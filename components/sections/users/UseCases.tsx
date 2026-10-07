"use client";

import { useId, useState } from "react";
import Button, { DownloadIcon } from "@/components/ui/Button";
import PhotoSwap from "@/components/ui/PhotoSwap";
import SectionLabel from "@/components/ui/SectionLabel";
import Tabs from "@/components/ui/Tabs";

// Only Airports copy exists in Figma; the other use-cases are drafts pending client review
const useCases = [
  {
    tab: "Airports",
    title: "From hours in the queue to seconds at the gate.",
    text: "One glance verifies your identity at every checkpoint, check-in, security, and boarding, cutting wait times substantially and eliminating document fraud.",
    image: "use-case-airports",
    alt: "Traveller showing a TruePas travel pass on his phone in an airport terminal",
  },
  {
    tab: "Car Rentals",
    title: "From the rental counter to the open road.",
    text: "Your face confirms your identity and licence at pickup, so you skip the desk paperwork and get behind the wheel in minutes.",
    image: "use-case-car-rentals",
    alt: "Customer at a car rental counter with a verified TruePas identity on their phone",
  },
  {
    tab: "Hotels",
    title: "From the front desk straight to your room.",
    text: "Check in before you arrive and let a single glance unlock the lobby, your room, and hotel amenities throughout your stay.",
    image: "use-case-hotels",
    alt: "Guest checking in at a hotel reception with TruePas on their phone",
  },
  {
    tab: "Theme Parks",
    title: "From long entry lines to more time on the rides.",
    text: "Your face is your ticket: enter the park, use express lanes, and re-enter all day without juggling passes or wristbands.",
    image: "use-case-theme-parks",
    alt: "Visitor entering a theme park with a TruePas pass on their phone",
  },
  {
    tab: "Cruise",
    title: "From terminal paperwork to boarding in minutes.",
    text: "Verify once before you sail and breeze through embarkation, onboard access, and every port of call with a single glance.",
    image: "use-case-cruise",
    alt: "Passenger boarding at a cruise terminal with a TruePas boarding pass on their phone",
  },
  {
    tab: "Venues",
    title: "From ticket scanning to walking straight in.",
    text: "Link your ticket to your identity and enter stadiums, concerts, and events without searching for your phone or a paper ticket.",
    image: "use-case-venues",
    alt: "Fan entering a stadium with a TruePas pass on their phone",
  },
];

const images = useCases.map((u) => ({ src: `/images/users/${u.image}.webp`, alt: u.alt }));

export default function UseCases() {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = useCases[active];

  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <SectionLabel>Use-cases</SectionLabel>
            <h2 className="heading-xl max-w-[796px] text-center">From Check-In to Check-Out - Your Face Is the Key.</h2>
          </div>
          <Tabs id={id} label="Use-cases" tabs={useCases.map((u) => u.tab)} active={active} onChange={setActive} />
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-t${active}`} className="flex w-full flex-col gap-10 lg:flex-row">
          <div className="flex flex-col justify-between gap-8 lg:h-[417px] lg:flex-1">
            <div className="flex flex-col gap-4">
              <h3 className="heading-md">{current.title}</h3>
              <p className="text-base leading-6">{current.text}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button icon={<DownloadIcon />}>Download the app</Button>
              <Button variant="secondary">Read more</Button>
            </div>
          </div>
          <PhotoSwap
            images={images}
            active={active}
            className="h-64 rounded-2xl shadow-card-strong md:h-[417px] lg:flex-1"
            sizes="(min-width: 1024px) 540px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
