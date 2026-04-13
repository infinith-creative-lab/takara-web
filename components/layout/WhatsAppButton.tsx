"use client";

import { useEffect, useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { COMPANY_WHATSAPP, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const WA_HREF = `https://wa.me/62${COMPANY_WHATSAPP.replace(/^0/, "").replace(/[^\d]/g, "")}`;

export default function WhatsAppButton() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        setIsScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: [0] }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <div
      ref={widgetRef}
      className={cn(
        "fixed right-4 sm:right-6 z-50 flex flex-col items-end transition-all duration-300 pointer-events-none",
        isScrolled ? "bottom-[4.25rem] sm:bottom-[5rem]" : "bottom-4 sm:bottom-6"
      )}
    >
      {/* Chat Popup */}
      <div
        className={cn(
          "mb-3 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto",
          "border border-neutral-200/60 bg-white",
          "transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <FaWhatsapp className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{SITE_NAME}</p>
            <p className="text-white/70 text-xs">Typically replies instantly</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Close chat"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div
          className="px-4 py-5 min-h-[120px]"
          style={{
            backgroundColor: "#ECE5DD",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c0b6' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          {/* Chat Bubble */}
          <div className="bg-white rounded-xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[85%] relative">
            {/* Triangle */}
            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white"
                 style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
            <p className="text-neutral-800 text-sm leading-relaxed">
              Hello! 👋<br />
              How can we help you?
            </p>
            <p className="text-[11px] text-neutral-400 text-right mt-1.5">
              09:00
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 py-3 bg-white border-t border-neutral-100">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center gap-2 w-full",
              "bg-[#25D366] hover:bg-[#20bd5a] text-white",
              "rounded-full py-2.5 px-4 text-sm font-semibold",
              "transition-colors duration-200 shadow-sm"
            )}
          >
            <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
            Chat with us
          </a>
        </div>
      </div>

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "p-2.5 sm:p-3 rounded-full shadow-lg pointer-events-auto",
          "transition-all duration-300 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
          "border border-white/20 backdrop-blur-md",
          isOpen
            ? "bg-neutral-700 hover:bg-neutral-600 text-white rotate-0"
            : "bg-[#25D366] hover:bg-[#20bd5a] text-white",
          "active:scale-95"
        )}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        {isOpen ? (
          <FiX className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" aria-hidden="true" />
        ) : (
          <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
