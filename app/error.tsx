"use client";
// app/error.tsx
// Global error boundary — Client Component required by Next.js.
// Catches runtime errors in RSC rendering.

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error monitoring in production
    if (process.env.NODE_ENV === "production") {
      console.error("[Takara Error Boundary]", error.digest ?? error.message);
    }
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-surface px-5"
      role="main"
      aria-labelledby="error-heading"
    >
      <div className="text-center max-w-md">
        <div
          className="w-16 h-16 rounded-2xl bg-error-100 flex items-center justify-center mx-auto mb-6"
          aria-hidden="true"
        >
          <FiAlertTriangle className="w-8 h-8 text-error-500" />
        </div>

        <h1
          id="error-heading"
          className="text-3xl font-bold text-neutral-900 mb-3"
        >
          Something went wrong
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed mb-8">
          An unexpected error occurred. Our team has been notified. Please try
          again or navigate back to the homepage.
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="text-left text-xs text-error-500 bg-error-100 rounded-xl p-4 mb-6 overflow-auto">
            {error.message}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="btn-primary flex items-center gap-2"
          >
            <FiRefreshCw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
