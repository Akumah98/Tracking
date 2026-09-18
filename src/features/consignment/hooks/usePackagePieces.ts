"use client";

import { useState, useCallback } from "react";
import type { PackagePiece } from "@/types/consignment.types";
import { calcTotals } from "../utils/weightCalculations";

const DEFAULT_PIECE: Omit<PackagePiece, "id"> = {
  quantity: 1, pieceType: "Box", length: 0, width: 0, height: 0, description: "",
};

export function usePackagePieces(actualWeightKg: number, initialPieces?: PackagePiece[]) {
  const [pieces, setPieces] = useState<PackagePiece[]>(() => {
    if (initialPieces && initialPieces.length > 0) return initialPieces;
    return [{ ...DEFAULT_PIECE, id: `pc-${Date.now()}` }];
  });

  const addPiece = useCallback(() => {
    setPieces((prev) => [...prev, { ...DEFAULT_PIECE, id: `pc-${Date.now()}` }]);
  }, []);

  const removePiece = useCallback((id: string) => {
    setPieces((prev) => (prev.length > 1 ? prev.filter((p) => p.id !== id) : prev));
  }, []);

  const updatePiece = useCallback((id: string, key: keyof PackagePiece, value: string | number) => {
    setPieces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    );
  }, []);

  const totals = calcTotals(pieces, actualWeightKg);

  return { pieces, addPiece, removePiece, updatePiece, totals };
}
