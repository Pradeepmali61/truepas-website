import type { Metadata } from "next";
import CtaBanner from "@/components/sections/CtaBanner";
import Team from "@/components/sections/Team";
import AppFeatures from "@/components/sections/users/AppFeatures";
import Benefits from "@/components/sections/users/Benefits";
import Faq from "@/components/sections/users/Faq";
import Hero from "@/components/sections/users/Hero";
import HowItWorks from "@/components/sections/users/HowItWorks";
import SecurityPrivacy from "@/components/sections/users/SecurityPrivacy";
import UseCases from "@/components/sections/users/UseCases";

export const metadata: Metadata = {
  title: "TruePas — For Users",
  description: "One Face. Infinite Places. A single, reusable biometric identity, enrolled once and used everywhere.",
};

export default function UsersPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Benefits />
      <UseCases />
      <AppFeatures />
      <SecurityPrivacy />
      <Faq />
      <Team />
      <CtaBanner />
    </main>
  );
}
