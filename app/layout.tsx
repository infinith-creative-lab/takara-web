// app/layout.tsx
// Root layout — wraps every page.
// Server Component — no 'use client' needed here.

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, GA_MEASUREMENT_ID } from "@/lib/constants";
import { organizationJsonLd, websiteJsonLd, jsonLdScript } from "@/lib/structured-data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ScrollToTop from "@/components/layout/ScrollToTop";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

// ── Fonts ────────────────────────────────────────────────────
// Self-hosted via next/font — zero FOUT, zero layout shift.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// ── Root Metadata ─────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Takara Team" }],
  keywords: [
    "phosphate",
    "guano phosphate",
    "TSP fertilizer",
    "MAP fertilizer",
    "dicalcium phosphate",
    "industrial phosphate",
    "B2B phosphate supplier",
    "Indonesia phosphate",
    "agricultural chemical",
  ],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Precision Phosphate Solutions`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// ── Viewport ──────────────────────────────────────────────────
// Separate from metadata as per Next.js 14+ requirement
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0975B3" },
    { media: "(prefers-color-scheme: dark)", color: "#021823" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ── Root Layout ───────────────────────────────────────────────
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") || "";

  return (
    <html lang="en" className={cn("h-full", inter.variable)} data-scroll-behavior="smooth">
      <head>
        {/* Organization JSON-LD — site-wide */}
        <script
          nonce={nonce}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(organizationJsonLd()),
          }}
        />
        {/* Website JSON-LD with SearchAction */}
        <script
          nonce={nonce}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(websiteJsonLd()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-surface text-neutral-800 overflow-x-hidden">
        {/* Skip-to-content for keyboard users */}
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>

        <Footer />

        {/* Google Analytics — only loads when GA_MEASUREMENT_ID is set */}
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} nonce={nonce} />

        {/* Floating WhatsApp button */}
        <WhatsAppButton />

        {/* Global Scroll to Top button */}
        <ScrollToTop />
      </body>
    </html>
  );
}
