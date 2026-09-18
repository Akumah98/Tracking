import { HomeHeroVisual } from "@/features/public-pages/components/HomeHeroVisual";
import { PartnerLogosBar } from "@/features/public-pages/components/PartnerLogosBar";
import { LogisticsAccordionSection } from "@/features/public-pages/components/InteractiveLogisticsAccordion/LogisticsAccordionSection";
import { TrustedServicesFeature } from "@/features/public-pages/components/TrustedServicesFeature";
import { NetworkStatsHeroSection } from "@/features/public-pages/components/NetworkStatsHeroSection";
import { IndustryLeadersSection } from "@/features/public-pages/components/IndustryLeadersSection";
import { AirFreightFeature } from "@/features/public-pages/components/AirFreightFeature";
import { CustomerSolutionsGrid } from "@/features/public-pages/components/CustomerSolutionsGrid";
import { TestimonialsSection } from "@/features/public-pages/components/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero with Animated Split-Text & Telematics Search */}
      <HomeHeroVisual />

      {/* 2. Global Partner Accreditation Strip */}
      <PartnerLogosBar />

      {/* 3. Multimodal Logistics Accordion with Numbered Tabs & Media Badge */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <LogisticsAccordionSection />
      </section>

      {/* 4. Trusted Services Feature with Facility Image */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <TrustedServicesFeature />
      </section>

      {/* 5. Network Operational Scale Hero Section with Background Image */}
      <section className="w-full">
        <NetworkStatsHeroSection />
      </section>

      {/* 6. Industry Leaders Highway Transport */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <IndustryLeadersSection />
      </section>

      {/* 8. Priority Air Cargo Feature */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <AirFreightFeature />
      </section>

      {/* 9. Business Solutions & Freight Cards */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <CustomerSolutionsGrid />
      </section>

      {/* 10. Verified Client Testimonials */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <TestimonialsSection />
      </section>
    </div>
  );
}
