import { HomeHeroVisual } from "@/features/public-pages/components/HomeHeroVisual";
import { PartnerLogosBar } from "@/features/public-pages/components/PartnerLogosBar";
import { NetworkStatsBar } from "@/features/public-pages/components/NetworkStatsBar";
import { TrustedServicesFeature } from "@/features/public-pages/components/TrustedServicesFeature";
import { IndustryLeadersSection } from "@/features/public-pages/components/IndustryLeadersSection";
import { AirFreightFeature } from "@/features/public-pages/components/AirFreightFeature";
import { SmartWarehouseFeature } from "@/features/public-pages/components/SmartWarehouseFeature";
import { CustomerSolutionsGrid } from "@/features/public-pages/components/CustomerSolutionsGrid";
import { TestimonialsSection } from "@/features/public-pages/components/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero with Fleet Background & Tracking Bar */}
      <HomeHeroVisual />

      {/* 2. Global Partner Accreditation Strip */}
      <PartnerLogosBar />

      {/* 3. Global Network Stats */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <NetworkStatsBar />
      </section>

      {/* 4. Trusted Services Feature with Facility Image */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <TrustedServicesFeature />
      </section>

      {/* 5. Industry Leaders with Freight Highway Image */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <IndustryLeadersSection />
      </section>

      {/* 6. Priority Air Cargo Feature */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <AirFreightFeature />
      </section>

      {/* 7. Multimodal Ocean Ports & Smart Warehousing */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <SmartWarehouseFeature />
      </section>

      {/* 8. Returns & Business Solutions Photo Cards */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <CustomerSolutionsGrid />
      </section>

      {/* 9. Verified Client Testimonials with Avatars */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <TestimonialsSection />
      </section>
    </div>
  );
}
