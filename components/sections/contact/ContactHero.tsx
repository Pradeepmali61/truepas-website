import SectionLabel from "@/components/ui/SectionLabel";

export default function ContactHero() {
  return (
    <section className="bg-linear-to-b from-sky-200 to-white px-5 pt-36 pb-16 md:px-10 lg:pt-[200px] lg:pb-[120px]">
      <div className="mx-auto flex max-w-[835px] flex-col items-center gap-5 text-center">
        <SectionLabel>Contact Us</SectionLabel>
        <h1 className="heading-xl">Let&apos;s Make Every Customer Journey Seamless</h1>
        <p className="text-lg leading-[30px] text-ink-3">
          Connect with the TruePas team to explore secure biometric identity, faster check-ins, frictionless access and enterprise integrations.
        </p>
      </div>
    </section>
  );
}
