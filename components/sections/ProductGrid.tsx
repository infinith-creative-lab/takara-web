"use client";
// components/sections/ProductGrid.tsx
// Interactive product grid with category filter pills — Client Component.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { PRODUCTS } from "@/content/products";
import type { Product, ProductCategory } from "@/types/product";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<ProductCategory, string> = {
  fertilizer: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "soil-conditioner": "bg-azure-50 text-azure-700 border-azure-100",
  others: "bg-zinc-50 text-zinc-600 border-zinc-100",
};

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "fertilizer", label: "Fertilizer" },
  { value: "soil-conditioner", label: "Soil Conditioner" },
  { value: "others", label: "Others" },
];

const getCategoryLabel = (cat: string) => {
  return CATEGORIES.find(c => c.value === cat)?.label || cat;
}

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered: Product[] =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12" role="group" aria-label="Filter products by category">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              aria-pressed={isActive}
              className={cn(
                "px-4 py-2 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-brand-500 border-brand-500 text-white shadow-md"
                  : "bg-brand-50 border-brand-200 text-brand-600 hover:bg-brand-100 hover:border-brand-400"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filtered.map((product, index) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className={cn(
              "card group flex flex-col md:flex-row overflow-hidden",
              "hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-2xl"
            )}
            aria-label={`${product.name} — ${product.tagline}`}
          >
            <div className="relative w-full md:w-56 shrink-0 aspect-[4/3] md:aspect-auto">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={index < 1}
                sizes="(max-width: 768px) 100vw, 224px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col p-6 flex-1">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-xl font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">
                  {product.name}
                </h2>
                <span className="text-[10px] font-bold text-brand-700 bg-brand-50/50 border border-brand-100 px-2.5 py-1 rounded-md whitespace-nowrap">
                  {product.purity}
                </span>
              </div>

              <p className="text-sm text-brand-500 font-medium mb-3">
                {product.tagline}
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                {product.description}
              </p>

              {/* Mini specs preview */}
              <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap gap-2">
                {product.certifications.slice(0, 2).map((cert) => (
                  <span key={cert} className="badge-brand">
                    {cert}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-brand-500 group-hover:gap-3 transition-all duration-200">
                View Full Specifications
                <FiArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-neutral-500">
          No products found in this category.
        </div>
      )}
    </>
  );
}
