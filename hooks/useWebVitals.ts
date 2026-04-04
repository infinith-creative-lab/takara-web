"use client";
// hooks/useWebVitals.ts
// Records Core Web Vitals (LCP, CLS, FID, FCP, TTFB).
// In development: logs to console.
// In production: beacon to analytics endpoint (extend as needed).

import { useReportWebVitals } from "next/web-vitals";

export function useWebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      const { name, value, rating, id } = metric;
      const color =
        rating === "good"
          ? "\x1b[32m"
          : rating === "needs-improvement"
          ? "\x1b[33m"
          : "\x1b[31m";
      console.log(
        `${color}[Web Vitals] ${name}: ${value.toFixed(2)} (${rating})\x1b[0m`
      );
    }

    // Production: send to analytics
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    ) {
      const { name, value, id, rating } = metric;
      if (typeof window !== "undefined" && "gtag" in window) {
        (window as any).gtag("event", name, {
          event_category: "Web Vitals",
          event_label: id,
          value: Math.round(name === "CLS" ? value * 1000 : value),
          non_interaction: true,
          metric_rating: rating,
        });
      }
    }
  });
}
