// app/privacy/page.tsx
// Privacy Policy page — Server Component.

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/structured-data";
import { SITE_NAME, SITE_URL, COMPANY_EMAIL } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Learn how ${SITE_NAME} handles and protects your personal information when you use our website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
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
        aria-labelledby="privacy-hero-heading"
      >
        <div className="container-site">
          <span className="section-eyebrow inline-flex mb-6 bg-white/10 text-white border border-white/20">
            Legal
          </span>
          <h1
            id="privacy-hero-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Privacy <span className="text-azure-500">Policy</span>
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
            Your privacy is important to us. This policy outlines how we collect, use, and safeguard your personal data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white" aria-label="Privacy policy content">
        <div className="container-site max-w-4xl">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">1. Information We Collect</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              We collect information that you provide directly to us, such as when you fill out our contact form or enquire about our products. This may include your name, email address, phone number, company name, and any other information you choose to provide.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-6">2. How We Use Information</h2>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-neutral-600 mb-8">
              <li>Respond to your enquiries and provide the information or services you request.</li>
              <li>Improve our website and your user experience.</li>
              <li>Communicate with you about our products, services, and updates (only if you have opted in).</li>
              <li>Compliance with legal obligations and protection of our legal rights.</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-6">3. Data Security</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              We implement appropriate technical and organisational measures to protect the security of your personal information. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-6">4. Third-Party Links</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to read the privacy policies of any third-party sites you visit.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-6">5. Contact Us</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              If you have any questions about this Privacy Policy or our treatment of your personal data, please contact us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-600 hover:underline">{COMPANY_EMAIL}</a>.
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
