// app/not-found.tsx
// Custom 404 page — Server Component.

import Link from "next/link";
import type { Metadata } from "next";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { buildMetadata } from "@/lib/metadata";

// path intentionally omitted — noIndex pages must not emit a canonical tag.
export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  noIndex: true,
});

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-surface px-5"
      role="main"
      aria-labelledby="not-found-heading"
    >
      <div className="text-center max-w-md">
        {/* Large 404 */}
        <p
          className="text-[9rem] font-black leading-none text-gradient mb-2 select-none"
          aria-hidden="true"
        >
          404
        </p>

        <h1
          id="not-found-heading"
          className="text-3xl font-bold text-neutral-900 mb-3"
        >
          Page not found
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed mb-8">
          The page you&rsquo;re looking for has been moved, deleted, or doesn&rsquo;t
          exist. Try the links below to find what you need.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/" className="btn-primary flex items-center gap-2">
            <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
          <Link href="/products" className="btn-secondary">
            Browse Products
          </Link>
        </div>

        {/* Quick links */}
        <div className="text-xs text-neutral-500">
          <p className="mb-3 font-semibold uppercase tracking-wide">
            Popular Pages
          </p>
          <nav aria-label="Popular pages">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2" role="list">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Products", href: "/products" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-500 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
