import data from "@/data/data.json";
import { AlertTriangle, Clock, CalendarX, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Exception } from "@/types/admin.types";

export default function AdminExceptionsPage() {
  const exceptions = (data.exceptions as unknown as Exception[]) || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-rose-600">
          <ShieldAlert className="w-4 h-4" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">
            Automated Protocol Alerts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-dark mt-1">
          Active Telemetry Exceptions ({exceptions.length})
        </h1>
        <p className="text-xs text-neutral-500">
          Automated flagging for telemetry lags (&gt;24h) and silent EDD discrepancies.
        </p>
      </div>

      <div className="space-y-4">
        {exceptions.map((exc) => (
          <div
            key={exc.id}
            className="bg-white rounded-2xl border border-neutral-200/80 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  exc.severity === "high" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                }`}
              >
                {exc.type === "update_lag" ? (
                  <Clock className="w-5 h-5" />
                ) : exc.type === "silent_edd_change" ? (
                  <CalendarX className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-900">
                    {exc.shipmentId}
                  </span>
                  <Badge variant={exc.severity === "high" ? "destructive" : "warning"} className="text-[10px] uppercase font-bold">
                    {exc.severity} Priority
                  </Badge>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase">
                    Carrier: {exc.carrierId}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-brand-dark">{exc.message}</h3>
                <p className="text-[11px] text-neutral-400">
                  Flagged At: {new Date(exc.flaggedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button size="sm" variant="outline" className="text-xs border-neutral-300">
                Audit EDI 214 Log
              </Button>
              <Button size="sm" className="text-xs bg-brand hover:bg-brand-secondary text-white">
                Dispatch SLA Alert
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
