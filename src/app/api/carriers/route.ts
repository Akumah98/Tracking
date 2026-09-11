import { NextResponse } from "next/server";
import { CarrierRegexService } from "@/features/tracking/services/carrierRegexService";

export async function GET() {
  const carriers = CarrierRegexService.getCarriers();
  return NextResponse.json({
    success: true,
    count: carriers.length,
    data: carriers,
  });
}
