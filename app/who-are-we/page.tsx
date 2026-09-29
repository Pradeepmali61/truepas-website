import type { Metadata } from "next";
import CtaBanner from "@/components/sections/CtaBanner";
import About from "@/components/sections/who-are-we/About";
import TeamMembers from "@/components/sections/who-are-we/TeamMembers";

export const metadata: Metadata = {
  title: "TruePas — Who are we",
  description: "The story and the team behind TruePas, the single reusable biometric identity.",
};

export default function WhoAreWePage() {
  return (
    <main>
      <About />
      <TeamMembers />
      <CtaBanner />
    </main>
  );
}
