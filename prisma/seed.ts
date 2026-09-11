import { PrismaClient } from "@prisma/client";
import data from "../src/data/data.json";

const prisma = new PrismaClient();

async function main() {
  for (const s of data.shipments) {
    const milestones = data.milestones.filter((m) => s.milestoneIds.includes(m.id));

    await prisma.shipment.upsert({
      where: { trackingNumber: s.trackingNumber },
      create: {
        id: s.id,
        trackingNumber: s.trackingNumber,
        carrierId: s.carrierId,
        status: s.status,
        originCity: s.origin.city,
        originCountry: s.origin.country,
        originLat: s.origin.lat,
        originLng: s.origin.lng,
        destCity: s.destination.city,
        destCountry: s.destination.country,
        destLat: s.destination.lat,
        destLng: s.destination.lng,
        currentCity: s.currentLocation.city,
        currentCountry: s.currentLocation.country,
        currentLat: s.currentLocation.lat,
        currentLng: s.currentLocation.lng,
        estimatedDelivery: new Date(s.estimatedDelivery),
        eddConfidence: s.eddConfidence,
        weight: s.weight,
        dimensions: s.dimensions,
        sku: s.sku,
        sourceProvider: "seed",
        milestones: {
          create: milestones.map((m) => ({
            id: m.id,
            timestamp: new Date(m.timestamp),
            status: m.status,
            location: m.location,
            description: m.description,
          })),
        },
      },
      update: {},
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
