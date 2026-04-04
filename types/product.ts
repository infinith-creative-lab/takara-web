// types/product.ts
// Strict TypeScript types for Phosphate product data.

export interface ProductSpec {
  label: string;
  value: string;
  unit?: string;
}

export type ProductCategory =
  | "rock-phosphate"
  | "superphosphate"
  | "ammonium-phosphate"
  | "calcium-phosphate"
  | "mineral"
  | "potash"
  | "nitrogen"
  | "specialty";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  longDescription: string;
  purity: string;
  image: string;
  specs: ProductSpec[];
  applications: string[];
  certifications: string[];
  isFeatured: boolean;
  order: number;
}

export type ProductSummary = Pick<
  Product,
  "id" | "slug" | "name" | "shortName" | "category" | "tagline" | "image" | "purity" | "isFeatured"
>;
