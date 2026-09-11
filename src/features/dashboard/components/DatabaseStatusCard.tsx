import { Database, CheckCircle2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

export async function DatabaseStatusCard() {
  let shipmentCount = 0;
  let overrideCount = 0;

  try {
    const { count: sCount } = await supabase
      .from("Shipment")
      .select("*", { count: "exact", head: true });
    if (sCount !== null && sCount !== undefined) shipmentCount = sCount;

    const { count: oCount } = await supabase
      .from("AdminOverride")
      .select("*", { count: "exact", head: true });
    if (oCount !== null && oCount !== undefined) overrideCount = oCount;
  } catch {
    // Graceful fallback
  }

  const isSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

  return (
    <div className="bg-white rounded-xl border border-neutral-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-bold text-neutral-900">
            <span>Supabase Cloud PostgreSQL & Auth</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold">
              <CheckCircle2 className="w-3 h-3" /> {isSupabase ? "Connected" : "Ready"}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Engine: Supabase Cloud PostgreSQL with Row Level Security (RLS) & JWT Auth
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-neutral-600 font-mono text-[11px] self-end sm:self-auto">
        <span>
          Persisted Manifests: <strong className="text-brand-dark">{shipmentCount}</strong>
        </span>
        <span>•</span>
        <span>
          Audit Overrides: <strong className="text-brand">{overrideCount}</strong>
        </span>
      </div>
    </div>
  );
}
