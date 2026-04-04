"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";
import PatternDots from "@/components/ui/PatternDots";

const FAQS = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer: "The standard MOQ is one 20ft container (approx. 20 MT). However, for custom blends and pilot plant testing, we can accommodate smaller lab-scale orders starting from 1 MT.",
  },
  {
    question: "Do you provide product samples prior to ordering?",
    answer: "Yes, we provide 1-2 kg samples for independent lab analysis and process compatibility testing. Please mention your sample requirement and intended application in the contact form.",
  },
  {
    question: "What certifications and quality guarantees do you offer?",
    answer: "We carry the Certification COO Kemendag. Furthermore, every production run is held for release until an independent Certificate of Analysis (CoA) is issued by recognized third-party labs like SGS, Bureau Veritas, or Sucofindo.",
  },
  {
    question: "Which regions do you ship to, and what are the delivery terms?",
    answer: "We actively serve the Asia Pacific region, including Indonesia, Malaysia, Vietnam, India, and the UAE. We support FCL and LCL shipping on FOB, CFR, CIF, and select DDP terms depending on the destination.",
  },
  {
    question: "Can you produce custom phosphate formulations?",
    answer: "Absolutely. Our R&D facility can engineer bespoke phosphate compounds, custom P₂O₅/Ca/N ratio blends, and control particle size distributions to match your exact downstream process requirements.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: '#F8F9FA' }}
      aria-labelledby="faq-heading"
    >
      {/* Decorative Ornaments */}
      <PatternDots className="text-brand-500/5 w-64 h-64 top-0 left-0 -mt-20 -ml-20 md:w-[400px] md:h-[400px]" />
      <PatternDots className="text-brand-500/3 w-64 h-64 bottom-0 right-0 -mb-20 -mr-20 md:w-[400px] md:h-[400px]" />

      <div className="container-site max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 px-4">
          <span className="section-eyebrow block mb-4">Common Questions</span>
          <h2 id="faq-heading" className="section-title mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <div className="w-16 h-1 bg-brand-gradient mx-auto rounded-full mb-6"></div>
          <p className="section-subtitle lg:text-lg max-w-2xl mx-auto">
            Find quick answers to common queries about our ordering process, shipping, and product specifications.
          </p>
        </div>

        <div className="flex flex-col gap-5 px-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const displayIndex = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={index}
                className={cn(
                  "group rounded-2xl overflow-hidden transition-all duration-500 border",
                  isOpen
                    ? "bg-white border-brand-200 shadow-xl shadow-brand-500/5 ring-1 ring-brand-100 scale-[1.01]"
                    : "bg-white/60 backdrop-blur-sm border-neutral-100/50 hover:border-brand-200 hover:bg-white shadow-sm"
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 lg:px-10 py-7 flex items-center justify-between gap-4 focus-visible:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-5 lg:gap-8 flex-1">
                    <span className={cn(
                      "text-xs lg:text-sm font-black transition-all duration-300",
                      isOpen ? "text-brand-500 translate-y-0" : "text-neutral-300"
                    )}>
                      {displayIndex}
                    </span>
                    <span className={cn(
                      "font-bold text-base lg:text-xl tracking-tight transition-colors duration-300",
                      isOpen ? "text-neutral-900" : "text-neutral-700"
                    )}>
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500",
                      isOpen
                        ? "bg-brand-500 text-white shadow-md shadow-brand-500/20 rotate-180"
                        : "bg-brand-50 text-brand-500 group-hover:bg-brand-100"
                    )}
                  >
                    <FiChevronDown className="w-5 h-5 transition-transform" aria-hidden="true" />
                  </div>
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-in-out px-6 lg:px-10",
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-10" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pt-2 pb-2 border-l-2 border-brand-200/50 pl-6 lg:pl-10 ml-6 lg:ml-12">
                      <p className="text-neutral-600 text-sm lg:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
