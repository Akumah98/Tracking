import type { PackagePiece } from "@/types/consignment.types";
import { Trash2 } from "lucide-react";

interface Props {
  piece: PackagePiece;
  index: number;
  onChange: (id: string, key: keyof PackagePiece, value: string | number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const PIECE_TYPES = ["Box","Crate","Pallet","Envelope","Drum","Bag","Roll","Other"];

export function PackagePieceRow({ piece, index, onChange, onRemove, canRemove }: Props) {
  const num = (key: keyof PackagePiece) => (val: string) =>
    onChange(piece.id, key, parseFloat(val) || 0);

  return (
    <tr className="border-b border-neutral-100 last:border-0">
      <td className="py-2 px-2 text-xs text-neutral-400 font-mono w-8">{index + 1}</td>
      <td className="py-2 px-2">
        <input type="number" min={1} value={piece.quantity}
          onChange={(e) => onChange(piece.id, "quantity", parseInt(e.target.value) || 1)}
          className="w-16 text-xs rounded-lg border border-neutral-200 p-1.5 text-center focus:border-brand focus:outline-none" />
      </td>
      <td className="py-2 px-2">
        <select value={piece.pieceType} onChange={(e) => onChange(piece.id, "pieceType", e.target.value)}
          className="text-xs rounded-lg border border-neutral-200 p-1.5 focus:border-brand focus:outline-none">
          {PIECE_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </td>
      {(["length","width","height"] as const).map((dim) => (
        <td key={dim} className="py-2 px-2">
          <input type="number" min={0} step="0.1" value={piece[dim]}
            onChange={(e) => num(dim)(e.target.value)}
            className="w-20 text-xs rounded-lg border border-neutral-200 p-1.5 text-center focus:border-brand focus:outline-none" />
        </td>
      ))}
      <td className="py-2 px-2">
        <input value={piece.description} onChange={(e) => onChange(piece.id, "description", e.target.value)}
          placeholder="e.g. Spare parts"
          className="w-full text-xs rounded-lg border border-neutral-200 p-1.5 focus:border-brand focus:outline-none" />
      </td>
      <td className="py-2 px-2 text-center">
        {canRemove && (
          <button type="button" onClick={() => onRemove(piece.id)}
            className="p-1 text-red-400 hover:text-red-600 rounded transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </td>
    </tr>
  );
}
