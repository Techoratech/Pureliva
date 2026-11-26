import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORIES, EXTENDED_PORTFOLIO, Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  Clock,
  Leaf,
  ShieldCheck,
  ChevronRight,
  LayoutGrid,
  Grid,
  Check,
  X,
  SlidersHorizontal,
} from "lucide-react";

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
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("all");

  // Recently viewed products from localStorage
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pureliva_recently_viewed");
      if (stored) {
        const slugs: string[] = JSON.parse(stored);
        const prods = slugs
          .map((s) => PRODUCTS.find((p) => p.slug === s))
          .filter(Boolean) as Product[];
        setRecentlyViewed(prods.slice(0, 4));
      } else {
        // Fallback to top 3 products
        setRecentlyViewed(PRODUCTS.slice(0, 3));
      }
    } catch {
      setRecentlyViewed(PRODUCTS.slice(0, 3));
    }
  }, []);

  // Filter products by category, search, stock, and size
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (activeCategory !== "All" && activeCategory !== "All Products") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Size filter
    if (selectedSize !== "all") {
      list = list.filter((p) => p.netWeight === selectedSize);
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
  }, [activeCategory, searchQuery, sortBy, selectedSize]);

  return (
    <>
      <Helmet>
        <title>All Products & Collections | Pureliva Foods</title>
        <meta
          name="description"
          content="Explore Pureliva's complete range of wholesome natural seeds — Chia, Pumpkin, Sunflower, Flax and 5-in-1 Seed Mix. 100% natural with no artificial additives."
        />
        <link rel="canonical" href="https://purelivafoods.com/collections" />
      </Helmet>

      <div className="pt-28 sm:pt-32 pb-24 min-h-screen bg-white">
        {/* Breadcrumb Bar */}
        <div className="bg-[#FAF7FC] py-3 border-b border-purple-100 mb-8">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <Link to="/" className="hover:text-[#680183] transition-colors">
                Home
              </Link>
              <ChevronRight size={13} className="text-stone-400" />
              <Link to="/collections" className="hover:text-[#680183] transition-colors">
                Collections
              </Link>
              {activeCategory !== "All" && (
                <>
                  <ChevronRight size={13} className="text-stone-400" />
                  <span className="text-[#680183] font-bold">{activeCategory}</span>
                </>
              )}
            </nav>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Collection Header Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#680183] to-[#4F0164] p-8 sm:p-10 text-white mb-10 shadow-soft relative overflow-hidden">
            <div className="max-w-2xl space-y-2 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                100% Natural Farm Direct
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                {activeCategory === "All" ? "All Natural Seeds" : activeCategory}
              </h1>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                Wholesome raw and slow dry-roasted seeds in convenient 100g resealable pouches. Zero added white sugar, zero chemical preservatives, high in plant protein and dietary fibre.
              </p>
            </div>
          </div>

          {/* Main Layout: Left Filter Sidebar (300px) + Right Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Left Sidebar (300px) */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-3xl border border-stone-200 sticky top-36">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="font-heading font-bold text-base text-[#1A0022] flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-[#680183]" />
                  <span>Filters</span>
                </span>
                {(activeCategory !== "All" || selectedSize !== "all" || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("All");
                      setSelectedSize("all");
                      setSearchQuery("");
                    }}
                    className="text-[11px] font-bold text-[#680183] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Category
                </h4>
                <div className="space-y-1.5">
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
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                          !cat.available
                            ? "opacity-50 cursor-not-allowed text-stone-400"
                            : isSelected
                            ? "bg-[#680183] text-white font-bold"
                            : "text-stone-700 hover:bg-purple-50"
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.available ? (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            {cat.slug === "all"
                              ? PRODUCTS.length
                              : PRODUCTS.filter((p) => p.category === cat.name).length}
                          </span>
                        ) : (
                          <span className="text-[9px] bg-stone-100 text-stone-400 px-1.5 py-0.5 rounded">
                            Soon
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Availability
                </h4>
                <label className="flex items-center gap-2.5 text-xs text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#2E7D32] focus:ring-[#2E7D32]"
                  />
                  <span>In Stock ({PRODUCTS.length})</span>
                </label>
              </div>

              {/* Size / Weight Filter */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Pack Size
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["all", "100 g"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedSize === sz
                          ? "bg-[#1E2140] text-white border-[#1E2140]"
                          : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {sz === "all" ? "All Sizes" : sz}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Column: Toolbar & Product Grid */}
            <main className="lg:col-span-9 space-y-6">
              {/* Toolbar: Search, Sort, Grid Switcher */}
              <div className="p-4 rounded-2xl bg-[#FAF7FC] border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search seeds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#680183] bg-white"
                  />
                </div>

                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
                  {/* Mobile Filter Toggle */}
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold flex items-center gap-1.5 text-stone-700"
                  >
                    <Filter size={14} />
                    <span>Filter</span>
                  </button>

                  <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                    Showing <strong>{filteredProducts.length}</strong> items
                  </span>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-3 py-2">
                    <ArrowUpDown size={13} className="text-stone-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-stone-700 focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Best selling</option>
                      <option value="name-asc">Alphabetically, A-Z</option>
                      <option value="price-asc">Price, low to high</option>
                      <option value="price-desc">Price, high to low</option>
                    </select>
                  </div>

                  {/* Grid Column Switcher (Desktop) */}
                  <div className="hidden sm:flex items-center gap-1 border-l border-stone-200 pl-3">
                    <button
                      type="button"
                      onClick={() => setGridCols(2)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        gridCols === 2 ? "bg-[#680183] text-white" : "text-stone-400 hover:text-stone-700"
                      }`}
                      title="2 Columns"
                    >
                      <Grid size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setGridCols(3)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        gridCols === 3 ? "bg-[#680183] text-white" : "text-stone-400 hover:text-stone-700"
                      }`}
                      title="3 Columns"
                    >
                      <LayoutGrid size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center space-y-3 bg-stone-50 rounded-3xl border border-stone-200">
                  <p className="font-heading text-xl font-bold text-stone-800">
                    No products found
                  </p>
                  <p className="text-xs text-stone-500">
                    Try adjusting your search terms or filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                      setSelectedSize("all");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#680183] text-white text-xs font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-3 sm:gap-6 ${
                    gridCols === 2
                      ? "grid-cols-2 sm:grid-cols-2"
                      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              )}

              {/* Recently Viewed Shelf (matching gomoswafoods) */}
              {recentlyViewed.length > 0 && (
                <div className="mt-16 pt-12 border-t border-purple-100">
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#680183]">
                      Your Browsing History
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[#1A0022] mt-1">
                      Recently Viewed
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {recentlyViewed.map((prod) => (
                      <ProductCard key={`recent-${prod.slug}`} product={prod} />
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide-out Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm lg:hidden flex justify-end"
            onClick={() => setMobileFilterOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-80 max-w-full bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <h3 className="font-heading font-bold text-lg text-[#1E2140]">
                    Filter Products
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-900"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Category
                  </h4>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={`m-${cat.id}`}
                        type="button"
                        onClick={() => {
                          if (cat.available) {
                            setActiveCategory(cat.slug === "all" ? "All" : cat.name);
                            setMobileFilterOpen(false);
                          }
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                          activeCategory === cat.name || (cat.slug === "all" && activeCategory === "All")
                            ? "bg-[#2E7D32] text-white"
                            : "text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-2 pt-4 border-t border-stone-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Size
                  </h4>
                  <div className="flex gap-2">
                    {["all", "100 g"].map((sz) => (
                      <button
                        key={`m-sz-${sz}`}
                        type="button"
                        onClick={() => {
                          setSelectedSize(sz);
                          setMobileFilterOpen(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          selectedSize === sz
                            ? "bg-[#1E2140] text-white border-[#1E2140]"
                            : "bg-white text-stone-700 border-stone-200"
                        }`}
                      >
                        {sz === "all" ? "All Sizes" : sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#2E7D32] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Collections;
