import BookDemoButton from "@/components/ui/BookDemoButton";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";

export default function Hero() {
  return (
    <section className="bg-linear-to-b from-sky-200 to-white px-5 pt-32 pb-16 md:px-10 lg:pt-[200px] lg:pb-[120px]">
      <div className="container-page flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-6 lg:w-[540px] lg:shrink-0">
          <div className="flex flex-col gap-4">
            <h1 className="heading-xl">One Access for Every Customer Journey.</h1>
            <p className="max-w-[468px] text-base leading-6 text-ink-3">
              Turn every check-in, verification, entry and payment into a seamless experience with secure biometric
              identity.
              <br />
              Customers enroll once. Businesses verify instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <BookDemoButton />
            <Button variant="secondary">Explore Solutions</Button>
          </div>
        </div>
        <Photo
          src="/images/enterprises/hero.webp"
          alt="Traveller verifying her identity with a facial scan at an airport self-service kiosk"
          className="h-64 rounded-2xl shadow-card-strong md:h-[376px] lg:flex-1"
          sizes="(min-width: 1024px) 540px, 100vw"
          eager
        />
      </div>
    </section>
  );
}
