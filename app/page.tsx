import AppFeatures from "@/components/sections/enterprises/AppFeatures";
import Hero from "@/components/sections/enterprises/Hero";
import IndustrySolutions from "@/components/sections/enterprises/IndustrySolutions";
import MerchantBenefits from "@/components/sections/enterprises/MerchantBenefits";
import Numbers from "@/components/sections/enterprises/Numbers";
import WhyTruePas from "@/components/sections/enterprises/WhyTruePas";

export default function EnterprisesPage() {
  return (
    <main>
      <Hero />
      <WhyTruePas />
      <AppFeatures />
      <MerchantBenefits />
      <IndustrySolutions />
      <Numbers />
    </main>
  );
}
