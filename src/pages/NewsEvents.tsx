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

      <div className="pt-32 pb-24 bg-white min-h-screen">
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
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-pureliva-green text-white shadow-soft"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    <Icon size={14} />
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
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-pureliva-green bg-stone-50/50"
              />
            </div>
          </div>

          {/* SECTION 1: PRODUCT RECIPES */}
          {(activeTab === "all" || activeTab === "recipes") && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-pureliva-green flex items-center justify-center">
                    <Utensils size={16} />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-stone-900 leading-tight">
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
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {recipe.difficulty} • {recipe.prepTime}
                        </span>
                        <span className="text-xs font-semibold text-stone-500">
                          {recipe.servings}
                        </span>
                      </div>

                      {/* Seed thumbnail preview */}
                      <div className="relative w-full h-44 rounded-2xl bg-stone-50 p-3 flex items-center justify-center overflow-hidden mb-4 border border-stone-100">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">
                          Hero: {recipe.featuredSeed}
                        </span>
                      </div>

                      <h4 className="font-heading text-lg font-bold text-stone-900 group-hover:text-pureliva-green transition-colors leading-snug">
                        {recipe.title}
                      </h4>

                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {recipe.summary}
                      </p>

                      <div className="mt-3 p-2.5 rounded-xl bg-pureliva-cream border border-stone-200/60 text-[11px] text-stone-700 font-medium">
                        ✦ {recipe.nutritionCallout}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRecipe(recipe)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-pureliva-green hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-soft"
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
                    <h3 className="font-heading text-2xl font-bold text-stone-900 leading-tight">
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
                          <Calendar size={13} className="text-pureliva-green" />
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
                            <CheckCircle2 size={12} className="text-pureliva-green flex-shrink-0 mt-0.5" />
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
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                    <Newspaper size={16} />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-stone-900 leading-tight">
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

                      <h4 className="font-heading text-base sm:text-lg font-bold text-stone-900 leading-snug mb-2">
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
                        className="text-xs font-semibold text-pureliva-green hover:underline flex items-center gap-1"
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

      {/* RECIPE DETAIL MODAL */}
      <AnimatePresence>
        {selectedRecipe && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-2xl max-h-[85vh] bg-white rounded-3xl shadow-2xl z-50 overflow-y-auto border border-stone-200 p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    {selectedRecipe.category} • {selectedRecipe.featuredSeed}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mt-2">
                    {selectedRecipe.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Prep Time: {selectedRecipe.prepTime} | {selectedRecipe.servings}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRecipe(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Ingredients */}
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-pureliva-green">
                  Ingredients:
                </h4>
                <ul className="space-y-1.5">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-pureliva-green">
                  Step-by-Step Instructions:
                </h4>
                <ol className="space-y-2.5">
                  {selectedRecipe.steps.map((st, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs sm:text-sm text-stone-700">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-pureliva-green text-xs font-bold flex items-center justify-center flex-shrink-0 font-mono">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed">{st}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Modal CTA */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleOrderSeedForRecipe(selectedRecipe)}
                  className="flex-1 py-3 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-soft"
                >
                  <WhatsAppIcon size={18} fill="#FFFFFF" />
                  <span>Order {selectedRecipe.featuredSeed} on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRecipe(null)}
                  className="px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* NEWS ARTICLE MODAL */}
      <AnimatePresence>
        {selectedNews && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-2xl max-h-[85vh] bg-white rounded-3xl shadow-2xl z-50 overflow-y-auto border border-stone-200 p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                    {selectedNews.category} • {selectedNews.date}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mt-2">
                    {selectedNews.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    By {selectedNews.author} • {selectedNews.readTime}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p className="font-medium text-stone-900 text-sm sm:text-base">
                  {selectedNews.summary}
                </p>
                {selectedNews.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-2.5 rounded-xl bg-pureliva-green text-white text-xs font-semibold"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsEvents;
