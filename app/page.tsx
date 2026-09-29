import CtaBanner from "@/components/sections/CtaBanner";
import AppFeatures from "@/components/sections/enterprises/AppFeatures";
import Dashboard from "@/components/sections/enterprises/Dashboard";
import Hero from "@/components/sections/enterprises/Hero";
import IndustrySolutions from "@/components/sections/enterprises/IndustrySolutions";
import Integrations from "@/components/sections/enterprises/Integrations";
import MerchantBenefits from "@/components/sections/enterprises/MerchantBenefits";
import Numbers from "@/components/sections/Numbers";
import PrivacySecurity from "@/components/sections/enterprises/PrivacySecurity";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
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
      <Integrations />
      <Dashboard />
      <Testimonials />
      <PrivacySecurity />
      <Team />
      <CtaBanner />
    </main>
  );
}
