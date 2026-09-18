import { PackagePiece } from "@/types/consignment.types";
import { PackagePiecesTable } from "@/features/consignment/components/PackagePiecesTable";

interface Props {
  pieces: PackagePiece[];
  totals: { totalVolume: number; totalVolumetricWeight: number; totalActualWeight: number };
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, key: keyof PackagePiece, value: string | number) => void;
}

export function UpdatePiecesSection({ pieces, totals, onAdd, onRemove, onChange }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-4">
      <div>
        <h3 className="text-sm font-heading font-bold text-brand-dark">
          Package Pieces &amp; Dimensional Attributes
        </h3>
        <p className="text-xs text-neutral-500">
          Modify individual parcel items, dimensions, and weights. Volume &amp; volumetric weights recalculate dynamically.
        </p>
      </div>

      <PackagePiecesTable
        pieces={pieces}
        totals={totals}
        onAdd={onAdd}
        onRemove={onRemove}
        onChange={onChange}
      />
    </div>
  );
}
