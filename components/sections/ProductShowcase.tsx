"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PRODUCTS } from "@/content/products";
import { cn } from "@/lib/utils";
import PatternDots from "@/components/ui/PatternDots";

import { ProductCardVerticalSkeleton } from "@/components/skeletons/CardSkeletons";

export default function ProductShowcase() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  // Initial index should account for clones (pointing to start of real items)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Set isMounted to true on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update items per page based on window width using matchMedia for performance
  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 639px)");
    const tabletMq = window.matchMedia("(max-width: 1023px)");

    const updateItemsPerPage = () => {
      if (mobileMq.matches) setItemsPerPage(1);
      else if (tabletMq.matches) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    updateItemsPerPage();

    // Listen for breakpoint changes
    mobileMq.addEventListener("change", updateItemsPerPage);
    tabletMq.addEventListener("change", updateItemsPerPage);

    return () => {
      mobileMq.removeEventListener("change", updateItemsPerPage);
      tabletMq.removeEventListener("change", updateItemsPerPage);
    };
  }, []);

  // Clone items for infinite loop: [End Clones] [Originals] [Start Clones]
  const displayProducts = [
    ...PRODUCTS.slice(-itemsPerPage),
    ...PRODUCTS,
    ...PRODUCTS.slice(0, itemsPerPage),
  ];

  const totalOriginals = PRODUCTS.length;
  // Adjust initial index once itemsPerPage is set
  useEffect(() => {
    setCurrentIndex(itemsPerPage);
  }, [itemsPerPage]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // If we're at the start clones, jump to the end of originals
    if (currentIndex <= 0) {
      setCurrentIndex(totalOriginals);
    }
    // If we're at the end clones, jump to the start of originals
    if (currentIndex >= totalOriginals + itemsPerPage) {
      setCurrentIndex(itemsPerPage);
    }
  };

  const goNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) goNext();
    else if (diff < -50) goPrev();

    touchStartX.current = null;
  };

  // Logic for dots (mapping index back to 0..totalOriginals-1)
  const activeDotIndex = (currentIndex - itemsPerPage + totalOriginals) % totalOriginals;

  return (
    <section
      className="py-24 lg:py-32 bg-surface relative overflow-hidden"
      aria-labelledby="products-heading"
    >
      <PatternDots className="text-brand-500/5 w-64 h-64 top-0 right-0 -mt-20 -mr-20 md:w-[600px] md:h-[600px]" />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <span className="section-eyebrow block mb-4">Our Portfolio</span>
            <h2 id="products-heading" className="section-title mb-4">
              Premium Phosphate <span className="text-gradient">Products</span>
            </h2>
            <p className="section-subtitle">
              Every grade meets strict international quality standards, tested
              by independent laboratories at every production stage.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Previous products"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Next products"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>
            <Link
              href="/products"
              className="btn-ghost flex items-center gap-2 shrink-0 cursor-pointer"
              aria-label="View all phosphate products"
            >
              View All
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative px-0.5"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden rounded-2xl">
            {isMounted ? (
              <div
                className={cn(
                  "flex gap-6",
                  isTransitioning && "transition-transform duration-500 ease-out"
                )}
                style={{
                  transform: `translateX(calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * (24 / itemsPerPage)}px))`,
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {displayProducts.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="shrink-0"
                    style={{
                      width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})`,
                    }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className={cn(
                        "card group flex flex-col h-full overflow-hidden cursor-pointer",
                        "hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl border border-neutral-100/50"
                      )}
                    >
                      {/* Product image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                        <Image
                          src={product.image}
                          alt={`${product.name} phosphate product`}
                          fill
                          priority={index >= currentIndex && index < currentIndex + itemsPerPage}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-600 transition-colors duration-200 line-clamp-1">
                            {product.name}
                          </h3>
                          <span className="text-[10px] font-bold text-brand-500 bg-brand-50 px-2 py-1 rounded-md whitespace-nowrap">
                            {product.purity}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-700 leading-relaxed line-clamp-2 mb-6">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 mt-auto text-sm font-semibold text-brand-500 group-hover:gap-3 transition-all duration-300">
                          View Details
                          <FiArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "shrink-0",
                      i === 1 ? "hidden sm:block" : "",
                      i === 2 ? "hidden lg:block" : ""
                    )}
                    style={{
                      width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})`,
                    }}
                  >
                    <ProductCardVerticalSkeleton />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Indicators */}
        <div 
          className="flex justify-center items-center mt-10"
          role="tablist"
          aria-label="Product carousel slides"
        >
          {Array.from({ length: totalOriginals }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeDotIndex === i}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(i + itemsPerPage);
              }}
              className="w-11 h-11 flex items-center justify-center group focus-visible:outline-none cursor-pointer"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span
                className={cn(
                  "block transition-all duration-500 rounded-full group-focus-visible:ring-2 group-focus-visible:ring-brand-500",
                  activeDotIndex === i 
                    ? "w-8 h-2.5 bg-brand-500" 
                    : "w-2.5 h-2.5 bg-neutral-300 group-hover:bg-neutral-400"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


