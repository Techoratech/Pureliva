import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import {
  Leaf,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Award,
  Users,
  Compass,
  Tractor,
  Smile,
  Package,
} from "lucide-react";

export const About: React.FC = () => {
  // 6 Mission Points with distinct icons
  const missionPoints = [
    {
      num: 1,
      title: "Deliver Nature’s Goodness",
      desc: "Thoughtfully selected seeds, dry fruits, snacks and sweets, rooted in our farming heritage, that celebrate nature and support mindful eating.",
      icon: Leaf,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      num: 2,
      title: "Make Nutrition Enjoyable",
      desc: "Naturally sweet treats, snacks and desserts, made without added refined sugar, artificial colours or preservatives, so no one has to choose between taste and health.",
      icon: Smile,
      color: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      num: 3,
      title: "Uphold Quality & Safety",
      desc: "High standards of food safety, hygiene, ingredient selection and consistency at every stage of our work.",
      icon: ShieldCheck,
      color: "bg-indigo-50 text-indigo-800 border-indigo-200",
    },
    {
      num: 4,
      title: "Build Trust Through Integrity",
      desc: "Honest communication, responsible product claims and a commitment to delivering what we promise.",
      icon: CheckCircle2,
      color: "bg-blue-50 text-blue-800 border-blue-200",
    },
    {
      num: 5,
      title: "Innovate for Everyday Wellness",
      desc: "Better ingredients, new flavours and convenient food solutions that keep pace with how people want to eat.",
      icon: Sparkles,
      color: "bg-purple-50 text-purple-800 border-purple-200",
    },
    {
      num: 6,
      title: "Grow Responsibly and Sustainably",
      desc: "A business that respects people and resources, encourages ethical partnerships and creates long-term value for customers, partners and society.",
      icon: RefreshCw,
      color: "bg-stone-50 text-stone-800 border-stone-200",
    },
  ];

  // 8 Core Values spelling P-U-R-E-L-I-V-A
  const coreValues = [
    {
      letter: "P",
      title: "Purity & Integrity",
      desc: "Honest ingredients, truthful communication and ethical practices. We stand by our promises.",
      color: "#2E7D32", // Leaf green
    },
    {
      letter: "U",
      title: "Uncompromising Quality",
      desc: "Excellence in safety, hygiene, sourcing, packaging and service. Quality is never negotiable.",
      color: "#1E2140", // Navy
    },
    {
      letter: "R",
      title: "Responsibility & Respect",
      desc: "We respect our customers, people, partners, communities and the environment.",
      color: "#8E24AA", // Chia purple
    },
    {
      letter: "E",
      title: "Excellence & Innovation",
      desc: "We keep improving, embracing new ideas and creating better products and experiences.",
      color: "#E65100", // Pumpkin orange
    },
    {
      letter: "L",
      title: "Love for Nutrition & Nature",
      desc: "We celebrate natural ingredients, and believe wholesome food brings nourishment, joy and sweetness to everyday life.",
      color: "#2E7D32", // Green
    },
    {
      letter: "I",
      title: "Inspiration & Customer First",
      desc: "Our customers inspire everything we do. We listen first and aim to be delightful and dependable.",
      color: "#FBC02D", // Sunflower yellow
    },
    {
      letter: "V",
      title: "Value Creation",
      desc: "Quality products, trusted relationships and sustainable growth that benefit everyone we work with.",
      color: "#880E4F", // Seed mix maroon
    },
    {
      letter: "A",
      title: "Authenticity & Accountability",
      desc: "We stay true to our farming roots and genuine in who we are, and we keep earning the trust placed in us.",
      color: "#B5652A", // Flax orange-brown
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

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            badge="Our Heritage"
            title="About Us"
            subtitle="Pureliva – Pure Nutrition in Every Spoon"
            align="center"
          />

          {/* Section 1: Our Story */}
          <div className="my-16 max-w-4xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-pureliva-cream border border-stone-200 shadow-soft space-y-6">
              <div className="flex items-center gap-3 text-pureliva-green">
                <Tractor size={28} />
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900">
                  Our Story
                </h2>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p className="font-medium text-stone-900 text-base sm:text-lg">
                  Pureliva was born in a farmer’s family, with a simple belief: good food should never be a compromise.
                </p>
                <p>
                  We grew up close to the land, where food begins. We learned that nature already gives us extraordinary nutrition, in seeds, nuts, fruits and grains, and that the simplest food is often the best.
                </p>
                <p>
                  But we also noticed something that bothered us. Many of today’s sweets and desserts are made with refined sugar, artificial colours and preservatives, so people who care about their health end up denying themselves the joy of something sweet.
                </p>
                <p className="font-semibold text-pureliva-green">
                  We didn’t think anyone should have to choose between taste and health.
                </p>
                <p>
                  So we set out to create seeds, snacks and desserts that stay true to nature. We begin with wholesome roasted seeds, and we are growing into naturally sweet treats, snacks and desserts.
                </p>
                <p>
                  Our sweets and snacks are made without added refined sugar, artificial colours or preservatives, and are naturally sweetened with the goodness of fruits and dry fruits. Alongside them, we offer wholesome seeds and dry fruits full of nutrients like protein, fibre and vitamins.
                </p>
                <p className="italic text-stone-900 font-medium pt-2 border-t border-stone-200">
                  “Every Pureliva product is made with the care a family puts into the food it serves at its own table.”
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Our Vision */}
          <div className="my-16 max-w-4xl mx-auto">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#1E2140] text-pureliva-cream shadow-xl space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block">
                The Future We Envision
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Our Vision
              </h2>
              <p className="text-base sm:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed">
                To become one of India’s most trusted and loved wholesome nutritional food brands, where every seed, snack and sweet is naturally good, so eating well never means giving up joy.
              </p>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
                We imagine a future where nutritious food is never a compromise on taste, convenience or enjoyment, but a natural and delightful part of everyday life.
              </p>
            </div>
          </div>

          {/* Section 3: Our Mission (6 icon cards in a grid) */}
          <div className="my-20">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pureliva-green">
                Our Purpose
              </span>
              <h2 className="font-heading text-3xl font-bold text-stone-900">
                Our Mission
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                To make wholesome nutrition accessible, enjoyable and trustworthy, through thoughtfully crafted foods that bring together nature’s goodness, exceptional quality and delightful taste.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missionPoints.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 text-xs font-bold flex items-center justify-center font-mono">
                          0{item.num}
                        </span>
                        <div className={`p-2.5 rounded-2xl border ${item.color}`}>
                          <IconComponent size={20} />
                        </div>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-stone-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Our Core Values — P U R E L I V A (8 animated cards) */}
          <div className="my-20">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pureliva-green">
                The DNA of Pureliva
              </span>
              <h2 className="font-heading text-3xl font-bold text-stone-900">
                Our Core Values — What We Stand For
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                From <strong>P</strong> to <strong>A</strong>, our foundational principles that guide every decision and every pouch we seal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {coreValues.map((val, idx) => (
                <motion.div
                  key={val.letter}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-soft hover:shadow-soft-lg transition-all space-y-3 flex flex-col justify-between"
                >
                  <div>
                    {/* Big Letter badge */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black font-heading text-white shadow-soft mb-4"
                      style={{ backgroundColor: val.color }}
                    >
                      {val.letter}
                    </div>

                    <h3 className="font-heading text-base font-bold text-stone-900 mb-1.5 leading-snug">
                      {val.letter} – {val.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 5: Our Brand Promise */}
          <div className="my-16 max-w-3xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-pureliva-cream border border-emerald-200/80 shadow-soft space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-pureliva-green">
              Our Commitment to You
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-stone-900">
              Our Brand Promise
            </h2>
            <p className="font-heading text-xl sm:text-2xl font-bold text-pureliva-green">
              Pure Nutrition. Honest Goodness. Everyday Delight.
            </p>
            <p className="text-sm text-stone-700 leading-relaxed max-w-xl mx-auto">
              At Pureliva, we believe good food should nourish, delight and inspire. Every product we make brings nature’s goodness closer to your everyday life.
            </p>
            <p className="font-script text-2xl text-pureliva-brown">
              Sweet without compromise.
            </p>
            <p className="text-xs uppercase font-bold tracking-widest text-stone-500 pt-2 border-t border-stone-200">
              Pureliva: Pure Nutrition in Every Spoon.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
