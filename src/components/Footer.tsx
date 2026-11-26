import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#680183] text-white relative overflow-hidden">
      {/* Decorative top gold border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

      {/* Main Footer Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand Info & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group" aria-label="Pureliva Home">
              <img
                src="/images/logo/logo.webp"
                alt="Pureliva"
                className="h-12 w-auto object-contain brightness-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/logo/logo.png";
                }}
              />
            </Link>

            <p className="font-script text-xl text-amber-300">
              Pure Nutrition in Every Spoon
            </p>

            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed max-w-sm">
              Pureliva offers wholesome raw and slow roasted natural seeds — chia, pumpkin, sunflower, flax and 5-in-1 seed mix — with zero artificial colours or preservatives.
            </p>

            {/* FSSAI Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-[11px] text-white">
              <ShieldCheck size={16} className="text-amber-300 flex-shrink-0" />
              <span>
                FSSAI License: <strong>{SITE_CONFIG.fssaiNumber}</strong>
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
                title="Follow us on Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={SITE_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
                title="Subscribe on YouTube"
              >
                <Youtube size={17} />
              </a>
              <a
                href={buildWhatsAppLink("Hello Pureliva, I want to connect.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-whatsapp text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon size={17} fill="#FFFFFF" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-purple-100">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-amber-300 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections/raw-seeds" className="hover:text-amber-300 transition-colors">
                  Raw Seeds (Chia)
                </Link>
              </li>
              <li>
                <Link to="/collections/roasted-seeds" className="hover:text-amber-300 transition-colors">
                  Roasted Seeds (Pumpkin, Sunflower, Flax)
                </Link>
              </li>
              <li>
                <Link to="/collections/seed-mix" className="hover:text-amber-300 transition-colors">
                  Seed Mix (5-in-1 Blend)
                </Link>
              </li>
              <li>
                <Link to="/news-events" className="hover:text-amber-300 transition-colors">
                  News, Events & Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-amber-300 font-semibold hover:underline flex items-center gap-1.5"
                >
                  <span>Track Your Order</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  Admin Portal / Staff Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Policies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-purple-100">
              <li>
                <Link to="/terms" className="hover:text-amber-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-amber-300 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-amber-300 transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-amber-300 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Newsletter
            </h4>
            <p className="text-xs text-purple-100 leading-relaxed">
              Subscribe to get wholesome nutrition tips and early access to our new naturally sweet snacks.
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
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#4F0164] hover:bg-purple-900 text-white transition-colors"
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

            <div className="pt-2 border-t border-white/10 text-xs text-purple-100 space-y-1">
              <p>Phone: <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-amber-300 font-medium">{SITE_CONFIG.phone}</a></p>
              <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-amber-300 font-medium">{SITE_CONFIG.email}</a></p>
              <p>Address: {SITE_CONFIG.address}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Shortcut */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-200">
          <p>© 2026 Pureliva Foods (Patidar Enterprises). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-purple-200 hover:text-white underline text-[11px] transition-colors">
              Staff / Admin Portal
            </Link>
            <span className="text-white/30">•</span>
            <span className="text-[11px]">Khandwa, Madhya Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
