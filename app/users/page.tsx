import type { Metadata } from "next";
import Benefits from "@/components/sections/users/Benefits";
import Hero from "@/components/sections/users/Hero";
import HowItWorks from "@/components/sections/users/HowItWorks";

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
    </main>
  );
}
