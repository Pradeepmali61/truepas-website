import Button, { DownloadIcon } from "@/components/ui/Button";
import BrandLogo from "@/components/ui/BrandLogo";
import Photo from "@/components/ui/Photo";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default function Hero() {
  return (
    <section className="bg-linear-to-b from-sky-200 to-white px-5 pt-32 pb-16 md:px-10 lg:pt-[200px] lg:pb-20">
      <div className="container-page flex flex-col gap-10 lg:gap-20">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-[540px] lg:shrink-0">
            <h1 className="heading-xl">
              One Face.
              <br />
              Infinite Places.
            </h1>
            <p className="max-w-[468px] text-base leading-6 whitespace-pre-line text-ink-3">
              {
                "In a tech-savvy world, simplicity is expected and security is non-negotiable. When both coexist seamlessly, that's where revolution happens.\n\nTruePas is the inevitable evolution of identity in a connected world; a single, reusable biometric identity, enrolled once and used across airports, hotels, cruise terminals, car rentals, theme parks, venues, and healthcare. Delivered with privacy, security, and full user control."
              }
            </p>
          </div>
          <Photo
            src="/images/users/hero.webp"
            alt="Traveller holding a phone with a TruePas airport travel pass in the terminal"
            className="h-64 rounded-2xl shadow-card-strong md:h-[376px] lg:flex-1"
            eager
          />
        </div>

        <div className="glass flex flex-col gap-5 rounded-2xl px-6 py-5 lg:h-24 lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <BrandLogo height={22} className="h-[22px]" />
            <div className="flex items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/star-rate-half.svg" alt="" className="size-6" />
              <span className="text-base leading-6 whitespace-nowrap text-ink-3">4.9 (1.5k reviews)</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <span className="text-base leading-6 whitespace-nowrap text-[#525455]">Available on</span>
              <div className="flex items-center gap-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/group-1.svg" alt="Apple App Store" className="h-5" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/group-2.svg" alt="Google Play" className="h-[18px]" />
              </div>
            </div>
            <Button icon={<DownloadIcon />} className="whitespace-nowrap">Download the app</Button>
          </div>
        </div>

        <VideoPlayer className="aspect-video w-full" />
      </div>
    </section>
  );
}
