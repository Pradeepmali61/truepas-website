import AppFeatures from "@/components/sections/enterprises/AppFeatures";
import Hero from "@/components/sections/enterprises/Hero";
import MerchantBenefits from "@/components/sections/enterprises/MerchantBenefits";
import WhyTruePas from "@/components/sections/enterprises/WhyTruePas";

export default function EnterprisesPage() {
  return (
    <main>
      <Hero />
      <WhyTruePas />
      <AppFeatures />
      <MerchantBenefits />
    </main>
  );
}
