import { NextRequest, NextResponse } from "next/server";

/**
 * CSP logic based on Next.js recommendations and Vercel's preview/vitals features.
 * Generates a unique nonce for every request to allow secure inline scripts.
 */
export function middleware(request: NextRequest) {
  // 1. Generate a nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // 2. Define standard CSP headers
  const defaultsCSPHeaders = `
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

  // 3. Environment-specific logic
  let cspHeader = "";

  if (process.env.VERCEL_ENV === "preview") {
    // Whitelist Vercel domains for comments and feedback features
    cspHeader = `
      ${defaultsCSPHeaders}
      default-src 'none';
      script-src 'self' https://vercel.live/ https://vercel.com 'unsafe-inline';
      connect-src 'self' https://vercel.live/ https://vercel.com https://vitals.vercel-insights.com https://sockjs-mt1.pusher.com/ wss://ws-mt1.pusher.com/;
      img-src 'self' https://vercel.live/ https://vercel.com https://sockjs-mt1.pusher.com/ data: blob:;
      frame-src 'self' https://vercel.live/ https://vercel.com;
    `;
  } else if (process.env.NODE_ENV === "production") {
    // Production: Use strict-dynamic with nonce and whitelist GA
    cspHeader = `
      ${defaultsCSPHeaders}
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com;
      img-src 'self' https://www.googletagmanager.com https://www.google-analytics.com blob: data:;
      connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
    `;
  } else {
    // Development: Enable unsafe-eval for hot-reloading
    cspHeader = `
      ${defaultsCSPHeaders}
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
      img-src 'self' blob: data:;
      connect-src 'self' https://vitals.vercel-insights.com;
    `;
  }

  // 4. Set headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim());

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim());

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
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
