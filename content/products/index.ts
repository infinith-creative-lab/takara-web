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
    category: "rock-phosphate",
    tagline: "High-Performance Organic Bloom & Root Catalyst",
    description:
      "A concentrated natural phosphate source with 28% P₂O₅ content, engineered for extreme root vigor and explosive blooming.",
    longDescription:
      "Guano High Phosphate is a premium-grade organic input for professional agriculture. Sourced from deep-fossilized seabird deposits, it contains one of the highest natural concentrations of Phosphorus (28% P₂O₅) and Calcium (30% CaO). This synergy is critical for ATP energy transfer, massive root architecture development, and high-density fruit set. Its slow-release nature ensures sustained nutrition without the risk of nutrient leaching, making it the choice for high-value specialty crops.",
    purity: "28% P₂O₅ Content",
    image: "/images/products/guano-phosphate.webp",
    specs: [
      { label: "Total P₂O₅ Content", value: "28", unit: "%" },
      { label: "Available P₂O₅", value: "18–20", unit: "%" },
      { label: "Calcium (CaO)", value: "30", unit: "%" },
      { label: "pH (Neutralizing)", value: "7.8–8.2", unit: "" },
    ],
    applications: [
      "Explosive root development during transplanting",
      "Catalyzing heavy blooming and fruit set",
      "Long-term soil phosphorus enrichment",
      "Sustainable organic farming systems",
    ],
    certifications: ["Organic Certified", "Agricultural Export Grade"],
    isFeatured: true,
    order: 1,
  },
  {
    id: "prod-guano-high-n",
    slug: "guano-high-nitrogen",
    name: "Guano High Nitrogen",
    shortName: "High-N Guano",
    category: "rock-phosphate",
    tagline: "Natural Nitrogen Power for Leaf & Stem Growth",
    description:
      "A premium organic fertilizer derived from seabird guano, specifically high in nitrogen to support rapid vegetative development.",
    longDescription:
      "Guano High Nitrogen is a specialized organic input for crops requiring a strong start. Unlike standard rock phosphates, this grade is harvested and processed to preserve its natural nitrogen content. It is ideal for leafy greens, young transplants, and the early vegetative stages of most high-value crops. It not only feeds the plant but also acts as a 'soil probiotic' by introducing beneficial microbes.",
    purity: "12% Nitrogen Min",
    image: "/images/products/guano-high-n.webp",
    specs: [
      { label: "Total Nitrogen (N)", value: "12", unit: "%" },
      { label: "Total Phosphorus (P₂O₅)", value: "10–12", unit: "%" },
      { label: "Water Soluble (K₂O)", value: "2", unit: "%" },
      { label: "Calcium (CaO)", value: "10", unit: "%" },
    ],
    applications: [
      "Accelerating vegetative growth",
      "Improving leaf color and size",
      "Boosting soil microbial diversity",
      "Pre-planting soil enrichment",
    ],
    certifications: ["Organic Standard", "High-N Certified"],
    isFeatured: true,
    order: 2,
  },
  {
    id: "prod-palm-ash",
    slug: "palm-bunch-ash",
    name: "Palm Bunch Ash Fertilizer",
    shortName: "Palm Ash",
    category: "potash",
    tagline: "High Potash Source for Fruit Quality",
    description:
      "100% organic potassium source derived from oil palm bunches, perfect for acidic and peaty soils.",
    longDescription:
      "Palm Bunch Ash is one of nature's best sources of potassium (K₂O). Produced through controlled incineration of oil palm residues, it offers a highly alkaline pH, making it exceptionally effective for neutralizing acidity in peaty and tropical soils. High potassium levels directly improve fruit sweetness (Brix), weight, and overall plant resistance to drought and disease.",
    purity: "25% K₂O Min",
    image: "/images/products/palm-bunch-ash.webp",
    specs: [
      { label: "Potassium (K₂O) Content", value: "25–35", unit: "%" },
      { label: "pH (Alkalinity)", value: "10–12", unit: "" },
      { label: "MgO Content", value: "1–3", unit: "%" },
      { label: "P₂O₅ Content", value: "1–7", unit: "%" },
    ],
    applications: [
      "Neutralizing acidic/peaty soils",
      "Improving fruit sweetness (Brix)",
      "Strengthening plant stalks",
      "Enhancing drought resistance",
    ],
    certifications: ["100% Organic", "Eco-Friendly Residue Use"],
    isFeatured: true,
    order: 3,
  },
  {
    id: "prod-dolomite",
    slug: "dolomitic-limestone",
    name: "Dolomite Fertilizer",
    shortName: "Dolomite",
    category: "mineral",
    tagline: "pH Balancer and Magnesium Source",
    description:
      "Natural dolomitic limestone used to neutralize acidic soils while providing essential magnesium and calcium.",
    longDescription:
      "Dolomite is a naturally occurring mineral composed of calcium magnesium carbonate. It is an ideal soil conditioner for acidic soils, effectively raising pH levels to an optimal range for plant growth. Beyond pH correction, it supplies magnesium (Mg)—the central atom of chlorophyll—and calcium (Ca), making it a dual-purpose input for soil health and plant nutrition.",
    purity: "Industrial Grade",
    image: "/images/products/dolomite-fertilizer.webp",
    specs: [
      { label: "CaCO₃ Content", value: "45–55", unit: "%" },
      { label: "MgCO₃ Content", value: "28–45", unit: "%" },
      { label: "MgO Content", value: "20–21", unit: "%" },
      { label: "pH Range", value: "8.5–10", unit: "" },
    ],
    applications: [
      "Soil acidity neutralization (liming)",
      "Providing magnesium for chlorophyll",
      "Improving soil structure",
      "Correction of Ca/Mg deficiencies",
    ],
    certifications: ["Certification COO Kemendag", "Natural Mineral"],
    isFeatured: false,
    order: 4,
  },
  {
    id: "prod-zeolite",
    slug: "zeolite-fertilizer",
    name: "Zeolite Fertilizer",
    shortName: "Zeolite",
    category: "mineral",
    tagline: "Soil Amendment and Nutrient Magnet",
    description:
      "A high-CEC natural mineral that traps nutrients and releases them slowly, maximizing fertilization efficiency.",
    longDescription:
      "Zeolite (Clinoptilolite) acts as a microscopic sponge for plant nutrients. Its high Cation Exchange Capacity (CEC) allows it to bind ammonium and potassium ions, preventing them from leaching away with groundwater. Over time, these nutrients are released slowly to the plant roots. Zeolite also significantly improves water retention in soil, making it a critical amendment for sustainable and efficient farming.",
    purity: "Premium Grade",
    image: "/images/products/zeolite-fertilizer.webp",
    specs: [
      { label: "CEC Capacity", value: "120–160", unit: "meq/100g" },
      { label: "SiO₂ Content", value: "~70", unit: "%" },
      { label: "Al₂O₃ Content", value: "~11", unit: "%" },
      { label: "pH (Neutral)", value: "7–8", unit: "" },
    ],
    applications: [
      "Reducing fertilizer leaching",
      "Improving soil nitrogen efficiency",
      "Increasing water retention",
      "Detoxifying heavy metals in soil",
    ],
    certifications: ["Certification COO Kemendag", "Eco-Mining Certified"],
    isFeatured: false,
    order: 5,
  },
  {
    id: "prod-calcium",
    slug: "calcium-fertilizer",
    name: "Calcium Fertilizer",
    shortName: "Calcium",
    category: "mineral",
    tagline: "Essential for Cell Wall Structural Integrity",
    description:
      "A vital secondary macronutrient fertilizer that strengthens plant cell walls and enhances stress tolerance.",
    longDescription:
      "Calcium is fundamental for the development of strong cell walls and membranes in plants. Our Calcium Fertilizer provides a highly available source of Ca, ensuring optimal structural integrity and nutrient transport. It is particularly effective in preventing physiological disorders such as blossom end rot and bitter pit, while improving the overall quality and shelf-life of produce.",
    purity: "High Purity Ca",
    image: "/images/products/calcium-fertilizer.webp",
    specs: [
      { label: "Calcium (Ca) Content", value: "19", unit: "%" },
      { label: "Nitrogen (N) Content", value: "15", unit: "%" },
      { label: "Solubility", value: "High", unit: "" },
      { label: "Formulation", value: "Granular/Powder", unit: "" },
    ],
    applications: [
      "Strengthening cell wall structure",
      "Improving produce shelf-life",
      "Neutralizing soil acidity",
      "Enhancing root development",
    ],
    certifications: ["Certification COO Kemendag", "Agricultural Grade"],
    isFeatured: false,
    order: 6,
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
