import { NextRequest, NextResponse } from "next/server";
import { ShipmentRepository } from "@/services/shipmentRepository";
import { createClient } from "@/lib/supabase/server";
import { isAuthorizedAdmin } from "@/lib/supabase/roles";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !isAuthorizedAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized. Admin clearance required." }, { status: 401 });
    }

    const body = await req.json();
    const { shipmentId, field, city, lat, lng, status, reason, milestoneDesc } = body;

    if (!shipmentId) {
      return NextResponse.json({ error: "Missing required shipmentId" }, { status: 400 });
    }

    await ShipmentRepository.updateLocationAndStatus({
      shipmentId,
      city,
      lat: lat !== undefined ? parseFloat(lat) : undefined,
      lng: lng !== undefined ? parseFloat(lng) : undefined,
      status,
    });

    if (milestoneDesc || city || status) {
      await ShipmentRepository.addMilestone({
        shipmentId,
        location: city || "Central Logistics Hub",
        status: status || "in_transit",
        description: milestoneDesc || `Status updated to ${(status || "in_transit").replace("_", " ")}`,
        lat: lat !== undefined ? parseFloat(lat) : undefined,
        lng: lng !== undefined ? parseFloat(lng) : undefined,
      });
    }

    const record = await ShipmentRepository.recordOverride({
      shipmentId,
      field: field || "telemetry",
      newValue: city ? `${city} (${lat}, ${lng})` : String(status || "manual_override"),
      reason: reason || "Manual admin control tower dispatch",
    });

    return NextResponse.json({ success: true, data: record });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Override commit failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
