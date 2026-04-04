// app/terms/page.tsx
// Terms of Service page — Server Component.

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/structured-data";
import { SITE_NAME, SITE_URL, COMPANY_EMAIL } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Review the terms and conditions governing your use of the ${SITE_NAME} website and services.`,
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Terms of Service", url: `${SITE_URL}/terms` },
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
        aria-labelledby="terms-hero-heading"
      >
        <div className="container-site">
          <span className="section-eyebrow inline-flex mb-6 bg-white/10 text-white border border-white/20">
            Legal
          </span>
          <h1
            id="terms-hero-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Terms of <span className="text-azure-500">Service</span>
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
            Please read these terms and conditions carefully before using our website.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white" aria-label="Terms of service content">
        <div className="container-site max-w-4xl">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">1. Acceptance of Terms</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              By accessing and using the {SITE_NAME} website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-6">2. Use of Site</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else&rsquo;s use and enjoyment of the site. Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-6">3. Intellectual Property</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of {SITE_NAME} or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from this content without our express written permission.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-6">4. Limitation of Liability</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              {SITE_NAME} shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use the site or for the cost of procurement of substitute goods and services or resulting from any goods or services purchased or obtained or messages received or transactions entered into through the site.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-6">5. Governing Law</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Indonesia.
            </p>

            <p className="text-neutral-400 text-sm mt-12 italic">
              Last Updated: April 4, 2026
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
