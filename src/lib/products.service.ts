import { Product, PRODUCTS } from "../data/products";
import { api } from "./api";

let cachedProducts: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache

export interface BackendProduct extends Product {
  price?: number;
  mrp?: number;
  stock?: number;
  isActive?: boolean;
}

/**
 * Merges backend product data (price, stock, isActive) with static local product metadata
 * while falling back gracefully to static products if backend is offline.
 */
function mergeProductData(backendItem: any, fallbackItem: Product): Product & { price?: number; mrp?: number; stock?: number } {
  return {
    ...fallbackItem,
    ...backendItem,
    // Preserve static assets if backend doesn't supply them
    images: {
      bowl: backendItem.images?.bowl || fallbackItem.images.bowl,
      packFront: backendItem.images?.packFront || fallbackItem.images.packFront,
      packBack: backendItem.images?.packBack || fallbackItem.images.packBack,
    },
    price: backendItem.price !== undefined ? backendItem.price : 99,
    mrp: backendItem.mrp !== undefined ? backendItem.mrp : 120,
    stock: backendItem.stock !== undefined ? backendItem.stock : 100,
  };
}

export async function fetchProducts(): Promise<Array<Product & { price?: number; mrp?: number; stock?: number }>> {
  const now = Date.now();
  if (cachedProducts && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedProducts as any;
  }

  try {
    // 3-second timeout for quick fallback
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const data = await api.get<any[]>("/products", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (Array.isArray(data) && data.length > 0) {
      const merged = data.map((apiItem) => {
        const local = PRODUCTS.find((p) => p.slug === apiItem.slug) || PRODUCTS[0];
        return mergeProductData(apiItem, local);
      });
      cachedProducts = merged;
      lastFetchTime = now;
      return merged;
    }
  } catch (error) {
    // API is offline or slow -> fallback silently to static data
    console.warn("Using offline static product catalog fallback:", error);
  }

  // Fallback to static PRODUCTS
  return PRODUCTS.map((p) => ({
    ...p,
    price: 99,
    mrp: 120,
    stock: 100,
  }));
}

export async function fetchProductBySlug(slug: string): Promise<(Product & { price?: number; mrp?: number; stock?: number }) | null> {
  const all = await fetchProducts();
  const found = all.find((p) => p.slug === slug);
  if (found) return found;

  // Fallback to static PRODUCTS
  return PRODUCTS.find((p) => p.slug === slug) || null;
}
