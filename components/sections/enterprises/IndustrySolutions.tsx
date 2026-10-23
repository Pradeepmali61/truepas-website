"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/Button";
import PhotoSwap from "@/components/ui/PhotoSwap";
import SectionLabel from "@/components/ui/SectionLabel";
import Tabs from "@/components/ui/Tabs";

// Only Airports/Airlines copy exists in Figma; the other industries are drafts pending client review.
// `page` is the industry page the Explore CTA opens (app/industries/[slug], data in lib/industries).
// Figma runs "Where it fits" and "What merchants gain" as sentences; a more structured layout was requested
// (22 Oct 2026), so they render as chips and a checklist
const industries = [
  {
    tab: "Airports/Airlines",
    short: "Airports",
    page: "/industries/airports",
    title: "From Curb to Gate, Without the Wait",
    intro: "Passengers link their identity to their trip before they ever reach the airport.",
    fits: ["Arrival", "Self-service check-in", "Identity verification", "Security", "Lounge entry", "Gate access", "Boarding"],
    gain: [
      "Shorter queues",
      "Faster passenger flow",
      "Less document handling",
      "Higher terminal throughput",
      "Consistent verification",
      "Smoother passenger experience",
    ],
    image: "industry-airports",
    alt: "Traveller verifying their identity on a check-in device while airline staff assist",
  },
  {
    tab: "Car Rentals",
    short: "Car Rentals",
    page: "/industries/car-rentals",
    title: "From Booking to Keys, in Seconds",
    intro: "Renters verify their identity and licence once, then skip the counter at every pickup.",
    fits: ["Online booking", "Licence verification", "Counter-free pickup", "Vehicle access", "Returns", "Loyalty programs"],
    gain: ["Fewer counter queues", "Reduced rental fraud", "Faster vehicle handover", "Lower staffing load", "Seamless renter experience"],
    image: "industry-car-rentals",
    alt: "Customer verifying their identity at a car rental counter as the agent hands over the keys",
  },
  {
    tab: "Hotels",
    short: "Hotels",
    page: "/industries/hotels",
    title: "Check In Before You Arrive",
    intro: "Guests confirm their identity ahead of arrival and walk straight to their room.",
    fits: ["Pre-arrival check-in", "Front desk", "Room access", "Amenities and spa", "Lounge entry", "Check-out"],
    gain: ["Shorter front-desk lines", "Less paperwork", "Secure room access", "More time for guest service", "A personal welcome every stay"],
    image: "industry-hotels",
    alt: "Guest verifying their identity on a device at a hotel reception as the receptionist welcomes them",
  },
  {
    tab: "Theme Parks",
    short: "Theme Parks",
    page: "/industries/theme-parks",
    title: "More Rides, Less Waiting",
    intro: "Visitors link their tickets and passes to their identity for fast, secure entry all day long.",
    fits: ["Park entry", "Season pass validation", "Ride access", "Express lanes", "Re-entry"],
    gain: ["Faster gate throughput", "No pass sharing", "Fewer lost tickets", "Reduced staffing at entrances", "Happier visitors"],
    image: "industry-theme-parks",
    alt: "Family verifying their identity at a theme park entrance gate with a staff member",
  },
  {
    tab: "Cruise",
    short: "Cruise",
    page: "/industries/cruise",
    title: "From Terminal to Deck, Effortlessly",
    intro: "Passengers verify once before sailing and move through embarkation and every port with ease.",
    fits: ["Terminal check-in", "Embarkation", "Onboard access", "Cabin entry", "Shore excursions", "Disembarkation"],
    gain: ["Quicker embarkation", "Accurate passenger manifests", "Secure onboard access", "Less document handling", "A smoother voyage"],
    image: "industry-cruise",
    alt: "Passenger verifying their identity at a cruise terminal gate with the ship outside",
  },
  {
    tab: "Stadiums & Entertainment Venues",
    short: "Venues",
    page: "/industries/venues",
    title: "Doors Open, Lines Disappear",
    intro: "Fans link their tickets to their identity and walk in without searching for a phone or paper ticket.",
    fits: ["Gate entry", "Ticket validation", "VIP and hospitality areas", "Staff access", "Re-entry"],
    gain: ["Faster crowd flow", "No ticket touting", "Stronger venue security", "A better fan experience"],
    image: "industry-stadiums",
    alt: "Fan verifying their identity and ticket at a stadium entrance with venue staff",
  },
  {
    tab: "Healthcare Providers",
    short: "Healthcare",
    page: "/industries/healthcare",
    title: "Right Patient, Right Care, Every Time",
    intro: "Patients verify their identity once and are recognised instantly at every visit.",
    fits: ["Patient registration", "Appointment check-in", "Record access", "Pharmacy pickup", "Restricted areas"],
    gain: ["Fewer identity errors", "Reduced medical fraud", "Shorter waiting rooms", "Less admin work", "Safer patient care"],
    image: "industry-healthcare",
    alt: "Patient checking in at a hospital reception with identity verification",
  },
];

const images = industries.map((ind) => (ind.image ? { src: `/images/enterprises/${ind.image}.webp`, alt: ind.alt } : undefined));

const label = "text-xs leading-4 font-semibold tracking-[0.08em] text-ink-3/60 uppercase";

export default function IndustrySolutions() {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = industries[active];

  return (
    <section id="industry-solutions" className="section-pad scroll-mt-16 bg-sky-50">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <SectionLabel>Industry Solutions</SectionLabel>
            <h2 className="heading-xl max-w-[834px] text-center">One Identity Platform, Built for Every Merchant Environment</h2>
          </div>
          <Tabs id={id} label="Industries" tabs={industries.map((ind) => ind.tab)} active={active} onChange={setActive} />
        </div>

        {/* Text is centred against the photo with one 32px rhythm, so tabs with less copy don't leave a gap above the CTA */}
        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-t${active}`}
          className="flex w-full flex-col gap-10 lg:flex-row lg:items-center"
        >
          <div className="flex flex-col gap-8 lg:flex-1">
            <div className="flex flex-col gap-3">
              <h3 className="heading-md max-w-[512px]">{current.title}</h3>
              <p className="max-w-[440px] text-lg leading-7 text-ink-3/80">{current.intro}</p>
            </div>
            <div className="flex flex-col divide-y divide-line border-y border-line">
              <div className="flex flex-col gap-3 py-5">
                <h4 className={label}>Where it fits</h4>
                <ul className="flex flex-wrap gap-2">
                  {current.fits.map((fit) => (
                    <li key={fit} className="rounded-full border border-line bg-white px-3 py-1 text-sm leading-5">
                      {fit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 py-5">
                <h4 className={label}>What merchants gain</h4>
                <ul className="grid gap-x-6 gap-y-2.5 text-sm leading-5 sm:grid-cols-2">
                  {current.gain.map((gain) => (
                    <li key={gain} className="flex gap-2.5">
                      <svg aria-hidden viewBox="0 0 16 16" className="size-5 shrink-0 rounded-full bg-sky-100 p-1 text-primary">
                        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {gain}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button icon href={current.page}>
                Explore TruePas for {current.short}
              </Button>
              {/* "Read more" (Figma) is hidden until there are industry articles to link to: <Button variant="secondary">Read more</Button> */}
            </div>
          </div>
          <PhotoSwap
            images={images}
            active={active}
            className="h-64 rounded-2xl shadow-card-strong md:h-[417px] lg:h-[568px] lg:flex-1 xl:h-[520px]"
            label={`${current.tab} illustration`}
          />
        </div>
      </div>
    </section>
  );
}
