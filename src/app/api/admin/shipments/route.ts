import { NextRequest, NextResponse } from "next/server";
import { ShipmentRepository } from "@/services/shipmentRepository";
import { createClient } from "@/lib/supabase/server";
import { isAuthorizedAdmin } from "@/lib/supabase/roles";

export async function GET() {
  try {
    const list = await ShipmentRepository.getAllShipments();
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Fetch failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !isAuthorizedAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized. Admin clearance required." }, { status: 401 });
    }

    const body = await req.json();
    if (!body.trackingNumber || !body.originCity || !body.destCity) {
      return NextResponse.json(
        { error: "Missing required fields: trackingNumber, originCity, destCity" },
        { status: 400 }
      );
    }

    const created = await ShipmentRepository.createShipment(body);
    return NextResponse.json({ success: true, data: created });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Shipment creation failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !isAuthorizedAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized. Admin clearance required." }, { status: 401 });
    }

    const body = await req.json();
    if (!body.id && !body.shipmentId) {
      return NextResponse.json({ error: "Shipment ID is required for update" }, { status: 400 });
    }

    const updated = await ShipmentRepository.updateFullShipment(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !isAuthorizedAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized. Admin clearance required." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Shipment ID is required" }, { status: 400 });

    await ShipmentRepository.deleteShipment(id);
    return NextResponse.json({ success: true, message: "Shipment deleted from manifest" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Deletion failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
