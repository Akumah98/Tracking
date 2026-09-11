"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { DashboardService } from "../services/dashboardService";

export function WISMOChart() {
  const data = DashboardService.getWISMOData();

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-neutral-100">
        <div>
          <h3 className="font-heading font-bold text-base text-brand-dark">
            WISMO Ticket Reduction Analytics
          </h3>
          <p className="text-xs text-neutral-500">
            &quot;Where Is My Order&quot; inbound volume deflection over time
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
          68.2% Net Reduction
        </span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A0500",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
            <Bar dataKey="tickets" name="Inbound Tickets" fill="#504E4A" radius={[4, 4, 0, 0]} />
            <Bar dataKey="reduced" name="Deflected (Self-Served)" fill="#FF5705" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
