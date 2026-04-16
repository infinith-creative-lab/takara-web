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
  title: "PT. Tangguh Kelola Alam Raya | Supplier Phosphate, Bat Guano & Palm Bunch Ash",
  description:
    "PT. Tangguh Kelola Alam Raya is Indonesia's leading enterprise supplier of high-purity Guano Phosphate, Bat Guano, Palm Bunch Ash, Dolomite, Calcium Oxide (CaO), and Zeolite for global agriculture.",
  path: "/",
  keywords: [
    "PT. Tangguh Kelola Alam Raya",
    "Takara",
    "phosphate supplier",
    "bat guano supplier",
    "palm bunch ash",
    "dolomite",
    "calcium oxide",
    "zeolite supplier",
    "Indonesia fertilizer exporter",
  ],
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
