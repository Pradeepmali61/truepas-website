"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/Button";
import PhotoSwap from "@/components/ui/PhotoSwap";
import SectionLabel from "@/components/ui/SectionLabel";
import Tabs from "@/components/ui/Tabs";

// Only Airports/Airlines copy exists in Figma; the other industries are drafts pending client review
const industries = [
  {
    tab: "Airports/Airlines",
    short: "Airports",
    title: "From Curb to Gate, Without the Wait",
    intro: "Passengers link their identity to their trip before they ever reach the airport.",
    fits: "Arrival · Self-service check-in · Identity verification · Security · Lounge entry · Gate access · Boarding",
    gain: "Shorter queues, faster passenger flow, less document handling, higher terminal throughput, consistent verification, a smoother passenger experience",
    image: "industry-airports",
    alt: "Traveller verifying their identity on a check-in device while airline staff assist",
  },
  {
    tab: "Car Rentals",
    short: "Car Rentals",
    title: "From Booking to Keys, in Seconds",
    intro: "Renters verify their identity and licence once, then skip the counter at every pickup.",
    fits: "Online booking · Licence verification · Counter-free pickup · Vehicle access · Returns · Loyalty programs",
    gain: "Fewer counter queues, reduced rental fraud, faster vehicle handover, lower staffing load, a seamless renter experience",
    image: "industry-car-rentals",
    alt: "Customer verifying their identity at a car rental counter as the agent hands over the keys",
  },
  {
    tab: "Hotels",
    short: "Hotels",
    title: "Check In Before You Arrive",
    intro: "Guests confirm their identity ahead of arrival and walk straight to their room.",
    fits: "Pre-arrival check-in · Front desk · Room access · Amenities and spa · Lounge entry · Check-out",
    gain: "Shorter front-desk lines, less paperwork, secure room access, more time for guest service, a personal welcome every stay",
    image: "industry-hotels",
    alt: "Guest verifying their identity on a device at a hotel reception as the receptionist welcomes them",
  },
  {
    tab: "Theme Parks",
    short: "Theme Parks",
    title: "More Rides, Less Waiting",
    intro: "Visitors link their tickets and passes to their identity for fast, secure entry all day long.",
    fits: "Park entry · Season pass validation · Ride access · Express lanes · Dining and retail · Re-entry",
    gain: "Faster gate throughput, no pass sharing, fewer lost tickets, reduced staffing at entrances, happier visitors",
    image: "industry-theme-parks",
    alt: "Family verifying their identity at a theme park entrance gate with a staff member",
  },
  {
    tab: "Cruise",
    short: "Cruise",
    title: "From Terminal to Deck, Effortlessly",
    intro: "Passengers verify once before sailing and move through embarkation and every port with ease.",
    fits: "Terminal check-in · Embarkation · Onboard access · Cabin entry · Onboard purchases · Shore excursions · Disembarkation",
    gain: "Quicker embarkation, accurate passenger manifests, secure onboard access, less document handling, a smoother voyage",
    image: "industry-cruise",
    alt: "Passenger verifying their identity at a cruise terminal gate with the ship outside",
  },
  {
    tab: "Stadiums & Entertainment Venues",
    short: "Venues",
    title: "Doors Open, Lines Disappear",
    intro: "Fans link their tickets to their identity and walk in without searching for a phone or paper ticket.",
    fits: "Gate entry · Ticket validation · VIP and hospitality areas · Concessions · Staff access · Re-entry",
    gain: "Faster crowd flow, elimination of ticket touting, stronger venue security, higher concession sales, a better fan experience",
    image: "industry-stadiums",
    alt: "Fan verifying their identity and ticket at a stadium entrance with venue staff",
  },
  {
    tab: "Healthcare Providers",
    short: "Healthcare",
    title: "Right Patient, Right Care, Every Time",
    intro: "Patients verify their identity once and are recognised instantly at every visit.",
    fits: "Patient registration · Appointment check-in · Record access · Pharmacy pickup · Restricted areas · Insurance verification",
    gain: "Fewer identity errors, reduced medical fraud, shorter waiting rooms, less admin work, safer patient care",
    image: "industry-healthcare",
    alt: "Patient checking in at a hospital reception with identity verification",
  },
];

const images = industries.map((ind) => (ind.image ? { src: `/images/enterprises/${ind.image}.webp`, alt: ind.alt } : undefined));

export default function IndustrySolutions() {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = industries[active];

  return (
    <section className="section-pad bg-sky-50">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <SectionLabel>Industry Solutions</SectionLabel>
            <h2 className="heading-xl max-w-[834px] text-center">One Identity Platform, Built for Every Merchant Environment</h2>
          </div>
          <Tabs id={id} label="Industries" tabs={industries.map((ind) => ind.tab)} active={active} onChange={setActive} />
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-t${active}`} className="flex w-full flex-col gap-10 lg:flex-row">
          <div className="flex flex-col justify-between gap-8 lg:h-[417px] lg:flex-1">
            <div className="flex flex-col gap-4">
              <h3 className="heading-md max-w-[512px]">{current.title}</h3>
              <div className="flex flex-col gap-6 text-base leading-6">
                <p>{current.intro}</p>
                <p>
                  <strong className="font-semibold">Where it fits</strong>: {current.fits}
                </p>
                <p>
                  <strong className="font-semibold">What merchants gain</strong>: {current.gain}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button icon>Explore TruePas for {current.short}</Button>
              <Button variant="secondary">Read more</Button>
            </div>
          </div>
          <PhotoSwap
            images={images}
            active={active}
            className="h-64 rounded-2xl shadow-card-strong md:h-[417px] lg:flex-1"
            sizes="(min-width: 1024px) 540px, 100vw"
            label={`${current.tab} illustration`}
          />
        </div>
      </div>
    </section>
  );
}
