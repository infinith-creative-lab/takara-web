"use client";
// components/sections/CTASection.tsx
// Primary call-to-action section.

import { usePathname } from "next/navigation";
import Link from "next/link";
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_WHATSAPP } from "@/lib/constants";
import { FiMail, FiPhone, FiSend, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function CTASection() {
  const pathname = usePathname();

  return (
    <section
      className="py-24 lg:py-32 bg-hero relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, #2191D0 0%, transparent 60%), radial-gradient(circle at 80% 20%, #0975B3 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10 text-center">
        <span className="section-eyebrow inline-flex mb-6 bg-white/10 text-white border border-white/20">
          Partner with Takara
        </span>

        <h2
          id="cta-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          Ready to Source{" "}
          <span className="text-azure-500">Premium Phosphate?</span>
        </h2>

        <p className="text-lg text-white/75 max-w-2xl mx-auto mb-12 leading-relaxed">
          Our team of specialists is available to discuss specifications,
          volume requirements, and custom formulation needs. Get a tailored
          quote within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/contact"
            className="btn bg-white text-brand-600 font-bold px-8 py-4 text-base rounded-xl hover:bg-brand-50 shadow-lg transition-all duration-250 flex items-center justify-center gap-2 group"
          >
            Request a Quote
            <FiSend className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </Link>
          <Link
            href={pathname === "/products" ? "#products-list" : "/products"}
            prefetch={false}
            className="btn border-2 border-white/40 text-white font-semibold px-8 py-4 text-base rounded-xl hover:border-white hover:bg-white/10 transition-all duration-250 flex items-center justify-center gap-2 group"
          >
            Browse Products
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/60">
          <a
            href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            aria-label={`Call ${COMPANY_PHONE}`}
          >
            <FiPhone className="w-4 h-4" aria-hidden="true" />
            {COMPANY_PHONE}
          </a>
          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
          <a
            href={`https://wa.me/62${COMPANY_WHATSAPP.replace(/^0/, "").replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            aria-label={`Chat on WhatsApp ${COMPANY_WHATSAPP}`}
          >
            <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
            {COMPANY_WHATSAPP}
          </a>
          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            aria-label={`Email ${COMPANY_EMAIL}`}
          >
            <FiMail className="w-4 h-4" aria-hidden="true" />
            {COMPANY_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
