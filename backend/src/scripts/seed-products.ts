import { connectDB, disconnectDB } from "../config/db.js";
import { Product } from "../models/Product.js";
import { logger } from "../utils/logger.js";

const INITIAL_PRODUCTS = [
  {
    id: "chia-seeds",
    slug: "chia-seeds",
    name: "Chia Seeds",
    titleWithVariant: "Chia Seeds – Raw & Natural (100g)",
    tagline: "Superfood for Everyday",
    type: "Raw",
    sku: "PUR-CHI-100",
    netWeight: "100 g",
    accent: "#8E24AA",
    accentTextDark: false,
    servingsPerPack: "About 4 per pack",
    servingSizeGrams: 25,
    ingredients: "Raw Chia Seeds",
    description:
      "Tiny seeds packed with pure goodness, Pureliva Raw Chia Seeds are a versatile addition to your everyday diet. Naturally rich in dietary fibre, plant protein, and omega-3 fatty acids.",
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
      bowl: "/images/products/chia-seed-bowl",
      packFront: "/images/products/chia-front.webp",
      packBack: "/images/products/chia-back.webp",
    },
    price: 99,
    mrp: 120,
    stock: 250,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "pumpkin-seeds",
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    titleWithVariant: "Pumpkin Seeds – Dry Roasted & Salted (100g)",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-RPS-100",
    netWeight: "100 g",
    accent: "#E65100",
    accentTextDark: false,
    servingsPerPack: "Approx. 3.3 per pack",
    servingSizeGrams: 30,
    ingredients: "Pumpkin Seeds Dry Roasted & Iodised Salt",
    description:
      "Crunchy, flavourful and satisfying, Pureliva Roasted & Salted Pumpkin Seeds make wholesome snacking more enjoyable. Naturally providing plant-based protein, healthy fats, magnesium and zinc.",
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
      bowl: "/images/products/pumpkin-seeds-bowl",
      packFront: "/images/products/pumpkin-front.webp",
      packBack: "/images/products/pumpkin-back.webp",
    },
    price: 119,
    mrp: 149,
    stock: 250,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "seed-mix",
    slug: "seed-mix",
    name: "Seed Mix",
    titleWithVariant: "Seed Mix – Dry Roasted & Salted (100g)",
    tagline: "Power Seed Blend (6-in-1)",
    type: "Roasted & Salted",
    sku: "PUR-MIX-100",
    netWeight: "100 g",
    accent: "#880E4F",
    accentTextDark: false,
    servingsPerPack: "About 4 per pack",
    servingSizeGrams: 25,
    ingredients:
      "Chia Seeds, Pumpkin Seeds, Sunflower Seeds, Flax Seeds, Sesame Seeds, Watermelon Seeds, Iodised Salt",
    description:
      "Pureliva’s Roasted & Salted Seed Mix brings together six carefully selected seeds—chia, pumpkin, sunflower, watermelon, flax and sesame—in one delicious blend for a multi-texture, multi-nutrient crunch.",
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
      bowl: "/images/products/seed-mix-bowl",
      packFront: "/images/products/seedmix-front.webp",
      packBack: "/images/products/seedmix-back.webp",
    },
    price: 129,
    mrp: 159,
    stock: 250,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "sunflower-seeds",
    slug: "sunflower-seeds",
    name: "Sunflower Seeds",
    titleWithVariant: "Sunflower Seeds – Dry Roasted & Salted (100g)",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-SUN-100",
    netWeight: "100 g",
    accent: "#FBC02D",
    accentTextDark: true,
    servingsPerPack: "Approx. 3.3 per pack",
    servingSizeGrams: 30,
    ingredients: "Sunflower Seeds Dry Roasted & Iodised Salt",
    description:
      "Pureliva Roasted & Salted Sunflower Seeds bring together a delightful crunch and a savoury flavour. Naturally containing vitamin E, healthy fats and plant-based protein.",
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
      bowl: "/images/products/sunflower-seeds-bowl",
      packFront: "/images/products/sunflower-front.webp",
      packBack: "/images/products/sunflower-back.webp",
    },
    price: 99,
    mrp: 125,
    stock: 250,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "flax-seeds",
    slug: "flax-seeds",
    name: "Flax Seeds",
    titleWithVariant: "Flax Seeds – Dry Roasted & Salted (100g)",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-FLX-100",
    netWeight: "100 g",
    accent: "#B5652A",
    accentTextDark: false,
    servingsPerPack: "About 3 per pack",
    servingSizeGrams: 30,
    ingredients: "Flax Seeds Dry Roasted & Iodised Salt",
    description:
      "Pureliva Roasted & Salted Flax Seeds offer a distinctive nutty flavour with a satisfying crunch. Naturally rich in dietary fibre and plant-based omega-3 fatty acids for your everyday wellness routine.",
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
      bowl: "/images/products/flax-seeds-bowl",
      packFront: "/images/products/flax-front.webp",
      packBack: "/images/products/flax-back.webp",
    },
    price: 89,
    mrp: 110,
    stock: 250,
    isActive: true,
    sortOrder: 5,
  },
];

export async function seedProducts() {
  try {
    await connectDB();
    logger.info("Connected to MongoDB for product seeding...");

    for (const p of INITIAL_PRODUCTS) {
      await Product.findOneAndUpdate({ slug: p.slug }, p, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
      logger.info(`Seeded product: ${p.name} (${p.slug})`);
    }

    logger.info("Products seeded successfully!");
  } catch (error) {
    logger.error("Failed to seed products:", error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

if (process.argv[1]?.includes("seed-products")) {
  seedProducts();
}
