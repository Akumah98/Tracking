import type { PackagePiece } from "@/types/consignment.types";
import { PackagePieceRow } from "./PackagePieceRow";
import { Plus } from "lucide-react";

interface Totals { totalVolume: number; totalVolumetricWeight: number; totalActualWeight: number; }

interface Props {
  pieces: PackagePiece[];
  totals: Totals;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, key: keyof PackagePiece, value: string | number) => void;
}

export function PackagePiecesTable({ pieces, totals, onAdd, onRemove, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-heading font-bold text-brand-dark">Package Pieces</h3>
        <button type="button" onClick={onAdd}
          className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-secondary transition-colors">
          <Plus className="w-4 h-4" /> Add Row
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full text-xs">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              {["#","Qty","Type","L (cm)","W (cm)","H (cm)","Description",""].map((h) => (
                <th key={h} className="py-2 px-2 text-left font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {pieces.map((p, i) => (
              <PackagePieceRow key={p.id} piece={p} index={i}
                onChange={onChange} onRemove={onRemove} canRemove={pieces.length > 1} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs">
        {[
          ["Total Volume", `${totals.totalVolume.toLocaleString()} cm³`],
          ["Volumetric Weight", `${totals.totalVolumetricWeight} kg`],
          ["Actual Weight", `${totals.totalActualWeight} kg`],
        ].map(([label, val]) => (
          <div key={label} className="bg-brand/5 rounded-xl p-3 border border-brand/10">
            <p className="text-neutral-500 mb-0.5">{label}</p>
            <p className="font-bold text-brand-dark text-sm">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
