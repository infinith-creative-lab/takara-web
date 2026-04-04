// app/services/page.tsx
// Services page — Server Component.

import type { Metadata } from "next";
import Link from "next/link";
import {
  FiSettings,
  FiZap,
  FiTruck,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { MdOutlineBiotech, MdOutlineInventory2 } from "react-icons/md";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/structured-data";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";
import PatternDots from "@/components/ui/PatternDots";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description: `${SITE_NAME} offers end-to-end phosphate services: custom formulation, independent quality testing, regional logistics, and expert technical consulting.`,
  path: "/services",
});

const SERVICES = [
  {
    id: "consulting",
    icon: FiZap,
    title: "Technical Consulting",
    tagline: "Expert agronomic and process engineering support",
    description:
      "Our team includes PhD chemists and senior agronomists who provide on-site and remote advisory services to optimize phosphate utilization and process efficiency.",
    features: [
      "On-site agronomic field visits",
      "Process compatibility assessments",
      "Phosphate grade selection & blending advice",
      "Regulatory compliance guidance (Certification COO Kemendag, REACH)",
    ],
  },
  {
    id: "rnd-blending",
    icon: MdOutlineBiotech,
    title: "R&D - Custom Blending",
    tagline: "Bespoke phosphate compounds engineered to your specifications",
    description:
      "Our R&D facility develops custom P₂O₅ blends, co-granulates with secondary nutrients, and engineers specific particle size distributions to match your unique requirements.",
    features: [
      "Custom P₂O₅ / Ca / N ratio formulations",
      "Controlled particle size distribution",
      "Solubility-modified specialized grades",
      "Pilot-scale batch development",
    ],
  },
  {
    id: "supply-chain",
    icon: FiTruck,
    title: "Global Supply Chain",
    tagline: "End-to-end logistics and supply chain management",
    description:
      "We manage FCL/LCL container bookings, customs clearance, and global freight to ensure zero disruptions across 15+ countries.",
    features: [
      "Door-to-port and CIF delivery",
      "Dangerous goods documentation (IMDG)",
      "Real-time shipment tracking",
      "Integrated customs & export handling",
    ],
  },
  {
    id: "quality",
    icon: FiCheckCircle,
    title: "Quality Test & Certification",
    tagline: "Third-party verified quality assurance on every batch",
    description:
      "Every production run is verified by independent laboratories (SGS, Bureau Veritas) to ensure full compliance with international standards and strict purity guarantees.",
    features: [
      "Independent CoA for every batch",
      "ICP-OES elemental analysis",
      "Heavy metals and purity verification",
      "International certification compliance",
    ],
  },
];

export default function ServicesPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
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
        aria-labelledby="services-hero-heading"
      >
        <div className="container-site">
          <span className="section-eyebrow inline-flex mb-6 bg-white/10 text-white border border-white/20">
            What We Offer
          </span>
          <h1
            id="services-hero-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Beyond Supply —{" "}
            <span className="text-azure-500">Full-Service</span>{" "}
            Phosphate Partner
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
            We pair market-leading product quality with deep technical
            expertise, reliable logistics, and flexible commercial terms.
          </p>
        </div>
      </section>

      {/* Services detail */}
      <section
        className="py-24 lg:py-32 bg-surface relative overflow-hidden"
        aria-label="Services catalogue"
      >
        {/* Decorative pattern */}
        <PatternDots className="text-brand-500/5 w-64 h-64 top-0 left-0 -mt-10 -ml-10 md:w-[500px] md:h-[500px]" />
        <PatternDots className="text-brand-500/5 w-64 h-64 bottom-0 right-0 -mb-10 -mr-10 md:w-[500px] md:h-[500px]" />

        <div className="container-site relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="section-eyebrow block mb-4">What We Provide</span>
            <h2 className="section-title mb-4">
              End-to-End <span className="text-gradient">Service Suite</span>
            </h2>
            <p className="section-subtitle">
              From custom phosphate formulation to last-mile logistics — every service is backed by deep domain expertise and a commitment to zero-compromise quality.
            </p>
          </div>

          {/* Quick-nav service anchor badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200 bg-brand-50 text-brand-600 text-xs font-semibold hover:bg-brand-100 hover:border-brand-400 transition-all duration-200 scroll-smooth cursor-pointer"
              >
                {s.title}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-12">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="card p-0 overflow-hidden scroll-mt-28"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? "lg:flex-row-reverse" : ""
                      }`}
                  >
                    {/* Icon panel */}
                    <div
                      className={`flex flex-col justify-center p-10 lg:p-14 bg-gradient-to-br ${isEven
                        ? "from-neutral-950 to-brand-900"
                        : "from-brand-900 to-neutral-950"
                        } ${isEven ? "lg:order-2" : ""}`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                        <Icon
                          className="w-7 h-7 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-3">
                        {service.title}
                      </h2>
                      <p className="text-azure-400 font-medium mb-5">
                        {service.tagline}
                      </p>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features panel */}
                    <div
                      className={`flex flex-col justify-center p-10 lg:p-14 ${isEven ? "lg:order-1" : ""
                        }`}
                    >
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6">
                        Included
                      </h3>
                      <ul className="flex flex-col gap-4" role="list">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-neutral-700 text-sm"
                          >
                            <FiCheckCircle
                              className="w-4 h-4 text-brand-500 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <Link
                          href="/contact"
                          className="btn-primary inline-flex items-center gap-2"
                          aria-label={`Enquire about ${service.title}`}
                        >
                          Enquire Now
                          <FiArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
