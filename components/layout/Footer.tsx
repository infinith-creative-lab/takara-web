// components/layout/Footer.tsx
// SEO-rich, structured footer.
// Server Component — no 'use client' needed.

import Link from "next/link";
import { FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram } from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";

import Logo from "@/components/ui/Logo";
import {
  SITE_NAME,
  SITE_TAGLINE,
  FOOTER_LINKS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_WHATSAPP,
  COMPANY_ADDRESS,
  COMPANY_NAME_FULL,
  SOCIAL_LINKS,
  WEBSITE_DEVELOPER,
} from "@/lib/constants";

const currentYear = new Date().getFullYear();

const footerColumns = [
  {
    heading: "Company",
    links: FOOTER_LINKS.company,
  },
  {
    heading: "Products",
    links: FOOTER_LINKS.products,
  },
  {
    heading: "Services",
    links: FOOTER_LINKS.services,
  },
];

export default function Footer() {
  return (
    <footer
      className="bg-neutral-950 text-neutral-400"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer content */}
      <div className="container-site py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-md"
              aria-label="TAKARA — Back to Home"
            >
              <span className="sr-only">TAKARA — Back to Home</span>
              <Logo variant="default" className="w-9 h-auto" />
              <span className="text-xl font-bold text-white tracking-tight">
                {SITE_NAME}
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-neutral-400 max-w-xs mb-6">
              {SITE_TAGLINE}. Trusted by enterprises across Asia Pacific since 2020.
            </p>

            <address className="not-italic flex flex-col gap-3 mb-8">
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${COMPANY_PHONE.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-brand-400 transition-colors duration-200"
                  aria-label={`Call us at ${COMPANY_PHONE}`}
                >
                  <FiPhone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{COMPANY_PHONE}</span>
                </a>
                <a
                  href={`https://wa.me/62${COMPANY_WHATSAPP.replace(/^0/, "").replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-brand-400 transition-colors duration-200"
                  aria-label={`Chat on WhatsApp: ${COMPANY_WHATSAPP}`}
                >
                  <FaWhatsapp className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{COMPANY_WHATSAPP}</span>
                </a>
              </div>

              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-brand-400 transition-colors duration-200"
                aria-label={`Email us at ${COMPANY_EMAIL}`}
              >
                <FiMail className="w-4 h-4 shrink-0" aria-hidden="true" />
                {COMPANY_EMAIL}
              </a>

              <div className="flex flex-col gap-2">
                <p className="flex items-start gap-2.5 text-sm">
                  <FiMapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{COMPANY_ADDRESS}</span>
                </p>
              </div>
            </address>

            <nav aria-label="Social media links">
              <ul className="flex items-center gap-3" role="list">
                <li>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-brand-500 hover:text-white transition-all duration-200"
                    aria-label={`${SITE_NAME} on Facebook`}
                  >
                    <FiFacebook className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-brand-500 hover:text-white transition-all duration-200"
                    aria-label={`${SITE_NAME} on Instagram`}
                  >
                    <FiInstagram className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-brand-500 hover:text-white transition-all duration-200"
                    aria-label={`${SITE_NAME} on LinkedIn`}
                  >
                    <FiLinkedin className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-brand-500 hover:text-white transition-all duration-200"
                    aria-label={`${SITE_NAME} on Twitter / X`}
                  >
                    <FiTwitter className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerColumns.map((col) => (
              <nav key={col.heading} aria-label={`${col.heading} links`}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {col.links.map((link: any) => (
                    <li key={link.label} className={link.isHeader ? "mt-4 first:mt-0" : ""}>
                      {link.isHeader ? (
                        <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-widest mb-2">
                          {link.label}
                        </h4>
                      ) : (
                        <Link
                          href={link.href}
                          prefetch={false}
                          className="text-sm text-neutral-400 hover:text-brand-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-400 rounded"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            &copy; {currentYear} {COMPANY_NAME_FULL}, All rights reserved. | Site by <span className="text-brand-400">{WEBSITE_DEVELOPER}</span>.
          </p>
          <nav aria-label="Legal links">
            <ul className="flex items-center gap-4" role="list">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
