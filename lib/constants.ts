// lib/constants.ts
// Site-wide constants — single source of truth.
// Never hardcode these values elsewhere.

export const SITE_NAME = "TAKARA" as const;
export const SITE_TAGLINE =
  "Precision Phosphate Solutions for a Sustainable Future" as const;
export const SITE_DESCRIPTION =
  "Takara is a leading supplier of high-purity phosphate products for the agricultural, industrial, and chemical sectors. Trusted by enterprises across Asia Pacific." as const;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://takara.id";

export const COMPANY_EMAIL = "admin@takara.id" as const;
export const COMPANY_PHONE = "(031)7663152" as const;
export const COMPANY_WHATSAPP = "081331588131" as const;
export const COMPANY_ADDRESS = "Jl. Kebraon Selatan A6 Surabaya" as const;
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
    { label: "Guano Phosphate (P2O5)", href: "/products/guano-phosphate-p2o5" },
    { label: "Bat Guano", href: "/products/bat-guano" },
    { label: "Dolomite", href: "/products/dolomite" },
    { label: "Palm Bunch Ash (K2O)", href: "/products/palm-bunch-ash-k2o" },
    { label: "Calcium Oksida (CaO)", href: "/products/calcium-oksida-cao" },
    { label: "Zeolite", href: "/products/zeolite" },
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
