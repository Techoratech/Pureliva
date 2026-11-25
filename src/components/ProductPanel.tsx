import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import Img from "./Img";
import WhatsAppButton from "./WhatsAppButton";
import { buildProductOrderLink } from "../lib/whatsapp";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductPanelProps {
  product: Product;
  index: number;
}

export const ProductPanel: React.FC<ProductPanelProps> = ({ product, index }) => {
  const waUrl = buildProductOrderLink(product.titleWithVariant, 1);

  return (
    <div
      className="relative w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-gray-100 shadow-soft-lg overflow-hidden"
      style={{
        boxShadow: `0 20px 40px -15px ${product.accent}25`,
      }}
    >
      {/* Background soft ambient tint */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 -mr-20 -mt-20"
        style={{ backgroundColor: product.accent }}
      />

      {/* Main Grid: 2 columns on desktop (Left: details & actions, Right: floating bowl & pack card) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
        {/* Left Column: Product Info, Stats & CTAs */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          {/* Top Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
              <span
                className="px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${product.accent}20`,
                  color: product.accentTextDark ? "#855800" : product.accent,
                }}
              >
                {product.type}
              </span>
              <span className="font-script text-xl sm:text-2xl text-pureliva-brown">
                {product.tagline}
              </span>
              <span className="text-[10px] text-gray-400 font-medium ml-auto hidden sm:inline-block">
                Net Wt. 100g
              </span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-pureliva-heading">
              {product.name}
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm text-pureliva-body leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* 3 Key Stats Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
            {product.keyStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-2 sm:p-2.5 bg-gray-50/90 rounded-2xl border border-gray-100/90 flex flex-col justify-center"
              >
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider truncate">
                  {stat.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-pureliva-heading font-mono mt-0.5">
                  {stat.value}
                </span>
                <span className="text-[10px] text-pureliva-body font-light truncate">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3 border-t border-gray-100">
            <Link
              to={`/products/${product.slug}`}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-pureliva-green bg-pureliva-green/10 hover:bg-pureliva-green/15 transition-colors flex items-center gap-1.5"
            >
              <span>View Details</span>
              <ArrowRight size={14} />
            </Link>

            <WhatsAppButton
              href={waUrl}
              text="Order on WhatsApp"
              size="sm"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm"
              ariaLabel={`Order ${product.name} on WhatsApp`}
            />
          </div>
        </div>

        {/* Right Column: Floating Bowl Image & Pack Front Preview */}
        <div className="md:col-span-5 relative flex items-center justify-center min-h-[220px] sm:min-h-[260px] md:min-h-[280px]">
          {/* Tilted Pack Front Card in Corner */}
          <div className="absolute top-0 right-0 pointer-events-none z-20">
            <div className="w-16 h-22 sm:w-18 sm:h-24 md:w-20 md:h-28 rounded-xl shadow-md overflow-hidden rotate-6 border-2 border-white bg-white">
              <Img
                src={product.images.packFront}
                alt={`${product.name} pack front preview`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating bowl image with soft shadow ellipse */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 flex items-center justify-center">
            {/* Soft Shadow Ellipse under bowl */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 sm:w-44 h-5 bg-black/15 rounded-full blur-md pointer-events-none" />

            {/* Floating bowl image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
              <Img
                src={product.images.bowl}
                alt={`${product.name} transparent bowl presentation`}
                transparent
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;
