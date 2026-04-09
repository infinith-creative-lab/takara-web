// app/contact/page.tsx
// Contact page — form is a Client Component, page is Server Component.

import type { Metadata } from "next";
import type { IconType } from "react-icons";
import { FiMail, FiPhone, FiMapPin, FiClock, FiZap, FiShield, FiGlobe } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/structured-data";
import {
  SITE_URL,
  SITE_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_WHATSAPP,
  COMPANY_ADDRESS,
} from "@/lib/constants";
import ContactForm from "@/components/sections/ContactForm";
import FAQSection from "@/components/sections/FAQSection";

interface ContactDetail {
  icon: IconType;
  label: string;
  value: string;
  href: string | null;
  ariaLabel: string | undefined;
}

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Get in touch with the ${SITE_NAME} team. Request a quote, technical specification, or schedule a consultation.`,
  path: "/contact",
});

const CONTACT_DETAILS: ContactDetail[] = [
  {
    icon: FiPhone,
    label: "PHONE",
    value: COMPANY_PHONE,
    href: `tel:${COMPANY_PHONE.replace(/[^\d+]/g, "")}`,
    ariaLabel: `Call us at ${COMPANY_PHONE}`,
  },
  {
    icon: FaWhatsapp,
    label: "WHATSAPP",
    value: COMPANY_WHATSAPP,
    href: `https://wa.me/62${COMPANY_WHATSAPP.replace(/^0/, "").replace(/[^\d]/g, "")}`,
    ariaLabel: `Chat on WhatsApp: ${COMPANY_WHATSAPP}`,
  },
  {
    icon: FiMail,
    label: "EMAIL",
    value: COMPANY_EMAIL,
    href: `mailto:${COMPANY_EMAIL}`,
    ariaLabel: `Email us at ${COMPANY_EMAIL}`,
  },
  {
    icon: FiMapPin,
    label: "OFFICE",
    value: COMPANY_ADDRESS,
    href: `https://maps.google.com/?q=${encodeURIComponent(COMPANY_ADDRESS)}`,
    ariaLabel: "View head office location on Google Maps",
  },

  {
    icon: FiClock,
    label: "BUSINESS HOURS",
    value: "Monday – Friday, 08:00 – 17:00 WIB",
    href: null,
    ariaLabel: undefined,
  },
];

export default function ContactPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: `${SITE_URL}/contact` },
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
        aria-labelledby="contact-hero-heading"
      >
        <div className="container-site">
          <span className="section-eyebrow inline-flex mb-6 bg-white/10 text-white border border-white/20">
            Get in Touch
          </span>
          <h1
            id="contact-hero-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let&rsquo;s Talk{" "}
            <span className="text-azure-500">Phosphate</span>
          </h1>
          <p className="text-lg text-white/75 max-w-xl leading-relaxed">
            Share your requirements and a member of our commercial team
            will respond within one business day.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-24 lg:py-32 bg-surface" aria-label="Contact information and form">
        <div className="container-site relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-eyebrow block mb-4">We&apos;re Here to Help</span>
            <h2 className="section-title mb-4">
              Start a <span className="text-gradient">Conversation</span>
            </h2>
            <p className="section-subtitle">
              Whether you need a custom quote, a product specification sheet, or want to speak with a technical expert — our team responds within one business day.
            </p>
          </div>

          {/* Trust signals row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {[
              { icon: FiZap, title: "Fast Response", desc: "Replies within 1 business day" },
              { icon: FiShield, title: "No Obligations", desc: "Free consultations, no commitment" },
              { icon: FiGlobe, title: "Regional Coverage", desc: "Serving 15+ countries in Asia Pacific" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="card flex items-center gap-5 p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0" aria-hidden="true">
                    <Icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{item.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact details column */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                Contact Details
              </h2>

              <ul className="flex flex-col gap-6" role="list">
                {CONTACT_DETAILS.map((item) => {
                  const Icon = item.icon;
                  const inner = (
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5 text-brand-500" />
                      </div>
                      <div>
                        {item.label && (
                          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">
                            {item.label}
                          </p>
                        )}
                        <p className="text-sm text-neutral-800 leading-snug">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          aria-label={item.ariaLabel}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="block hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Map embed placeholder */}
              <div
                className="mt-10 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100"
                style={{ height: 180 }}
                aria-label="Office location map"
              >
                <iframe
                  title="Takara Office Location"
                  src="https://www.google.com/maps?q=JL.+Kebraon+Selatan+Surabaya&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(30%)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <FAQSection />
    </>
  );
}
