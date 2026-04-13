// lib/metadata.ts
// Factory for building consistent Next.js Metadata objects.
// Centralises OG, Twitter, canonical, and robots configuration.

import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "./constants";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: title || SITE_NAME,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      // images array is omitted to allow Next.js opengraph-image file conventions to work automatically
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      // images array is omitted to allow Next.js twitter-image file conventions to work automatically
    },
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
