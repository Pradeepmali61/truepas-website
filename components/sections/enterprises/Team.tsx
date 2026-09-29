import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Team() {
  return (
    <section className="bg-white px-40 py-20">
      <div className="container-page flex flex-col gap-20">
        <div className="flex flex-col items-center gap-4">
          <SectionLabel>About Us</SectionLabel>
          <h2 className="text-center text-5xl leading-[72px] font-bold">The Team Behind TruePas</h2>
        </div>
        <div className="flex gap-10">
          <Placeholder className="h-[552px] flex-1 rounded-2xl shadow-card-strong" label="TruePas team" />
          <div className="flex flex-1 flex-col text-base leading-6">
            <p>TruePas began with a simple problem and the rest was the search for its solution.</p>
            <p className="mt-6">
              In 2025, we uncovered a fundamental flaw: payment and identity systems were verifying cards, not people. Behind
              that single gap sat a cascade of problems; fragmented identity verification, endless friction, and long wait times
              across hotels, banks, airports, and healthcare.
            </p>
            <p>
              We built a biometric layer that puts the person back at the center of authentication. TruePas is a single solution
              to the identity and payment pain points we&apos;ve all lived through, seamless, secure, and built for the real world.
            </p>
            <p className="mt-6">
              Our team brings over four decades of combined expertise in enterprise technology leadership across finance,
              aviation, healthcare, and hospitality, with deep specialization in IT infrastructure, cybersecurity, and large-scale
              digital transformation. We&apos;re equally at home in cloud-native architecture and micro-services, as we are in
              translating complex technology into measurable business outcomes.
            </p>
            <p className="mt-6">
              Together, this experience shapes our strategic vision — built to scale, and designed to be secure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
