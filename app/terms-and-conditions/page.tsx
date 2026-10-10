import type { Metadata } from "next";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { termsAndConditions } from "@/lib/legal";

export const metadata: Metadata = {
  title: "TruePas — Terms & Conditions",
  description: "The terms that govern your use of the TruePas website, mobile app and TruePas-enabled kiosks.",
};

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <LegalDocument doc={termsAndConditions} />
    </main>
  );
}
