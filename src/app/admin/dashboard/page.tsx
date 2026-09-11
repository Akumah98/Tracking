import { KPIGrid } from "@/features/dashboard/components/KPIGrid";
import { WISMOChart } from "@/features/dashboard/components/WISMOChart";
import { CarrierPerformTable } from "@/features/dashboard/components/CarrierPerformTable";
import { DatabaseStatusCard } from "@/features/dashboard/components/DatabaseStatusCard";
import { Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-brand/10 text-brand">
              <Shield className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand">
              B2B Mission Control
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-dark mt-1">
            Global Operations Overview
          </h1>
          <p className="text-xs text-neutral-500">
            Real-time monitoring across 3,500+ carriers and 220 global lanes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs text-neutral-600">
            <RefreshCw className="w-3.5 h-3.5 text-neutral-500" /> Auto-refresh (60s)
          </Button>
        </div>
      </div>

      {/* Real-time DB Persistence & Health Status */}
      <DatabaseStatusCard />

      {/* Real-time KPI summary */}
      <KPIGrid />

      {/* Analytics & Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WISMOChart />
        <CarrierPerformTable />
      </div>
    </div>
  );
}
