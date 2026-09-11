import { DashboardService } from "../services/dashboardService";
import { KPICard } from "./KPICard";
import { Package, Truck, CheckCircle2, MessageSquareOff } from "lucide-react";

export function KPIGrid() {
  const kpis = DashboardService.getKPIs();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <KPICard
        title="Total Shipments"
        value={kpis.totalShipments}
        delta="+14.2%"
        subtitle="Direct international transit lines"
        icon={Package}
      />
      <KPICard
        title="Active in Transit"
        value={kpis.activeTransit}
        delta="+8.1%"
        subtitle="Live hub & satellite telematics"
        icon={Truck}
      />
      <KPICard
        title="Delivery Success"
        value={`${kpis.deliverySuccessRate}%`}
        delta="+1.2%"
        subtitle="Above 95% SLA benchmark"
        icon={CheckCircle2}
      />
      <KPICard
        title="WISMO Reduction"
        value={`${kpis.wismoReduction}%`}
        delta="+22.4%"
        subtitle="Customer inquiries deflected"
        icon={MessageSquareOff}
      />
    </div>
  );
}
