"use client";

import { useId, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";

// Only Airports/Airlines copy exists in Figma; the other industries are drafts pending client review
const industries = [
  {
    tab: "Airports/Airlines",
    short: "Airports",
    title: "From Curb to Gate, Without the Wait",
    intro: "Passengers link their identity to their trip before they ever reach the airport.",
    fits: "Arrival · Self-service check-in · Identity verification · Security · Lounge entry · Gate access · Boarding",
    gain: "Shorter queues, faster passenger flow, less document handling, higher terminal throughput, consistent verification, a smoother passenger experience",
  },
  {
    tab: "Car Rentals",
    short: "Car Rentals",
    title: "From Booking to Keys, in Seconds",
    intro: "Renters verify their identity and licence once, then skip the counter at every pickup.",
    fits: "Online booking · Licence verification · Counter-free pickup · Vehicle access · Returns · Loyalty programs",
    gain: "Fewer counter queues, reduced rental fraud, faster vehicle handover, lower staffing load, a seamless renter experience",
  },
  {
    tab: "Hotels",
    short: "Hotels",
    title: "Check In Before You Arrive",
    intro: "Guests confirm their identity ahead of arrival and walk straight to their room.",
    fits: "Pre-arrival check-in · Front desk · Room access · Amenities and spa · Lounge entry · Check-out",
    gain: "Shorter front-desk lines, less paperwork, secure room access, more time for guest service, a personal welcome every stay",
  },
  {
    tab: "Theme Parks",
    short: "Theme Parks",
    title: "More Rides, Less Waiting",
    intro: "Visitors link their tickets and passes to their identity for fast, secure entry all day long.",
    fits: "Park entry · Season pass validation · Ride access · Express lanes · Dining and retail · Re-entry",
    gain: "Faster gate throughput, no pass sharing, fewer lost tickets, reduced staffing at entrances, happier visitors",
  },
  {
    tab: "Cruise",
    short: "Cruise",
    title: "From Terminal to Deck, Effortlessly",
    intro: "Passengers verify once before sailing and move through embarkation and every port with ease.",
    fits: "Terminal check-in · Embarkation · Onboard access · Cabin entry · Onboard purchases · Shore excursions · Disembarkation",
    gain: "Quicker embarkation, accurate passenger manifests, secure onboard access, less document handling, a smoother voyage",
  },
  {
    tab: "Stadiums & Entertainment Venues",
    short: "Venues",
    title: "Doors Open, Lines Disappear",
    intro: "Fans link their tickets to their identity and walk in without searching for a phone or paper ticket.",
    fits: "Gate entry · Ticket validation · VIP and hospitality areas · Concessions · Staff access · Re-entry",
    gain: "Faster crowd flow, elimination of ticket touting, stronger venue security, higher concession sales, a better fan experience",
  },
  {
    tab: "Healthcare Providers",
    short: "Healthcare",
    title: "Right Patient, Right Care, Every Time",
    intro: "Patients verify their identity once and are recognised instantly at every visit.",
    fits: "Patient registration · Appointment check-in · Record access · Pharmacy pickup · Restricted areas · Insurance verification",
    gain: "Fewer identity errors, reduced medical fraud, shorter waiting rooms, less admin work, safer patient care",
  },
];

export default function IndustrySolutions() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const current = industries[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (active + dir + industries.length) % industries.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="bg-sky-50 px-40 py-20">
      <div className="container-page flex flex-col items-center gap-16">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <SectionLabel>Industry Solutions</SectionLabel>
            <h2 className="max-w-[834px] text-center text-[56px] leading-[72px] font-bold">
              One Identity Platform, Built for Every Merchant Environment
            </h2>
          </div>
          <div role="tablist" aria-label="Industries" onKeyDown={onKeyDown} className="flex items-center gap-2">
            {industries.map((ind, i) => (
              <button
                key={ind.tab}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-t${i}`}
                aria-selected={i === active}
                aria-controls={`${id}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`rounded-lg px-3 py-2 text-base leading-6 whitespace-nowrap text-ink-3 transition-colors ${
                  i === active ? "glass font-semibold text-ink-3/80" : "hover:text-primary"
                }`}
              >
                {/* Invisible semibold copy reserves width so tabs don't shift when switching */}
                <span className="grid">
                  <span className="col-start-1 row-start-1">{ind.tab}</span>
                  <span aria-hidden className="invisible col-start-1 row-start-1 font-semibold">
                    {ind.tab}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-t${active}`} className="flex w-full gap-10">
          <div className="flex h-[417px] flex-1 flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="max-w-[512px] text-[40px] leading-[52px] font-bold">{current.title}</h3>
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
            <div className="flex gap-4">
              <Button icon>Explore TruePas for {current.short}</Button>
              <Button variant="secondary">Read more</Button>
            </div>
          </div>
          <Placeholder className="h-[417px] flex-1 rounded-2xl shadow-card-strong" label={`${current.tab} illustration`} />
        </div>
      </div>
    </section>
  );
}
