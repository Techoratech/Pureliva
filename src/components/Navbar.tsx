import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import { CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";
import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { useScrollDirection } from "../hooks/useScrollDirection";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  ChevronDown,
  Phone,
  Mail,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isTop, scrollDirection } = useScrollDirection();
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close shop dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isVisible = isTop || scrollDirection === "up";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Announcement & Contact Bar */}
        <div className="bg-[#680183] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-purple-900/30">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            {/* Left: Contact Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                title="Call Pureliva Customer Care"
              >
                <Phone size={11} className="text-amber-300" />
                <span className="font-medium">{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                title="Email Pureliva"
              >
                <Mail size={11} className="text-amber-300" />
                <span className="font-medium">{SITE_CONFIG.email}</span>
              </a>
            </div>

            {/* Center / Right: Tagline / Order Tracking Link */}
            <div className="flex items-center gap-4">
              <span className="hidden md:inline font-script text-amber-200 text-sm">
                Pure Nutrition in Every Spoon
              </span>
              <span className="text-white/20 hidden md:inline">|</span>
              <Link
                to="/track-order"
                className="text-purple-100 hover:text-white transition-colors underline-offset-2 hover:underline font-medium"
              >
                Track Your Order
              </Link>
            </div>
          </div>
        </div>

        {/* Main Sticky Header */}
        <div className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm py-2.5 sm:py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Logo on Left */}
            <Link
              to="/"
              className="flex items-center gap-2 group flex-shrink-0"
              aria-label="Pureliva Home"
            >
              <img
                src="/images/logo/logo.webp"
                alt="Pureliva"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to png
                  (e.target as HTMLImageElement).src = "/images/logo/logo.png";
                }}
              />
            </Link>

            {/* Main Menu (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#680183] bg-purple-50"
                      : "text-stone-700 hover:text-[#680183] hover:bg-stone-50"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/collections"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#680183] bg-purple-50"
                      : "text-stone-700 hover:text-[#680183] hover:bg-stone-50"
                  }`
                }
              >
                All Products
              </NavLink>

              {/* Shop by Category Mega Menu */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    shopDropdownOpen
                      ? "text-[#680183] bg-purple-50"
                      : "text-stone-700 hover:text-[#680183] hover:bg-stone-50"
                  }`}
                  aria-expanded={shopDropdownOpen}
                >
                  <span>Shop</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      shopDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {shopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 z-50 overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-6">
                        {/* Column 1: Shop by Category */}
                        <div className="col-span-4 space-y-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#680183] block border-b border-stone-100 pb-2">
                            Shop by Category
                          </span>
                          <div className="space-y-1">
                            <Link
                              to="/collections/raw-seeds"
                              onClick={() => setShopDropdownOpen(false)}
                              className="group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-stone-800 hover:bg-purple-50 hover:text-[#680183] transition-all"
                            >
                              <div>
                                <span className="block font-bold">Raw Seeds</span>
                                <span className="text-[10px] text-stone-400 font-normal">Pure unroasted seeds</span>
                              </div>
                              <span className="text-[10px] bg-purple-100 text-[#680183] px-2 py-0.5 rounded-full font-bold">
                                Chia
                              </span>
                            </Link>

                            <Link
                              to="/collections/roasted-seeds"
                              onClick={() => setShopDropdownOpen(false)}
                              className="group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-stone-800 hover:bg-purple-50 hover:text-[#680183] transition-all"
                            >
                              <div>
                                <span className="block font-bold">Roasted Seeds</span>
                                <span className="text-[10px] text-stone-400 font-normal">Gently dry roasted</span>
                              </div>
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                                3 varieties
                              </span>
                            </Link>

                            <Link
                              to="/collections/seed-mix"
                              onClick={() => setShopDropdownOpen(false)}
                              className="group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-stone-800 hover:bg-purple-50 hover:text-[#680183] transition-all"
                            >
                              <div>
                                <span className="block font-bold">Seed Mix (5-in-1)</span>
                                <span className="text-[10px] text-stone-400 font-normal">Synergistic power blend</span>
                              </div>
                              <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                                Best Seller
                              </span>
                            </Link>
                          </div>

                          <div className="pt-2 border-t border-stone-100 space-y-1">
                            <div className="p-2 opacity-50 flex items-center justify-between text-xs text-stone-500 font-medium">
                              <span>Healthy Snacks</span>
                              <span className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                Coming Soon
                              </span>
                            </div>
                            <div className="p-2 opacity-50 flex items-center justify-between text-xs text-stone-500 font-medium">
                              <span>Sweets & Desserts</span>
                              <span className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                Coming Soon
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Pureliva Specials (5 products) */}
                        <div className="col-span-4 space-y-3 border-l border-stone-100 pl-6">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#680183] block border-b border-stone-100 pb-2">
                            Pureliva Specials
                          </span>
                          <div className="space-y-1.5">
                            {[
                              { name: "Chia Seeds", sub: "Raw • 100g", slug: "chia-seeds", price: "₹99" },
                              { name: "Pumpkin Seeds", sub: "Roasted • 100g", slug: "pumpkin-seeds", price: "₹119" },
                              { name: "5-in-1 Seed Mix", sub: "Roasted • 100g", slug: "seed-mix", price: "₹129" },
                              { name: "Sunflower Seeds", sub: "Roasted • 100g", slug: "sunflower-seeds", price: "₹99" },
                              { name: "Flax Seeds", sub: "Roasted • 100g", slug: "flax-seeds", price: "₹89" },
                            ].map((prod) => (
                              <Link
                                key={prod.slug}
                                to={`/product/${prod.slug}`}
                                onClick={() => setShopDropdownOpen(false)}
                                className="flex items-center justify-between p-1.5 rounded-lg text-xs hover:bg-stone-50 transition-colors"
                              >
                                <div>
                                  <span className="font-semibold text-stone-900 block">{prod.name}</span>
                                  <span className="text-[10px] text-stone-400">{prod.sub}</span>
                                </div>
                                <span className="font-mono font-bold text-[#680183] text-[11px]">{prod.price}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 3: Featured Collection Promo Banner */}
                        <div className="col-span-4 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#2D003B] via-[#4F0164] to-[#680183] p-5 text-white relative overflow-hidden">
                          <div className="relative z-10 space-y-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-white/15 px-2.5 py-0.5 rounded-full inline-block border border-amber-300/30">
                              Farm Direct
                            </span>
                            <h4 className="font-heading text-lg font-bold leading-tight">
                              Pure Nutrition in Every Spoon
                            </h4>
                            <p className="text-[11px] text-purple-100/80 leading-relaxed">
                              No artificial colours, chemical preservatives or refined sugars. 100% natural.
                            </p>
                          </div>

                          <div className="relative z-10 pt-4">
                            <Link
                              to="/collections"
                              onClick={() => setShopDropdownOpen(false)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold transition-all shadow-md"
                            >
                              <span>Explore All Seeds</span>
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#680183] bg-purple-50"
                      : "text-stone-700 hover:text-[#680183] hover:bg-stone-50"
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/news-events"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#680183] bg-purple-50"
                      : "text-stone-700 hover:text-[#680183] hover:bg-stone-50"
                  }`
                }
              >
                News & Recipes
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#680183] bg-purple-50"
                      : "text-stone-700 hover:text-[#680183] hover:bg-stone-50"
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Right Side Icons: Search, Cart, Admin */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Icon */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-full text-stone-700 hover:text-pureliva-green hover:bg-stone-100 transition-colors"
                aria-label="Search seeds"
                title="Search"
              >
                <Search size={20} />
              </button>

              {/* Cart Icon */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 sm:p-2.5 rounded-full text-stone-700 hover:text-pureliva-green hover:bg-stone-100 transition-colors"
                aria-label="Open Cart"
                title="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#680183] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-800 hover:bg-stone-100 transition-colors ml-1"
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[84%] max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              {/* Drawer Top */}
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <img
                    src="/images/logo/logo.webp"
                    alt="Pureliva"
                    className="h-9 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-5 space-y-2 flex-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-purple-50 hover:text-[#680183] transition-colors"
                >
                  Home
                </Link>

                <Link
                  to="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-purple-50 hover:text-[#680183] transition-colors"
                >
                  All Products
                </Link>

                {/* Subcategories */}
                <div className="pl-4 py-1 space-y-1 border-l-2 border-purple-200 ml-4 my-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block px-2 py-1">
                    Shop Categories
                  </span>
                  <Link
                    to="/collections/raw-seeds"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1.5 text-xs font-medium text-stone-600 hover:text-[#680183]"
                  >
                    • Raw Seeds (Chia)
                  </Link>
                  <Link
                    to="/collections/roasted-seeds"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1.5 text-xs font-medium text-stone-600 hover:text-[#680183]"
                  >
                    • Roasted Seeds (Pumpkin, Sunflower, Flax)
                  </Link>
                  <Link
                    to="/collections/seed-mix"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1.5 text-xs font-medium text-stone-600 hover:text-[#680183]"
                  >
                    • Seed Mix (5-in-1 Blend)
                  </Link>
                </div>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-purple-50 hover:text-[#680183] transition-colors"
                >
                  About Us
                </Link>

                <Link
                  to="/news-events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-purple-50 hover:text-[#680183] transition-colors"
                >
                  News, Events & Recipes
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-purple-50 hover:text-[#680183] transition-colors"
                >
                  Contact
                </Link>

                <Link
                  to="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-[#680183] bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  Track Your Order
                </Link>

                <Link
                  to="/order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  Custom Seed Box
                </Link>
              </div>

              {/* Drawer Bottom Contact Info */}
              <div className="p-5 border-t border-stone-100 bg-stone-50/80 space-y-3">
                <a
                  href={buildWhatsAppLink("Hello Pureliva, I want to enquire about natural seeds.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-whatsapp text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-soft"
                >
                  <WhatsAppIcon size={18} fill="#FFFFFF" />
                  <span>WhatsApp Enquiry</span>
                </a>

                <div className="text-[11px] text-stone-500 space-y-1 pt-1">
                  <p>Phone: {SITE_CONFIG.phone}</p>
                  <p>Email: {SITE_CONFIG.email}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals & Drawers */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
};

export default Navbar;
