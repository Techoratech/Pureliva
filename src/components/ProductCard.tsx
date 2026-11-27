import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildProductOrderLink } from "../lib/whatsapp";
import { ShoppingBag, Check, Eye, ChevronDown } from "lucide-react";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { addItem } = useCart();

  const waUrl = buildProductOrderLink(product.titleWithVariant, 1);

  const discountPercent =
    product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const savings = product.mrp && product.price ? product.mrp - product.price : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-stone-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${className}`}
      >
        <div>
          {/* Top Badges & Quick View */}
          <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-2.5">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              {discountPercent > 0 && (
                <span className="px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[11px] font-extrabold bg-rose-600 text-white tracking-wide">
                  -{discountPercent}%
                </span>
              )}
              <span
                className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold tracking-wider uppercase truncate max-w-[95px] sm:max-w-none"
                style={{
                  backgroundColor: `${product.accent}15`,
                  color: product.accentTextDark ? "#855800" : product.accent,
                }}
              >
                {product.variant || product.type}
              </span>
            </div>

            <div className="flex items-center">
              {/* Quick View Button */}
              <button
                type="button"
                onClick={handleOpenQuickView}
                className="p-1 sm:p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                aria-label={`Quick view ${product.name}`}
                title="Quick View"
              >
                <Eye size={15} />
              </button>
            </div>
          </div>

          {/* Product Image Container with Front/Back hover flip (Compact & Balanced) */}
          <Link
            to={`/product/${product.slug}`}
            className="block relative w-full h-32 sm:h-44 lg:h-48 my-1 flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-stone-50/60 p-1 sm:p-2"
            aria-label={`View ${product.name} details`}
          >
            {/* Subtle accent glow on hover */}
            <div
              className="absolute w-32 sm:w-40 h-32 sm:h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: product.accent }}
            />

            {/* Front pack image */}
            <motion.img
              src={product.images.front || product.images.packFront}
              alt={`${product.name} Front Pack`}
              className={`w-full h-full object-contain transition-opacity duration-400 ${
                isHovered && (product.images.back || product.images.packBack)
                  ? "opacity-0 absolute"
                  : "opacity-100"
              }`}
              loading="lazy"
            />

            {/* Back pack image (revealed on hover) */}
            {(product.images.back || product.images.packBack) && (
              <motion.img
                src={product.images.back || product.images.packBack}
                alt={`${product.name} Back Pack (Nutrition & Ingredients)`}
                className={`w-full h-full object-contain transition-all duration-400 ${
                  isHovered ? "opacity-100 scale-105" : "opacity-0 absolute pointer-events-none"
                }`}
                loading="lazy"
              />
            )}

            {/* Quick Resealable Zipper Badge */}
            <span className="absolute bottom-1.5 left-1.5 bg-stone-900/75 backdrop-blur-sm text-white text-[8px] sm:text-[9px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full">
              Zipper • {product.netWeight}
            </span>
          </Link>

          {/* Details (Clean & Compact) */}
          <div className="mt-2 sm:mt-2.5 space-y-1">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 font-medium">
              <span className="truncate">{product.category}</span>
              <span className="font-mono text-stone-600 shrink-0">
                {product.nutrients[1]?.per100g}g protein
              </span>
            </div>

            <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-stone-900 group-hover:text-[#680183] transition-colors leading-tight line-clamp-1">
              <Link to={`/product/${product.slug}`}>
                {product.name}
              </Link>
            </h3>

            {/* Price Row */}
            <div className="pt-0.5 sm:pt-1 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-heading text-sm sm:text-base font-bold text-stone-900">
                {product.pricePlaceholder || (product.price ? `₹${product.price}` : "[PRICE]")}
              </span>
              {product.mrp && (
                <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
              {savings > 0 && (
                <span className="text-[10px] sm:text-[11px] text-[#680183] font-bold bg-purple-50 px-1 sm:px-1.5 py-0.5 rounded">
                  Save ₹{savings}
                </span>
              )}
            </div>

            {/* Show Details Option (Tap to reveal lower portion) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowDetails(!showDetails);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#680183] hover:text-[#4F0164] transition-colors py-0.5"
              >
                <span>{showDetails ? "Hide details" : "Show details"}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
                />
              </button>

              {/* Expandable Lower Portion (revealed on tap) */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden pt-2 mt-1 border-t border-purple-100/70 space-y-2 text-left"
                  >
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                      <span className="bg-purple-50 text-[#680183] font-semibold px-2 py-0.5 rounded-md">
                        {product.nutrients[0]?.per100g} kcal
                      </span>
                      <span className="bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-md">
                        Fibre: {product.nutrients[3]?.per100g}g
                      </span>
                      <Link
                        to={`/product/${product.slug}`}
                        className="text-[#680183] font-bold hover:underline ml-auto"
                      >
                        Full details →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 sm:mt-3.5 pt-2 sm:pt-2.5 border-t border-stone-100 flex items-center gap-1.5 sm:gap-2">
          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-all ${
              addedAnimation
                ? "bg-[#4F0164] text-white"
                : "bg-[#680183] hover:bg-[#4F0164] text-white shadow-soft"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check size={13} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>Add</span>
              </>
            )}
          </button>

          {/* WhatsApp Order Quick Link */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:p-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white transition-colors shrink-0"
            title={`Order ${product.name} on WhatsApp`}
          >
            <WhatsAppIcon size={14} fill="#FFFFFF" />
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
