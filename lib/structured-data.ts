// lib/structured-data.ts
// JSON-LD structured data builders for rich search results.
// Each function returns a typed JSON-LD object ready for <script> injection.

import { SITE_NAME, SITE_URL, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS, COMPANY_CITY, COMPANY_POSTAL_CODE } from "./constants";

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
      addressLocality: COMPANY_CITY,
      postalCode: COMPANY_POSTAL_CODE,
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
    inLanguage: "en-US", // Explicitly stating content is in English
    offers: {
      "@type": "Offer",
      url: product.url.startsWith("http") ? product.url : `${SITE_URL}${product.url}`,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      // Price intentionally omitted for B2B. GSC will show a warning, but this is the correct semantic approach when there is no price.
    },
  };
}

export function articleJsonLd(article: {
  headline: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}): JsonLdType {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url.startsWith("http") ? article.url : `${SITE_URL}${article.url}`,
    },
    inLanguage: "en-US", // Explicitly stating content is in English
    headline: article.headline,
    description: article.description,
    image: article.image.startsWith("http") ? article.image : `${SITE_URL}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: article.authorName || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`, // Google prefers PNG/JPG for publisher logos over SVG sometimes
      },
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
