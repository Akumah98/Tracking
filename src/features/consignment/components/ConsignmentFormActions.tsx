import { Button } from "@/components/ui/button";
import { PackageCheck, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface Props { loading: boolean; error: string | null; }

export function ConsignmentFormActions({ loading, error }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-100">
      <Link href="/admin/dashboard/shipments"
        className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 font-semibold transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Fleet
      </Link>
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
      <Button type="submit" disabled={loading}
        className="bg-brand hover:bg-brand-secondary text-white text-xs font-bold h-10 px-6 rounded-xl shadow-sm">
        {loading ? (
          <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Registering...</>
        ) : (
          <><PackageCheck className="w-4 h-4 mr-1.5" /> Commit Consignment</>
        )}
      </Button>
    </div>
  );
}
