import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaBanner from "@/components/sections/CtaBanner";
import IndustryHero from "@/components/sections/industries/IndustryHero";
import IndustryJourney from "@/components/sections/industries/IndustryJourney";
import { industries } from "@/lib/industries";

// Only the industries in lib/industries exist; anything else 404s
export const dynamicParams = false;

const find = (slug: string) => (slug in industries ? industries[slug as keyof typeof industries] : undefined);

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const industry = find((await params).slug);
  return industry ? { title: `TruePas — ${industry.label}`, description: industry.intro } : {};
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const industry = find((await params).slug);
  if (!industry) notFound();
  return (
    <main>
      <IndustryHero industry={industry} />
      <IndustryJourney journey={industry.journey} />
      <CtaBanner />
    </main>
  );
}
