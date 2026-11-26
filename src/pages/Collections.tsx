import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORIES, EXTENDED_PORTFOLIO, Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { Search, Filter, ArrowUpDown, Sparkles, Clock, Leaf, ShieldCheck } from "lucide-react";

export const Collections: React.FC = () => {
  const { category: paramCategory } = useParams<{ category?: string }>();

  // Map route param to category name
  const initialCategory = useMemo(() => {
    if (!paramCategory || paramCategory === "all") return "All";
    const found = CATEGORIES.find((c) => c.slug === paramCategory);
    return found ? found.name : "All";
  }, [paramCategory]);

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Filter products by category & search
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (activeCategory !== "All" && activeCategory !== "All Products") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.variant.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <>
      <Helmet>
        <title>All Products & Collections | Pureliva Foods</title>
        <meta
          name="description"
          content="Explore Pureliva's complete range of wholesome natural seeds — Chia, Pumpkin, Sunflower, Flax and 6-in-1 Seed Mix. 100% natural with no artificial additives."
        />
        <link rel="canonical" href="https://purelivafoods.com/collections" />
      </Helmet>

      <div className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            badge="Our Collections"
            title="Wholesome Natural Seeds"
            subtitle="Explore our premium 100g resealable zipper packs. Grown with agricultural care, cleaned without chemicals, and packed for everyday vitality."
            align="center"
          />

          {/* Controls Bar: Category Tabs, Search & Sort */}
          <div className="mt-10 mb-8 space-y-4">
            {/* Category Pills */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected =
                  (cat.slug === "all" && (activeCategory === "All" || activeCategory === "All Products")) ||
                  activeCategory === cat.name;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (cat.available) {
                        setActiveCategory(cat.slug === "all" ? "All" : cat.name);
                      }
                    }}
                    className={`relative whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                      !cat.available
                        ? "opacity-50 cursor-not-allowed bg-stone-100 text-stone-400"
                        : isSelected
                        ? "text-white shadow-soft bg-pureliva-green"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.badge && (
                      <span className="text-[9px] bg-stone-200 text-stone-600 px-1.5 py-0.2 rounded-full uppercase font-bold">
                        {cat.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-pureliva-green bg-stone-50/50"
                />
              </div>

              {/* Product Counter and Sort */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
                <span className="text-xs text-stone-500 font-medium">
                  Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items
                </span>

                <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-2xl px-3 py-1.5">
                  <ArrowUpDown size={13} className="text-stone-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-stone-700 focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="name-asc">Sort: Name (A to Z)</option>
                    <option value="price-asc">Sort: Price (Low to High)</option>
                    <option value="price-desc">Sort: Price (High to Low)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid: 4 columns laptop, 2 columns mobile */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="font-heading text-xl font-bold text-stone-800">
                No products found
              </p>
              <p className="text-xs text-stone-500">
                Try resetting your search query or switching categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-3 px-5 py-2 rounded-full bg-pureliva-green text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Coming Soon Showcase Shelf (Healthy Snacks & Sweets) */}
          <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-pureliva-cream border border-stone-200">
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-[10px] font-bold uppercase tracking-wider">
                <Clock size={12} /> Expanding Soon
              </span>
              <h3 className="font-heading text-2xl font-bold text-stone-900">
                Upcoming Naturally Sweet Treats & Healthy Snacks
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Made without added refined sugar, artificial colours or preservatives — naturally sweetened with dates, dry fruits and pure honey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXTENDED_PORTFOLIO.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200/80 space-y-2 opacity-85"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    <span>{item.category}</span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-stone-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
