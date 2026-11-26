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
  X,
  Star,
  ChevronDown,
} from "lucide-react";

export const Home: React.FC = () => {
  // 1. Hero Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const heroSlides = [
    {
      badge: "100% Farm Direct • Khandwa, M.P.",
      title: "Pure Nutrition in Every Spoon",
      highlight: "Every Spoon",
      subtitle:
        "Artisanal raw and dry-roasted seeds harvested with generational farming care in Khandwa, Madhya Pradesh. Zero added sugar, no chemical preservatives, 100% natural wellness.",
      ctaText: "Explore Collections",
      ctaLink: "/collections",
      waText: "Order on WhatsApp",
      packImage: "/images/products/seedmix-front.webp",
      bowlImage: "/images/products/seed-mix-bowl.webp",
      tag1: "🌿 100% Farm Purity",
      tag2: "💪 High Vegan Protein",
      tag3: "🛡️ FSSAI Reg. 21424170000414",
      label: "5-in-1 Seed Mix",
    },
    {
      badge: "Slow Dry-Roasted • Heart Vitality",
      title: "Wholesome Crunch, Zero Guilt",
      highlight: "Zero Guilt",
      subtitle:
        "Slow dry-roasted Pumpkin, Sunflower, and Flax seeds crafted for sustained energy and heart health. Naturally packed with essential plant protein, dietary fibre, and omega-3.",
      ctaText: "Shop Roasted Seeds",
      ctaLink: "/collections/roasted-seeds",
      waText: "Chat on WhatsApp",
      packImage: "/images/products/pumpkin-front.webp",
      bowlImage: "/images/products/pumpkin-seeds-bowl.webp",
      tag1: "✨ Crispy & Savory",
      tag2: "❤️ Omega-3 & Zinc",
      tag3: "🔒 Resealable Zipper",
      label: "Roasted Pumpkin & Flax",
    },
    {
      badge: "B2B Commercial Agro Supply & Export",
      title: "Bulk Agro Supply & Export Ready",
      highlight: "Export Ready",
      subtitle:
        "Supplying metric tons of premium Chia, Flax, Dehydrated Onion Flakes, and Dry Garlic to commercial food processors, exporters, and retailers across India and worldwide.",
      ctaText: "Bulk Specifications",
      ctaLink: "/bulk-export",
      waText: "Bulk Enquiry",
      packImage: "/images/products/chia-front.webp",
      bowlImage: "/images/products/chia-seed-bowl.webp",
      tag1: "⚡ Triple Optical Sorted",
      tag2: "🌍 Global Export Ready",
      tag3: "🏭 Direct Factory Rates",
      label: "Bulk Agro & Export",
    },
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

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

  const activeHero = heroSlides[currentSlide];

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

      {/* SECTION 1 — HERO BANNER SLIDESHOW (WARM LUXURY GOURMET CANVAS) */}
      <section className="relative min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] pt-28 sm:pt-36 pb-12 sm:pb-16 bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EC] to-[#F1EBE1] text-[#1A0022] overflow-hidden flex items-center border-b border-stone-200/80">
        {/* Ambient atmospheric organic glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-amber-200/25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

        {/* Desktop Prev / Next Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center bg-white/90 hover:bg-white text-stone-800 border border-stone-200 shadow-md transition-all z-20 hover:scale-105"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center bg-white/90 hover:bg-white text-stone-800 border border-stone-200 shadow-md transition-all z-20 hover:scale-105"
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Headlines, Trust & CTAs */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#680183] border border-purple-200/80 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  <Sparkles size={14} className="text-[#680183]" />
                  <span>{activeHero.badge}</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-[#1A0022]">
                  {activeHero.title.replace(activeHero.highlight, "")}
                  <span className="text-[#680183] italic block sm:inline"> {activeHero.highlight}</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-base lg:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  {activeHero.subtitle}
                </p>

                {/* Buttons Row */}
                <div className="pt-2 flex flex-row items-center justify-center lg:justify-start gap-3 max-w-md mx-auto lg:mx-0">
                  <Link
                    to={activeHero.ctaLink}
                    className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 sm:py-4 bg-[#680183] hover:bg-[#4F0164] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>{activeHero.ctaText}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <WhatsAppButton
                    href={buildWhatsAppLink(
                      `Hello Pureliva, I am visiting your website and would like to order fresh seeds.`
                    )}
                    text={activeHero.waText}
                    size="md"
                    className="flex-1 sm:flex-initial shadow-md text-xs sm:text-sm py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold"
                  />
                </div>

                {/* 3 Trust Points Strip below CTAs */}
                <div className="pt-3 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs text-stone-600 font-medium flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#680183] shrink-0" />
                    <span>Resealable Freshness Zipper</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#680183] shrink-0" />
                    <span>Zero Added Refined Sugar</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#680183] shrink-0" />
                    <span>Fast Delivery Pan India</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Pack Pouch + Bowl Studio Composition (Grounded, High Contrast on Gourmet Canvas) */}
              <div className="lg:col-span-5 flex items-center justify-center relative">
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-[4/3.5] flex items-center justify-center">
                  {/* Subtle warm studio backlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/25 via-purple-300/20 to-transparent blur-3xl pointer-events-none" />

                  {/* Grounding Base Shadow */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-stone-900/20 rounded-full blur-xl pointer-events-none" />

                  {/* Main Product Pack (Standing Pouch) - Solid Grounded */}
                  <div className="relative z-10 w-44 sm:w-56 h-56 sm:h-72 -mr-6 sm:-mr-8 flex items-center justify-center filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.18)]">
                    <img
                      src={activeHero.packImage}
                      alt={activeHero.title}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>

                  {/* Seed Bowl (Resting in front right) - Solid Grounded */}
                  <div className="relative z-20 w-36 sm:w-48 h-36 sm:h-48 -ml-6 sm:-ml-8 mt-12 sm:mt-16 flex items-center justify-center filter drop-shadow-[0_16px_20px_rgba(0,0,0,0.22)]">
                    <img
                      src={activeHero.bowlImage}
                      alt={`${activeHero.title} Bowl`}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Tabs Slide Selector (Modern Shopify/Minimog Style) */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-stone-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {heroSlides.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                    currentSlide === idx
                      ? "bg-[#680183] text-white shadow-md"
                      : "bg-white/80 hover:bg-white text-stone-700 border border-stone-200/60"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                  <span>{slide.label}</span>
                </button>
              ))}
            </div>

            {/* Slide counter */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-stone-500">
              <strong className="text-[#680183]">0{currentSlide + 1}</strong>
              <span className="opacity-40">/</span>
              <span>0{heroSlides.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SHOP BY CATEGORIES (4 Tiles Grid with Silky Smooth Scroll Animation) */}
      <section className="py-12 sm:py-20 bg-white border-b border-stone-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              Curated Collections
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022]">
              Shop by Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Explore our wholesome range of nutrient-packed raw seeds, lightly roasted crunch, and power mixes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            {/* 1. Raw Seeds */}
            <div className="h-full">
              <Link
                to="/collections/raw-seeds"
                className="group h-full p-3.5 sm:p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-purple-100 text-[#680183] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Leaf size={22} className="sm:hidden" />
                  <Leaf size={28} className="hidden sm:block" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-sm sm:text-lg font-bold text-[#1A0022] group-hover:text-[#680183] transition-colors">
                    Raw Seeds
                  </h3>
                  <p className="hidden sm:block text-xs text-stone-500 line-clamp-2">
                    Unroasted Chia Seeds rich in dietary fibre, omega-3, and antioxidants for smoothies.
                  </p>
                </div>
                <span className="mt-2.5 sm:mt-5 text-[11px] sm:text-xs font-bold text-[#680183] group-hover:underline inline-flex items-center gap-1">
                  <span>View</span>
                  <ArrowRight size={12} />
                </span>
              </Link>
            </div>

            {/* 2. Roasted Seeds */}
            <div className="h-full">
              <Link
                to="/collections/roasted-seeds"
                className="group h-full p-3.5 sm:p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Flame size={22} className="sm:hidden" />
                  <Flame size={28} className="hidden sm:block" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-sm sm:text-lg font-bold text-[#1A0022] group-hover:text-[#680183] transition-colors">
                    Roasted Seeds
                  </h3>
                  <p className="hidden sm:block text-xs text-stone-500 line-clamp-2">
                    Slow dry-roasted Pumpkin, Sunflower, and Flax seeds with savory natural crunch.
                  </p>
                </div>
                <span className="mt-2.5 sm:mt-5 text-[11px] sm:text-xs font-bold text-[#680183] group-hover:underline inline-flex items-center gap-1">
                  <span>View</span>
                  <ArrowRight size={12} />
                </span>
              </Link>
            </div>

            {/* 3. Seed Mix */}
            <div className="h-full">
              <Link
                to="/collections/seed-mix"
                className="group h-full p-3.5 sm:p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Layers size={22} className="sm:hidden" />
                  <Layers size={28} className="hidden sm:block" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-sm sm:text-lg font-bold text-[#1A0022] group-hover:text-[#680183] transition-colors">
                    5-in-1 Seed Mix
                  </h3>
                  <p className="hidden sm:block text-xs text-stone-500 line-clamp-2">
                    Balanced blend of 5 powerhouse seeds formulated for daily plant protein & stamina.
                  </p>
                </div>
                <span className="mt-2.5 sm:mt-5 text-[11px] sm:text-xs font-bold text-[#680183] group-hover:underline inline-flex items-center gap-1">
                  <span>View</span>
                  <ArrowRight size={12} />
                </span>
              </Link>
            </div>

            {/* 4. Healthy Snacks & Sweets (Coming Soon) */}
            <div className="h-full">
              <div className="h-full p-3.5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/60 text-center flex flex-col items-center justify-between opacity-75">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-stone-200 text-stone-500 flex items-center justify-center mb-3 sm:mb-4">
                  <Heart size={22} className="sm:hidden" />
                  <Heart size={28} className="hidden sm:block" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full inline-block">
                    Coming Soon
                  </span>
                  <h3 className="font-heading text-sm sm:text-lg font-bold text-stone-700">
                    Healthy Sweets
                  </h3>
                  <p className="hidden sm:block text-xs text-stone-400 line-clamp-2">
                    Naturally sweetened artisan bites made with pure seeds and jaggery, zero refined sugar.
                  </p>
                </div>
                <span className="mt-2.5 sm:mt-5 text-[10px] sm:text-xs font-semibold text-stone-400">
                  In Development
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — WHY CHOOSE US (6 Icon Row with Silky Smooth Scroll Animation) */}
      <section className="py-12 sm:py-20 bg-stone-50/70">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              The Pureliva Standard
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022]">
              Why Choose Pureliva?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Clean ethics, unadulterated farming purity, and science-backed nutrition in every spoonful.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
          >
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
                  className="p-3.5 sm:p-7 rounded-2xl bg-white border border-stone-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#680183]/10 text-[#680183] flex items-center justify-center mb-3 sm:mb-5">
                    <Icon size={20} className="sm:hidden" />
                    <Icon size={24} className="hidden sm:block" />
                  </div>
                  <h3 className="font-heading text-xs sm:text-lg font-bold text-[#1A0022] mb-1 sm:mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — BEST SELLER WITH FILTER TABS (Silky Smooth Scroll Animation) */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 border-b border-stone-100"
          >
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
                Customer Favorites
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022] mt-1">
                Best Seller Products
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-[#FBF8FD] border border-purple-100 overflow-x-auto max-w-full">
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
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#680183] text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Products Grid — 2 Columns on Mobile, 3 on Desktop with Silky Smooth Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </motion.div>

          {/* Explore all link */}
          <div className="text-center mt-12">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#680183] hover:bg-[#4F0164] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:scale-105"
            >
              <span>View All 5 Seed Varieties</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — BRAND STORY BANNER (Split 2-Column with Silky Smooth Scroll Reveal) */}
      <section className="py-16 sm:py-20 bg-[#FBF8FD] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          >
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
          </motion.div>
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

      {/* SECTION 7 — OUR DEVOTION / OUR PROMISE (Silky Smooth Scroll Animation) */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              Our Devotion
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022]">
              Our Promise in Every Spoon
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Four unshakable commitments that guide every harvest, sorting pass, and pack we ship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
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
                  className="p-3.5 sm:p-6 rounded-2xl bg-[#FBF8FD] border border-purple-100 text-center flex flex-col items-center justify-between hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#680183] text-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                    <Icon size={20} className="sm:hidden" />
                    <Icon size={24} className="hidden sm:block" />
                  </div>
                  <h3 className="font-heading text-xs sm:text-base font-bold text-[#1A0022] mb-1 sm:mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 8 — KEY FEATURES BADGES STRIP (Silky Smooth Fade-up) */}
      <section className="py-8 sm:py-10 bg-purple-50/40 border-y border-purple-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 text-center"
          >
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
                className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-purple-100 shadow-xs flex flex-col items-center justify-center hover:border-purple-300 transition-colors"
              >
                <CheckCircle size={16} className="text-[#680183] mb-1" />
                <span className="text-[11px] sm:text-xs font-bold text-[#1A0022] leading-tight block">
                  {badge.label}
                </span>
                <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-0.5">
                  {badge.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 9 — BULK & EXPORT ORDER BANNER (Silky Smooth Scroll Reveal) */}
      <section className="py-16 sm:py-20 bg-[#4F0164] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
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
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#4F0164] hover:bg-stone-100 rounded-xl font-bold text-xs uppercase tracking-wider text-center shadow-md transition-all hover:scale-105"
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
          </motion.div>
        </div>
      </section>

      {/* SECTION 10 — BLOG / PRODUCT RECIPES SECTION (Silky Smooth Scroll Animation) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {RECIPES.slice(0, 3).map((recipe) => (
              <div
                key={recipe.id}
                className="group rounded-2xl bg-[#FBF8FD] border border-purple-100 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
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
                    className="w-full py-2.5 rounded-xl bg-white border border-purple-200 text-[#680183] hover:bg-[#680183] hover:text-white hover:border-[#680183] text-xs font-bold transition-all shadow-xs"
                  >
                    Read Recipe
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 10.5 — VERIFIED CUSTOMER REVIEWS & SOCIAL PROOF */}
      <section className="py-16 sm:py-24 bg-stone-50/80 border-t border-stone-200/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-[#680183] text-xs font-extrabold uppercase tracking-wider border border-amber-400/40">
              <Star size={13} className="fill-amber-400 text-amber-500" />
              <span>4.9 / 5 Overall Customer Rating</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022]">
              Loved by 10,000+ Health Enthusiasts
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Honest experiences from families and wellness seekers who made Pureliva seeds part of their daily life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              {
                name: "Dr. Rajesh Sharma",
                city: "Indore, M.P.",
                product: "Roasted Pumpkin & Flax",
                rating: 5,
                review:
                  "The crunch on the roasted pumpkin seeds is unmatched. You can taste the genuine farm harvest, and having zero refined sugar is a blessing for daily snacking.",
                date: "Verified Buyer",
              },
              {
                name: "Pooja Agarwal",
                city: "Mumbai, MH",
                product: "Raw Chia Seeds",
                rating: 5,
                review:
                  "Best Chia Seeds I have used for my morning overnight puddings. Gel consistency is thick, perfectly clean optical sorted with zero dirt or foreign stones.",
                date: "Verified Buyer",
              },
              {
                name: "Kavita Mehta",
                city: "Pune, MH",
                product: "5-in-1 Seed Mix",
                rating: 5,
                review:
                  "The resealable moisture zipper actually keeps them super crunchy weeks after opening. WhatsApp ordering took less than 2 minutes to confirm. Super satisfied!",
                date: "Verified Buyer",
              },
              {
                name: "Sunil Patidar",
                city: "Ahmedabad, GJ",
                product: "Commercial Bulk Agro Supply",
                rating: 5,
                review:
                  "Procured metric-ton bulk flax seeds and dry onion flakes for our bakery facility. Clean packaging, genuine factory rates, and prompt dispatch from Khandwa.",
                date: "B2B Buyer",
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Stars Row */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal italic">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#1A0022]">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check size={10} /> Verified
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400">
                    {rev.city} • <span className="text-[#680183] font-medium">{rev.product}</span>
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 11 — CERTIFICATIONS & ACCREDITATIONS STRIP (Silky Smooth Scroll Reveal) */}
      <section className="py-12 bg-purple-50/30 border-t border-purple-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-xl mx-auto mb-8 space-y-1"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#680183]">
              Accreditations & Compliance
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#1A0022]">
              Certified for Safe Food Processing
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center justify-center max-w-3xl mx-auto"
          >
            {[
              { title: "FSSAI", sub: "Reg. 21424170000414", color: "text-[#680183]" },
              { title: "ISO 22000", sub: "Food Safety Standard", color: "text-[#4F0164]" },
              { title: "GMP", sub: "Good Manufacturing", color: "text-[#680183]" },
              { title: "HACCP", sub: "Hazard Control Certified", color: "text-[#4F0164]" },
            ].map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-purple-100 text-center shadow-xs hover:border-[#680183]/40 transition-colors"
              >
                <span className={`font-heading font-black text-xl ${cert.color} block`}>
                  {cert.title}
                </span>
                <span className="text-[10px] text-stone-500 font-semibold">{cert.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 11.5 — FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-24 bg-white border-t border-stone-200/70">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              Got Questions?
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Clear answers about our Khandwa farm sourcing, optical sorting purity, and ordering.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              {
                q: "Where are Pureliva seeds harvested and processed?",
                a: "All Pureliva seeds and agro supplies are sourced directly from fertile agricultural fields in Khandwa, Madhya Pradesh by Patidar Enterprises. Processing and triple optical sorting take place in accredited clean facilities adhering to strict FSSAI safety protocols.",
              },
              {
                q: "Do you add any artificial preservatives, white sugar, or colours?",
                a: "No, absolutely none. Our seeds are 100% pure and unadulterated. The raw varieties are untouched, and the roasted seeds are slow dry-roasted without artificial flavorings, synthetic colors, or added refined sugars.",
              },
              {
                q: "How should I store the seeds to keep them crunchy?",
                a: "All our packs feature an airtight food-grade resealable moisture zipper. Simply zip the pouch tightly after every spoon and store in a cool, dry place away from direct sunlight. No refrigeration is required.",
              },
              {
                q: "How does ordering on WhatsApp work?",
                a: "Clicking 'Order on WhatsApp' opens a direct chat with our Khandwa team with your selected seed and quantity pre-filled. We confirm your delivery address, provide instant order summary, and dispatch via express courier pan-India.",
              },
              {
                q: "Do you supply metric tons for commercial wholesale and export?",
                a: "Yes! Patidar Enterprises specializes in B2B bulk supply of Chia Seeds, Flax Seeds, Dehydrated Onion Flakes, and Dry Garlic in 25kg / 50kg bags for food manufacturers, distributors, and global export houses. You can request specifications via our Bulk Export page.",
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200/80 overflow-hidden bg-[#FBF8FD] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#1A0022] hover:text-[#680183] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-[#680183] text-white rotate-180" : "bg-purple-100 text-[#680183]"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-purple-100/60 mt-1">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#39004B] to-[#590172] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-heading font-bold text-sm sm:text-base text-amber-300">
                Have a specific question or bulk requirement?
              </h4>
              <p className="text-xs text-purple-100/80">
                Our farm specialists in Khandwa are available 9 AM – 7 PM on WhatsApp.
              </p>
            </div>
            <WhatsAppButton
              href={buildWhatsAppLink("Hello Pureliva, I have a question about your seeds.")}
              text="Ask on WhatsApp"
              size="sm"
              className="w-full sm:w-auto shrink-0 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold"
            />
          </div>
        </div>
      </section>

      {/* SECTION 12 — CORE VALUES STRIP (Silky Smooth Scroll Reveal) */}
      <section className="py-16 bg-[#680183] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-10 space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Our Principles
            </span>
            <h2 className="font-heading text-3xl font-bold text-white">
              What We Stand For, From P to A
            </h2>
            <p className="text-xs sm:text-sm text-purple-200">
              Eight foundational principles spelled out through our name.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center"
          >
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
                className="p-3 sm:p-4 rounded-xl bg-white/10 border border-white/15 flex flex-col items-center justify-center hover:bg-white/20 transition-all hover:-translate-y-1"
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
          </motion.div>
        </div>
      </section>

      {/* RECIPE DETAIL MODAL — PROFESSIONAL COOKBOOK EDITORIAL */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop with Deep Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedRecipe(null)}
              className="fixed inset-0 bg-stone-950/75 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl z-10 overflow-hidden border border-stone-200 max-h-[92vh] flex flex-col my-auto"
            >
              {/* Editorial Header */}
              <div className="p-6 sm:p-8 border-b border-stone-100 bg-[#FDFBF7] relative">
                <button
                  type="button"
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                <div className="max-w-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#680183]">
                      Pureliva Kitchen Collection
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                      {selectedRecipe.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                    {selectedRecipe.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {selectedRecipe.summary}
                  </p>
                </div>

                {/* Culinary Meta Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-stone-200/80">
                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/70 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Prep Time
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-0.5">
                      {selectedRecipe.prepTime}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/70 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Cook Time
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-0.5">
                      {selectedRecipe.cookTime}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/70 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Servings
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-0.5">
                      {selectedRecipe.servings}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/70 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Hero Ingredient
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#680183] truncate block mt-0.5">
                      {selectedRecipe.featuredSeed.split("(")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable Editorial Content (Two-Column Desktop) */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Ingredients (5 cols) */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b-2 border-stone-900">
                      <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-stone-900">
                        Ingredients
                      </h4>
                      <span className="text-[11px] font-mono text-stone-400">
                        {selectedRecipe.ingredients.length} items
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                      {selectedRecipe.ingredients.map((ing, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 leading-snug py-1 border-b border-stone-100 last:border-b-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#680183] shrink-0 mt-1.5" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Featured Seed Recommendation Card */}
                    <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 mt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#680183] block">
                        Recommended Product
                      </span>
                      <p className="text-xs font-bold text-stone-900 mt-1">
                        {selectedRecipe.featuredSeed}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                        Packed in an airtight moisture-lock pouch to preserve maximum natural crunch and active enzymes.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Method & Notes (7 cols) */}
                  <div className="md:col-span-7 space-y-5">
                    <div className="pb-2 border-b-2 border-stone-900">
                      <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-stone-900">
                        Method of Preparation
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {selectedRecipe.steps.map((st, i) => (
                        <div key={i} className="flex items-start gap-3.5">
                          <span className="font-mono text-xs font-bold text-stone-400 shrink-0 mt-0.5">
                            0{i + 1}
                          </span>
                          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                            {st}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Editorial Nutrition Note */}
                    <div className="mt-8 p-4 rounded-2xl bg-[#FDFBF7] border-l-4 border-amber-400 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                        Chef's Nutritional Note
                      </span>
                      <p className="text-xs sm:text-sm text-stone-700 mt-1 italic leading-relaxed">
                        "{selectedRecipe.nutritionCallout}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <WhatsAppButton
                  href={buildWhatsAppLink(
                    `Hello Pureliva, I saw your recipe '${selectedRecipe.title}' and want to order ${selectedRecipe.featuredSeed}!`
                  )}
                  text={`Order ${selectedRecipe.featuredSeed.split("(")[0]} on WhatsApp`}
                  size="md"
                  className="w-full sm:w-auto shadow-sm"
                />

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors"
                  >
                    Print Recipe
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRecipe(null)}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
