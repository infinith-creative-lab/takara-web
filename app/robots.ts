// app/robots.ts
// robots.txt generation via Next.js App Router.

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/*?*", // Prevent duplicate content indexing from search params
        ],
      },
      {
        userAgent: "Googlebot", // Define explicit allowances for the most critical crawler
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "CCBot", "anthropic-ai", "ClaudeBot"], // Block AI scrapers to save resources if desired
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
