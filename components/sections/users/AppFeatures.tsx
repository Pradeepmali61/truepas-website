import Accordion from "@/components/ui/Accordion";
import Button, { DownloadIcon } from "@/components/ui/Button";
import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";

// Only the first item has copy in Figma; the rest are drafts pending client review
const features = [
  { title: "3D Face Scan Authentication", content: "One selfie to securely verify your identity at every authorized checkpoint." },
  { title: "Instant Document Access", content: "Keep your verified ID documents in one secure place, ready whenever a checkpoint needs them." },
  { title: "Add / Invite Family & Friends", content: "Invite the people you travel with so everyone moves through checkpoints together." },
  { title: "Track Recent Activity", content: "See where and when your identity was used, with a clear history of every verification." },
  { title: "Biometric Enrollment & ID Verification", content: "Enroll your face and verify your ID in minutes, from the app or at a partner kiosk." },
  { title: "Sub-3-Second Authentication", content: "Real-time biometric matching confirms who you are in under three seconds at any touchpoint." },
  { title: "Per-Industry Consent Toggles", content: "Choose exactly which industries can verify you, and change your mind at any time." },
  { title: "Multi-Venue Credential Management", content: "Manage tickets, bookings, and passes across every connected venue from a single identity." },
  { title: "Deep System Integrations", content: "Works with the check-in, ticketing, and access systems venues already use." },
  { title: "Easy Opt-Out & Deletion", content: "Withdraw consent or permanently delete your biometric data in a few taps." },
];

export default function AppFeatures() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <SectionLabel>Benefits</SectionLabel>
            <h2 className="heading-lg text-center">App features</h2>
          </div>
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start">
            <Placeholder className="h-64 rounded-2xl shadow-card-strong md:h-[417px] lg:flex-1" label="App features illustration" />
            <div className="lg:flex-1">
              <Accordion items={features} />
            </div>
          </div>
        </div>
        <Button icon={<DownloadIcon />}>Download the app</Button>
      </div>
    </section>
  );
}
