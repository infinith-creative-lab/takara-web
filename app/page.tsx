// app/page.tsx
// Home page — Server Component (all sections are server-rendered or RSC).
// The Hero is the only client component — everything else is static.

import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/metadata";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Hero — client component for carousel interactivity */}
      <Hero />

      {/* Stats overlapping hero */}
      <div className="relative">
        <StatsBar />
      </div>

      {/* Featured products */}
      <ProductShowcase />

      {/* Services overview */}
      <ServicesOverview />

      {/* Social proof */}
      <TestimonialsSection />

      {/* Primary CTA */}
      <CTASection />
    </>
  );
}
