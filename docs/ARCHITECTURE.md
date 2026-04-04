# Technical Architecture

The Takara Enterprise website is built with a modern, performance-first architecture designed for global scalability and maximum security.

## Core Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19 (Server Components by default)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Utility-first with a custom design system)
- **Icons**: React Icons (Lucide/Feather sets)

## Rendering Strategy

We employ a **Static-First** rendering strategy:

- **SSG (Static Site Generation)**: All core pages (Home, About, Products, Contact) are pre-rendered at build time. This ensures near-instant loading and 100% SEO visibility.
- **Dynamic Routes**: Product detail pages (`/products/[slug]`) use `generateStaticParams` to pre-render the entire product catalog at build time.

## Component Architecture

The project follows a modular component pattern:

1.  **Layout Components**: High-level wrappers (`Navbar`, `Footer`, `ScrollToTop`) that define the global frame.
2.  **Section Components**: Full-width blocks (`Hero`, `ProductShowcase`, `CTASection`) that compose individual pages.
3.  **UI Components**: Low-level, reusable atoms (`Logo`, `PatternDots`, `Skeletons`).

## Client vs Server Components

- **Server Components**: Used for all static content, data fetching, and layouts to minimize the JavaScript bundle sent to the browser.
- **Client Components**: Used only when interactivity is required (`'use client'`), such as carousels, forms, and scroll observers.

## Data Management

Content is managed via a **Decoupled Content Strategy**:

- **Location**: `content/products/index.ts`
- **Typing**: Strict TypeScript interfaces ensure data integrity across the site.
- **Utility**: Centralized getter functions (`getProductBySlug`) handle data retrieval for dynamic routes.

---

> [!TIP]
> This architecture ensures that the site remains highly performant and secure without the need for a complex database or backend server.
