-- ==========================================================
-- INTERNATIONAL TRANSPORT LINE - SUPABASE SEED DATA
-- ==========================================================

-- Insert Primary Demo Shipment
INSERT INTO "Shipment" (
  "id", "trackingNumber", "carrierId", "status",
  "originCity", "originCountry", "originLat", "originLng",
  "destCity", "destCountry", "destLat", "destLng",
  "currentCity", "currentCountry", "currentLat", "currentLng",
  "estimatedDelivery", "eddConfidence", "weight", "dimensions", "sku", "sourceProvider"
) VALUES (
  'shp-itl-001', 'ITL-894201-US', 'itl_express', 'in_transit',
  'Frankfurt', 'DE', 50.1109, 8.6821,
  'New York', 'US', 40.7128, -74.0060,
  'Mid-Atlantic Freight Corridor', 'Atlantic', 42.5, -45.2,
  NOW() + INTERVAL '2 days', 96, '24.5 kg', '60x40x35 cm', 'ITL-GLOBAL-EXPRESS', 'itl_control_tower'
) ON CONFLICT ("trackingNumber") DO NOTHING;

-- Insert Checkpoint Milestones
INSERT INTO "Milestone" ("id", "shipmentId", "timestamp", "status", "location", "description")
VALUES
  ('mls-001', 'shp-itl-001', NOW() - INTERVAL '2 days', 'order_created', 'Frankfurt Logistics Center', 'Direct consignment lodged with ITL Central Dispatch'),
  ('mls-002', 'shp-itl-001', NOW() - INTERVAL '1 day', 'in_transit', 'Frankfurt Airport Terminal 4', 'Air cargo cleared customs and loaded into flight ITL-902'),
  ('mls-003', 'shp-itl-001', NOW() - INTERVAL '6 hours', 'in_transit', 'Mid-Atlantic Transit Vector', 'Vessel/Flight en-route, optimal weather trajectory maintained')
ON CONFLICT ("id") DO NOTHING;
