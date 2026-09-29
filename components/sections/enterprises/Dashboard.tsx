import Button from "@/components/ui/Button";
import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Dashboard() {
  return (
    <section className="bg-sky-50 px-40 py-20">
      <div className="container-page flex gap-10">
        <div className="flex h-[417px] flex-1 flex-col justify-between">
          <div className="flex flex-col gap-6">
            <SectionLabel>Merchant Dashboard</SectionLabel>
            <div className="flex flex-col gap-4">
              <h2 className="max-w-[512px] text-[40px] leading-[52px] font-bold">Every Location, One View</h2>
              <div className="flex flex-col gap-6 text-base leading-6">
                <p>
                  <strong className="font-semibold">Monitor</strong>: Verification activity · Match success/failure rates ·
                  Processing volumes · Active devices and terminals · Location performance · Access events · Operational
                  exceptions · Customer adoption · System uptime · Historical activity · Staff/admin access · Integration status
                </p>
                <p>
                  <strong className="font-semibold">Turn data into decisions</strong>: Spot peak arrival windows, high-volume
                  locations, bottlenecks, device issues, repeat verification failures, adoption trends, and workflow
                  opportunities.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Button icon>Request a Dashboard Demonstration</Button>
          </div>
        </div>
        <Placeholder className="h-[417px] flex-1 rounded-2xl shadow-card-strong" label="Merchant dashboard preview" />
      </div>
    </section>
  );
}
