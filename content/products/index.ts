// content/products/index.ts
// Static product data — agricultural fertilizers.
// Typed strictly against types/product.ts.

import type { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "prod-guano-p2o5",
    slug: "organic-guano-phosphate",
    name: "Guano Phosphate — High P2O5 Organic Fertilizer",
    shortName: "Organic Guano",
    category: "fertilizer",
    tagline: "Natural Fossilized Phosphorus for Organic Agriculture",
    description:
      "A high-purity, fossilised organic phosphorus source ideal for sustainable farming and soil restoration.",
    longDescription:
      "Our fossilised Guano Phosphate is a naturally occurring mineral deposit, enriched over centuries. It provides a slow-release source of phosphorus (P2O5) and calcium, making it the perfect choice for organic farmers looking to improve soil fertility without synthetic chemicals. It enhances root development and improves flowering and fruit set in a wide variety of crops.",
    purity: "20-28% P₂O₅ Content",
    image: "/images/products/Guano-High-Phosphate.webp",
    specs: [
      { label: "P₂O₅ Content", value: "20 - 28", unit: "%" },
      { label: "CaO Content", value: "30 - 40", unit: "%" },
      { label: "Moisture", value: "< 5", unit: "%" },
      { label: "Mesh Size", value: "80 - 100", unit: "mesh" },
    ],
    applications: [
      "Base fertilizer for plantation crops",
      "Raw material for compound fertilizers",
      "Soil amendment for acidic land",
      "Organic horticulture and fruit production",
    ],
    certifications: ["Sucofindo Certified", "Organic Standard"],
    isFeatured: true,
    order: 1,
  },
  {
    id: "prod-bat-guano",
    slug: "bat-guano",
    name: "Bat Guano — Natural Nitrogen Boost",
    shortName: "Bat Guano",
    category: "fertilizer",
    tagline: "High-Nitrogen Organic Bloom & Growth Booster",
    description:
      "Freshly harvested bat guano, rich in nitrogen and beneficial microbes for rapid vegetative growth.",
    longDescription:
      "Takara Bat Guano is carefully harvested to preserve its high nitrogen content and rich microbial diversity. Unlike fossilised phosphate, this fresh guano provides a quick nutrient boost that is immediately available to plants. It is excellent for promoting lush green foliage and supporting the overall immune system of the plant through high organic carbon content.",
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
    slug: "palm-bunch-ash-potassium",
    name: "Palm Bunch Ash — Organic Potassium K2O",
    shortName: "Palm Ash",
    category: "soil-conditioner",
    tagline: "High-Potassium Palm Bunch Ash for Soil Neutralization",
    description:
      "A premium organic, potassium-rich fertilizer derived from sustainable palm oil residues. This Palm Bunch Ash is ideal for neutralizing acidic soils and boosting crop quality.",
    longDescription:
      "Our Palm Bunch Ash (K2O) is an organic, potassium-rich fertilizer derived from the controlled incineration of empty fruit bunches (EFB) from the sustainable palm oil industry. Known for its highly alkaline nature, it is a highly sought-after resource for improving soil chemistry and delivering immediate potassium to plants. It is particularly effective as a soil sweetener for peatland agriculture.",
    purity: "32.31% K₂O Content",
    image: "/images/products/Palm-Bunch-Ash-(K2O).webp",
    specs: [
      { label: "Potassium (K₂O)", value: "32.31", unit: "%" },
      { label: "Form", value: "Powder / Fine Ash", unit: "" },
      { label: "Origin", value: "Oil Palm Residue", unit: "" },
      { label: "Alkalinity", value: "High", unit: "" },
    ],
    applications: [
      "Neutralizing peat and acidic soils",
      "Potassium source for Oil Palm and Rubber",
      "Fruit quality enhancer (sweetness/size)",
      "Substitute for MOP (Muriate of Potash)",
    ],
    certifications: ["Sucofindo Certified", "100% Organic Resource"],
    isFeatured: true,
    order: 3,
  },
  {
    id: "prod-dolomite",
    slug: "agricultural-dolomite-mgo",
    name: "Agricultural Dolomite — MgO & CaO PH Balancer",
    shortName: "Dolomite",
    category: "soil-conditioner",
    tagline: "Premium Magnesium & Calcium Carbonate for Soil Health",
    description:
      "Crushed natural dolomite mineral, essential for regulating soil pH and providing vital magnesium.",
    longDescription:
      "Takara Agricultural Dolomite is a dual-purpose soil conditioner that provides both Magnesium (MgO) and Calcium (CaO). It is essential for correcting soil acidity and ensuring that other nutrients (NPK) are efficiently absorbed by the plant. Our dolomite is finely ground to ensure rapid reaction with the soil and long-lasting benefits.",
    purity: "18-22% MgO Content",
    image: "/images/products/dolomite-mgo.webp",
    specs: [
      { label: "Magnesium Oxide (MgO)", value: "18 - 22", unit: "%" },
      { label: "Calcium Oxide (CaO)", value: "30 - 32", unit: "%" },
      { label: "Neutralizing Capacity", value: "103.89", unit: "%" },
      { label: "Form", value: "Fine Powder", unit: "" },
    ],
    applications: [
      "Soil pH adjustment",
      "Magnesium deficiency correction",
      "Infield fertilizer for plantations",
      "Aquaculture water treatment",
    ],
    certifications: ["SNI Standard", "Mining Quality Guaranteed"],
    isFeatured: false,
    order: 4,
  },
  {
    id: "prod-calcium-cao",
    slug: "calcium-oxide-cao",
    name: "Active Calcium Oxide (CaO) — High Purity",
    shortName: "Calcium Oxide",
    category: "soil-conditioner",
    tagline: "Industrial-Grade Quicklime for Precision Applications",
    description:
      "High-calcium quicklime (CaO) produced through precision calcination for industrial and chemical use.",
    longDescription:
      "Our Calcium Oxide is produced from high-quality limestone, calcined at controlled temperatures to ensure high reactivity. It is a vital chemical reagent used in water treatment, paper manufacturing, and the production of chemical compounds. Its high purity makes it ideal for applications requiring consistent chemical performance.",
    purity: "90% Min CaO Content",
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
    slug: "natural-zeolite-mineral",
    name: "Natural Zeolite — CEC Nutrient Carrier",
    shortName: "Zeolite",
    category: "others",
    tagline: "High Cation Exchange Capacity Mineral for Nutrient Efficiency",
    description:
      "A versatile volcanic mineral used to improve nutrient retention and soil structure in agriculture.",
    longDescription:
      "Natural Zeolite is a microporous mineral with a high Cation Exchange Capacity (CEC). It acts as a nutrient reservoir, holding onto fertilizers and releasing them slowly to the plants, reducing leaching and waste. It also improves soil aeration and water retention, making it an essential component for modern, efficient farming.",
    purity: "High CEC Content",
    image: "/images/products/zeolite-fertilizer.webp",
    specs: [
      { label: "CEC Capacity", value: "100–160", unit: "meq/100g" },
      { label: "Water Retention", value: "Excellent", unit: "" },
      { label: "pH Stability", value: "High", unit: "" },
      { label: "Form", value: "Granular", unit: "" },
    ],
    applications: [
      "Fertilizer blending additive",
      "Soil aeration and structure improvement",
      "Animal feed additive",
      "Aquaculture water filtration",
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
