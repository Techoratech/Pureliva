import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { buildWhatsAppLink } from "../lib/whatsapp";
import {
  Leaf,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Tractor,
  Smile,
  Heart,
  Award,
  Package,
  Layers,
  MapPin,
  ArrowRight,
  Sun,
  Check,
} from "lucide-react";

export const About: React.FC = () => {
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);

  // 6 Mission Points from Client Content
  const missionPoints = [
    {
      num: 1,
      title: "Deliver Nature’s Goodness",
      desc: "Thoughtfully selected seeds, dry fruits, snacks and sweets, rooted in our farming heritage, that celebrate nature and support mindful eating.",
      icon: Leaf,
      accent: "#2E7D32",
      bgLight: "bg-emerald-50/80 border-emerald-200",
    },
    {
      num: 2,
      title: "Make Nutrition Enjoyable",
      desc: "Naturally sweet treats, snacks and desserts, made without added refined sugar, artificial colours or preservatives, so no one has to choose between taste and health.",
      icon: Smile,
      accent: "#E65100",
      bgLight: "bg-orange-50/80 border-orange-200",
    },
    {
      num: 3,
      title: "Uphold Quality & Safety",
      desc: "High standards of food safety, hygiene, ingredient selection and consistency at every stage of our work.",
      icon: ShieldCheck,
      accent: "#1E2140",
      bgLight: "bg-slate-50/80 border-slate-200",
    },
    {
      num: 4,
      title: "Build Trust Through Integrity",
      desc: "Honest communication, responsible product claims and a commitment to delivering what we promise.",
      icon: CheckCircle2,
      accent: "#0B3D1E",
      bgLight: "bg-emerald-50/80 border-emerald-200",
    },
    {
      num: 5,
      title: "Innovate for Everyday Wellness",
      desc: "Better ingredients, new flavours and convenient food solutions that keep pace with how people want to eat.",
      icon: Sparkles,
      accent: "#8E24AA",
      bgLight: "bg-purple-50/80 border-purple-200",
    },
    {
      num: 6,
      title: "Grow Responsibly and Sustainably",
      desc: "A business that respects people and resources, encourages ethical partnerships and creates long-term value for customers, partners and society.",
      icon: RefreshCw,
      accent: "#B5652A",
      bgLight: "bg-amber-50/80 border-amber-200",
    },
  ];

  // 8 Core Values spelling P-U-R-E-L-I-V-A
  const coreValues = [
    {
      letter: "P",
      word: "Purity & Integrity",
      desc: "Honest ingredients, truthful communication and ethical practices. We stand by our promises.",
      color: "#2E7D32", // Green
      bgCard: "hover:border-emerald-500",
    },
    {
      letter: "U",
      word: "Uncompromising Quality",
      desc: "Excellence in safety, hygiene, sourcing, packaging and service. Quality is never negotiable.",
      color: "#1E2140", // Deep Navy
      bgCard: "hover:border-slate-800",
    },
    {
      letter: "R",
      word: "Responsibility & Respect",
      desc: "We respect our customers, people, partners, communities and the environment.",
      color: "#8E24AA", // Purple
      bgCard: "hover:border-purple-500",
    },
    {
      letter: "E",
      word: "Excellence & Innovation",
      desc: "We keep improving, embracing new ideas and creating better products and experiences.",
      color: "#E65100", // Orange
      bgCard: "hover:border-orange-500",
    },
    {
      letter: "L",
      word: "Love for Nutrition & Nature",
      desc: "We celebrate natural ingredients, and believe wholesome food brings nourishment, joy and sweetness to everyday life.",
      color: "#2E7D32", // Green
      bgCard: "hover:border-emerald-600",
    },
    {
      letter: "I",
      word: "Inspiration & Customer First",
      desc: "Our customers inspire everything we do. We listen first and aim to be delightful and dependable.",
      color: "#FBC02D", // Gold Yellow
      bgCard: "hover:border-yellow-500",
    },
    {
      letter: "V",
      word: "Value Creation",
      desc: "Quality products, trusted relationships and sustainable growth that benefit everyone we work with.",
      color: "#880E4F", // Maroon
      bgCard: "hover:border-rose-700",
    },
    {
      letter: "A",
      word: "Authenticity & Accountability",
      desc: "We stay true to our farming roots and genuine in who we are, and we keep earning the trust placed in us.",
      color: "#B5652A", // Brown
      bgCard: "hover:border-amber-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Pureliva – Pure Nutrition in Every Spoon</title>
        <meta
          name="description"
          content="Pureliva was born in a farmer's family with a simple belief: good food should never be a compromise. Learn our story, vision, mission and core values."
        />
        <link rel="canonical" href="https://purelivafoods.com/about" />
      </Helmet>

      <div className="pt-28 pb-24 bg-white overflow-hidden">
        {/* HERO BANNER SECTION */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-pureliva-cream via-white to-white border-b border-stone-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-pureliva-green text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Tractor size={15} />
              <span>Born in a Farmer's Family</span>
            </motion.div>

            {/* Main Headings */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight"
            >
              About Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-script text-2xl sm:text-3xl text-pureliva-brown mt-3"
            >
              Pureliva – Pure Nutrition in Every Spoon
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed"
            >
              Grounded in generational agricultural heritage in Khandwa, Madhya Pradesh. Crafting wholesome natural seeds and naturally sweet treats that honour both health and taste.
            </motion.p>

            {/* Key Trust Highlights Strip */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-stone-700">
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-soft">
                <Check size={16} className="text-pureliva-green" /> 100% Farm-Grown Seeds
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-soft">
                <Check size={16} className="text-pureliva-green" /> No Added Refined Sugar
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-soft">
                <Check size={16} className="text-pureliva-green" /> No Artificial Colours
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-soft">
                <Check size={16} className="text-pureliva-green" /> FSSAI Licensed (21426950001159)
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 1: OUR STORY (SPLIT EDITORIAL LAYOUT) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Visual Collage & Provenance Stamp */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl bg-pureliva-cream p-8 border border-stone-200 shadow-soft space-y-6 overflow-hidden">
                  {/* Subtle leaf watermark */}
                  <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                    <Leaf size={200} />
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-stone-200/80">
                    <span className="text-xs font-bold uppercase tracking-widest text-pureliva-green">
                      Heritage Provenance
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-stone-800 border border-stone-200">
                      Est. Khandwa (M.P.)
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-stone-900 leading-snug">
                      Patidar Enterprises, Khandwa
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Our farming family has cultivated fertile soils in the Nimar plains of Madhya Pradesh for generations. That intimate understanding of soil, sunshine, and seed biology powers every Pureliva batch.
                    </p>
                  </div>

                  {/* Seed Showcase Graphic */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-around gap-2">
                    <div className="text-center">
                      <img
                        src="/images/products/seedmix-front.webp"
                        alt="Pureliva Seed Mix Pack"
                        className="h-20 w-auto object-contain mx-auto"
                      />
                      <span className="text-[10px] font-bold text-stone-700 block mt-1">6-in-1 Mix</span>
                    </div>
                    <div className="text-center">
                      <img
                        src="/images/products/chia-front.webp"
                        alt="Pureliva Chia Seeds Pack"
                        className="h-20 w-auto object-contain mx-auto"
                      />
                      <span className="text-[10px] font-bold text-stone-700 block mt-1">Raw Chia</span>
                    </div>
                    <div className="text-center">
                      <img
                        src="/images/products/pumpkin-front.webp"
                        alt="Pureliva Pumpkin Seeds Pack"
                        className="h-20 w-auto object-contain mx-auto"
                      />
                      <span className="text-[10px] font-bold text-stone-700 block mt-1">Pumpkin</span>
                    </div>
                  </div>

                  {/* Quote Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-900 text-white space-y-1">
                    <p className="font-heading italic text-sm text-emerald-100">
                      “Every Pureliva product is made with the care a family puts into the food it serves at its own table.”
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block pt-1">
                      — Pureliva Family Pledge
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative Story (Exact Client Content) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-pureliva-green">
                    Where We Began
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
                    Our Story
                  </h2>
                </div>

                <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                  <p className="text-base sm:text-lg font-medium text-stone-900 leading-snug">
                    Pureliva was born in a farmer’s family, with a simple belief: good food should never be a compromise.
                  </p>
                  <p>
                    We grew up close to the land, where food begins. We learned that nature already gives us extraordinary nutrition, in seeds, nuts, fruits and grains, and that the simplest food is often the best.
                  </p>
                  <p>
                    But we also noticed something that bothered us. Many of today’s sweets and desserts are made with refined sugar, artificial colours and preservatives, so people who care about their health end up denying themselves the joy of something sweet.
                  </p>
                  <div className="p-4 rounded-2xl bg-emerald-50 border-l-4 border-pureliva-green text-pureliva-green font-semibold text-base sm:text-lg">
                    We didn’t think anyone should have to choose between taste and health.
                  </div>
                  <p>
                    So we set out to create seeds, snacks and desserts that stay true to nature. We begin with wholesome roasted seeds, and we are growing into naturally sweet treats, snacks and desserts.
                  </p>
                  <p>
                    Our sweets and snacks are made without added refined sugar, artificial colours or preservatives, and are naturally sweetened with the goodness of fruits and dry fruits. Alongside them, we offer wholesome seeds and dry fruits full of nutrients like protein, fibre and vitamins.
                  </p>
                  <p className="text-stone-900 font-semibold pt-2">
                    Every Pureliva product is made with the care a family puts into the food it serves at its own table.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR VISION (DEEP NAVY LUXURY CONTAINER) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#1E2140] text-pureliva-cream p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
              {/* Radial gradient overlay */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-white/15">
                  <Sun size={14} className="text-amber-400" />
                  <span>The Future We Envision</span>
                </span>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Our Vision
                </h2>

                <p className="text-lg sm:text-xl md:text-2xl font-heading text-emerald-200 leading-relaxed font-medium">
                  “To become one of India’s most trusted and loved wholesome nutritional food brands, where every seed, snack and sweet is naturally good, so eating well never means giving up joy.”
                </p>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl mx-auto pt-2 border-t border-white/15">
                  We imagine a future where nutritious food is never a compromise on taste, convenience or enjoyment, but a natural and delightful part of everyday life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: OUR MISSION (6 ICON CARDS IN A RESPONSIVE GRID) */}
        <section className="py-20 bg-stone-50/60 border-y border-stone-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-pureliva-green">
                Our Driving Purpose
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                To make wholesome nutrition accessible, enjoyable and trustworthy, through thoughtfully crafted foods that bring together nature’s goodness, exceptional quality and delightful taste.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {missionPoints.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -6 }}
                    className="p-8 rounded-3xl bg-white border border-stone-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Header: Number + Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-700 text-sm font-bold flex items-center justify-center font-mono">
                          0{item.num}
                        </span>
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-soft transition-transform group-hover:scale-110"
                          style={{ backgroundColor: item.accent }}
                        >
                          <IconComponent size={22} />
                        </div>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-pureliva-green transition-colors mb-3 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-bold text-pureliva-green uppercase tracking-wider">
                      <span>Pillar 0{item.num}</span>
                      <ArrowRight size={12} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: OUR CORE VALUES — P U R E L I V A (8 ANIMATED TILES) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-emerald-100/70 text-pureliva-green text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>The 8 Pillars of Pureliva</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900">
                Our Core Values — What We Stand For
              </h2>
              <p className="text-sm sm:text-base text-stone-600">
                From <strong>P</strong> to <strong>A</strong>, every letter embodies the farmer's honesty and uncompromising quality we deliver in every spoon.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, idx) => (
                <motion.div
                  key={val.letter}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setActiveValueIndex(idx)}
                  onMouseLeave={() => setActiveValueIndex(null)}
                  className={`p-7 rounded-3xl bg-white border border-stone-200/90 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between ${val.bgCard}`}
                >
                  <div>
                    {/* Big Letter Monogram Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black font-heading text-white shadow-soft"
                        style={{ backgroundColor: val.color }}
                      >
                        {val.letter}
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 font-bold">
                        0{idx + 1}/08
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-stone-900 mb-2 leading-snug">
                      <span className="font-extrabold mr-1.5" style={{ color: val.color }}>
                        {val.letter}
                      </span>
                      – {val.word}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                      Pureliva Standard
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: val.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: OUR BRAND PROMISE (PREMIUM CERTIFICATE SEAL) */}
        <section className="py-20 bg-pureliva-cream/70 border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-14 rounded-3xl bg-white border-2 border-emerald-600/30 shadow-soft-lg text-center space-y-6 relative overflow-hidden">
              {/* Corner decorative accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-pureliva-green" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-pureliva-green" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-pureliva-green" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-pureliva-green" />

              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-pureliva-green bg-emerald-50 border border-emerald-200">
                Official Pureliva Pledge
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900">
                Our Brand Promise
              </h2>

              <p className="font-heading text-2xl sm:text-3xl font-extrabold text-pureliva-green leading-snug">
                Pure Nutrition. Honest Goodness. Everyday Delight.
              </p>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-xl mx-auto">
                At Pureliva, we believe good food should nourish, delight and inspire. Every product we make brings nature’s goodness closer to your everyday life.
              </p>

              <div className="py-2">
                <span className="font-script text-3xl sm:text-4xl text-pureliva-brown block">
                  Sweet without compromise.
                </span>
                <span className="font-heading text-sm uppercase tracking-widest font-extrabold text-stone-900 mt-2 block">
                  Pureliva: Pure Nutrition in Every Spoon.
                </span>
              </div>

              {/* Action row */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/collections"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-pureliva-green hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-soft transition-colors flex items-center justify-center gap-2"
                >
                  <Package size={16} />
                  <span>Explore Our Natural Seeds</span>
                </Link>

                <a
                  href={buildWhatsAppLink("Hello Pureliva, I read your story and want to know more about your natural seeds.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-xs sm:text-sm shadow-soft transition-colors flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon size={18} fill="#FFFFFF" />
                  <span>Chat with Pureliva Team</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
