import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import { CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { useScrollDirection } from "../hooks/useScrollDirection";
import {
  Menu,
  X,
  Search,
  Heart,
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
  const { wishlistCount } = useWishlist();
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
        <div className="bg-[#1E2140] text-pureliva-cream text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Contact Info Placeholders / Values */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                title="Call Pureliva Customer Care"
              >
                <Phone size={11} className="text-emerald-400" />
                <span>[PHONE]</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hidden sm:flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                title="Email Pureliva"
              >
                <Mail size={11} className="text-emerald-400" />
                <span>[EMAIL]</span>
              </a>
            </div>

            {/* Center / Right: Tagline / Order Tracking Link */}
            <div className="flex items-center gap-4">
              <span className="hidden md:inline font-script text-emerald-300 text-sm">
                Pure Nutrition in Every Spoon
              </span>
              <span className="text-white/20 hidden md:inline">|</span>
              <Link
                to="/track-order"
                className="text-stone-300 hover:text-white transition-colors underline-offset-2 hover:underline"
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
                      ? "text-pureliva-green bg-pureliva-green/10"
                      : "text-stone-700 hover:text-pureliva-green hover:bg-stone-100"
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
                      ? "text-pureliva-green bg-pureliva-green/10"
                      : "text-stone-700 hover:text-pureliva-green hover:bg-stone-100"
                  }`
                }
              >
                All Products
              </NavLink>

              {/* Shop by Category Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  onMouseEnter={() => setShopDropdownOpen(true)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    shopDropdownOpen
                      ? "text-pureliva-green bg-pureliva-green/10"
                      : "text-stone-700 hover:text-pureliva-green hover:bg-stone-100"
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      onMouseLeave={() => setShopDropdownOpen(false)}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-stone-100 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Shop by Category
                        </span>
                      </div>

                      {/* Active Categories */}
                      <Link
                        to="/collections/raw-seeds"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-800 hover:bg-emerald-50 hover:text-pureliva-green transition-colors"
                      >
                        <span>Raw Seeds</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                          Chia
                        </span>
                      </Link>

                      <Link
                        to="/collections/roasted-seeds"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-800 hover:bg-emerald-50 hover:text-pureliva-green transition-colors"
                      >
                        <span>Roasted Seeds</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                          Pumpkin, Sunflower, Flax
                        </span>
                      </Link>

                      <Link
                        to="/collections/seed-mix"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-800 hover:bg-emerald-50 hover:text-pureliva-green transition-colors"
                      >
                        <span>Seed Mix</span>
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-medium">
                          6-in-1 Blend
                        </span>
                      </Link>

                      <div className="my-1 border-t border-stone-100" />

                      {/* Coming Soon Categories (Greyed out) */}
                      <div className="px-3 py-1.5 opacity-60 cursor-not-allowed">
                        <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                          <span>Healthy Snacks</span>
                          <span className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                            Coming Soon
                          </span>
                        </div>
                      </div>

                      <div className="px-3 py-1.5 opacity-60 cursor-not-allowed">
                        <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                          <span>Sweets & Desserts</span>
                          <span className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                            Coming Soon
                          </span>
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
                      ? "text-pureliva-green bg-pureliva-green/10"
                      : "text-stone-700 hover:text-pureliva-green hover:bg-stone-100"
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-pureliva-green bg-pureliva-green/10"
                      : "text-stone-700 hover:text-pureliva-green hover:bg-stone-100"
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Right Side Icons: Search, Wishlist, Cart, Admin */}
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

              {/* Wishlist Icon */}
              <Link
                to="/collections"
                className="relative p-2 sm:p-2.5 rounded-full text-stone-700 hover:text-pureliva-green hover:bg-stone-100 transition-colors"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

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
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pureliva-green text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Admin Portal shortcut */}
              <Link
                to="/admin"
                className="hidden sm:flex p-2 sm:p-2.5 rounded-full text-stone-500 hover:text-pureliva-green hover:bg-stone-100 transition-colors"
                aria-label="Admin Portal"
                title="Admin Portal"
              >
                <User size={19} />
              </Link>

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
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-emerald-50 hover:text-pureliva-green transition-colors"
                >
                  Home
                </Link>

                <Link
                  to="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-emerald-50 hover:text-pureliva-green transition-colors"
                >
                  All Products
                </Link>

                {/* Subcategories */}
                <div className="pl-4 py-1 space-y-1 border-l-2 border-emerald-100 ml-4 my-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block px-2 py-1">
                    Shop Categories
                  </span>
                  <Link
                    to="/collections/raw-seeds"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1.5 text-xs font-medium text-stone-600 hover:text-pureliva-green"
                  >
                    • Raw Seeds (Chia)
                  </Link>
                  <Link
                    to="/collections/roasted-seeds"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1.5 text-xs font-medium text-stone-600 hover:text-pureliva-green"
                  >
                    • Roasted Seeds (Pumpkin, Sunflower, Flax)
                  </Link>
                  <Link
                    to="/collections/seed-mix"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1.5 text-xs font-medium text-stone-600 hover:text-pureliva-green"
                  >
                    • Seed Mix (6-in-1 Blend)
                  </Link>
                </div>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-emerald-50 hover:text-pureliva-green transition-colors"
                >
                  About Us
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-stone-800 hover:bg-emerald-50 hover:text-pureliva-green transition-colors"
                >
                  Contact
                </Link>

                <Link
                  to="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 transition-colors"
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

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-xs font-medium text-stone-500 hover:bg-stone-50 transition-colors"
                >
                  Admin Portal
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
                  <p>Phone: [PHONE]</p>
                  <p>Email: [EMAIL]</p>
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
