import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import { PRODUCTS, Product } from "../data/products";
import { RECIPES } from "../data/newsEvents";
import ProductCard from "../components/ProductCard";
import Img from "../components/Img";
import WhatsAppButton from "../components/WhatsAppButton";
import { buildWhatsAppLink } from "../lib/whatsapp";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Leaf,
  CheckCircle,
  Package,
  Layers,
  Heart,
  Truck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award,
  Zap,
  Flame,
  ThumbsUp,
} from "lucide-react";

export const Home: React.FC = () => {
  // 1. Hero Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: "Farm-to-Table Purity",
      title: "Pure Nutrition in Every Spoon",
      subtitle:
        "Artisanal raw and dry-roasted seeds harvested with generational farming care in Khandwa, Madhya Pradesh. No added sugars, zero preservatives, 100% natural wellness.",
      ctaText: "Explore Collections",
      ctaLink: "/collections",
      waText: "Order on WhatsApp",
      image: "/images/products/seed-mix-bowl",
      accent: "#2E7D32",
    },
    {
      badge: "Healthy Everyday Crunch",
      title: "Gently Roasted to Perfection",
      subtitle:
        "Wholesome Pumpkin, Sunflower, and Flax seeds crafted for sustained energy and heart health. Packed with plant protein, essential omega-3, and dietary fibre.",
      ctaText: "Shop Roasted Seeds",
      ctaLink: "/collections/roasted-seeds",
      waText: "Chat on WhatsApp",
      image: "/images/products/pumpkin-seeds-bowl",
      accent: "#B5652A",
    },
    {
      badge: "B2B & Commercial Supply",
      title: "Bulk Agro Supply & Export Ready",
      subtitle:
        "Supplying top-grade Chia, Flax, Onion Flakes, and Garlic to commercial food processors, exporters, and retailers across India and worldwide.",
      ctaText: "Bulk Specifications",
      ctaLink: "/bulk-export",
      waText: "Bulk Enquiry",
      image: "/images/products/chia-seed-bowl",
      accent: "#1E2140",
    },
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 2. Best Seller Filter Tabs State
  const [activeTab, setActiveTab] = useState<"all" | "raw" | "roasted" | "mix">("all");

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "raw") return p.category.toLowerCase().includes("raw");
    if (activeTab === "roasted") return p.category.toLowerCase().includes("roasted");
    if (activeTab === "mix") return p.category.toLowerCase().includes("mix");
    return true;
  });

  // Selected Recipe Modal State
  const [selectedRecipe, setSelectedRecipe] = useState<(typeof RECIPES)[0] | null>(null);

  return (
    <>
      <Helmet>
        <title>Pureliva Foods | Pure Nutrition in Every Spoon</title>
        <meta
          name="description"
          content="Pureliva Foods by Patidar Enterprises, Khandwa. Premium roasted & raw natural seeds – Flax Seeds, Seed Mix, Chia Seeds, Sunflower Seeds, and Pumpkin Seeds. Order via WhatsApp."
        />
        <link rel="canonical" href="https://purelivafoods.com" />
      </Helmet>

      {/* SECTION 1 — HERO BANNER SLIDESHOW */}
      <section className="relative min-h-[580px] lg:min-h-[660px] pt-28 sm:pt-32 pb-16 bg-[#FAF7FC] overflow-hidden flex items-center">
        {/* Decorative background ambient glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-purple-200/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#680183]/10 text-[#680183] text-xs font-bold tracking-wider uppercase">
                  <Sparkles size={13} className="text-[#680183]" />
                  <span>{heroSlides[currentSlide].badge}</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A0022] tracking-tight leading-[1.12]">
                  {heroSlides[currentSlide].title}
                </h1>

                <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    to={heroSlides[currentSlide].ctaLink}
                    className="w-full sm:w-auto px-7 py-3.5 bg-[#680183] hover:bg-[#4F0164] text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{heroSlides[currentSlide].ctaText}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <WhatsAppButton
                    href={buildWhatsAppLink(
                      `Hello Pureliva, I am visiting your website and would like to order fresh seeds.`
                    )}
                    text={heroSlides[currentSlide].waText}
                    size="md"
                    className="w-full sm:w-auto shadow-sm"
                  />
                </div>
              </div>

              {/* Right Column: Featured Image with Floating Animation */}
              <div className="lg:col-span-5 flex items-center justify-center relative">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                  {/* Subtle ring */}
                  <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#2E7D32]/30 animate-spin-slow" />
                  
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                    <Img
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      transparent
                      priority
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination Controls */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-8 sm:mt-10">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  currentSlide === idx ? "w-8 bg-[#2E7D32]" : "w-2.5 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — SHOP BY CATEGORIES (4 Tiles Grid) */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              Curated Collections
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A0022]">
              Shop by Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Explore our wholesome range of nutrient-packed raw seeds, lightly roasted crunch, and power mixes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Raw Seeds */}
            <Link
              to="/collections/raw-seeds"
              className="group p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-[#680183] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Leaf size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-[#1A0022] group-hover:text-[#680183] transition-colors">
                  Raw Seeds
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2">
                  Unroasted Chia Seeds rich in dietary fibre, omega-3, and antioxidants for smoothies.
                </p>
              </div>
              <span className="mt-5 text-xs font-bold text-[#680183] group-hover:underline inline-flex items-center gap-1">
                <span>View Products</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 2. Roasted Seeds */}
            <Link
              to="/collections/roasted-seeds"
              className="group p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Flame size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-[#1A0022] group-hover:text-[#680183] transition-colors">
                  Roasted Seeds
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2">
                  Slow dry-roasted Pumpkin, Sunflower, and Flax seeds with savory natural crunch.
                </p>
              </div>
              <span className="mt-5 text-xs font-bold text-[#680183] group-hover:underline inline-flex items-center gap-1">
                <span>View Products</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 3. Seed Mix */}
            <Link
              to="/collections/seed-mix"
              className="group p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-[#1A0022] group-hover:text-[#680183] transition-colors">
                  5-in-1 Seed Mix
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2">
                  Balanced blend of 5 powerhouse seeds formulated for daily plant protein & stamina.
                </p>
              </div>
              <span className="mt-5 text-xs font-bold text-[#680183] group-hover:underline inline-flex items-center gap-1">
                <span>View Products</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 4. Healthy Snacks & Sweets (Coming Soon) */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/60 text-center flex flex-col items-center justify-between opacity-75">
              <div className="w-16 h-16 rounded-2xl bg-stone-200 text-stone-500 flex items-center justify-center mb-4">
                <Heart size={28} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-200 text-stone-600 px-2.5 py-0.5 rounded-full inline-block">
                  Coming Soon
                </span>
                <h3 className="font-heading text-lg font-bold text-stone-700">
                  Healthy Sweets & Snacks
                </h3>
                <p className="text-xs text-stone-400 line-clamp-2">
                  Naturally sweetened artisan bites made with pure seeds and jaggery, zero refined sugar.
                </p>
              </div>
              <span className="mt-5 text-xs font-semibold text-stone-400">
                In Development
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHY CHOOSE US (6 Icon Row) */}
      <section className="py-16 sm:py-20 bg-stone-50/70">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              The Pureliva Standard
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A0022]">
              Why Choose Pureliva?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Clean ethics, unadulterated farming purity, and science-backed nutrition in every spoonful.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: "No Added Refined Sugar",
                desc: "Zero white sugars, artificial sweeteners, or synthetic syrups. Kept 100% natural.",
              },
              {
                icon: ShieldCheck,
                title: "No Artificial Colours or Preservatives",
                desc: "Zero chemical preservatives or synthetic coloring agents. Pure, untouched seeds.",
              },
              {
                icon: Heart,
                title: "Rich in Protein & Fibre",
                desc: "Naturally high in vegan plant protein, vital dietary fibre, and heart-healthy omega fats.",
              },
              {
                icon: Layers,
                title: "Generational Farming Heritage",
                desc: "Rooted in Khandwa, Madhya Pradesh. We honor the soil from sprout to sealed pack.",
              },
              {
                icon: Package,
                title: "Resealable Moisture Zipper",
                desc: "High-barrier food-grade pouches that lock in crunch, freshness, and nutrients.",
              },
              {
                icon: CheckCircle,
                title: "Certified Food Safety & FSSAI",
                desc: "Hygienically optical sorted and packed in accredited clean-room processing lines.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#680183]/10 text-[#680183] flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#1A0022] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — BEST SELLER WITH FILTER TABS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
                Customer Favorites
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A0022] mt-1">
                Best Seller Products
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#FBF8FD] border border-purple-100 overflow-x-auto max-w-full">
              {[
                { id: "all", label: "All Seeds" },
                { id: "raw", label: "Raw Seeds" },
                { id: "roasted", label: "Roasted Seeds" },
                { id: "mix", label: "Seed Mix" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#680183] text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {/* Explore all link */}
          <div className="text-center mt-12">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#680183] hover:bg-[#4F0164] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md"
            >
              <span>View All 5 Seed Varieties</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — BRAND STORY BANNER (Split 2-Column) */}
      <section className="py-16 sm:py-20 bg-[#FBF8FD] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Image with Natural Aesthetic */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-white p-6 shadow-soft border border-purple-100 flex items-center justify-center">
                <Img
                  src="/images/products/chia-seed-bowl"
                  alt="Pureliva Natural Seeds Heritage"
                  transparent
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
                <span className="absolute bottom-4 left-4 right-4 bg-[#680183]/90 backdrop-blur-md text-white text-[11px] font-semibold py-2 px-4 rounded-xl text-center">
                  Patidar Enterprises • Khandwa, Madhya Pradesh
                </span>
              </div>
            </div>

            {/* Right Column: Founder Story */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
                Our Roots & Heritage
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A0022] leading-tight">
                Rooted in Farming. Built on Trust.
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Pureliva is an agro-wellness brand by <strong>Patidar Enterprises</strong>, located in the fertile agricultural heartland of Khandwa, Madhya Pradesh. Our founders were raised in farming families, learning the true value of soil, crop cycles, and honest harvest long before wellness became an industry.
              </p>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                We work directly with certified farming communities and modern optical sorting facilities. No chemical middlemen, no bleached batches, and zero shortcuts.
              </p>

              {/* Quote Block */}
              <div className="p-5 rounded-2xl bg-white border-l-4 border-[#680183] shadow-sm">
                <blockquote className="font-heading text-base sm:text-lg italic text-[#1A0022]">
                  "When the soil is your teacher, purity is your only promise."
                </blockquote>
                <span className="block mt-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  — Patidar Enterprises, Khandwa (M.P.)
                </span>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[#680183] font-bold text-sm hover:underline"
                >
                  <span>Read our full story & mission</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TEXT MARQUEE TICKER */}
      <div className="py-4 bg-[#680183] text-white overflow-hidden whitespace-nowrap border-y border-purple-900/30">
        <div className="inline-flex items-center gap-8 animate-marquee text-xs font-bold tracking-widest uppercase">
          {[
            "100% FARM DIRECT",
            "•",
            "FSSAI ACCREDITED",
            "•",
            "AIRTIGHT RESEALABLE ZIPPER",
            "•",
            "ZERO ADDED WHITE SUGAR",
            "•",
            "NO ARTIFICIAL PRESERVATIVES",
            "•",
            "RICH IN OMEGA-3 & VEGAN PROTEIN",
            "•",
            "PROUDLY MADE IN INDIA",
            "•",
            "OPTICAL SORTED PURITY",
            "•",
          ].map((item, i) => (
            <span key={i} className={item === "•" ? "text-amber-300" : ""}>
              {item}
            </span>
          ))}
          {[
            "100% FARM DIRECT",
            "•",
            "FSSAI ACCREDITED",
            "•",
            "AIRTIGHT RESEALABLE ZIPPER",
            "•",
            "ZERO ADDED WHITE SUGAR",
            "•",
            "NO ARTIFICIAL PRESERVATIVES",
            "•",
            "RICH IN OMEGA-3 & VEGAN PROTEIN",
            "•",
            "PROUDLY MADE IN INDIA",
            "•",
            "OPTICAL SORTED PURITY",
            "•",
          ].map((item, i) => (
            <span key={`dup-${i}`} className={item === "•" ? "text-amber-300" : ""}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 7 — OUR DEVOTION / OUR PROMISE (4 Feature Cards) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              Our Devotion
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A0022]">
              Our Promise in Every Spoon
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Four unshakable commitments that guide every harvest, sorting pass, and pack we ship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "100% Honest Purity",
                desc: "Never adulterated, never blended with fillers. Exactly what nature produced.",
              },
              {
                icon: Zap,
                title: "Precision Optical Sorting",
                desc: "Triple-cleansed using modern optical sorting to remove foreign matter.",
              },
              {
                icon: Truck,
                title: "Direct From Cultivators",
                desc: "Ethically procured with fair compensation to generational farming families.",
              },
              {
                icon: Package,
                title: "Freshness-Lock Pouches",
                desc: "Sealed with airtight resealable zippers to keep the natural crunch intact.",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FBF8FD] border border-purple-100 text-center flex flex-col items-center justify-between"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#680183] text-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#1A0022] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8 — KEY FEATURES BADGES STRIP */}
      <section className="py-10 bg-purple-50/40 border-y border-purple-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { label: "FSSAI Accredited", sub: "Govt Certified" },
              { label: "100% Vegetarian", sub: "Pure Plant-Based" },
              { label: "Zero Trans Fat", sub: "Cholesterol Free" },
              { label: "High Dietary Fibre", sub: "Gut Friendly" },
              { label: "Resealable Pouch", sub: "Freshness Sealed" },
              { label: "Proudly Indian", sub: "Khandwa, M.P." },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-xs flex flex-col items-center justify-center"
              >
                <CheckCircle size={18} className="text-[#680183] mb-1.5" />
                <span className="text-xs font-bold text-[#1A0022] leading-tight block">
                  {badge.label}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  {badge.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — BULK & EXPORT ORDER BANNER */}
      <section className="py-16 sm:py-20 bg-[#4F0164] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                B2B & Commercial Agro Supply
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Bulk Agro Supply & Export Ready
              </h2>
              <p className="text-sm sm:text-base text-purple-100 max-w-2xl leading-relaxed">
                Also supplying bulk quantities of Chia Seeds, Flax Seeds, Dehydrated Onion Flakes, Garlic Powder, and Dry Garlic to domestic manufacturers, wholesale distributors, and global importers.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:items-end gap-3.5">
              <Link
                to="/bulk-export"
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#4F0164] hover:bg-stone-100 rounded-xl font-bold text-xs uppercase tracking-wider text-center shadow-md transition-all"
              >
                View Bulk Specifications
              </Link>

              <WhatsAppButton
                href={buildWhatsAppLink("Hello Pureliva, I want to enquire about commercial bulk / export supply.")}
                text="Bulk Enquiry on WhatsApp"
                size="md"
                className="w-full sm:w-auto shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — BLOG / PRODUCT RECIPES SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
                Culinary Inspiration
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A0022] mt-1">
                Delicious Ways to Enjoy Every Spoon
              </h2>
            </div>
            <Link
              to="/recipes"
              className="text-xs font-bold text-[#680183] hover:underline inline-flex items-center gap-1"
            >
              <span>View All Recipes</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECIPES.slice(0, 3).map((recipe) => (
              <div
                key={recipe.id}
                className="group rounded-2xl bg-[#FBF8FD] border border-purple-100 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#680183]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {recipe.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock size={11} />
                      <span>{recipe.prepTime}</span>
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-heading text-lg font-bold text-[#1A0022] group-hover:text-[#680183] transition-colors line-clamp-1">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {recipe.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full py-2.5 rounded-xl bg-white border border-purple-200 text-[#680183] hover:bg-[#680183] hover:text-white hover:border-[#680183] text-xs font-bold transition-all"
                  >
                    Read Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 — CERTIFICATIONS & ACCREDITATIONS STRIP */}
      <section className="py-12 bg-purple-50/30 border-t border-purple-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#680183]">
              Accreditations & Compliance
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#1A0022]">
              Certified for Safe Food Processing
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-white border border-purple-100 text-center shadow-xs">
              <span className="font-heading font-black text-xl text-[#680183] block">FSSAI</span>
              <span className="text-[10px] text-stone-500 font-semibold">Reg. 21424170000414</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-purple-100 text-center shadow-xs">
              <span className="font-heading font-black text-xl text-[#4F0164] block">ISO 22000</span>
              <span className="text-[10px] text-stone-500 font-semibold">Food Safety Standard</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-purple-100 text-center shadow-xs">
              <span className="font-heading font-black text-xl text-[#680183] block">GMP</span>
              <span className="text-[10px] text-stone-500 font-semibold">Good Manufacturing</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-purple-100 text-center shadow-xs">
              <span className="font-heading font-black text-xl text-[#4F0164] block">HACCP</span>
              <span className="text-[10px] text-stone-500 font-semibold">Hazard Control Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12 — CORE VALUES STRIP (P U R E L I V A) */}
      <section className="py-16 bg-[#680183] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Our Principles
            </span>
            <h2 className="font-heading text-3xl font-bold text-white">
              What We Stand For, From P to A
            </h2>
            <p className="text-xs sm:text-sm text-purple-200">
              Eight foundational principles spelled out through our name.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            {[
              { l: "P", t: "Purity", s: "& Integrity" },
              { l: "U", t: "Quality", s: "Uncompromising" },
              { l: "R", t: "Respect", s: "& Responsibility" },
              { l: "E", t: "Excellence", s: "& Innovation" },
              { l: "L", t: "Love", s: "For Nature" },
              { l: "I", t: "Inspiration", s: "Customer First" },
              { l: "V", t: "Value", s: "Creation" },
              { l: "A", t: "Authenticity", s: "& Accountability" },
            ].map((v) => (
              <div
                key={v.l}
                className="p-3 sm:p-4 rounded-xl bg-white/10 border border-white/15 flex flex-col items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="font-heading font-black text-2xl sm:text-3xl text-amber-300 mb-1">
                  {v.l}
                </span>
                <span className="text-xs font-bold text-white block leading-tight">
                  {v.t}
                </span>
                <span className="text-[10px] text-purple-200 block mt-0.5">
                  {v.s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECIPE DETAIL MODAL */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#680183]">
                {selectedRecipe.category} • {selectedRecipe.prepTime}
              </span>
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-44 object-cover rounded-2xl"
              />

              <h3 className="font-heading text-xl font-bold text-[#1A0022]">
                {selectedRecipe.title}
              </h3>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Ingredients:
                </h4>
                <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Preparation Steps:
                </h4>
                <ol className="text-xs text-stone-600 space-y-1.5 list-decimal list-inside">
                  {selectedRecipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="pt-2">
                <WhatsAppButton
                  href={buildWhatsAppLink(`Hello Pureliva, I loved the recipe '${selectedRecipe.title}' and want to order the seeds used in it.`)}
                  text="Order Seeds on WhatsApp"
                  size="sm"
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
