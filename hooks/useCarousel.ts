"use client";
// hooks/useCarousel.ts
// Zero-dependency carousel state management.
// Responsibilities:
//  - Track active slide index
//  - Auto-play with configurable interval
//  - Pause on hover/focus
//  - Keyboard navigation (ArrowLeft, ArrowRight, Home, End)
//  - Respect prefers-reduced-motion

import { useState, useEffect, useCallback, useRef } from "react";

interface UseCarouselOptions {
  slideCount: number;
  autoPlayInterval?: number; // ms, default 5000
}

interface UseCarouselReturn {
  activeIndex: number;
  isPaused: boolean;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  pause: () => void;
  resume: () => void;
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export function useCarousel({
  slideCount,
  autoPlayInterval = 5000,
}: UseCarouselOptions): UseCarouselReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useRef(false);

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slideCount);
  }, [slideCount]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, slideCount - 1)));
  }, [slideCount]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  // Touch gesture state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    pause();
    touchStartX.current = e.touches[0].clientX;
  }, [pause]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    resume();
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) goNext();
    if (isRightSwipe) goPrev();
    
    touchStartX.current = null;
    touchEndX.current = null;
  }, [goNext, goPrev, resume]);

  // Auto-play timer
  useEffect(() => {
    // Skip auto-play if reduced motion is preferred
    if (prefersReducedMotion.current || isPaused) return;

    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, goNext, autoPlayInterval]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(slideCount - 1);
          break;
      }
    },
    [goPrev, goNext, goTo, slideCount]
  );

  return {
    activeIndex,
    isPaused,
    goTo,
    goNext,
    goPrev,
    pause,
    resume,
    handlers: {
      onMouseEnter: pause,
      onMouseLeave: resume,
      onFocus: pause,
      onBlur: resume,
      onKeyDown: handleKeyDown,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
