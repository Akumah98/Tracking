-- ==========================================================
-- MIGRATION: ADD CONSIGNMENT & PACKAGE PIECES TO SUPABASE
-- Run this script in the Supabase SQL Editor
-- ==========================================================

-- 1. Add Shipper Columns to "Shipment"
ALTER TABLE "Shipment"
  ADD COLUMN IF NOT EXISTS "shipperName" TEXT,
  ADD COLUMN IF NOT EXISTS "shipperEmail" TEXT,
  ADD COLUMN IF NOT EXISTS "shipperPhone" TEXT,
  ADD COLUMN IF NOT EXISTS "shipperAddress" TEXT,
  ADD COLUMN IF NOT EXISTS "shipperCity" TEXT;

-- 2. Add Receiver Columns to "Shipment"
ALTER TABLE "Shipment"
  ADD COLUMN IF NOT EXISTS "receiverName" TEXT,
  ADD COLUMN IF NOT EXISTS "receiverEmail" TEXT,
  ADD COLUMN IF NOT EXISTS "receiverPhone" TEXT,
  ADD COLUMN IF NOT EXISTS "receiverAddress" TEXT,
  ADD COLUMN IF NOT EXISTS "receiverCity" TEXT;

-- 3. Add Package Specification Columns to "Shipment"
ALTER TABLE "Shipment"
  ADD COLUMN IF NOT EXISTS "product" TEXT,
  ADD COLUMN IF NOT EXISTS "contents" TEXT,
  ADD COLUMN IF NOT EXISTS "carrier" TEXT,
  ADD COLUMN IF NOT EXISTS "shipmentType" TEXT,
  ADD COLUMN IF NOT EXISTS "shipmentMode" TEXT,
  ADD COLUMN IF NOT EXISTS "carrierReferenceNumber" TEXT,
  ADD COLUMN IF NOT EXISTS "paymentMode" TEXT,
  ADD COLUMN IF NOT EXISTS "freightCost" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "departureDate" TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS "pickupDate" TEXT,
  ADD COLUMN IF NOT EXISTS "pickupTime" TEXT;

-- 4. Add Computed Totals Columns to "Shipment"
ALTER TABLE "Shipment"
  ADD COLUMN IF NOT EXISTS "totalActualWeight" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "totalVolumetricWeight" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "totalVolume" DOUBLE PRECISION;

-- 5. Create "PackagePiece" Table for Multi-Piece Consignments
CREATE TABLE IF NOT EXISTS "PackagePiece" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "shipmentId" TEXT NOT NULL REFERENCES "Shipment"("id") ON DELETE CASCADE,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "pieceType" TEXT NOT NULL DEFAULT 'Box',
  "description" TEXT,
  "length" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "width" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "height" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "weight" DOUBLE PRECISION DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 6. Create Index for Performance on Lookups
CREATE INDEX IF NOT EXISTS "idx_package_piece_shipment_id" ON "PackagePiece"("shipmentId");

-- 7. Enable Row Level Security (RLS) on "PackagePiece"
ALTER TABLE "PackagePiece" ENABLE ROW LEVEL SECURITY;

-- 8. Policies for "PackagePiece" (Drop if exist then re-create to prevent duplicates)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'PackagePiece' AND policyname = 'Public can view package pieces'
  ) THEN
    CREATE POLICY "Public can view package pieces" ON "PackagePiece" FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'PackagePiece' AND policyname = 'Admin full access on package pieces'
  ) THEN
    CREATE POLICY "Admin full access on package pieces" ON "PackagePiece" FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;
