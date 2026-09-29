import Placeholder from "@/components/ui/Placeholder";

export default function About() {
  return (
    <section className="bg-linear-to-b from-sky-200 to-white px-5 pt-32 pb-16 md:px-10 lg:pt-[200px] lg:pb-20">
      <div className="container-page flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-4 lg:flex-1">
          <h1 className="heading-xl">About TruePas</h1>
          <p className="text-base leading-6 whitespace-pre-line text-ink-3">
            {
              "TruePas began with a simple problem and the rest was the search for its solution.\n\nIn 2025, we uncovered a fundamental flaw: payment and identity systems were verifying cards, not people. Behind that single gap sat a cascade of problems; fragmented identity verification, endless friction, and long wait times across hotels, banks, airports, and healthcare.\n\nWe built a biometric layer that puts the person back at the center of authentication. TruePas is a single solution to the identity and payment pain points we've all lived through, seamless, secure, and built for the real world."
            }
          </p>
        </div>
        <Placeholder className="h-64 rounded-2xl shadow-card-strong md:h-[376px] lg:flex-1" label="About TruePas" />
      </div>
    </section>
  );
}
