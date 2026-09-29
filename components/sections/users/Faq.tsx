import Accordion from "@/components/ui/Accordion";

// Only the first answer has copy in Figma; the rest are drafts pending client review
const faqs = [
  {
    title: "How does TruePas work?",
    content:
      "TruePas verifies your identity using an approved identity document, facial biometric registration, and liveness\ndetection. After successful verification, an encrypted digital identity token is created. This token can then be used to\nauthenticate you at authorized TruePas-enabled touchpoints.",
  },
  {
    title: "What information is required to register?",
    content:
      "You'll need your name, email address, and phone number, a valid government-issued photo ID, and a quick face scan to create your biometric template.",
  },
  {
    title: "Will TruePas share my information without permission?",
    content:
      "No. Your data is only shared with the venues and services you explicitly consent to, and you can review or withdraw that consent at any time in the app.",
  },
  {
    title: "Can TruePas work with existing enterprise systems?",
    content:
      "Yes. TruePas integrates with existing check-in, ticketing, access control, and payment systems, so venues can add biometric verification without replacing their infrastructure.",
  },
];

export default function Faq() {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-page flex flex-col gap-10">
        <h2 className="heading-lg text-center">Frequently asked questions</h2>
        <div className="lg:whitespace-pre-line">
          <Accordion items={faqs} size="lg" />
        </div>
      </div>
    </section>
  );
}
