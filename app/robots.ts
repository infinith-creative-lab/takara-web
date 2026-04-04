// app/robots.ts
// robots.txt generation via Next.js App Router.

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/admin/",
        "/*?*", // Disallow search params to prevent duplicate content indexing
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
