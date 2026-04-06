"use client";
// components/layout/Navbar.tsx
// Sticky responsive navbar with:
//  - Scroll-aware backdrop blur
//  - Mobile hamburger (CSS + JS)
//  - Active link detection via usePathname
//  - Full ARIA: role=navigation, aria-expanded, aria-label
//  - Keyboard accessible (Escape closes)

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isFirstMount = useRef(true);

  // Detect scroll to switch navbar style using IntersectionObserver for performance
  useEffect(() => {
    // Create a sentinel element at the top of the page
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.height = "10px";
    sentinel.style.width = "100%";
    sentinel.style.pointerEvents = "none";
    sentinel.style.zIndex = "-1";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: [1] }
    );

    observer.observe(sentinel);
    
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Focus management: Return focus to toggle when menu closes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (!isOpen) {
      toggleRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-350",
        isScrolled || isOpen
          ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-100"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="container-site flex items-center justify-between h-16 lg:h-20"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md"
          aria-label="TAKARA — Back to Home"
        >
          <span className="sr-only">TAKARA — Back to Home</span>
          <Logo variant="default" className="w-8 h-auto drop-shadow-sm" />
          <span
            className={cn(
              "text-xl font-bold tracking-tight transition-colors duration-250",
              isScrolled || isOpen ? "text-neutral-900" : "text-white"
            )}
          >
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 group rounded-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    // Text color
                    isScrolled
                      ? isActive ? "text-brand-600" : "text-neutral-700 hover:text-brand-600"
                      : isActive ? "text-azure-400" : "text-white",
                    // Underline Effect: Full-width for Active, Short for Hover
                    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:rounded-full after:transition-all after:duration-300",
                    isScrolled ? "after:bg-brand-600" : "after:bg-azure-400",
                    isActive 
                      ? "after:w-full after:opacity-100" 
                      : "after:w-0 hover:after:w-4 after:opacity-0 hover:after:opacity-100"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={pathname === "/contact" ? "#contact-form" : "/contact"}
            className={cn(
              "btn-primary btn-lg text-sm px-5 py-2.5 flex items-center gap-2 group",
              !isScrolled && "bg-white text-brand-600 hover:bg-brand-50 shadow-none border-0"
            )}
          >
            Get in Touch
            <FiSend className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          className={cn(
            "lg:hidden p-2 rounded-md transition-colors duration-200 relative w-10 h-10 flex items-center justify-center",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            isScrolled || isOpen
              ? "text-neutral-700 hover:bg-neutral-100"
              : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <div className="relative w-6 h-6 overflow-hidden">
            <HiMenu
              className={cn(
                "w-6 h-6 absolute inset-0 transition-all duration-500",
                isOpen ? "opacity-0 rotate-180 scale-50" : "opacity-100 rotate-0 scale-100"
              )}
              aria-hidden={isOpen}
            />
            <HiX
              className={cn(
                "w-6 h-6 absolute inset-0 transition-all duration-500",
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-50"
              )}
              aria-hidden={!isOpen}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden bg-white border-b border-neutral-100 shadow-lg",
          "transition-all duration-350 overflow-hidden",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
        role="region"
        aria-label="Mobile navigation"
        inert={!isOpen}
      >
        <ul className="container-site py-4 flex flex-col gap-1" role="list">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200",
                    isActive
                      ? "bg-brand-50 text-brand-600"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-brand-500"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 border-t border-neutral-100 mt-2">
            <Link
              href={pathname === "/contact" ? "#contact-form" : "/contact"}
              tabIndex={isOpen ? 0 : -1}
              className="btn-primary w-full text-center flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
              <FiSend className="w-4 h-4" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
