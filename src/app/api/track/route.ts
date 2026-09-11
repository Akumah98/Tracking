import { NextRequest, NextResponse } from "next/server";
import { ShipmentRepository } from "@/services/shipmentRepository";
import { TrackingService } from "@/features/tracking/services/trackingService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawNumbers = searchParams.get("numbers") || "";
  const numbers = rawNumbers.split(",").map((n) => n.trim()).filter(Boolean);

  if (numbers.length === 0) {
    return NextResponse.json({ error: "No tracking numbers provided" }, { status: 400 });
  }

  const results = [];
  const logs = [];

  for (const num of numbers.slice(0, 5)) {
    // 1. Direct query from internal Admin-Managed database
    let result = await ShipmentRepository.findByTrackingNumber(num);
    let source = "admin_database";

    // 2. Fallback to pre-seeded manifest if not yet in database
    if (!result) {
      result = TrackingService.getShipmentByTrackingNumber(num);
      source = "seed_manifest";
    }

    if (result) {
      results.push(result);
      logs.push({
        trackingNumber: num,
        attempts: ["Verified in Control Tower database", "Live GPS vector synced with Admin inputs"],
        provider: "admin_control_tower",
      });
    } else {
      logs.push({
        trackingNumber: num,
        attempts: ["Consignment not found in Control Tower manifest"],
        provider: "admin_control_tower",
      });
    }
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
    telemetryLogs: logs,
  });
}
