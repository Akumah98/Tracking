-- ==========================================================
-- INTERNATIONAL TRANSPORT LINE - SUPABASE POSTGRESQL SCHEMA
-- ==========================================================

-- 1. Create Core Shipment Manifest Table
CREATE TABLE IF NOT EXISTS "Shipment" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "trackingNumber" TEXT UNIQUE NOT NULL,
  "carrierId" TEXT NOT NULL DEFAULT 'itl_express',
  "status" TEXT NOT NULL DEFAULT 'in_transit',
  "originCity" TEXT NOT NULL,
  "originCountry" TEXT NOT NULL,
  "originLat" DOUBLE PRECISION NOT NULL,
  "originLng" DOUBLE PRECISION NOT NULL,
  "destCity" TEXT NOT NULL,
  "destCountry" TEXT NOT NULL,
  "destLat" DOUBLE PRECISION NOT NULL,
  "destLng" DOUBLE PRECISION NOT NULL,
  "currentCity" TEXT NOT NULL,
  "currentCountry" TEXT NOT NULL,
  "currentLat" DOUBLE PRECISION NOT NULL,
  "currentLng" DOUBLE PRECISION NOT NULL,
  "estimatedDelivery" TIMESTAMP WITH TIME ZONE,
  "eddConfidence" INTEGER NOT NULL DEFAULT 95,
  "weight" TEXT,
  "dimensions" TEXT,
  "sku" TEXT,
  "sourceProvider" TEXT NOT NULL DEFAULT 'itl_control_tower',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Create Milestone Checkpoint Table
CREATE TABLE IF NOT EXISTS "Milestone" (
  "id" TEXT PRIMARY KEY DEFAULT ('MLS-' || FLOOR(EXTRACT(EPOCH FROM NOW()) * 1000)::text),
  "shipmentId" TEXT NOT NULL REFERENCES "Shipment"("id") ON DELETE CASCADE,
  "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "status" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "description" TEXT NOT NULL
);

-- 3. Create Admin Override Audit Log Table
CREATE TABLE IF NOT EXISTS "AdminOverride" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "shipmentId" TEXT NOT NULL REFERENCES "Shipment"("id") ON DELETE CASCADE,
  "field" TEXT NOT NULL,
  "oldValue" TEXT,
  "newValue" TEXT NOT NULL,
  "reason" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 4. Create Performance & Health Logs Table
CREATE TABLE IF NOT EXISTS "ProviderHealthLog" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "provider" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "latencyMs" INTEGER NOT NULL,
  "message" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE "Shipment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Milestone" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminOverride" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProviderHealthLog" ENABLE ROW LEVEL SECURITY;

-- 6. Public Read Policies (Allow clients to track packages)
CREATE POLICY "Public can view shipments" ON "Shipment" FOR SELECT USING (true);
CREATE POLICY "Public can view milestones" ON "Milestone" FOR SELECT USING (true);

-- 7. Admin Control Tower Full Access Policies (Authenticated via Supabase Auth)
CREATE POLICY "Admin full access on shipments" ON "Shipment" FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on milestones" ON "Milestone" FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on overrides" ON "AdminOverride" FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on health logs" ON "ProviderHealthLog" FOR ALL TO authenticated USING (true) WITH CHECK (true);
