// content/products/index.ts
// Static product data — agricultural fertilizers.
// Typed strictly against types/product.ts.

import type { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "prod-guano-high-p",
    slug: "guano-high-phosphate",
    name: "Guano High Phosphate",
    shortName: "High-P Guano",
    category: "fertilizer",
    tagline: "Natural Fossilized Phosphate for Maximum Yield",
    description:
      "A superior natural source of phosphorus with 25.97% Total P₂O₅, perfect for root development and flowering.",
    longDescription:
      "Guano High Phosphate is a premium-grade organic input sourced from fossilized seabird deposits. With a certified Total P₂O₅ of 25.97% and an exceptionally high Available P₂O₅ of 22.26%, it provides immediate and sustained nutrition. Its high calcium content (as CaO) works synergistically to improve soil structure and enhance ATP energy transfer in plants, leading to explosive blooming and high-density fruit sets.",
    purity: "25.97% Total P₂O₅",
    image: "/images/products/guano-phosphate.webp",
    specs: [
      { label: "Total P₂O₅ Content", value: "25.97", unit: "%" },
      { label: "Available P₂O₅", value: "22.26", unit: "%" },
      { label: "Neutralizing Factor", value: "High", unit: "" },
      { label: "Form", value: "Granule", unit: "" },
    ],
    applications: [
      "Explosive root development during transplanting",
      "Catalyzing heavy blooming and fruit set",
      "Long-term soil phosphorus enrichment",
      "Sustainable organic farming systems",
    ],
    certifications: ["Sucofindo Certified", "Organic Standard"],
    isFeatured: true,
    order: 1,
  },
  {
    id: "prod-guano-high-n",
    slug: "bat-guano",
    name: "BAT Guano",
    shortName: "BAT Guano",
    category: "fertilizer",
    tagline: "Organic Carbon & Phosphate Soil Revitalizer",
    description:
      "Rich in Organic Carbon (13.05%) and natural phosphorus, designed to boost soil microbes and nutrient uptake.",
    longDescription:
      "BAT Guano is a specialized organic fertilizer that acts as a soil probiotic. With 13.05% Organic Carbon and 6.78% Total P₂O₅, it provides a stable energy source for beneficial soil microorganisms. This 'Natural Guano Phosphate Carbon' formula improves soil CEC, enhances water retention, and ensures a slow-release supply of essential nutrients, making it ideal for soil regeneration and high-value sustainable crops.",
    purity: "13.05% Organic Carbon",
    image: "/images/products/guano-high-n.webp",
    specs: [
      { label: "Organic Carbon (C)", value: "13.05", unit: "%" },
      { label: "Total P₂O₅ Content", value: "6.78", unit: "%" },
      { label: "Available P₂O₅", value: "4.69", unit: "%" },
      { label: "Form", value: "Granule", unit: "" },
    ],
    applications: [
      "Boosting soil microbial activity",
      "Improving organic matter content",
      "Sustainable soil conditioning",
      "Safe nutrition for young transplants",
    ],
    certifications: ["Sucofindo Certified", "Carbon Rich Formula"],
    isFeatured: true,
    order: 2,
  },
  {
    id: "prod-palm-ash",
    slug: "palm-bunch-ash",
    name: "Palm Bunch Ash",
    shortName: "Palm Ash",
    category: "soil-conditioner",
    tagline: "Ultra-High Potash for Acidic Soil Correction",
    description:
      "A powerful 100% organic potassium source (32.31% K₂O) specifically for neutralizing peaty and acidic soils.",
    longDescription:
      "Natural Palm Bunch Ash is one of the most effective organic sources of Potassium (K₂O). Produced through controlled combustion of oil palm residues, it yields a staggering 32.31% K₂O and a highly alkaline pH. This makes it a dual-purpose miracle for tropical agriculture: correcting soil acidity while simultaneously providing the high potassium levels needed for fruit sweetness, weight, and drought resistance.",
    purity: "32.31% K₂O Content",
    image: "/images/products/palm-bunch-ash.webp",
    specs: [
      { label: "Potassium (K₂O)", value: "32.31", unit: "%" },
      { label: "Form", value: "Powder / Fine Ash", unit: "" },
      { label: "Origin", value: "Oil Palm Residue", unit: "" },
      { label: "Alkalinity", value: "High", unit: "" },
    ],
    applications: [
      "Neutralizing acidic and peaty soils",
      "Improving fruit sweetness (Brix)",
      "Strengthening plant stalks",
      "Increasing crop disease resistance",
    ],
    certifications: ["Sucofindo Certified", "100% Organic Resource"],
    isFeatured: true,
    order: 3,
  },
  {
    id: "prod-dolomite",
    slug: "dolomite",
    name: "Dolomite",
    shortName: "Dolomite",
    category: "soil-conditioner",
    tagline: "Certified High-MgO Soil pH Optimizer",
    description:
      "Premium soil conditioner with 21.41% MgO and 30.96% CaO for superior pH balancing and magnesium delivery.",
    longDescription:
      "Our certified Dolomite is a naturally occurring mineral with a high neutralizing capacity (103.89%). It provides essential Magnesium (21.41% MgO), which is the core component of chlorophyll, and Calcium (30.96% CaO) for structural integrity. This high-purity formulation is engineered for large-scale agricultural liming, ensuring soil toxicity (Aluminum) is neutralized while maximizing nutrient availability for the crop.",
    purity: "21.41% MgO | 30.96% CaO",
    image: "/images/products/dolomite-fertilizer.webp",
    specs: [
      { label: "Magnesium Oxide (MgO)", value: "21.41", unit: "%" },
      { label: "Calcium Oxide (CaO)", value: "30.96", unit: "%" },
      { label: "Neutralizing Capacity", value: "103.89", unit: "%" },
      { label: "Form", value: "Fine Powder", unit: "" },
    ],
    applications: [
      "Rapid soil pH correction",
      "Preventing Magnesium deficiency",
      "Enhancing chlorophyll production",
      "Detoxifying soil Aluminum levels",
    ],
    certifications: ["Sucofindo Certified", "Agricultural Grade"],
    isFeatured: false,
    order: 4,
  },
  {
    id: "prod-calcium",
    slug: "calcium-oksida",
    name: "Calcium Oksida",
    shortName: "Calcium Oksida",
    category: "soil-conditioner",
    tagline: "High-Purity Quicklime for Rapid Remediation",
    description:
      "Concentrated CaO (Quicklime) for immediate soil pH correction, water treatment, and industrial applications.",
    longDescription:
      "Calcium Oksida (Quicklime) is a highly reactive chemical compound used for rapid environmental and agricultural remediation. It is far more potent than standard limestone, providing immediate neutralization of acidity in soil and wastewater. Essential for industries requiring structural stabilization and for agricultural operations needing a fast-acting calcium source to strengthen cell walls and prevent physiological disorders in high-value produce.",
    purity: "Industrial Grade CaO",
    image: "/images/products/calcium-fertilizer.webp",
    specs: [
      { label: "Reactive CaO", value: "75–90", unit: "%" },
      { label: "Form", value: "Lumps / Powder", unit: "" },
      { label: "pH Correction", value: "Immediate", unit: "" },
      { label: "Usage", value: "Soil & Water", unit: "" },
    ],
    applications: [
      "Immediate soil pH adjustment",
      "Industrial water treatment",
      "Preventing blossom end rot",
      "Soil stabilization in construction",
    ],
    certifications: ["Certification COO Kemendag", "Industrial Standard"],
    isFeatured: false,
    order: 6,
  },
  {
    id: "prod-zeolite",
    slug: "zeolite",
    name: "Zeolite",
    shortName: "Zeolite",
    category: "others",
    tagline: "Natural Molecular Sieve for Nutrient Retention",
    description:
      "A high-CEC natural mineral amendment that traps nutrients and controls water release in the soil.",
    longDescription:
      "Zeolite (Clinoptilolite) acts as a microscopic molecular sieve. Its extraordinary Cation Exchange Capacity (CEC) allows it to capture and hold ammonium (N) and potassium (K) ions, preventing them from being washed away by rain or irrigation. It then releases these nutrients slowly as the plant needs them. Zeolite is essential for modern, efficient farming where water conservation and fertilizer efficiency are paramount.",
    purity: "High CEC Mineral",
    image: "/images/products/zeolite-fertilizer.webp",
    specs: [
      { label: "CEC Capacity", value: "100–160", unit: "meq/100g" },
      { label: "Water Retention", value: "Excellent", unit: "" },
      { label: "pH Stability", value: "High", unit: "" },
      { label: "Form", value: "Granular", unit: "" },
    ],
    applications: [
      "Reducing nutrient leaching",
      "Increasing water use efficiency",
      "Soil detoxification",
      "Compost & fertilizer additive",
    ],
    certifications: ["Certification COO Kemendag", "Natural Mineral"],
    isFeatured: false,
    order: 5,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured).sort((a, b) => a.order - b.order);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
