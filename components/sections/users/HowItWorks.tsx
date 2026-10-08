import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  { title: "Download the App or Visit a Kiosk", text: "Enter your name, email address, and phone number, or enroll on-site at a partner kiosk.", image: "step-enter-details", alt: "TruePas app registration screen asking for name, email and phone number" },
  { title: "Identity Verification", text: "ID verification with liveness detection confirms you are who you say you are.", image: "step-verify-identity", alt: "TruePas app verifying identity with a face check" },
  { title: "Face Biometric Registration", text: "Scan your face via the front camera to create a secure facial biometric template.", image: "step-scan-face", alt: "TruePas app scanning a face with the front camera" },
  { title: "Consent & Privacy Set-Up", text: "Read and approve how your data is used before proceeding.", image: "step-approve-data", alt: "TruePas app privacy screen asking to approve data use" },
  { title: "Secure Set-up", text: "Your details are securely processed and your account is set up in the background.", image: "step-secure-credential", alt: "TruePas app confirming a secure credential has been created" },
  { title: "Enrollment Complete", text: "Use your face at any connected touchpoint, no re-verification needed.", image: "step-ready", alt: "TruePas app showing the digital identity is ready to use" },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>How TruePas works</SectionLabel>
          <h2 className="heading-xl max-w-[654px]">Create a single facial biometric identity once.</h2>
          <p className="text-base leading-6 text-ink-3">
            Use it across every platform. Frictionless, time-saving, hassle-free with zero-knowledge security.
          </p>
        </div>
        {/* Wraps as two centred lines on phones; the clock and "3 minutes" stay together */}
        <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-2xl leading-9 font-bold">
          Enroll yourself in just
          <span className="flex items-center gap-2 whitespace-nowrap text-[#3194ff]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/clock.svg" alt="" className="size-6" />
            3 minutes
          </span>
        </p>
        <div className="grid w-full gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {steps.map((s) => (
            <div key={s.title} className="flex flex-col gap-6">
              <Photo
                src={`/images/users/${s.image}.webp`}
                alt={s.alt}
                className="h-56 rounded-sm shadow-card md:h-[277px]"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl leading-8 font-semibold">{s.title}</h3>
                <p className="text-base leading-6">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
