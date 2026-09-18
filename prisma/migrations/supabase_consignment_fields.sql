-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Adds all consignment fields to the Shipment table and creates PackagePiece table

-- Shipper fields
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "shipperName" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "shipperEmail" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "shipperPhone" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "shipperAddress" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "shipperCity" TEXT;

-- Receiver fields
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "receiverName" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "receiverEmail" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "receiverPhone" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "receiverAddress" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "receiverCity" TEXT;

-- Package detail fields
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "product" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "contents" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "carrier" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "shipmentType" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "shipmentMode" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "carrierReferenceNumber" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "paymentMode" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "freightCost" DOUBLE PRECISION;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "pickupDate" TEXT;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "pickupTime" TEXT;

-- Computed totals (stored for fast display)
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "totalActualWeight" DOUBLE PRECISION;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "totalVolumetricWeight" DOUBLE PRECISION;
ALTER TABLE "Shipment" ADD COLUMN IF NOT EXISTS "totalVolume" DOUBLE PRECISION;

-- PackagePiece table (line items for consignment)
CREATE TABLE IF NOT EXISTS "PackagePiece" (
  "id"          TEXT NOT NULL PRIMARY KEY,
  "shipmentId"  TEXT NOT NULL REFERENCES "Shipment"("id") ON DELETE CASCADE,
  "quantity"    INTEGER NOT NULL DEFAULT 1,
  "pieceType"   TEXT NOT NULL DEFAULT 'Box',
  "length"      DOUBLE PRECISION NOT NULL DEFAULT 0,
  "width"       DOUBLE PRECISION NOT NULL DEFAULT 0,
  "height"      DOUBLE PRECISION NOT NULL DEFAULT 0,
  "description" TEXT
);

CREATE INDEX IF NOT EXISTS "PackagePiece_shipmentId_idx" ON "PackagePiece"("shipmentId");
