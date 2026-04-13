"use client";
// components/sections/Hero.tsx
// Hero carousel — the most performance-critical component.
//
// Architecture decisions:
//  - 'use client' only for carousel interactivity
//  - CSS transform + opacity transitions (no JS animation libraries)
//  - next/image with priority on slide 0, lazy on rest
//  - Fixed aspect ratio container → 0 CLS
//  - Full ARIA carousel pattern (role=region, aria-roledescription, aria-live)
//  - Keyboard navigation delegated to useCarousel hook

import Image from "next/image";
import Link from "next/link";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/utils";
import { FiArrowRight, FiMessageSquare } from "react-icons/fi";

interface Slide {
  id: string;
  headline: string;
  subheadline: string;
  description: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  image: { src: string; alt: string };
  badge?: string;
}

const slides: Slide[] = [
  {
    id: "slide-1",
    badge: "Certification COO Kemendag",
    headline: "Precision Phosphate",
    subheadline: "Solutions for Industry",
    description:
      "Supplying high-purity phosphate products to agricultural, chemical, and industrial sectors across Asia Pacific.",
    cta: { label: "Explore Products", href: "/products" },
    ctaSecondary: { label: "Contact Us", href: "/contact" },
    image: {
      src: "/images/hero/hero-1.webp",
      alt: "Close-up of industrial phosphate processing with advanced technology",
    },
  },
  {
    id: "slide-2",
    badge: "5+ Years of Trust",
    headline: "Trusted by Leading",
    subheadline: "Enterprises Since 2020",
    description:
      "From guano phosphate to specialty-grade compounds — our portfolio meets the most demanding industrial specifications.",
    cta: { label: "About Takara", href: "/about" },
    ctaSecondary: { label: "Our Products", href: "/products" },
    image: {
      src: "/images/hero/hero-2.webp",
      alt: "Aerial overview of a modern sustainable phosphate extraction site",
    },
  },
  {
    id: "slide-3",
    badge: "Sustainable Operations",
    headline: "Committed to a",
    subheadline: "Sustainable Future",
    description:
      "Our closed-loop mining and processing practices minimise environmental impact while maximising product purity.",
    cta: { label: "Our Services", href: "/services" },
    ctaSecondary: { label: "Sustainability Commitment", href: "/about#sustainability" },
    image: {
      src: "/images/hero/hero-3.webp",
      alt: "Laboratory-grade purity testing of phosphate compounds",
    },
  },
];

export default function Hero() {
  const { activeIndex, goTo, goNext, goPrev, isPaused, handlers } = useCarousel({
    slideCount: slides.length,
    autoPlayInterval: 5500,
  });

  return (
    <section
      className="relative w-full overflow-hidden"
      // Fixed height container — eliminates CLS, ensures decent height on landscape
      style={{ minHeight: "max(100svh, 550px)" }}
      role="region"
      aria-label="Hero carousel"
      aria-roledescription="carousel"
      {...handlers}
    >
      {/* ── Slide track ─────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        aria-live={isPaused ? "polite" : "off"}
        aria-atomic="true"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              id={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}: ${slide.headline} ${slide.subheadline}`}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              {/* Background with Image + Tuned Gradient Overlay */}
              <div className="absolute inset-0 bg-zinc-950">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={index <= 1}
                  loading={index <= 1 ? "eager" : "lazy"}
                  quality={90}
                  sizes="100vw"
                  className="object-cover object-center opacity-60"
                />
                {/* Left-heavy dark overlay for text readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, rgba(2,24,35,0.88) 0%, rgba(3,47,71,0.7) 35%, rgba(9,117,179,0.25) 65%, rgba(255,255,255,0.15) 100%)",
                  }}
                  aria-hidden="true"
                />
                {/* Subtle bottom vignette for content contrast */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(2,24,35,0.6) 0%, transparent 40%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Slide content */}
              <div className="relative z-10 container-site h-full flex flex-col justify-center pt-24 pb-40 sm:pb-32 lg:pt-40 lg:pb-32 [@media(max-height:500px)]:justify-start [@media(max-height:500px)]:pt-24">
                <div className="max-w-3xl lg:max-w-4xl">
                  {/* Badge */}
                  {slide.badge && (
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full",
                        "bg-white/10 backdrop-blur-sm border border-white/20",
                        "text-white/90 text-xs font-semibold tracking-widest uppercase",
                        "transition-all duration-700 delay-100",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-azure-500 animate-pulse" aria-hidden="true" />
                      {slide.badge}
                    </div>
                  )}

                  {/* Headline */}
                  <h1
                    className={cn(
                      "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-2 [@media(max-height:500px)]:text-3xl [@media(max-height:500px)]:mb-1",
                      "transition-all duration-700 delay-150",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                  >
                    {slide.headline}
                  </h1>
                  <p
                    className={cn(
                      "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-8 [@media(max-height:500px)]:text-3xl [@media(max-height:500px)]:mb-4",
                      "text-azure-500",
                      "transition-all duration-700 delay-200",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                  >
                    {slide.subheadline}
                  </p>

                  {/* Description */}
                  <p
                    className={cn(
                      "text-base sm:text-lg text-white/80 leading-relaxed mb-10 max-w-xl [@media(max-height:500px)]:text-sm [@media(max-height:500px)]:mb-6 [@media(max-height:500px)]:line-clamp-2",
                      "transition-all duration-700 delay-300",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                  >
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div
                    className={cn(
                      "flex flex-wrap items-center gap-4",
                      "transition-all duration-700 delay-[400ms]",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                  >
                    <Link
                      href={slide.cta.href}
                      className="btn bg-brand-500 text-white px-7 py-3.5 text-sm font-semibold rounded-xl hover:bg-brand-600 active:bg-brand-700 shadow-glow transition-all duration-250 flex items-center gap-2 group"
                      tabIndex={isActive ? 0 : -1}
                    >
                      {slide.cta.label}
                      <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                    {slide.ctaSecondary && (
                      <Link
                        href={slide.ctaSecondary.href}
                        className="btn border-2 border-white/40 text-white px-7 py-3.5 text-sm font-semibold rounded-xl hover:border-white/70 hover:bg-white/10 transition-all duration-250 flex items-center gap-2 group"
                        tabIndex={isActive ? 0 : -1}
                      >
                        {slide.ctaSecondary.label}
                        <FiMessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Navigation controls ──────────────────────────────── */}
      {/* Arrow buttons */}
      <button
        className={cn(
          "absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 cursor-pointer",
          "w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20",
          "hidden lg:flex items-center justify-center text-white",
          "hover:bg-white/20 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        )}
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className={cn(
          "absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 cursor-pointer",
          "w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20",
          "hidden lg:flex items-center justify-center text-white",
          "hover:bg-white/20 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        )}
        onClick={goNext}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-28 lg:bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center"
        role="tablist"
        aria-label="Carousel slides"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={slide.id}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className="w-11 h-11 flex items-center justify-center group focus-visible:outline-none cursor-pointer"
          >
            <span
              className={cn(
                "block transition-all duration-300 rounded-full group-focus-visible:ring-2 group-focus-visible:ring-white",
                index === activeIndex
                  ? "w-8 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/40 group-hover:bg-white/60"
              )}
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 h-0.5 bg-white/10" aria-hidden="true">
        <div
          key={activeIndex}
          className={cn(
            "h-full bg-brand-400",
            isPaused ? "" : "animate-[progress_5.5s_linear_forwards]"
          )}
          style={{
            animation: isPaused ? "none" : undefined,
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
