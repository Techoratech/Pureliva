import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { RECIPES, EVENTS, NEWS, Recipe, EventItem, NewsItem } from "../data/newsEvents";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { buildWhatsAppLink } from "../lib/whatsapp";
import {
  Utensils,
  Calendar,
  Newspaper,
  Clock,
  MapPin,
  ChefHat,
  Search,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export const NewsEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "recipes" | "events" | "news">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Filtered lists
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return RECIPES;
    const q = searchQuery.toLowerCase();
    return RECIPES.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.featuredSeed.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return EVENTS;
    const q = searchQuery.toLowerCase();
    return EVENTS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return NEWS;
    const q = searchQuery.toLowerCase();
    return NEWS.filter(
      (n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOrderSeedForRecipe = (recipe: Recipe) => {
    const msg = `Hello Pureliva, I saw your recipe for *${recipe.title}* on your website and would like to order *${recipe.featuredSeed}*!`;
    const url = buildWhatsAppLink(msg);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleRsvpEvent = (event: EventItem) => {
    const msg = `Hello Pureliva, I would like to enquire / RSVP for the *${event.title}* on *${event.date}* in ${event.city}.`;
    const url = buildWhatsAppLink(msg);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>News, Events & Product Recipes | Pureliva Foods</title>
        <meta
          name="description"
          content="Explore chef-crafted natural seed recipes, upcoming agricultural expos and brand announcements from Pureliva Foods, Khandwa."
        />
        <link rel="canonical" href="https://purelivafoods.com/news-events" />
      </Helmet>

      <div className="pt-28 sm:pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            badge="Culinary & Community"
            title="News, Events & Product Recipes"
            subtitle="Discover wholesome culinary ideas for your seed bowls, catch upcoming expos and events, and stay updated with Pureliva brand milestones."
            align="center"
          />

          {/* Filter Bar & Search */}
          <div className="mt-10 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
              {[
                { id: "all", label: "All Updates", icon: Sparkles },
                { id: "recipes", label: "Product Recipes", icon: Utensils },
                { id: "events", label: "Upcoming Events", icon: Calendar },
                { id: "news", label: "Brand News", icon: Newspaper },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#680183] text-white shadow-md shadow-purple-900/20"
                        : "bg-purple-50 text-stone-700 hover:bg-purple-100/70"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-amber-300" : "text-[#680183]"} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search recipes, events, news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#680183] bg-stone-50/50"
              />
            </div>
          </div>

          {/* SECTION 1: PRODUCT RECIPES */}
          {(activeTab === "all" || activeTab === "recipes") && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#680183]/10 text-[#680183] flex items-center justify-center">
                    <Utensils size={16} />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[#1A0022] leading-tight">
                      Nutrient-Rich Product Recipes
                    </h3>
                    <span className="text-xs text-stone-500">
                      Wholesome ways to incorporate seeds into your daily breakfast and snacking
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredRecipes.map((recipe) => (
                  <motion.div
                    key={recipe.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-[#680183] border border-purple-200">
                          {recipe.difficulty} • {recipe.prepTime}
                        </span>
                        <span className="text-xs font-semibold text-stone-500">
                          {recipe.servings}
                        </span>
                      </div>

                      {/* Seed thumbnail preview */}
                      <div className="relative w-full h-48 rounded-2xl bg-[#FBF8FD] p-3 flex items-center justify-center overflow-hidden mb-4 border border-purple-100">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2.5 left-2.5 bg-[#680183]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                          Hero: {recipe.featuredSeed}
                        </span>
                      </div>

                      <h4 className="font-heading text-lg font-bold text-[#1A0022] group-hover:text-[#680183] transition-colors leading-snug">
                        {recipe.title}
                      </h4>

                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {recipe.summary}
                      </p>

                      <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 font-medium">
                        ✦ {recipe.nutritionCallout}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRecipe(recipe)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#680183] hover:bg-[#4F0164] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-soft"
                      >
                        <ChefHat size={14} />
                        <span>View Full Recipe</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOrderSeedForRecipe(recipe)}
                        className="p-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white transition-colors"
                        title="Order Ingredients on WhatsApp"
                      >
                        <WhatsAppIcon size={16} fill="#FFFFFF" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: UPCOMING EVENTS */}
          {(activeTab === "all" || activeTab === "events") && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[#1A0022] leading-tight">
                      Upcoming Events & Expos
                    </h3>
                    <span className="text-xs text-stone-500">
                      Meet the Pureliva team, sample new varieties, and connect at organic agriculture meets
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 shadow-soft flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                          {event.badge}
                        </span>
                        <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                          <MapPin size={12} className="text-stone-400" />
                          {event.city}
                        </span>
                      </div>

                      <h4 className="font-heading text-lg font-bold text-stone-900 leading-snug">
                        {event.title}
                      </h4>

                      <div className="mt-3 space-y-1 text-xs text-stone-600 font-medium">
                        <p className="flex items-center gap-1.5 text-stone-800">
                          <Calendar size={13} className="text-[#680183]" />
                          <strong>{event.date}</strong>
                        </p>
                        <p className="flex items-center gap-1.5 text-stone-600">
                          <Clock size={13} className="text-stone-400" />
                          <span>{event.time}</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-stone-600">
                          <MapPin size={13} className="text-stone-400" />
                          <span>{event.location}</span>
                        </p>
                      </div>

                      <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                        {event.summary}
                      </p>

                      <div className="mt-4 pt-3 border-t border-stone-200 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Highlights:
                        </span>
                        {event.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                            <CheckCircle2 size={12} className="text-[#680183] flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => handleRsvpEvent(event)}
                        className="w-full py-2.5 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-soft"
                      >
                        <WhatsAppIcon size={16} fill="#FFFFFF" />
                        <span>RSVP / Enquire on WhatsApp</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: BRAND NEWS */}
          {(activeTab === "all" || activeTab === "news") && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-[#680183] flex items-center justify-center">
                    <Newspaper size={16} />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[#1A0022] leading-tight">
                      Brand News & Milestones
                    </h3>
                    <span className="text-xs text-stone-500">
                      Press notes, food safety certifications, and new product announcements
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {filteredNews.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-mono">
                        <span>{item.date}</span>
                        <span>{item.readTime}</span>
                      </div>

                      <h4 className="font-heading text-base sm:text-lg font-bold text-[#1A0022] leading-snug mb-2">
                        {item.title}
                      </h4>

                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">
                        By {item.author}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedNews(item)}
                        className="text-xs font-bold text-[#680183] hover:underline flex items-center gap-1"
                      >
                        <span>Read Article</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
                  <X size={18} />
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
                      <Utensils size={14} />
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
                        <CheckCircle2 size={14} className="text-[#680183] flex-shrink-0 mt-0.5" />
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#680183] flex items-center gap-1.5 pb-1 border-b border-stone-100">
                    <ChefHat size={14} />
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
                <button
                  type="button"
                  onClick={() => handleOrderSeedForRecipe(selectedRecipe)}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <WhatsAppIcon size={18} fill="#FFFFFF" />
                  <span>Order {selectedRecipe.featuredSeed} on WhatsApp</span>
                </button>

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

      {/* NEWS ARTICLE MODAL — CENTERED WITH ANIMATION & BLUR */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop with Deep Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedNews(null)}
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
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#680183]">
                      {selectedNews.category} • {selectedNews.date}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[#1A0022] mt-2 leading-tight">
                      {selectedNews.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      By {selectedNews.author} • {selectedNews.readTime}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedNews(null)}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <p className="font-semibold text-stone-900 text-sm sm:text-base">
                    {selectedNews.summary}
                  </p>
                  {selectedNews.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-100 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#680183] hover:bg-[#4F0164] text-white text-xs font-bold transition-all shadow-sm"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsEvents;
