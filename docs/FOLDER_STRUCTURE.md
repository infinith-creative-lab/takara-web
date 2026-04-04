# Folder Structure

This project follows a modern **Next.js 15 App Router** structure with clear separation of concerns.

## Top-level Directories

```text
/app         — File-based routing and layout (Next.js 15)
/components  — Modular UI components (Layout, Sections, UI)
/content     — Static data and marketing content
/hooks       — Custom React hooks (Interactivity, Resize)
/lib         — Shared utilities and constants
/public      — Static assets (Images, Videos, WebP)
/types       — Global TypeScript definitions
/docs        — Project-level technical documentation
```

## Detailed Breakdown

### `app/`
- `layout.tsx`: Root layout, font loading, global metadata.
- `globals.css`: Tailwind directives and design system tokens.
- `about/`, `contact/`, `products/`: Route segments.
- `products/[slug]/`: Dynamic route for individual product details.

### `components/`
- `layout/`: Global navigation and footer.
- `sections/`: High-level page blocks (e.g., `Hero`, `FAQSection`).
- `ui/`: Low-level decorative elements (e.g., `PatternDots`).
- `skeletons/`: React Suspense loading states for data containers.

### `content/`
- `products/`: Central source of truth for all product data and specifications.

### `lib/`
- `constants.ts`: Global configuration, brand colors, and company details.
- `metadata.ts`: Factory for building page-specific metadata objects.
- `structured-data.ts`: JSON-LD schema generators.
- `utils.ts`: Tailwind merging (`cn`) and small logic helpers.

---

> [!NOTE]
> All new routes should be created as a folder with a `page.tsx`. Use `generateStaticParams` for any dynamic routes to ensure they are pre-rendered.
