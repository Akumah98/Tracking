import { DashboardService } from "../services/dashboardService";
import { Badge } from "@/components/ui/badge";

export function CarrierPerformTable() {
  const carriers = DashboardService.getCarrierPerformance();

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <div>
          <h3 className="font-heading font-bold text-base text-brand-dark">
            Transit Division SLA Benchmarking
          </h3>
          <p className="text-xs text-neutral-500">
            Internal line performance evaluated against 95% on-time delivery SLA
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-400 font-semibold uppercase tracking-wider">
              <th className="pb-3">Logistics Division</th>
              <th className="pb-3">Volume Dispatched</th>
              <th className="pb-3">ETA Accuracy</th>
              <th className="pb-3 text-right">SLA Compliance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-medium">
            {carriers.map((row) => (
              <tr key={row.carrier} className="hover:bg-neutral-50/80 transition-colors">
                <td className="py-3 font-semibold text-neutral-900">{row.carrier}</td>
                <td className="py-3 text-neutral-600 font-mono">
                  {row.shipments.toLocaleString()}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-neutral-800">
                      {row.etaAccuracy}%
                    </span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <Badge
                    variant={row.status === "above_sla" ? "success" : "warning"}
                    className="text-[10px] uppercase font-bold"
                  >
                    {row.status === "above_sla" ? "SLA Met" : "Under Review"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
