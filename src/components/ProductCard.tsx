import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildProductOrderLink } from "../lib/whatsapp";
import { Heart, ShoppingBag, Check, Eye } from "lucide-react";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.slug);
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

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between ${className}`}
      >
        <div>
          {/* Top Badges & Actions */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {discountPercent > 0 && (
                <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-extrabold bg-rose-600 text-white tracking-wide">
                  -{discountPercent}%
                </span>
              )}
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase"
                style={{
                  backgroundColor: `${product.accent}15`,
                  color: product.accentTextDark ? "#855800" : product.accent,
                }}
              >
                {product.variant || product.type}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Quick View Button */}
              <button
                type="button"
                onClick={handleOpenQuickView}
                className="p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label={`Quick view ${product.name}`}
                title="Quick View"
              >
                <Eye size={16} />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  inWishlist
                    ? "text-rose-500 bg-rose-50"
                    : "text-stone-400 hover:text-rose-500 hover:bg-stone-50"
                }`}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                title="Wishlist"
              >
                <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Product Image Container with Front/Back hover flip */}
          <Link
            to={`/product/${product.slug}`}
            className="block relative w-full h-56 sm:h-64 my-1 flex items-center justify-center overflow-hidden rounded-2xl bg-stone-50/60 p-2"
            aria-label={`View ${product.name} details`}
          >
            {/* Subtle accent glow on hover */}
            <div
              className="absolute w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
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
            <span className="absolute bottom-2 left-2 bg-stone-900/75 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">
              Zipper Pouch • {product.netWeight}
            </span>
          </Link>

          {/* Details */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span>{product.category}</span>
              <span className="font-mono text-stone-600">
                {product.nutrients[1]?.label}: {product.nutrients[1]?.per100g}g
              </span>
            </div>

            <h3 className="font-heading text-base sm:text-lg font-bold text-stone-900 group-hover:text-pureliva-green transition-colors leading-tight">
              <Link to={`/product/${product.slug}`}>
                {product.name}
              </Link>
            </h3>

            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="pt-2 flex items-baseline gap-2 flex-wrap">
              <span className="font-heading text-base font-bold text-stone-900">
                {product.pricePlaceholder || (product.price ? `₹${product.price}` : "[PRICE]")}
              </span>
              {product.mrp && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
              {savings > 0 && (
                <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.2 rounded">
                  Save ₹{savings}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              addedAnimation
                ? "bg-emerald-600 text-white"
                : "bg-pureliva-green hover:bg-emerald-900 text-white shadow-soft"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check size={14} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* WhatsApp Order Quick Link */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white transition-colors"
            title={`Order ${product.name} on WhatsApp`}
          >
            <WhatsAppIcon size={16} fill="#FFFFFF" />
          </a>
        </div>
      </motion.div>

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
