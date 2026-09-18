import { HeroSearchBar } from "@/features/tracking/components/HeroSearchBar";
import { LiveTrackingView } from "@/features/tracking/components/LiveTrackingView";

interface TrackPageProps {
  searchParams: { numbers?: string; autoDetect?: string };
}

export default function TrackPage({ searchParams }: TrackPageProps) {
  const query = searchParams.numbers || "";

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="container max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            Direct Telematics
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-dark tracking-tight">
            Consignment Tracking Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Real-time direct telemetry across International Transport Line global freight networks.
          </p>
        </div>

        <HeroSearchBar />

        <LiveTrackingView initialNumbers={query} />
      </div>
    </div>
  );
}
