import type { Metadata } from "next";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "TruePas — Privacy Policy",
  description: "Learn how TruePas approaches personal information, biometric identity, consent, security and privacy rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <LegalDocument doc={privacyPolicy} />
    </main>
  );
}
