// lib/utils.ts
// Shared utility functions — pure, no side effects.

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, resolving conflicts intelligently.
 * Requires: clsx + tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a Date object to a locale-aware string.
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  return new Date(date).toLocaleDateString("en-US", options);
}

/**
 * Slugify a string for use in URLs.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate a string at a word boundary.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, text.lastIndexOf(" ", maxLength)) + "…";
}

/**
 * Build an absolute URL from a path, using SITE_URL as base.
 */
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://takara.co.id";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
