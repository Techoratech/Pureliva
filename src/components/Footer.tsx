import React from "react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site";
import { PRODUCTS } from "../data/products";
import Img from "./Img";
import WaveDivider from "./WaveDivider";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { MapPin, Mail, Instagram, Lock, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0B3D1E] text-white selection:bg-pureliva-brown selection:text-white overflow-hidden">
      {/* Curved wave transition at top */}
      <div className="-mt-8 sm:-mt-14 pointer-events-none">
        <WaveDivider fillColor="#0B3D1E" height={50} className="w-full" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 sm:pb-12 border-b border-emerald-800/60">
          
          {/* Brand & About Column */}
          <div className="lg:col-span-4 space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
            <Link to="/" className="inline-block" aria-label="Pureliva Foods">
              <Img
                src="/images/brand/logo-white"
                alt="Pureliva Foods White Logo"
                transparent
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Pureliva Foods is a premium natural seeds brand by Patidar Enterprises, Khandwa, Madhya Pradesh. Grounded in generational farming heritage, delivering honest, farm-fresh nutrition.
            </p>

            {/* FSSAI Chip */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2.5 bg-white text-stone-900 px-3.5 py-1.5 rounded-xl shadow-xs border border-white/20">
                <Img
                  src="/images/brand/fssai-logo.png"
                  alt="FSSAI Licensed"
                  className="h-5 sm:h-6 w-auto object-contain"
                />
                <div className="text-left">
                  <span className="block text-stone-400 uppercase font-bold tracking-wider text-[8px] leading-tight">
                    FSSAI License
                  </span>
                  <span className="font-mono font-extrabold text-emerald-800 text-[11px] leading-tight">
                    {SITE_CONFIG.fssaiNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section: On Mobile 2 columns side-by-side for clean compact view */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-heading text-sm sm:text-base font-bold text-emerald-200 uppercase tracking-wider text-[11px] sm:text-xs">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/75">
                {SITE_CONFIG.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="hover:text-white transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/track-order"
                    className="hover:text-white transition-colors font-semibold text-emerald-300 flex items-center gap-1 py-0.5"
                  >
                    <span>Track Order</span>
                    <ArrowUpRight size={13} className="text-emerald-300" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products List */}
            <div className="space-y-3">
              <h4 className="font-heading text-sm sm:text-base font-bold text-emerald-200 uppercase tracking-wider text-[11px] sm:text-xs">
                Our Seeds
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/75">
                {PRODUCTS.map((prod) => (
                  <li key={prod.slug}>
                    <Link
                      to={`/products/${prod.slug}`}
                      className="hover:text-white transition-colors flex items-center gap-2 group py-0.5"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
                        style={{ backgroundColor: prod.accent }}
                      />
                      <span className="truncate">{prod.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3 pt-2 lg:pt-0 border-t border-emerald-800/40 lg:border-t-0">
            <h4 className="font-heading text-sm sm:text-base font-bold text-emerald-200 uppercase tracking-wider text-[11px] sm:text-xs">
              Connect With Us
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-emerald-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug text-xs sm:text-sm">{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors truncate text-xs sm:text-sm"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon size={16} className="text-emerald-400 shrink-0" fill="currentColor" />
                <a
                  href={buildWhatsAppLink("Hello Pureliva, I have a query.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium text-emerald-300 text-xs sm:text-sm"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-0.5">
                <Instagram size={16} className="text-pink-400 shrink-0" />
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium text-xs sm:text-sm"
                >
                  {SITE_CONFIG.instagramHandle}
                </a>
              </div>
            </div>

            <div className="pt-2 text-[10px] sm:text-[11px] text-emerald-200/60 leading-tight">
              Packed & Marketed by{" "}
              <span className="font-semibold text-emerald-100">{SITE_CONFIG.parentCompany}</span>, Khandwa (M.P.).
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean on mobile */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] sm:text-xs text-emerald-200/60">
          <p className="order-2 sm:order-1">{SITE_CONFIG.copyright}</p>
          
          <div className="order-1 sm:order-2 flex flex-wrap items-center justify-center gap-4 text-emerald-200/60">
            <span className="text-emerald-100/70 font-medium">
              Honest Nutrition from Indian Soil
            </span>
            <span className="hidden sm:inline">•</span>
            <Link
              to="/admin/login"
              className="text-emerald-300/80 hover:text-white transition-colors flex items-center gap-1 font-semibold"
              title="Staff / Admin Portal"
            >
              <Lock size={11} />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
