// lib/structured-data.ts
// JSON-LD structured data builders for rich search results.
// Each function returns a typed JSON-LD object ready for <script> injection.

import { SITE_NAME, SITE_URL, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from "./constants";

export type JsonLdType = Record<string, unknown>;

export function organizationJsonLd(): JsonLdType {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY_PHONE,
        contactType: "customer service",
        email: COMPANY_EMAIL,
        areaServed: "ID",
        availableLanguage: ["English", "Indonesian"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_ADDRESS,
      addressCountry: "ID",
    },
    sameAs: [
      "https://linkedin.com/company/takara",
    ],
  };
}

export function websiteJsonLd(): JsonLdType {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  sku?: string;
}): JsonLdType {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`,
    url: product.url.startsWith("http") ? product.url : `${SITE_URL}${product.url}`,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): JsonLdType {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/** Inline JSON-LD script tag content */
export function jsonLdScript(data: JsonLdType): string {
  return JSON.stringify(data);
}
