// lib/metadata.ts
// Factory for building consistent Next.js Metadata objects.
// Centralises OG, Twitter, canonical, and robots configuration.
//
// Design decisions:
// - `metadataBase` is intentionally omitted — it lives in the root layout
//   and is automatically inherited by all child routes (Next.js App Router).
// - `openGraph.images` is intentionally omitted — the file-convention
//   `app/opengraph-image.png` is auto-resolved by Next.js for all routes.
// - When `title` is not provided, no `title` key is emitted. This lets
//   the root layout's `title.default` ("TAKARA") take effect without going
//   through the template — preventing "TAKARA | TAKARA" on the homepage.
// - When `path` is not provided, no canonical is emitted. This is correct
//   for noIndex pages (404, errors) where a canonical would be misleading.

import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "./constants";

interface BuildMetadataOptions {
  /**
   * Page-specific title (e.g. "Products", "About Us").
   *
   * If omitted, the root layout's `title.default` (= SITE_NAME) is used
   * directly, bypassing the `"%s | TAKARA"` template. This prevents the
   * homepage from rendering as "TAKARA | TAKARA".
   */
  title?: string;

  /** Meta description. Falls back to the site-wide description. */
  description?: string;

  /**
   * Absolute path for this page, e.g. "/products/guano-phosphate".
   * Must start with "/". Required for all indexable pages.
   *
   * **Intentionally has no default.** Omit only when `noIndex` is true
   * (e.g. 404, error pages). Any indexable page that omits this will
   * produce no canonical tag — TypeScript will not catch this, so be explicit.
   */
  path?: string;

  /**
   * Optional custom OpenGraph image path (e.g. for products).
   * Falls back to standard metadataBase + opengraph-image.png if omitted.
   */
  image?: string;

  /** Custom keywords for this specific page. */
  keywords?: string | string[];
  
  /**
   * Set true to mark this page as noIndex/noFollow.
   * When true, `path` may be omitted (no canonical will be emitted).
   */
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  image,
  keywords,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  // Pass relative paths ONLY. Next.js engine will auto-combine this with 
  // `metadataBase` from app/layout.tsx to generate accurate absolute URLs.
  const canonicalUrl = path ? path : undefined;

  // The final custom OG Image relative to SITE_URL if specified
  const customOgImage = image
    ? [{ url: image.startsWith("http") ? image : `${SITE_URL}${image}`, width: 1200, height: 630, alt: title || SITE_NAME }]
    : undefined;

  // Full title used in OG/Twitter — mirrors what root layout's template produces.
  // e.g. "Products | TAKARA". For the homepage (no title), just SITE_NAME.
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    // Emit `title` only when provided. Next.js will apply the root layout's
    // template ("%s | TAKARA") to produce the final <title> tag.
    // When undefined, Next.js uses root `title.default` without templating.
    ...(title !== undefined && { title }),

    description,

    ...(keywords && { keywords }),

    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      // `url` only set when we have a confirmed canonical path
      // Note: Next.js resolves relative paths for `url` against metadataBase seamlessly
      ...(canonicalUrl && { url: canonicalUrl }),
      // Override standard opengraph images if custom image exists
      ...(customOgImage && { images: customOgImage }),
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      // Override standard twitter images if custom image exists
      ...(customOgImage && { images: customOgImage }),
    },

    // Canonical is emitted only when `path` is provided.
    // noIndex pages (404, errors) deliberately omit this.
    ...(canonicalUrl && {
      alternates: { canonical: canonicalUrl },
    }),

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
