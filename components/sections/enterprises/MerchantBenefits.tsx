import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";

// Only the first item has copy in Figma; the rest reuse the matching App Features text
const benefits = [
  {
    title: "Quicker Check-In and Entry",
    content:
      "Swap manual document and ticket checks for instant identity recognition — at reception, security, gates, and service counters\nalike.",
  },
  { title: "Lighter Operational Load", content: "Automate repetitive verification tasks so staff can focus on customer support." },
  { title: "Sharper Fraud Prevention", content: "Verify with true identity, reduce unauthorized access, duplication and manual errors." },
  { title: "A More Consistent Experience", content: "Give customers one consistent identity experience across locations and services." },
  { title: "Higher Throughput at Peak Times", content: "Scan more customers during peak periods with unmatched security and efficiency." },
  { title: "Recognition That Feels Personal", content: "Recognize authorized users at the touchpoints." },
  { title: "Grows With You", content: "Start with single location and expand across properties, departments, and journeys." },
];

export default function MerchantBenefits() {
  return (
    <section className="bg-white px-40 py-20">
      <div className="container-page flex flex-col items-center gap-16">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <SectionLabel>Merchant Benefits</SectionLabel>
            <h2 className="max-w-[654px] text-center text-5xl leading-[72px] font-bold">
              One Identity, Less Friction, Every Step of the Way
            </h2>
          </div>
          <div className="flex w-full items-start gap-10">
            <Placeholder className="h-[417px] flex-1 rounded-2xl shadow-card-strong" label="Merchant benefits illustration" />
            <div className="flex-1 whitespace-pre-line">
              <Accordion items={benefits} />
            </div>
          </div>
        </div>
        <Button icon>Book a Demo</Button>
      </div>
    </section>
  );
}
