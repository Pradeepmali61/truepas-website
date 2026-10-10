import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInquiry from "@/components/sections/contact/ContactInquiry";
import ContactJourney from "@/components/sections/contact/ContactJourney";

export const metadata: Metadata = {
  title: "TruePas — Contact",
  description:
    "Connect with the TruePas team to explore secure biometric identity, faster check-ins, frictionless access and enterprise integrations.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ContactHero />
      <ContactInquiry />
      <ContactJourney />
    </main>
  );
}
