import type { Metadata } from "next";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { termsAndConditions } from "@/lib/legal";

export const metadata: Metadata = {
  title: "TruePas — Terms & Conditions",
  description: "Review the draft terms governing access to and use of TruePas services.",
};

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <LegalDocument doc={termsAndConditions} />
    </main>
  );
}
