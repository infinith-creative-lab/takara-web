// app/products/[slug]/page.tsx
// Individual product detail page.
// Uses generateStaticParams for full SSG.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { buildMetadata } from "@/lib/metadata";
import {
  productJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/structured-data";
import { PRODUCTS, getProductBySlug, getAllProductSlugs } from "@/content/products";
import { SITE_URL } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";

// ── SSG: pre-render all product slugs at build time ──────────
export function generateStaticParams(): { slug: string }[] {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

// ── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return buildMetadata({ title: "Product Not Found", noIndex: true });
  }

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${slug}`,
    image: product.image,
    keywords: [
      product.name,
      product.category,
      product.tagline,
      "phosphate supplier",
      "Indonesia",
      ...product.certifications
    ],
  });
}

// ── Page ──────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const jsonLd = productJsonLd({
    name: product.name,
    description: product.description,
    image: product.image,
    url: `/products/${product.slug}`,
    sku: product.id,
  });

  const articleLd = articleJsonLd({
    headline: `${product.name} — Premium ${product.category} for Sustainable Agriculture`,
    description: product.longDescription,
    image: product.image,
    url: `/products/${product.slug}`,
    datePublished: "2024-01-01T00:00:00+07:00", // Would be ideal to get from DB, hardcoding static date as fallback
    dateModified: new Date().toISOString(),      // Real-time update marking since Nextjs SSG revalidates
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/products` },
    { name: product.name, url: `${SITE_URL}/products/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />

      {/* Header Block (Dark background supports the transparent Navbar) */}
      <div className="bg-hero pt-32 pb-8">
        <div className="container-site">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-brand-200" role="list">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-brand-500">/</li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li aria-hidden="true" className="text-brand-500">/</li>
              <li className="text-white font-medium" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="product-name-heading">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image Container with Sticky Support */}
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-100 shadow-sm">
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.purity}`}
                  fill
                  priority
                  fetchPriority="high"
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Purity badge overlay */}
                <div className="absolute top-5 left-5">
                  <span className="badge badge-brand text-sm px-4 py-2 shadow-lg">
                    {product.purity}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              {/* Category */}
              <span className="section-eyebrow block mb-4 capitalize">
                {product.category.replace("-", " ")}
              </span>

              <h1
                id="product-name-heading"
                className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-3"
                style={{ letterSpacing: "-0.03em" }}
              >
                {product.name}
              </h1>
              <p className="text-azure-600 font-semibold text-lg mb-5">
                {product.tagline}
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                {product.longDescription}
              </p>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.certifications.map((cert) => (
                  <span key={cert} className="badge badge-azure text-xs">
                    {cert}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/contact" className="btn-primary btn-lg">
                  Request a Quote
                </Link>
                <Link href="/products" className="btn-secondary btn-lg flex items-center gap-2">
                  <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
                  All Products
                </Link>
              </div>

              {/* Specifications table */}
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-4">
                  Technical Specifications
                </h2>
                <div className="card overflow-hidden">
                  <table className="w-full text-sm" aria-label={`${product.name} technical specifications`}>
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-100">
                        <th className="text-left px-5 py-3 font-semibold text-neutral-700">
                          Parameter
                        </th>
                        <th className="text-right px-5 py-3 font-semibold text-neutral-700">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specs.map((spec, idx) => (
                        <tr
                          key={spec.label}
                          className={idx < product.specs.length - 1 ? "border-b border-neutral-100" : ""}
                        >
                          <td className="px-5 py-3.5 text-neutral-600">{spec.label}</td>
                          <td className="px-5 py-3.5 text-right font-medium text-neutral-900">
                            {spec.value}
                            {spec.unit ? ` ${spec.unit}` : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Applications */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">
                  Applications
                </h2>
                <ul className="flex flex-col gap-2" role="list">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <FiCheckCircle
                        className="w-4 h-4 text-brand-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
