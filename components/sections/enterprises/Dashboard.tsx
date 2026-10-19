import BookDemoButton from "@/components/ui/BookDemoButton";
import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import TermList from "@/components/ui/TermList";

const metrics = [
  "Verification activity",
  "Match success/failure rates",
  "Processing volumes",
  "Active devices and terminals",
  "Location performance",
  "Access events",
  "Operational exceptions",
  "Customer adoption",
  "System uptime",
  "Historical activity",
  "Staff/admin access",
  "Integration status",
];

export default function Dashboard() {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-page flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col justify-between gap-8 lg:min-h-[417px] lg:flex-1">
          <div className="flex flex-col gap-6">
            <SectionLabel>Merchant Dashboard</SectionLabel>
            <div className="flex flex-col gap-4">
              <h2 className="heading-md max-w-[512px]">Every Location, One View</h2>
              <div className="flex flex-col gap-6 text-base leading-6">
                <TermList label="Monitor" items={metrics} />
                <p>
                  <strong className="font-semibold">Turn data into decisions</strong>: Spot peak arrival windows, high-volume
                  locations, bottlenecks, device issues, repeat verification failures, adoption trends, and workflow
                  opportunities.
                </p>
              </div>
            </div>
          </div>
          <div>
            <BookDemoButton>Request a Dashboard Demonstration</BookDemoButton>
          </div>
        </div>
        <Photo
          src="/images/enterprises/dashboard.webp"
          alt="Manager reviewing the TruePas merchant dashboard with verification and location analytics"
          className="h-64 rounded-2xl shadow-card-strong md:h-[417px] lg:flex-1"
        />
      </div>
    </section>
  );
}
