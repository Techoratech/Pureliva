import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppLink } from "../lib/whatsapp";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Heart,
  ChevronDown,
  Lock,
  Leaf,
  Package,
  Award,
  Sparkles,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Mobile accordion collapse states
  const [openSection, setOpenSection] = useState<string | null>("quick-links");

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#680183] text-white relative overflow-hidden border-t-4 border-amber-400">
      {/* Subtle background ambient texture */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 sm:pb-12 relative z-10">
        {/* Top Trust & Value Strip */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <Leaf size={18} />
              </div>
              <div>
                <h5 className="font-heading font-bold text-xs sm:text-sm text-white leading-tight">
                  100% Farm Direct
                </h5>
                <p className="text-[10px] text-purple-200/80">Khandwa, M.P. Harvest</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h5 className="font-heading font-bold text-xs sm:text-sm text-white leading-tight">
                  FSSAI Accredited
                </h5>
                <p className="text-[10px] text-purple-200/80">Optical Sorted Purity</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-200 flex items-center justify-center shrink-0">
                <Package size={18} />
              </div>
              <div>
                <h5 className="font-heading font-bold text-xs sm:text-sm text-white leading-tight">
                  Moisture-Lock Zip
                </h5>
                <p className="text-[10px] text-purple-200/80">Airtight Fresh Crunch</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                <WhatsAppIcon size={18} fill="#25D366" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-xs sm:text-sm text-white leading-tight">
                  WhatsApp Support
                </h5>
                <p className="text-[10px] text-purple-200/80">+91 97525 99343</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand Info & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group" aria-label="Pureliva Home">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl inline-block border border-white/15">
                <img
                  src="/images/logo/logo.webp"
                  alt="Pureliva"
                  className="h-10 sm:h-12 w-auto object-contain brightness-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/logo/logo.png";
                  }}
                />
              </div>
            </Link>

            <p className="font-script text-xl text-amber-300">
              Pure Nutrition in Every Spoon
            </p>

            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-sm">
              Pureliva offers wholesome raw and slow roasted natural seeds — chia, pumpkin, sunflower, flax and 5-in-1 seed mix — with zero artificial colours or preservatives.
            </p>

            {/* FSSAI Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-[11px] text-white shadow-xs">
              <ShieldCheck size={16} className="text-amber-300 shrink-0" />
              <span>
                FSSAI License: <strong className="text-amber-200">{SITE_CONFIG.fssaiNumber}</strong>
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
                title="Follow us on Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={SITE_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
                title="Subscribe on YouTube"
              >
                <Youtube size={17} />
              </a>
              <a
                href={buildWhatsAppLink("Hello Pureliva, I want to connect.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon size={17} fill="#FFFFFF" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols on desktop, accordion card on mobile) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl lg:rounded-none bg-white/5 lg:bg-transparent border border-white/10 lg:border-none p-3.5 lg:p-0">
              <button
                type="button"
                onClick={() => toggleSection("quick-links")}
                className="w-full flex items-center justify-between text-left lg:pointer-events-none"
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Quick Links
                </h4>
                <ChevronDown
                  size={16}
                  className={`text-amber-300 lg:hidden transition-transform duration-200 ${
                    openSection === "quick-links" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`space-y-2 pt-3 text-xs sm:text-sm text-purple-100/90 ${
                  openSection === "quick-links" ? "block" : "hidden lg:block"
                }`}
              >
                <p>
                  <Link to="/about" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    About Us
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    Contact Us
                  </Link>
                </p>
                <p>
                  <Link to="/collections" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    All Products
                  </Link>
                </p>
                <p>
                  <Link to="/collections/raw-seeds" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    Raw Seeds (Chia)
                  </Link>
                </p>
                <p>
                  <Link to="/collections/roasted-seeds" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    Roasted Seeds (Pumpkin, Sunflower, Flax)
                  </Link>
                </p>
                <p>
                  <Link to="/collections/seed-mix" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    5-in-1 Power Seed Mix
                  </Link>
                </p>
                <p>
                  <Link to="/news-events" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    News, Events & Recipes
                  </Link>
                </p>
                <p>
                  <Link to="/bulk-export" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    Bulk Agro & Export Supply
                  </Link>
                </p>
                <p>
                  <Link to="/track-order" className="text-amber-300 font-semibold hover:underline inline-block py-0.5">
                    Track Your Order →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Policies (2 cols on desktop, accordion card on mobile) */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl lg:rounded-none bg-white/5 lg:bg-transparent border border-white/10 lg:border-none p-3.5 lg:p-0">
              <button
                type="button"
                onClick={() => toggleSection("policies")}
                className="w-full flex items-center justify-between text-left lg:pointer-events-none"
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Policies
                </h4>
                <ChevronDown
                  size={16}
                  className={`text-amber-300 lg:hidden transition-transform duration-200 ${
                    openSection === "policies" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`space-y-2 pt-3 text-xs sm:text-sm text-purple-100/90 ${
                  openSection === "policies" ? "block" : "hidden lg:block"
                }`}
              >
                <p>
                  <Link to="/terms" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    Terms & Conditions
                  </Link>
                </p>
                <p>
                  <Link to="/privacy" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    Privacy Policy
                  </Link>
                </p>
                <p>
                  <Link to="/shipping-policy" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    Shipping Policy
                  </Link>
                </p>
                <p>
                  <Link to="/return-policy" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    Return Policy
                  </Link>
                </p>
                <p>
                  <Link to="/faqs" className="hover:text-amber-300 transition-colors inline-block py-0.5">
                    FAQs
                  </Link>
                </p>
                <p>
                  <Link
                    to="/admin"
                    className="text-purple-200/80 hover:text-white transition-colors flex items-center gap-1.5 pt-1"
                  >
                    <Lock size={12} />
                    <span>Admin Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-300" />
              <span>Stay Connected</span>
            </h4>
            <p className="text-xs text-purple-100/90 leading-relaxed">
              Subscribe for wholesome seed recipes, health tips, and early access to our upcoming naturally sweet snacks.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-purple-200 focus:outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-900 transition-colors shadow-xs"
                  aria-label="Subscribe"
                >
                  <Send size={13} />
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-amber-300 block font-medium">
                  ✓ Thank you for subscribing!
                </span>
              )}
            </form>

            <div className="pt-2 border-t border-white/10 text-xs text-purple-100/90 space-y-2">
              <p className="flex items-center gap-2">
                <Phone size={13} className="text-amber-300 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-amber-300 font-medium">
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-amber-300 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-amber-300 font-medium">
                  {SITE_CONFIG.email}
                </a>
              </p>
              <p className="flex items-start gap-2 text-[11px] text-purple-200/90 pt-0.5">
                <MapPin size={13} className="text-amber-300 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Bottom Bar: Clean light background with royal purple text matching Gomoswa Foods */}
      <div className="bg-[#FAF7F2] text-[#680183] py-4 px-4 sm:px-6 lg:px-8 border-t border-purple-200/50 relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p className="text-stone-700">© 2026 Pureliva Foods (Patidar Enterprises). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="text-[#680183] hover:text-[#4F0164] underline text-[11px] font-bold transition-colors flex items-center gap-1"
            >
              <Lock size={12} />
              <span>Admin Login</span>
            </Link>
            <span className="text-stone-300">•</span>
            <span className="text-[11px] text-stone-600">Khandwa, Madhya Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
