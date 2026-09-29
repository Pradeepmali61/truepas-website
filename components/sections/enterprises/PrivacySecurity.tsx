import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { IconBox } from "./AppFeatures";

const items = [
  { icon: "encrypted", title: "Privacy by Design", text: "Workflows minimize unnecessary collection, transmission, and exposure of personal data." },
  { icon: "key", title: "Encrypted Biometric Data", text: "Protected through encryption and controlled storage." },
  { icon: "check-box", title: "Informed Consent", text: "Customers know how their identity is used before they opt in." },
  { icon: "how-to-reg", title: "Strict Access Controls", text: "Only authorized users and systems reach\napproved data." },
  { icon: "lan", title: "Customer Transparency", text: "Customers can review and manage their\nconnected merchant relationships." },
  { icon: "dashboard", title: "User-Controlled Data", text: "Clear, customer-facing data management\noptions." },
  { icon: "award-star", title: "Compliance-Ready", text: "Meets privacy, security, biometric, and industry-specific requirements." },
];

export default function PrivacySecurity() {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-page flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <SectionLabel>Privacy &amp; Security</SectionLabel>
          <h2 className="heading-lg text-center">Trust, Built Into Every Interaction</h2>
        </div>
        <div className="grid w-full gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col gap-4">
              <IconBox icon={it.icon} />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl leading-8 font-semibold">{it.title}</h3>
                <p className="text-base leading-6 lg:whitespace-pre-line">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          icon={
            <span className="flex size-5 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/menu-book.svg" alt="" />
            </span>
          }
        >
          Learn About Privacy and Security
        </Button>
      </div>
    </section>
  );
}
