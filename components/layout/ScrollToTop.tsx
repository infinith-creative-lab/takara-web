"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create a sentinel div at 400px from the top
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "400px";
    sentinel.style.left = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    sentinel.style.pointerEvents = "none";
    sentinel.style.zIndex = "-1";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the 400px sentinel is NOT intersecting (meaning we scrolled past it)
        // AND the bounding rectangle is above the viewport (top < 0)
        setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: [0] }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-brand-500/90 text-white shadow-lg transition-all duration-300",
        "hover:bg-brand-500 hover:-translate-y-1 active:scale-95 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        "border border-white/20 backdrop-blur-md",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <FiArrowUp className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
    </button>
  );
}
