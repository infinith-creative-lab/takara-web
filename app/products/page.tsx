// app/products/page.tsx
// Products listing page — SSG (all products are static).

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";
import PatternDots from "@/components/ui/PatternDots";
import ProductGrid from "@/components/sections/ProductGrid";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Browse Takara's full range of high-purity phosphate products — Rock Phosphate, TSP, MAP, DCP, and specialty grades for industrial and agricultural use.",
  path: "/products",
});

export default function ProductsPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/products` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />

      {/* Page hero */}
      <section
        className="bg-hero pt-40 pb-24 lg:pt-48 lg:pb-32"
        aria-labelledby="products-hero-heading"
      >
        <div className="container-site">
          <span className="section-eyebrow inline-flex mb-6 bg-white/10 text-white border border-white/20">
            Product Portfolio
          </span>
          <h1
            id="products-hero-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            High-Purity{" "}
            <span className="text-azure-500">Phosphate Products</span>
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
            From raw rock phosphate to feed-grade calcium compounds —
            every product independently tested and certified.
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section id="products-list" className="py-24 lg:py-32 bg-surface scroll-mt-16 lg:scroll-mt-20 relative overflow-hidden" aria-label="Product catalogue">
        {/* Decorative pattern */}
        <PatternDots className="text-brand-500/5 w-64 h-64 top-0 right-0 -mt-10 -mr-10 md:w-[400px] md:h-[400px]" />
        <PatternDots className="text-brand-500/5 w-64 h-64 bottom-0 left-0 -mb-10 -ml-10 md:w-[400px] md:h-[400px]" />

        <div className="container-site relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow block mb-4">Complete Range</span>
            <h2 className="section-title mb-4">
              Explore Our <span className="text-gradient">Catalogue</span>
            </h2>
            <p className="section-subtitle">
              Discover our comprehensive range of high-performance natural fertilizers and industrial minerals. Sourced sustainably, processed with precision, and delivered securely.
            </p>
          </div>

          {/* Interactive grid with category filter — Client Component */}
          <ProductGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
