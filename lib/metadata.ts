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
   * Set true to mark this page as noIndex/noFollow.
   * When true, `path` may be omitted (no canonical will be emitted).
   */
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonicalUrl = path ? `${SITE_URL}${path}` : undefined;

  // Full title used in OG/Twitter — mirrors what root layout's template produces.
  // e.g. "Products | TAKARA". For the homepage (no title), just SITE_NAME.
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    // Emit `title` only when provided. Next.js will apply the root layout's
    // template ("%s | TAKARA") to produce the final <title> tag.
    // When undefined, Next.js uses root `title.default` without templating.
    ...(title !== undefined && { title }),

    description,

    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      // `url` only set when we have a confirmed canonical path
      ...(canonicalUrl && { url: canonicalUrl }),
      // images intentionally omitted — app/opengraph-image.png file
      // convention is auto-applied by Next.js for all child routes.
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      // images intentionally omitted — same file convention reason above.
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
