// components/sections/ServicesOverview.tsx
// Services overview section — Server Component.

import {
  FiZap,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
import { MdOutlineBiotech } from "react-icons/md";
import PatternDots from "@/components/ui/PatternDots";

const SERVICES = [
  {
    icon: FiZap,
    title: "Technical Consulting",
    description:
      "Expert agronomic and process engineering support to optimize nutrient utilization and process efficiency.",
  },
  {
    icon: MdOutlineBiotech,
    title: "R&D - Custom Blending",
    description:
      "Bespoke P₂O₅ formulations and nutrient ratios engineered specifically for your unique requirements.",
  },
  {
    icon: FiTruck,
    title: "Global Supply Chain",
    description:
      "End-to-end logistics and supply chain management ensuring zero disruptions across 15+ countries.",
  },
  {
    icon: FiCheckCircle,
    title: "Quality Test & Certification",
    description:
      "Rigorous third-party laboratory verification (SGS/BV) and full regulatory certification on every batch.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 lg:py-32 bg-surface-subtle relative overflow-hidden" aria-labelledby="services-heading">
      {/* Decorative Dot Patterns */}
      <PatternDots className="text-brand-500/5 w-64 h-64 top-0 left-0 -mt-10 -ml-10 md:w-[400px] md:h-[400px]" />
      <PatternDots className="text-brand-500/5 w-64 h-64 bottom-0 right-0 -mb-10 -mr-10 md:w-[400px] md:h-[400px]" />

      <div className="container-site relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-eyebrow block mb-4">What We Offer</span>
          <h2 id="services-heading" className="section-title mb-4">
            End-to-End <span className="text-gradient">Services</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Beyond supply — we provide the technical expertise and
            operational support to ensure your processes run smoothly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card p-8 flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5"
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
