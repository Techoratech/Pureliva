export interface NutrientItem {
  label: string;
  per100g: number | string;
  unit: string;
  rda?: number; // % RDA based on ICMR 2020 2000 kcal diet
}

export interface KeyBenefit {
  title: string;
  desc: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  titleWithVariant: string;
  variant: string; // e.g. "Raw & Natural" | "Dry Roasted & Salted"
  category: "Raw Seeds" | "Roasted Seeds" | "Seed Mix" | "Healthy Snacks" | "Sweets";
  tagline: string;
  type: "Roasted & Salted" | "Raw";
  sku: string;
  netWeight: string; // "100 g"
  pricePlaceholder?: string; // "[PRICE]"
  price?: number;
  mrp?: number;
  accent: string;
  accentTextDark: boolean;
  servingsPerPack: string;
  servingSizeGrams: number;
  ingredients: string;
  description: string;
  benefits: string[];
  howToUse: string[];
  storage: string;
  allergen: string;
  keyStats: {
    label: string;
    value: string;
    detail: string;
  }[];
  nutrients: NutrientItem[];
  images: {
    front: string; // Front pack image
    back: string;  // Back pack image
    bowl: string;  // Bowl presentation
    packFront: string;
    packBack: string;
  };
  isComingSoon?: boolean;
}

export function calculatePerServe(per100gVal: number | string, servingGrams: number): string {
  if (typeof per100gVal === "string") {
    if (per100gVal.startsWith("<")) {
      return per100gVal;
    }
    const num = parseFloat(per100gVal);
    if (isNaN(num)) return per100gVal;
    return (Math.round(((num * servingGrams) / 100) * 10) / 10).toFixed(1);
  }
  return (Math.round(((per100gVal * servingGrams) / 100) * 10) / 10).toFixed(1);
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  available: boolean;
  badge?: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: "all", name: "All Products", slug: "all", available: true },
  { id: "raw-seeds", name: "Raw Seeds", slug: "raw-seeds", available: true },
  { id: "roasted-seeds", name: "Roasted Seeds", slug: "roasted-seeds", available: true },
  { id: "seed-mix", name: "Seed Mix", slug: "seed-mix", available: true },
  { id: "healthy-snacks", name: "Healthy Snacks", slug: "healthy-snacks", available: false, badge: "Coming Soon" },
  { id: "sweets", name: "Sweets & Desserts", slug: "sweets", available: false, badge: "Coming Soon" },
];

export const PRODUCTS: Product[] = [
  {
    id: "chia-seeds",
    slug: "chia-seeds",
    name: "Chia Seeds",
    titleWithVariant: "Chia Seeds – Raw & Natural (100g)",
    variant: "Raw & Natural",
    category: "Raw Seeds",
    tagline: "Superfood for Everyday",
    type: "Raw",
    sku: "PUR-CHI-100",
    netWeight: "100 g",
    pricePlaceholder: "₹99",
    price: 99,
    mrp: 120,
    accent: "#8E24AA",
    accentTextDark: false,
    servingsPerPack: "About 4 per pack",
    servingSizeGrams: 25,
    ingredients: "Raw Chia Seeds",
    description:
      "Tiny seeds packed with pure goodness, Pureliva Raw Chia Seeds are a versatile addition to your everyday diet. Naturally rich in dietary fibre, plant protein, and omega-3 fatty acids.",
    benefits: [
      "Rich source of dietary fibre to support everyday digestion (26.3g per 100g)",
      "High quality plant-based protein for sustained vitality (22.5g per 100g)",
      "Rich in plant-based omega-3 fatty acids for holistic heart and body wellness",
      "Zero added oils, zero preservatives, 100% natural and clean",
    ],
    howToUse: [
      "Soak in water, milk, or coconut milk for 15 minutes to make a luscious chia pudding",
      "Blend directly into morning fruit smoothies and protein shakes",
      "Stir into warm oatmeal, breakfast bowls, or curd / yoghurt",
      "Sprinkle over seasonal fresh fruit salads for extra nutrition",
    ],
    storage:
      "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "Dietary Fibre", value: "26.3g", detail: "Per 100g" },
      { label: "Plant Protein", value: "22.5g", detail: "Per 100g" },
      { label: "Energy", value: "491.2 kcal", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 491.2, unit: "kcal", rda: 24.6 },
      { label: "Protein", per100g: 22.5, unit: "g", rda: 41.7 },
      { label: "Carbohydrate", per100g: 40.0, unit: "g", rda: 30.8 },
      { label: "Dietary Fibre", per100g: 26.3, unit: "g", rda: 87.7 },
      { label: "Total Sugars", per100g: 0.5, unit: "g" },
      { label: "Total Fat", per100g: 26.8, unit: "g", rda: 40.0 },
      { label: "Saturated Fat", per100g: 3.3, unit: "g", rda: 15.0 },
      { label: "Trans Fat", per100g: 0.0, unit: "g", rda: 0 },
      { label: "Cholesterol", per100g: 0.0, unit: "mg", rda: 0 },
      { label: "Sodium", per100g: 16, unit: "mg", rda: 0.8 },
    ],
    images: {
      front: "/images/products/chia-front.webp",
      back: "/images/products/chia-back.webp",
      bowl: "/images/products/chia-seed-bowl",
      packFront: "/images/products/chia-front.webp",
      packBack: "/images/products/chia-back.webp",
    },
  },
  {
    id: "pumpkin-seeds",
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    titleWithVariant: "Pumpkin Seeds – Dry Roasted & Salted (100g)",
    variant: "Dry Roasted & Salted",
    category: "Roasted Seeds",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-RPS-100",
    netWeight: "100 g",
    pricePlaceholder: "₹119",
    price: 119,
    mrp: 149,
    accent: "#E65100",
    accentTextDark: false,
    servingsPerPack: "Approx. 3.3 per pack",
    servingSizeGrams: 30,
    ingredients: "Pumpkin Seeds Dry Roasted & Iodised Salt",
    description:
      "Crunchy, flavourful and satisfying, Pureliva Roasted & Salted Pumpkin Seeds make wholesome snacking more enjoyable. Naturally providing plant-based protein, healthy fats, magnesium and zinc.",
    benefits: [
      "Exceptional plant protein content to power your active routine (29.8g per 100g)",
      "High in magnesium, iron, and essential trace minerals",
      "Slow dry roasted with a touch of iodised salt — zero added cooking oils",
      "Satisfying savoury crunch that curbs mid-day hunger cleanly",
    ],
    howToUse: [
      "Snack straight from the resealable zipper pack whenever hunger strikes",
      "Toss into tossed green salads, pasta, and roasted vegetables",
      "Garnish creamy soups, avocado toast, and morning hummus bowls",
      "Mix with dry roasted nuts and raisins for a homemade power trail mix",
    ],
    storage:
      "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "Plant Protein", value: "29.8g", detail: "Per 100g" },
      { label: "Rich in Iron", value: "7.8mg", detail: "Per 100g" },
      { label: "Energy", value: "593.9 kcal", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 593.9, unit: "kcal", rda: 29.7 },
      { label: "Protein", per100g: 29.8, unit: "g", rda: 55.2 },
      { label: "Carbohydrate", per100g: 21.7, unit: "g", rda: 16.7 },
      { label: "Dietary Fibre", per100g: 5.8, unit: "g", rda: 19.3 },
      { label: "Total Sugars", per100g: 1.4, unit: "g" },
      { label: "Added Sugars", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Total Fat", per100g: 43.1, unit: "g", rda: 64.3 },
      { label: "Saturated Fat", per100g: 7.5, unit: "g", rda: 34.1 },
      { label: "Trans Fat", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Sodium", per100g: 443, unit: "mg", rda: 22.2 },
      { label: "Potassium", per100g: 720, unit: "mg", rda: 20.6 },
      { label: "Calcium", per100g: 48.0, unit: "mg", rda: 4.8 },
      { label: "Iron", per100g: 7.8, unit: "mg", rda: 41.1 },
    ],
    images: {
      front: "/images/products/pumpkin-front.webp",
      back: "/images/products/pumpkin-back.webp",
      bowl: "/images/products/pumpkin-seeds-bowl",
      packFront: "/images/products/pumpkin-front.webp",
      packBack: "/images/products/pumpkin-back.webp",
    },
  },
  {
    id: "seed-mix",
    slug: "seed-mix",
    name: "Seed Mix",
    titleWithVariant: "Seed Mix – Dry Roasted & Salted (100g)",
    variant: "Dry Roasted & Salted",
    category: "Seed Mix",
    tagline: "Power Seed Blend (6-in-1)",
    type: "Roasted & Salted",
    sku: "PUR-MIX-100",
    netWeight: "100 g",
    pricePlaceholder: "₹129",
    price: 129,
    mrp: 159,
    accent: "#880E4F",
    accentTextDark: false,
    servingsPerPack: "About 4 per pack",
    servingSizeGrams: 25,
    ingredients:
      "Chia Seeds, Pumpkin Seeds, Sunflower Seeds, Flax Seeds, Sesame Seeds, Watermelon Seeds, Iodised Salt",
    description:
      "Pureliva’s Roasted & Salted Seed Mix brings together six carefully selected seeds—chia, pumpkin, sunflower, watermelon, flax and sesame—in one delicious blend for a multi-texture, multi-nutrient crunch.",
    benefits: [
      "Synergistic 6-in-1 blend delivering balanced plant protein, fibre, and healthy fats",
      "Variety of natural flavours, textures, and essential micronutrients in every handful",
      "Carefully dry roasted with a light savoury finish for wholesome daily snacking",
      "Zero added oils, zero artificial preservatives, zero refined sugar",
    ],
    howToUse: [
      "Enjoy a handful directly between meals for sustained energy",
      "Sprinkle on warm soups, poha, upma, or toasted bread with butter",
      "Add as a nutrient-packed topping to oatmeal, yoghurt, and salads",
      "Use as a wholesome mix-in for homemade granola or seed cookies",
    ],
    storage:
      "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "6 Super Seeds", value: "100%", detail: "All-in-one" },
      { label: "Plant Protein", value: "20.8g", detail: "Per 100g" },
      { label: "Dietary Fibre", value: "13.2g", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 578.7, unit: "kcal", rda: 28.9 },
      { label: "Protein", per100g: 20.8, unit: "g", rda: 38.5 },
      { label: "Carbohydrate", per100g: 24.2, unit: "g", rda: 18.6 },
      { label: "Dietary Fibre", per100g: 13.2, unit: "g", rda: 44.0 },
      { label: "Total Sugars", per100g: 2.0, unit: "g" },
      { label: "Added Sugars", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Total Fat", per100g: 44.3, unit: "g", rda: 66.1 },
      { label: "Saturated Fat", per100g: 5.8, unit: "g", rda: 26.4 },
      { label: "Trans Fat", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Sodium", per100g: 550, unit: "mg", rda: 27.5 },
    ],
    images: {
      front: "/images/products/seedmix-front.webp",
      back: "/images/products/seedmix-back.webp",
      bowl: "/images/products/seed-mix-bowl",
      packFront: "/images/products/seedmix-front.webp",
      packBack: "/images/products/seedmix-back.webp",
    },
  },
  {
    id: "sunflower-seeds",
    slug: "sunflower-seeds",
    name: "Sunflower Seeds",
    titleWithVariant: "Sunflower Seeds – Dry Roasted & Salted (100g)",
    variant: "Dry Roasted & Salted",
    category: "Roasted Seeds",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-SUN-100",
    netWeight: "100 g",
    pricePlaceholder: "₹99",
    price: 99,
    mrp: 125,
    accent: "#FBC02D",
    accentTextDark: true,
    servingsPerPack: "Approx. 3.3 per pack",
    servingSizeGrams: 30,
    ingredients: "Sunflower Seeds Dry Roasted & Iodised Salt",
    description:
      "Pureliva Roasted & Salted Sunflower Seeds bring together a delightful crunch and a savoury flavour. Naturally containing vitamin E, healthy fats and plant-based protein.",
    benefits: [
      "Natural source of antioxidant Vitamin E and essential minerals",
      "Rich in heart-friendly unsaturated fats and wholesome plant protein (20.8g per 100g)",
      "Golden dry roasted with light iodised salt seasoning for maximum crunch",
      "Perfect snack to satisfy savoury cravings naturally",
    ],
    howToUse: [
      "Eat straight from the pack for a crisp and tasty snack",
      "Sprinkle generously over breakfast cereals, muesli, or granola",
      "Fold into homemade bread dough, muffins, or savory baked foods",
      "Add on top of stir-fried veggies, fried rice, and fresh salads",
    ],
    storage:
      "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "Plant Protein", value: "20.8g", detail: "Per 100g" },
      { label: "Source of Vit E", value: "Natural", detail: "Antioxidant" },
      { label: "Energy", value: "613.7 kcal", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 613.7, unit: "kcal", rda: 30.7 },
      { label: "Protein", per100g: 20.8, unit: "g", rda: 38.5 },
      { label: "Carbohydrate", per100g: 26.2, unit: "g", rda: 20.2 },
      { label: "Dietary Fibre", per100g: 8.6, unit: "g", rda: 28.7 },
      { label: "Total Sugars", per100g: 2.6, unit: "g" },
      { label: "Added Sugars", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Total Fat", per100g: 47.3, unit: "g", rda: 70.6 },
      { label: "Saturated Fat", per100g: 5.2, unit: "g", rda: 23.6 },
      { label: "Trans Fat", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Sodium", per100g: 468, unit: "mg", rda: 23.4 },
      { label: "Potassium", per100g: 642, unit: "mg", rda: 18.3 },
      { label: "Calcium", per100g: 78.0, unit: "mg", rda: 7.8 },
      { label: "Iron", per100g: 5.3, unit: "mg", rda: 27.9 },
    ],
    images: {
      front: "/images/products/sunflower-front.webp",
      back: "/images/products/sunflower-back.webp",
      bowl: "/images/products/sunflower-seeds-bowl",
      packFront: "/images/products/sunflower-front.webp",
      packBack: "/images/products/sunflower-back.webp",
    },
  },
  {
    id: "flax-seeds",
    slug: "flax-seeds",
    name: "Flax Seeds",
    titleWithVariant: "Flax Seeds – Dry Roasted & Salted (100g)",
    variant: "Dry Roasted & Salted",
    category: "Roasted Seeds",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-FLX-100",
    netWeight: "100 g",
    pricePlaceholder: "₹89",
    price: 89,
    mrp: 110,
    accent: "#B5652A",
    accentTextDark: false,
    servingsPerPack: "About 3 per pack",
    servingSizeGrams: 30,
    ingredients: "Flax Seeds Dry Roasted & Iodised Salt",
    description:
      "Pureliva Roasted & Salted Flax Seeds offer a distinctive nutty flavour with a satisfying crunch. Naturally rich in dietary fibre and plant-based omega-3 fatty acids for your everyday wellness routine.",
    benefits: [
      "Extraordinary source of dietary fibre to support digestive balance (27.2g per 100g)",
      "High concentration of plant-based omega-3 fatty acids (ALA)",
      "Naturally packed with plant protein (18.1g per 100g) and natural lignans",
      "Dry roasted for an irresistible, pleasant nutty crunch — no raw chewiness",
    ],
    howToUse: [
      "Enjoy a spoonful after meals as a wholesome mouth freshener & digestive snack",
      "Mix into daily curd, raita, or traditional buttermilk",
      "Add to smoothies, overnight oats, or pancake batters",
      "Knead into whole wheat roti or paratha dough for extra fibre",
    ],
    storage:
      "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "Dietary Fibre", value: "27.2g", detail: "Per 100g" },
      { label: "Plant Protein", value: "18.1g", detail: "Per 100g" },
      { label: "Energy", value: "585.7 kcal", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 585.7, unit: "kcal", rda: 29.3 },
      { label: "Protein", per100g: 18.1, unit: "g", rda: 33.5 },
      { label: "Total Carbohydrate", per100g: 34.5, unit: "g", rda: 26.5 },
      { label: "Dietary Fibre", per100g: 27.2, unit: "g", rda: 90.7 },
      { label: "Total Sugars", per100g: 1.5, unit: "g" },
      { label: "Added Sugars", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Total Fat", per100g: 41.7, unit: "g", rda: 62.2 },
      { label: "Saturated Fat", per100g: 3.1, unit: "g", rda: 14.1 },
      { label: "Trans Fat", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Sodium", per100g: 492, unit: "mg", rda: 24.6 },
      { label: "Potassium", per100g: 785, unit: "mg", rda: 22.4 },
      { label: "Calcium", per100g: 232, unit: "mg", rda: 23.2 },
      { label: "Iron", per100g: 5.1, unit: "mg", rda: 26.8 },
    ],
    images: {
      front: "/images/products/flax-front.webp",
      back: "/images/products/flax-back.webp",
      bowl: "/images/products/flax-seeds-bowl",
      packFront: "/images/products/flax-front.webp",
      packBack: "/images/products/flax-back.webp",
    },
  },
];

// Extended portfolio items (Coming soon items to easily extend catalogue)
export const EXTENDED_PORTFOLIO: Partial<Product>[] = [
  {
    id: "raw-pumpkin-seeds",
    name: "Raw Pumpkin Seeds",
    variant: "Raw & Natural",
    category: "Raw Seeds",
    description: "Pureliva Raw Pumpkin Seeds offer a delicious nutty taste and a naturally satisfying crunch. A source of plant-based protein, healthy fats, magnesium and zinc.",
    isComingSoon: true,
  },
  {
    id: "raw-sunflower-seeds",
    name: "Raw Sunflower Seeds",
    variant: "Raw & Natural",
    category: "Raw Seeds",
    description: "Enjoy the mild, nutty flavour of Pureliva Raw Sunflower Seeds, a simple way to add goodness to your daily meals.",
    isComingSoon: true,
  },
  {
    id: "raw-watermelon-seeds",
    name: "Raw Watermelon Seeds",
    variant: "Raw & Natural",
    category: "Raw Seeds",
    description: "Pureliva Raw Watermelon Seeds bring a delicate nutty flavour with a satisfying crunch. Naturally containing plant-based protein and magnesium.",
    isComingSoon: true,
  },
  {
    id: "raw-sesame-seeds",
    name: "Raw Sesame Seeds",
    variant: "Raw & Natural",
    category: "Raw Seeds",
    description: "Small in size but rich in flavour, Pureliva Raw Sesame Seeds add a delightful nutty touch to everyday meals.",
    isComingSoon: true,
  },
  {
    id: "seed-mix-masala",
    name: "Seed Mix Masala Munch",
    variant: "Spiced Roasted",
    category: "Healthy Snacks",
    description: "Crafted from a nourishing blend of almonds, pumpkin seeds, black & green raisins, cranberries, and natural gum acacia in aromatic spices.",
    isComingSoon: true,
  },
  {
    id: "dates-nut-bites",
    name: "Dates Nut Bites",
    variant: "Wholesome Treat",
    category: "Healthy Snacks",
    description: "Made with naturally sweet dates, almonds, cashews, pistachios, honey, and pure ghee. No added refined sugar.",
    isComingSoon: true,
  },
  {
    id: "dates-delight",
    name: "Dates Delight",
    variant: "Natural Dessert",
    category: "Sweets",
    description: "Indulgent taste with zero refined sugar, artificial colours, or preservatives. Sweetness from premium dates and dry fruits.",
    isComingSoon: true,
  },
];
