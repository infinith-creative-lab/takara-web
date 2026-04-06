// components/sections/TestimonialsSection.tsx
// Client testimonials — Server Component.

import PatternDots from "@/components/ui/PatternDots";

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Takara has consistently delivered high-purity phosphate that meets our strict industrial standards in Indonesia. Their logistics and technical support are truly world-class.",
    author: "Mrs. Rachma",
    company: "Sanjaya Muli Artha, Indonesia",
    initials: "RM",
  },
  {
    id: "t2",
    quote:
      "As a partner in South Korea, we value Takara's commitment to quality and transparency. Their products have significantly improved our chemical processing yield.",
    author: "Kim Lin Hye",
    company: "South Korea",
    initials: "KL",
  },
  {
    id: "t3",
    quote:
      "Efficient shipping and superior rock phosphate quality. Takara has been instrumental in supporting our large-scale agricultural projects across the Philippines.",
    author: "Danny L Uy",
    company: "Philippines",
    initials: "DU",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-surface relative overflow-hidden" aria-labelledby="testimonials-heading">
      <PatternDots className="text-brand-500/5 w-64 h-64 bottom-0 left-0 -mb-20 -ml-20 md:w-[600px] md:h-[600px]" />

      <div className="container-site relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="section-eyebrow block mb-4">Client Voices</span>
          <h2 id="testimonials-heading" className="section-title mb-4">
            Trusted by Industry{" "}
            <span className="text-gradient">Leaders</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.id}
              className="card p-8 flex flex-col"
              aria-label={`Testimonial from ${t.author} at ${t.company}`}
            >
              {/* Stars */}
              <div 
                className="flex items-center gap-1 mb-5" 
                role="img" 
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-neutral-800 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold shrink-0"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{t.author}</p>
                  <p className="text-xs text-neutral-700">
                    {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
