# Performance & Accessibility

Takara Enterprise is engineered for high performance and full inclusive access, meeting the highest modern web standards.

## Performance Strategies

The site targets a **100/100 Lighthouse Performance Score** through:

- **Next.js Image Optimization**: Automatic WebP conversion, responsive resizing, and lazy loading for every image.
- **Priority Assets**: LCP (Largest Contentful Paint) elements use `priority={true}` and `loading="eager"`.
- **Reflow Prevention**: 
    - Fixed aspect ratios on all containers (`aspect-[4/3]`, `h-screen`).
    - Use of `IntersectionObserver` instead of scroll listeners to avoid layout thrashing.
    - `matchMedia` for all responsive JavaScript logic.
- **Zero-Flicker Fonts**: Self-hosted `next/font` weights served with `display: swap`.

## Accessibility (WCAG 2.1 AA)

We are committed to making the site accessible to all users through:

- **Semantic HTML**: Proper use of `<main>`, `<section>`, `<nav>`, and `<header>` tags.
- **ARIA Patterns**: 
    - `aria-expanded` and `aria-controls` for mobile navigation and FAQs.
    - `aria-label` and `sr-only` for decorative or image-only links (e.g., Logo).
    - `role="alert"` and `aria-live="polite"` for form feedback and state changes.
- **Focus Management**:
    - "Skip to Content" link for keyboard and switch users.
    - Trapped focus in the mobile menu.
    - Explicit focus visible styles (`focus-visible:ring-2`).

---

> [!TIP]
> Periodically test the site using the **Lighthouse Audit** tool in Chrome and the **WAVE Evaluation Tool** to ensure full accessibility.
