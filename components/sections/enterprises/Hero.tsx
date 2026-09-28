import Button from "@/components/ui/Button";
import Placeholder from "@/components/ui/Placeholder";

export default function Hero() {
  return (
    <section className="bg-linear-to-b from-sky-200 to-white px-40 pt-[200px] pb-[120px]">
      <div className="container-page flex gap-10">
        <div className="flex w-[540px] flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-[56px] leading-[72px] font-bold">One Access for Every Customer Journey.</h1>
            <p className="max-w-[468px] text-base leading-6 text-ink-3">
              Turn every check-in, verification, entry and payment into a seamless experience with secure biometric
              identity.
              <br />
              Customers enroll once. Businesses verify instantly.
            </p>
          </div>
          <div className="flex gap-4">
            <Button icon>Book a Demo</Button>
            <Button variant="secondary">Explore Solutions</Button>
          </div>
        </div>
        <Placeholder className="h-[376px] flex-1 rounded-2xl shadow-card-strong" label="Hero image" />
      </div>
    </section>
  );
}
