// proxy.ts  (Next.js 16 — replaces middleware.ts)
// Edge proxy — runs before every request.
// Responsibilities:
//   1. Inject strict HTTP security headers
//   2. Block suspicious request patterns (basic WAF)
//
// Note: This runs in the Node.js runtime (Next.js 16+).
// Keep it lean — no heavy imports.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── Security headers ─────────────────────────────────────────
const getSecurityHeaders = (nonce: string) => {
  const isDev = process.env.NODE_ENV !== "production";
  return {
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
    "Strict-Transport-Security":
      "max-age=63072000; includeSubDomains; preload",
    "X-DNS-Prefetch-Control": "on",
    "Content-Security-Policy": [
      `default-src 'self'`,
      `script-src 'self' 'nonce-${nonce}' ${isDev ? "'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
      `style-src 'self' 'unsafe-inline'`,
      `img-src 'self' data: blob: https:`,
      `font-src 'self'`,
      `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://maps.googleapis.com`,
      `frame-src https://maps.google.com https://www.google.com https://www.google.co.id`,
      `frame-ancestors 'self'`,
      `base-uri 'self'`,
      `form-action 'self' mailto:`,
      `upgrade-insecure-requests`,
    ]
      .map((s) => s.replace(/\s+/g, " ").trim())
      .join("; "),
  };
};

// ── Blocked patterns ─────────────────────────────────────────
const BLOCKED_PATTERNS = [
  /\.\.\//,
  /<script/i,
  /union.*select/i,
  /eval\(/i,
  /javascript:/i,
];

function isBlocked(url: URL): boolean {
  const full = decodeURIComponent(url.pathname + url.search);
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(full));
}

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl;

  if (isBlocked(url)) {
    return new NextResponse(null, { status: 403 });
  }

  // Generate per-request nonce
  const nonceBytes = crypto.getRandomValues(new Uint8Array(16));
  const nonce = btoa(String.fromCharCode(...nonceBytes));

  const response = NextResponse.next({
    request: {
      headers: new Headers({
        ...Object.fromEntries(request.headers),
        "x-nonce": nonce,
      }),
    },
  });

  const headers = getSecurityHeaders(nonce);
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|icons|robots.txt|sitemap.xml).*)",
  ],
};
