// components/analytics/GoogleAnalytics.tsx
// GA4 integration — Client Component.
// ONLY loads the GA scripts when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
// This preserves full privacy by default and complies with the user's
// requirement to keep tracking disabled unless explicitly enabled.

"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Guard: do not render anything if GA ID is not provided
  if (!measurementId || measurementId.trim() === "") {
    return null;
  }

  return (
    <>
      {/* Load GA4 gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        id="ga4-script"
      />
      {/* Configure GA4 */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  );
}
