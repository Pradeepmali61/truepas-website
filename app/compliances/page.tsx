import type { Metadata } from "next";
import ComplianceList from "@/components/sections/compliances/ComplianceList";

export const metadata: Metadata = {
  title: "TruePas — Compliances",
  description: "The privacy, security and biometric compliance standards TruePas meets.",
};

export default function CompliancesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ComplianceList />
    </main>
  );
}
