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
      theme: "light" as const,
      bgClass: "bg-gradient-to-br from-[#FAF5EC] via-[#F4EDE0] to-[#EAE0CF]",
      titleColor: "text-[#1A0022]",
      subtitleColor: "text-stone-700",
      badgeClass: "bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/25",
      badgeIconColor: "text-[#2E7D32]",
      ctaClass: "bg-[#680183] hover:bg-[#4F0164] text-white shadow-md",
      ringColor: "border-[#2E7D32]/30",
      glowColor: "bg-amber-300/30",
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
      theme: "light" as const,
      bgClass: "bg-gradient-to-br from-[#FFF7F0] via-[#F8ECE0] to-[#F1DFC8]",
      titleColor: "text-[#1A0022]",
      subtitleColor: "text-stone-700",
      badgeClass: "bg-amber-600/10 text-amber-900 border border-amber-600/25",
      badgeIconColor: "text-amber-800",
      ctaClass: "bg-[#680183] hover:bg-[#4F0164] text-white shadow-md",
      ringColor: "border-amber-600/30",
      glowColor: "bg-orange-300/30",
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
      theme: "dark" as const,
      bgClass: "bg-gradient-to-br from-[#240030] via-[#430055] to-[#5C0175]",
      titleColor: "text-white",
      subtitleColor: "text-purple-100",
      badgeClass: "bg-amber-400 text-stone-950 font-extrabold border border-amber-300 shadow-sm",
      badgeIconColor: "text-stone-950",
      ctaClass: "bg-white hover:bg-amber-50 text-[#430055] font-extrabold shadow-lg",
      ringColor: "border-amber-400/40",
      glowColor: "bg-amber-400/25",
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

      {/* SECTION 1 — HERO BANNER SLIDESHOW */}
      <section
        className={`relative min-h-[520px] sm:min-h-[580px] lg:min-h-[660px] pt-24 sm:pt-32 pb-12 sm:pb-16 ${activeHero.bgClass} transition-colors duration-700 overflow-hidden flex items-center`}
      >
        {/* Decorative background ambient glows */}
        <div
          className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full ${activeHero.glowColor} blur-3xl pointer-events-none transition-colors duration-700`}
        />
        <div
          className={`absolute top-1/3 -right-20 w-80 h-80 rounded-full ${
            activeHero.theme === "dark" ? "bg-purple-900/40" : "bg-amber-200/30"
          } blur-3xl pointer-events-none transition-colors duration-700`}
        />

        {/* Desktop Prev / Next Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className={`hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center transition-all z-20 ${
            activeHero.theme === "dark"
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              : "bg-white/70 hover:bg-white text-stone-800 border border-stone-200/60 shadow-sm"
          }`}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className={`hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center transition-all z-20 ${
            activeHero.theme === "dark"
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              : "bg-white/70 hover:bg-white text-stone-800 border border-stone-200/60 shadow-sm"
          }`}
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors ${activeHero.badgeClass}`}
                >
                  <Sparkles size={13} className={activeHero.badgeIconColor} />
                  <span>{activeHero.badge}</span>
                </div>

                <h1
                  className={`font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] transition-colors ${activeHero.titleColor}`}
                >
                  {activeHero.title}
                </h1>

                <p
                  className={`text-xs sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors ${activeHero.subtitleColor}`}
                >
                  {activeHero.subtitle}
                </p>

                <div className="pt-2 flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 max-w-md mx-auto lg:mx-0">
                  <Link
                    to={activeHero.ctaLink}
                    className={`flex-1 sm:flex-initial px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeHero.ctaClass}`}
                  >
                    <span>{activeHero.ctaText}</span>
                    <ArrowRight size={15} />
                  </Link>

                  <WhatsAppButton
                    href={buildWhatsAppLink(
                      `Hello Pureliva, I am visiting your website and would like to order fresh seeds.`
                    )}
                    text={activeHero.waText}
                    size="md"
                    className="flex-1 sm:flex-initial shadow-md text-xs sm:text-sm py-3 sm:py-3.5"
                  />
                </div>
              </div>

              {/* Right Column: Featured Image with Floating Animation */}
              <div className="lg:col-span-5 flex items-center justify-center relative">
                <div className="relative w-52 h-52 sm:w-72 sm:h-72 lg:w-96 lg:h-96 flex items-center justify-center">
                  {/* Subtle ring */}
                  <div
                    className={`absolute inset-2 sm:inset-4 rounded-full border-2 border-dashed ${activeHero.ringColor} animate-spin-slow`}
                  />

                  {/* Spotlight background behind bowl */}
                  <div
                    className={`absolute inset-4 rounded-full ${activeHero.glowColor} blur-2xl`}
                  />

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                    <Img
                      src={activeHero.image}
                      alt={activeHero.title}
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
          <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-6 sm:mt-10">
            {heroSlides.map((slide, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  currentSlide === idx
                    ? activeHero.theme === "dark"
                      ? "w-8 bg-amber-400"
                      : "w-8 bg-[#680183]"
                    : activeHero.theme === "dark"
                    ? "w-2.5 bg-white/40 hover:bg-white/70"
                    : "w-2.5 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — SHOP BY CATEGORIES (4 Tiles Grid) */}
      <section className="py-12 sm:py-20 bg-white border-b border-stone-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              Curated Collections
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022]">
              Shop by Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Explore our wholesome range of nutrient-packed raw seeds, lightly roasted crunch, and power mixes.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {/* 1. Raw Seeds */}
            <Link
              to="/collections/raw-seeds"
              className="group p-3.5 sm:p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
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

            {/* 2. Roasted Seeds */}
            <Link
              to="/collections/roasted-seeds"
              className="group p-3.5 sm:p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
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

            {/* 3. Seed Mix */}
            <Link
              to="/collections/seed-mix"
              className="group p-3.5 sm:p-6 rounded-2xl bg-[#FBF8FD] border border-stone-200/70 hover:border-[#680183]/50 shadow-sm hover:shadow-soft-lg transition-all duration-300 text-center flex flex-col items-center justify-between hover:-translate-y-1"
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

            {/* 4. Healthy Snacks & Sweets (Coming Soon) */}
            <div className="p-3.5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/60 text-center flex flex-col items-center justify-between opacity-75">
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
        </div>
      </section>

      {/* SECTION 3 — WHY CHOOSE US (6 Icon Row) */}
      <section className="py-12 sm:py-20 bg-stone-50/70">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              The Pureliva Standard
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022]">
              Why Choose Pureliva?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Clean ethics, unadulterated farming purity, and science-backed nutrition in every spoonful.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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
          </div>
        </div>
      </section>

      {/* SECTION 4 — BEST SELLER WITH FILTER TABS */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 border-b border-stone-100">
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
          </div>

          {/* Products Grid — 2 Columns on Mobile, 3 on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#680183]">
              Our Devotion
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1A0022]">
              Our Promise in Every Spoon
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Four unshakable commitments that guide every harvest, sorting pass, and pack we ship.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
                  className="p-3.5 sm:p-6 rounded-2xl bg-[#FBF8FD] border border-purple-100 text-center flex flex-col items-center justify-between"
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
          </div>
        </div>
      </section>

      {/* SECTION 8 — KEY FEATURES BADGES STRIP */}
      <section className="py-8 sm:py-10 bg-purple-50/40 border-y border-purple-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 text-center">
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
                className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-purple-100 shadow-xs flex flex-col items-center justify-center"
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

      {/* RECIPE DETAIL MODAL — CENTERED WITH ANIMATION & BLUR */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop with Deep Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedRecipe(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-10 overflow-hidden border border-purple-100 max-h-[90vh] flex flex-col my-auto"
            >
              {/* Cover Image & Close Floating Header */}
              <div className="relative h-48 sm:h-56 w-full bg-stone-900 shrink-0">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Floating Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:rotate-90 z-20 shadow-md"
                  aria-label="Close Modal"
                >
                  ✕
                </button>

                {/* Badges on Banner */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white">
                  <div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#680183] text-amber-300 border border-amber-400/30 shadow-sm inline-block mb-1.5">
                      {selectedRecipe.category} • Hero: {selectedRecipe.featuredSeed}
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-sm">
                      {selectedRecipe.title}
                    </h3>
                  </div>
                  <span className="shrink-0 bg-white/20 backdrop-blur-md text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{selectedRecipe.prepTime}</span>
                  </span>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
                {/* Nutrition Callout */}
                <div className="p-3.5 rounded-2xl bg-[#FBF8FD] border border-purple-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#680183] text-amber-300 flex items-center justify-center shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#680183] block">
                      Nutritional Superpower
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-stone-800">
                      {selectedRecipe.nutritionCallout}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {selectedRecipe.summary}
                </p>

                {/* Ingredients */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#680183] flex items-center gap-1.5">
                      <span>Required Ingredients</span>
                    </h4>
                    <span className="text-[11px] text-stone-400 font-semibold">
                      Yields {selectedRecipe.servings}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-purple-50/40 border border-purple-100 text-xs text-stone-800"
                      >
                        <CheckCircle size={14} className="text-[#680183] flex-shrink-0 mt-0.5" />
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#680183] flex items-center gap-1.5 pb-1 border-b border-stone-100">
                    <span>Preparation Method</span>
                  </h4>

                  <ol className="space-y-3">
                    {selectedRecipe.steps.map((st, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-700 hover:border-purple-200 transition-colors"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#680183] text-white text-xs font-bold flex items-center justify-center shrink-0 font-mono shadow-xs mt-0.5">
                          {i + 1}
                        </span>
                        <p className="leading-relaxed text-stone-800 font-normal">{st}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Modal Footer Sticky Action Bar */}
              <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200/80 flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <WhatsAppButton
                  href={buildWhatsAppLink(
                    `Hello Pureliva, I saw your recipe '${selectedRecipe.title}' and want to order ${selectedRecipe.featuredSeed}!`
                  )}
                  text={`Order ${selectedRecipe.featuredSeed} on WhatsApp`}
                  size="md"
                  className="w-full sm:flex-1 justify-center"
                />

                <button
                  type="button"
                  onClick={() => setSelectedRecipe(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Close Recipe
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
