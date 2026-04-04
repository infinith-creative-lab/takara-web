"use client";

import { useEffect, useState, useRef } from "react";

const STATS = [
  { value: "5+", label: "Global Footprint" },
  { value: "1000+", label: "Export Volume (MT)" },
  { value: "> 98%", label: "Product Purity" },
  { value: "< 24", label: "Response (Hours)" },
];

// Easing function: fast start, steady deceleration without a lingering tail
function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

function AnimatedStat({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Extract number and any prefix/suffix (e.g., "> 98%" -> prefix=">", num=98, suffix="%")
  const numMatch = value.match(/(\d+)/);
  const targetNumber = numMatch ? parseInt(numMatch[0], 10) : NaN;
  const isNumber = !isNaN(targetNumber);

  const prefix = isNumber ? value.split(targetNumber.toString())[0] : "";
  const suffix = isNumber ? value.split(targetNumber.toString())[1] : "";

  // Trigger animation when the element scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run only once
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  // Perform the count up animation
  useEffect(() => {
    if (!isVisible || !isNumber) return;

    let startTime: number;
    const duration = 1500; // 1.5 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentCount = Math.floor(easeOutQuad(progress) * targetNumber);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, isNumber, targetNumber]);

  return (
    <span ref={elementRef}>
      {isNumber ? (
        <>
          {prefix}{count}{suffix}
        </>
      ) : (
        value
      )}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section
      className="relative z-30 -mt-20 container-site"
      aria-label="Company statistics"
    >
      <div className="bg-white rounded-2xl shadow-card border border-neutral-100 overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-neutral-100">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <span
                className="text-4xl lg:text-5xl font-bold text-gradient mb-1"
                aria-label={stat.value}
              >
                <AnimatedStat value={stat.value} />
              </span>
              <span className="text-sm text-neutral-700 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
