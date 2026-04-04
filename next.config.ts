import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://www.googletagmanager.com https://www.google-analytics.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net; frame-src 'self'; base-uri 'self'; form-action 'self';",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Performance: enable static export for CDN-friendly deployment
  // Note: We keep it commented out - Vercel doesn't need it and it disables ISR
  // output: 'export',

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 90], // Allow these specific quality levels
    minimumCacheTTL: 31536000, // 1 year
  },

  // Compression
  compress: true,

  // Enable source maps for browser diagnostics (resolves Lighthouse warning)
  productionBrowserSourceMaps: true,

  // Power tools
  experimental: {
    optimizePackageImports: ["react-icons"],
  },

  // Security headers applied to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Redirects for clean URLs
  async redirects() {
    return [];
  },
};

export default withBundleAnalyzer(nextConfig);
