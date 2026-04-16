// lib/constants.ts
// Site-wide constants — single source of truth.
// Never hardcode these values elsewhere.

export const SITE_NAME = "PT. Tangguh Kelola Alam Raya" as const;
export const SITE_TAGLINE =
  "Premium Phosphate, Bat Guano, Palm Bunch Ash & Agricultural Minerals" as const;
export const SITE_DESCRIPTION =
  "PT. Tangguh Kelola Alam Raya is a leading enterprise supplier of high-purity Guano Phosphate, Bat Guano, Palm Bunch Ash, Dolomite, Calcium Oxide (CaO), and Zeolite. Trusted globally for sustainable agriculture and industry." as const;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://takara.id";

export const COMPANY_EMAIL = "admin@takara.id" as const;
export const COMPANY_PHONE = "(031)7663152" as const;
export const COMPANY_WHATSAPP = "081331588131" as const;
export const COMPANY_ADDRESS = "Jl. Kebraon Selatan A6 Surabaya" as const;
export const COMPANY_CITY = "Surabaya" as const;
export const COMPANY_POSTAL_CODE = "60222" as const;
export const COMPANY_NAME_FULL = "PT. Tangguh Kelola Alam Raya" as const;

export const WEBSITE_DEVELOPER = "Infinith Creative Lab" as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/takara_id",
  instagram: "https://instagram.com/takara_id",
  linkedin: "https://linkedin.com/company/takara_id",
  twitter: "https://twitter.com/takara_id",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#hero" },
    { label: "Sustainability", href: "/about#sustainability" },
  ],
  products: [
    { label: "Guano Phosphate (P2O5)", href: "/products/organic-guano-phosphate" },
    { label: "Bat Guano", href: "/products/bat-guano" },
    { label: "Dolomite", href: "/products/agricultural-dolomite-mgo" },
    { label: "Palm Bunch Ash (K2O)", href: "/products/palm-bunch-ash-potassium" },
    { label: "Calcium Oxide (CaO)", href: "/products/calcium-oxide-cao" },
    { label: "Zeolite", href: "/products/natural-zeolite-mineral" },
  ],
  services: [
    { label: "Technical Consulting", href: "/services#consulting" },
    { label: "R&D - Custom Blending", href: "/services#rnd-blending" },
    { label: "Global Supply Chain", href: "/services#supply-chain" },
    { label: "Quality Test & Certification", href: "/services#quality" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
