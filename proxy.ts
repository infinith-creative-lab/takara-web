// proxy.ts (Next.js 16 — replaces middleware.ts)
// Edge proxy — runs before every request.
// Responsibilities:
//   1. Inject strict HTTP security headers (CSP with dynamic nonce)
//   2. Block suspicious request patterns (basic WAF)
//   3. Whitelist Google Analytics and Vercel features

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── Blocked patterns (Basic WAF) ─────────────────────────────
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

// ── CSP Header Builder ───────────────────────────────────────
const createCspHeaders = (nonce: string) => {
  const defaultsCSPHeaders = `
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' mailto:;
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

  // 1. Vercel Preview / Comments features
  if (process.env.VERCEL_ENV === "preview") {
    return `
      ${defaultsCSPHeaders}
      default-src 'none';
      script-src 'self' https://vercel.live/ https://vercel.com 'unsafe-inline';
      connect-src 'self' https://vercel.live/ https://vercel.com https://vitals.vercel-insights.com https://sockjs-mt1.pusher.com/ wss://ws-mt1.pusher.com/;
      img-src 'self' https://vercel.live/ https://vercel.com https://sockjs-mt1.pusher.com/ data: blob:;
      frame-src 'self' https://vercel.live/ https://vercel.com;
    `.replace(/\s{2,}/g, " ").trim();
  }

  // 2. Production with Google Analytics & Vitals
  if (process.env.NODE_ENV === "production") {
    return `
      ${defaultsCSPHeaders}
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com;
      img-src 'self' https://www.googletagmanager.com https://www.google-analytics.com blob: data:;
      connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
    `.replace(/\s{2,}/g, " ").trim();
  }

  // 3. Development (allow unsafe-eval for hot-reload)
  return `
    ${defaultsCSPHeaders}
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
    img-src 'self' blob: data:;
    connect-src 'self' https://vitals.vercel-insights.com;
  `.replace(/\s{2,}/g, " ").trim();
};

// ── Main Proxy / Middleware ──────────────────────────────────
export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl;

  // Security: block malicious patterns
  if (isBlocked(url)) {
    return new NextResponse(null, { status: 403 });
  }

  // Generate per-request nonce (Edge compatible)
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = createCspHeaders(nonce);

  // Set the nonce in request headers for the Client Component / Server Component retrieval
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set standard security headers on the final response
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|images/).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
