// app/sitemap.ts
// Auto-generated sitemap for Next.js App Router.
// Returns all static routes + dynamic product routes.

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllProductSlugs } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = getAllProductSlugs().map(
    (slug) => ({
      url: `${baseUrl}/products/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })
  );

  return [...staticRoutes, ...productRoutes];
}
