"use client";

import { useState } from "react";
import Accordion from "@/components/ui/Accordion";
import Button, { DownloadIcon } from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";

// Only the first item has copy in Figma; the rest are drafts pending client review.
// Multi-Venue has no image yet: the content team sent two versions and one still has to be picked.
const features = [
  { title: "3D Face Scan Authentication", content: "One selfie to securely verify your identity at every authorized checkpoint.", image: "feature-face-scan", alt: "TruePas app scanning a face to verify identity" },
  { title: "Instant Document Access", content: "Keep your verified ID documents in one secure place, ready whenever a checkpoint needs them.", image: "feature-documents", alt: "TruePas app document wallet with a passport, licence and other IDs" },
  { title: "Add / Invite Family & Friends", content: "Invite the people you travel with so everyone moves through checkpoints together.", image: "feature-invite", alt: "TruePas app screen for inviting family and friends" },
  { title: "Track Recent Activity", content: "See where and when your identity was used, with a clear history of every verification.", image: "feature-activity", alt: "TruePas app timeline of recent verifications and check-ins" },
  { title: "Biometric Enrollment & ID Verification", content: "Enroll your face and verify your ID in minutes, from the app or at a partner kiosk.", image: "feature-enrollment", alt: "TruePas app biometric enrollment and ID verification screen" },
  { title: "Sub-3-Second Authentication", content: "Real-time biometric matching confirms who you are in under three seconds at any touchpoint.", image: "feature-speed", alt: "TruePas app confirming verification in seconds" },
  { title: "Per-Industry Consent Toggles", content: "Choose exactly which industries can verify you, and change your mind at any time.", image: "feature-consent", alt: "TruePas app privacy settings with consent toggles per industry" },
  { title: "Multi-Venue Credential Management", content: "Manage tickets, bookings, and passes across every connected venue from a single identity." },
  { title: "Deep System Integrations", content: "Works with the check-in, ticketing, and access systems venues already use.", image: "feature-integrations", alt: "TruePas app connected to airline, hotel, cruise, healthcare and point-of-sale systems" },
  { title: "Easy Opt-Out & Deletion", content: "Withdraw consent or permanently delete your biometric data in a few taps.", image: "feature-opt-out", alt: "TruePas app profile screen with account deletion and privacy controls" },
];

const frame = "h-64 rounded-2xl shadow-card-strong md:h-[417px] lg:flex-1";

export default function AppFeatures() {
  // Last opened item; the image stays when every item is closed
  const [shown, setShown] = useState(0);
  const current = features[shown];

  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <SectionLabel>Benefits</SectionLabel>
            <h2 className="heading-lg text-center">App features</h2>
          </div>
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start">
            {current.image ? (
              <Photo src={`/images/users/${current.image}.webp`} alt={current.alt} className={frame} sizes="(min-width: 1024px) 540px, 100vw" />
            ) : (
              <Placeholder className={frame} label={`${current.title} illustration`} />
            )}
            <div className="lg:flex-1">
              <Accordion items={features} onOpenChange={(i) => i !== null && setShown(i)} />
            </div>
          </div>
        </div>
        <Button icon={<DownloadIcon />}>Download the app</Button>
      </div>
    </section>
  );
}
