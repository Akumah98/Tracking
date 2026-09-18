import type { PackagePiece } from "@/types/consignment.types";

const VOLUMETRIC_DIVISOR = 5000;

export function calcVolumetricWeight(l: number, w: number, h: number): number {
  return parseFloat(((l * w * h) / VOLUMETRIC_DIVISOR).toFixed(2));
}

export function calcRowVolume(piece: PackagePiece): number {
  return parseFloat((piece.length * piece.width * piece.height * piece.quantity).toFixed(2));
}

export function calcTotals(pieces: PackagePiece[], actualWeightKg: number) {
  const totalVolume = pieces.reduce((sum, p) => sum + calcRowVolume(p), 0);
  const totalVolumetricWeight = parseFloat((totalVolume / VOLUMETRIC_DIVISOR).toFixed(2));
  return {
    totalVolume: parseFloat(totalVolume.toFixed(2)),
    totalVolumetricWeight,
    totalActualWeight: parseFloat(actualWeightKg.toFixed(2)),
  };
}
