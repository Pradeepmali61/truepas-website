import type { Metadata } from "next";
import IndustrySolutions from "@/components/sections/businesses/IndustrySolutions";

export const metadata: Metadata = {
  title: "TruePas — Businesses",
  description: "One identity platform, built for every merchant environment: airports, car rentals, hotels, theme parks, cruise, venues and healthcare.",
};

export default function BusinessesPage() {
  return (
    <main>
      <IndustrySolutions />
    </main>
  );
}
