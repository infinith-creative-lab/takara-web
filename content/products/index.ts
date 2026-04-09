// content/products/index.ts
// Static product data — agricultural fertilizers.
// Typed strictly against types/product.ts.

import type { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "prod-guano-p2o5",
    slug: "guano-phosphate-p2o5",
    name: "Guano Phosphate (P2O5)",
    shortName: "High-P Guano",
    category: "fertilizer",
    tagline: "Natural Fossilized Phosphorus for Strong Foundations",
    description:
      "A premium, naturally fossilized organic fertilizer from ancient caves, rich in slow-release phosphorus and calcium for building strong crop foundations.",
    longDescription:
      "A premium, naturally fossilized organic fertilizer sourced from ancient bat and seabird caves. Through years of natural aging, the nitrogen content has leached away, leaving behind an exceptionally high concentration of phosphorus and calcium. It is an essential slow-release fertilizer for building strong foundations in crops.",
    purity: "25.97% Total P₂O₅",
    image: "/images/products/Guano-High-Phosphate.webp",
    specs: [
      { label: "Total P₂O₅ Content", value: "25.97", unit: "%" },
      { label: "Available P₂O₅", value: "22.26", unit: "%" },
      { label: "Neutralizing Factor", value: "High", unit: "" },
      { label: "Form", value: "Granule", unit: "" },
    ],
    applications: [
      "Root Development: Ideal as a base fertilizer during planting to stimulate deep, robust root systems.",
      "Flowering and Fruiting: Promotes heavy blooming, improves fruit set, and increases overall crop yield.",
      "Long-Term Soil Amendment: Gradually releases phosphorus into the soil, providing sustained nutrition over multiple harvest cycles.",
    ],
    certifications: ["Sucofindo Certified", "Organic Standard"],
    isFeatured: true,
    order: 1,
  },
  {
    id: "prod-bat-guano",
    slug: "bat-guano",
    name: "Bat Guano",
    shortName: "BAT Guano",
    category: "fertilizer",
    tagline: "Potent Nitrogen Boost for Vigorous Growth",
    description:
      "A highly potent and fast-acting organic fertilizer from fresh guano deposits, delivering an immediate nitrogen and mineral boost for vigorous early-stage growth.",
    longDescription:
      "A highly potent, fast-acting organic fertilizer harvested from fresh guano deposits. It is exceptionally rich in natural nitrogen and trace minerals, offering a safe and eco-friendly alternative to synthetic urea. This premium guano delivers an immediate nutrient boost necessary for vigorous early-stage plant growth.",
    purity: "13.05% Organic Carbon",
    image: "/images/products/guano-high-n.webp",
    specs: [
      { label: "Organic Carbon (C)", value: "13.05", unit: "%" },
      { label: "Total P₂O₅ Content", value: "6.78", unit: "%" },
      { label: "Available P₂O₅", value: "4.69", unit: "%" },
      { label: "Form", value: "Granule", unit: "" },
    ],
    applications: [
      "Vegetative Growth: Vigorously stimulates the development of stems, branches, and lush green foliage.",
      "Leaf-Producing Crops: The ultimate organic choice for tobacco, tea, leafy greens, and turf grasses.",
      "Quick Nutrient Recovery: Acts rapidly to correct nitrogen deficiencies and revive stressed plants.",
    ],
    certifications: ["Sucofindo Certified", "Carbon Rich Formula"],
    isFeatured: true,
    order: 2,
  },
  {
    id: "prod-palm-ash-k2o",
    slug: "palm-bunch-ash-k2o",
    name: "Palm Bunch Ash (K2O)",
    shortName: "Palm Ash",
    category: "soil-conditioner",
    tagline: "Sustainable Potassium Source for Acidic Soils",
    description:
      "An organic, potassium-rich fertilizer derived from sustainable palm oil residues, ideal for neutralizing acidic soils and boosting crop quality.",
    longDescription:
      "An organic, potassium-rich fertilizer derived from the incineration of empty fruit bunches (EFB) from the palm oil industry. Known for its highly alkaline nature, it is a highly sought-after, sustainable resource for improving soil chemistry and delivering immediate potassium to plants.",
    purity: "32.31% K₂O Content",
    image: "/images/products/Palm-Bunch-Ash-(K2O).webp",
    specs: [
      { label: "Potassium (K₂O)", value: "32.31", unit: "%" },
      { label: "Form", value: "Powder / Fine Ash", unit: "" },
      { label: "Origin", value: "Oil Palm Residue", unit: "" },
      { label: "Alkalinity", value: "High", unit: "" },
    ],
    applications: [
      "Peatland Neutralization: Highly effective at raising the pH of acidic soils, particularly in peatland agriculture.",
      "Potassium Source: Provides a fast-acting organic potassium boost essential for fruit sizing, sweetness, and disease resistance.",
      "Soil Sweetener: Helps suppress soil-borne fungal diseases by creating a less acidic environment.",
    ],
    certifications: ["Sucofindo Certified", "100% Organic Resource"],
    isFeatured: true,
    order: 3,
  },
  {
    id: "prod-dolomite",
    slug: "dolomite",
    name: "Dolomite (MgO)",
    shortName: "Dolomite",
    category: "soil-conditioner",
    tagline: "Dual-Action Ph Balancing and Secondary Nutrients",
    description:
      "A dual-action natural mineral amendment that corrects soil acidity while supplying essential calcium and magnesium for robust crop health.",
    longDescription:
      "A natural mineral soil amendment composed of calcium magnesium carbonate. Dolomite is crucial for agricultural land management, acting as a powerful dual-action fertilizer that simultaneously corrects soil acidity and supplies two essential secondary macronutrients: Calcium and Magnesium.",
    purity: "21.41% MgO | 30.96% CaO",
    image: "/images/products/dolomite-mgo.webp",
    specs: [
      { label: "Magnesium Oxide (MgO)", value: "21.41", unit: "%" },
      { label: "Calcium Oxide (CaO)", value: "30.96", unit: "%" },
      { label: "Neutralizing Capacity", value: "103.89", unit: "%" },
      { label: "Form", value: "Fine Powder", unit: "" },
    ],
    applications: [
      "Soil pH Buffering: Safely neutralizes acidic soils to unlock bound nutrients, making them available for plant uptake.",
      "Correcting Deficiencies: Prevents yellowing of leaves (chlorosis) by supplying vital magnesium, the core element of chlorophyll.",
      "Structural Support: Supplies calcium to strengthen plant cell walls, reducing the risk of crop lodging (falling over).",
    ],
    certifications: ["Sucofindo Certified", "Agricultural Grade"],
    isFeatured: false,
    order: 4,
  },
  {
    id: "prod-calcium-cao",
    slug: "calcium-oksida-cao",
    name: "Calcium (CaO)",
    shortName: "Calcium Oksida",
    category: "soil-conditioner",
    tagline: "Essential Building Block for Tissue and Shelf Life",
    description:
      "A high-purity natural limestone product essential for tissue building, fruit quality, and significantly increasing post-harvest shelf life.",
    longDescription:
      "A high-purity natural limestone product essential for robust crop health and soil vitality. While often used for pH management, its primary agricultural value lies in providing an accessible source of calcium, a critical building block for plant tissue and cell division.",
    purity: "Industrial Grade CaO",
    image: "/images/products/calcium-fertilizer.webp",
    specs: [
      { label: "Reactive CaO", value: "75–90", unit: "%" },
      { label: "Form", value: "Lumps / Powder", unit: "" },
      { label: "pH Correction", value: "Immediate", unit: "" },
      { label: "Usage", value: "Soil & Water", unit: "" },
    ],
    applications: [
      "Fruit Quality Enhancement: Prevents common physiological disorders like blossom-end rot in tomatoes and bitter pit in apples.",
      "Post-Harvest Shelf Life: Strengthens cell walls, resulting in firmer fruits and vegetables that withstand transportation and last longer in storage.",
      "Toxicity Reduction: Alleviates aluminum and manganese toxicity in highly weathered, acidic soils.",
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
    tagline: "Volcanic Mineral Sponge for Nutrient Retention",
    description:
      "A volcanic mineral with a porous honeycomb structure that acts as an organic sponge to fundamentally improve soil water and nutrient retention.",
    longDescription:
      "A naturally occurring volcanic mineral renowned for its highly porous, honeycomb-like structure and exceptional Cation Exchange Capacity (CEC). Zeolite acts as a permanent, organic “sponge” in the soil, fundamentally improving how soil manages water and fertilizers.",
    purity: "High CEC Mineral",
    image: "/images/products/zeolite-fertilizer.webp",
    specs: [
      { label: "CEC Capacity", value: "100–160", unit: "meq/100g" },
      { label: "Water Retention", value: "Excellent", unit: "" },
      { label: "pH Stability", value: "High", unit: "" },
      { label: "Form", value: "Granular", unit: "" },
    ],
    applications: [
      "Water and Nutrient Retention: Captures fertilizers and moisture, preventing them from leaching away during heavy rain, and slowly releasing them back to the roots.",
      "Soil Aeration: Improves the physical structure of heavy clay soils, promoting better oxygen flow to the root zone.",
      "Toxin Absorption: Helps lock up heavy metals and neutralizes toxic elements in degraded agricultural lands.",
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
