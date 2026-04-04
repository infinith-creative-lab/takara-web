# SEO & Metadata Strategy

Takara Enterprise is built for first-page search rankings in the global phosphate and fertilizer industries.

## Metadata Management

We use a **Factory Pattern** for consistent metadata generations:

- **Factory**: `lib/metadata.ts`
- **Output**: Full Next.js `Metadata` object.
- **Features**: 
    - Canonical URL generation based on `SITE_URL`.
    - OpenGraph (OG) image management (absolute URLs required).
    - Page-specific titles and descriptions with a fallback mechanism.

## Structured Data (JSON-LD)

The site implements high-fidelity JSON-LD schema for search engines:

1.  **Organization Schema**: Defines the official name, logo, contact, and social links.
2.  **Product Schema**: Applied to each detail page (`/products/[slug]`), including name, description, image, and SKU.
3.  **Breadcrumb List**: Ensures Google Search Console correctly displays the site's navigational breadcrumbs.

## SEO Best Practices

- **Semantic Heading Hierarchy**: Only one `<h1>` per page.
- **Image Alt Optimization**: All images have descriptive, keyword-rich `alt` text.
- **Descriptive Links**: "Learn More" links have been replaced with descriptive text like "Explore Products" or "Sustainability Commitment".
- **Internal Linking**: Clean URL structure (`/products`, `/about`, `/contact`) with consistent cross-linking.

---

> [!IMPORTANT]
> When adding new products to `content/products/`, ensure the `tagline` and `description` are keyword-rich for the specific grade (e.g., "High Purity", "Indonesian Phosphate").
