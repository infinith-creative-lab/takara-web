// app/about/page.tsx
// About page — Server Component.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiAward, FiUsers, FiGlobe, FiShield } from "react-icons/fi";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/structured-data";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";
import PatternDots from "@/components/ui/PatternDots";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${SITE_NAME}'s 20-year heritage in phosphate supply, our sustainability commitments, and the expert team behind our operations.`,
  path: "/about",
});

const VALUES = [
  {
    icon: FiAward,
    title: "Quality First",
    description:
      "Certification COO Kemendag. Every product batch is independently tested before dispatch.",
  },
  {
    icon: FiUsers,
    title: "Partnership Mindset",
    description:
      "We don't just supply raw materials — we invest in our clients' long-term success.",
  },
  {
    icon: FiGlobe,
    title: "Global Reach",
    description:
      "Distribution across 15+ countries with experienced shipping and customs teams.",
  },
  {
    icon: FiShield,
    title: "Responsible Operations",
    description:
      "AMDAL-compliant mines, closed water circuits, and ongoing community development.",
  },
];


export default function AboutPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "About", url: `${SITE_URL}/about` },
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
        aria-labelledby="about-hero-heading"
      >
        <div className="container-site">
          <span className="section-eyebrow inline-flex mb-6 bg-white/10 text-white border border-white/20">
            Our Story
          </span>
          <h1
            id="about-hero-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Building Trust Through{" "}
            <span className="text-azure-500">Precision</span>
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
            Since 2020, {SITE_NAME} has supplied high-purity phosphate
            products to the agricultural, chemical, and industrial sectors
            across Asia Pacific. Our growth is built on one principle:
            deliver exactly what we promise, every time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="mission-heading">
        <PatternDots className="text-brand-500/5 w-64 h-64 top-0 right-0 -mt-10 -mr-10 md:w-[400px] md:h-[400px]" />
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-eyebrow block mb-6">Our Purpose</span>
              <h2 id="mission-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight mb-4 leading-[1.15]">
                PT. Tangguh Kelola Alam Raya
              </h2>
              <div className="flex items-center gap-4 mb-10">
                <div className="hidden sm:block h-1 w-12 bg-brand-500 rounded-full"></div>
                <p className="text-xl sm:text-2xl font-bold text-brand-500 tracking-tight">
                  Mission & Vision
                </p>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-brand-500 pl-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Mission</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    To provide industry-leading phosphate solutions that empower
                    our clients to achieve superior product outcomes, delivered
                    with integrity, precision, and consistent quality.
                  </p>
                </div>
                <div className="border-l-4 border-azure-500 pl-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Vision</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    To be the most trusted phosphate supplier in Asia Pacific —
                    recognised for the quality of our products, the expertise
                    of our team, and the sustainability of our operations.
                  </p>
                </div>
              </div>

              {/* Quick stats pills */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
                {[
                  { value: "Est. 2020", label: "Founded" },
                  { value: "5+", label: "Global Footprint" },
                  { value: "1000+", label: "Export Volume (MT)" },
                  { value: "Certification", label: "COO Kemendag" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center px-3 py-2.5 rounded-xl border border-brand-100 bg-brand-50 text-center"
                  >
                    <span className="text-base font-bold text-brand-600 leading-tight">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-neutral-200/50">
              <Image
                src="/images/about-us.svg"
                alt="Takara Corporate Mission and Strategy"
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-24 bg-surface-subtle relative overflow-hidden" aria-labelledby="values-heading">
        <PatternDots className="text-brand-500/5 w-64 h-64 top-0 left-0 -mt-10 -ml-10 md:w-[400px] md:h-[400px]" />
        <PatternDots className="text-brand-500/5 w-64 h-64 bottom-0 right-0 -mb-10 -mr-10 md:w-[400px] md:h-[400px]" />

        <div className="container-site relative z-10">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="section-eyebrow block mb-4">What Drives Us</span>
            <h2 id="values-heading" className="section-title mb-4">
              Core <span className="text-gradient">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="card p-8 text-center flex flex-col items-center">
                  <div
                    className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5"
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{val.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Sustainability section */}
      <section
        id="sustainability"
        className="py-24 bg-white relative overflow-hidden"
        aria-labelledby="sustainability-heading"
      >
        <PatternDots className="text-brand-500/5 w-64 h-64 top-0 right-0 -mt-10 -mr-10 md:w-[400px] md:h-[400px]" />
        <PatternDots className="text-brand-500/5 w-64 h-64 bottom-0 left-0 -mb-10 -ml-10 md:w-[400px] md:h-[400px]" />

        <div className="container-site max-w-3xl mx-auto text-center relative z-10">
          <span className="section-eyebrow block mb-5">Environment</span>
          <h2 id="sustainability-heading" className="section-title mb-6">
            Sustainability <span className="text-gradient">Commitment</span>
          </h2>
          <p className="text-neutral-600 leading-relaxed text-lg mb-8">
            Our mining and processing operations comply with AMDAL (Environmental
            Impact Assessment) requirements. We operate closed water circuits,
            minimise dust emissions through best-practice suppression systems,
            and actively fund reforestation programs in communities near our
            extraction sites.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { metric: "85%", label: "Water Recycled", desc: "Closed-circuit processing" },
              { metric: "Zero", label: "Waste Discharge", desc: "Fully contained tailing ponds" },
              { metric: "10K+", label: "Trees Planted", desc: "Reforestation since 2018" },
            ].map((item) => (
              <div key={item.label} className="card p-6">
                <p className="text-3xl font-bold text-gradient mb-1">{item.metric}</p>
                <p className="font-semibold text-neutral-900 text-sm mb-1">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
