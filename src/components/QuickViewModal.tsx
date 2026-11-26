import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildProductOrderLink } from "../lib/whatsapp";
import {
  X,
  ShoppingBag,
  Heart,
  Check,
  Package,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.slug);
  const discountPercent =
    product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const waUrl = buildProductOrderLink(product.titleWithVariant, quantity);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Gallery Left (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative w-full h-64 sm:h-72 bg-stone-50 rounded-2xl p-4 flex items-center justify-center border border-stone-100 overflow-hidden">
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-[#e84e4e] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    -{discountPercent}%
                  </span>
                )}

                <img
                  src={
                    activeImage === "front"
                      ? product.images.front || product.images.packFront
                      : product.images.back || product.images.packBack
                  }
                  alt={product.name}
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => setActiveImage("front")}
                  className={`w-14 h-16 rounded-xl p-1 bg-stone-50 border-2 transition-all ${
                    activeImage === "front" ? "border-pureliva-green shadow-sm" : "border-stone-200"
                  }`}
                >
                  <img
                    src={product.images.front || product.images.packFront}
                    alt="Front"
                    className="w-full h-full object-contain"
                  />
                </button>
                {(product.images.back || product.images.packBack) && (
                  <button
                    type="button"
                    onClick={() => setActiveImage("back")}
                    className={`w-14 h-16 rounded-xl p-1 bg-stone-50 border-2 transition-all ${
                      activeImage === "back" ? "border-pureliva-green shadow-sm" : "border-stone-200"
                    }`}
                  >
                    <img
                      src={product.images.back || product.images.packBack}
                      alt="Back"
                      className="w-full h-full object-contain"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Info Right (7 cols) */}
            <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-pureliva-green uppercase tracking-wider text-[10px]">
                    {product.category}
                  </span>
                  <span>SKU: {product.sku}</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-stone-900 leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {product.variant}
                </p>

                {/* Price block */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-heading text-2xl font-bold text-[#e84e4e]">
                    ₹{product.price}
                  </span>
                  {product.mrp && (
                    <span className="text-sm text-stone-400 line-through">
                      ₹{product.mrp}
                    </span>
                  )}
                  {product.mrp && product.price && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      You save ₹{product.mrp - product.price}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Size pill */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <span className="text-xs font-semibold text-stone-700 block mb-1.5">
                    Size:
                  </span>
                  <div className="inline-block px-3 py-1 rounded-lg border-2 border-[#680183] text-xs font-bold text-[#680183] bg-purple-50">
                    {product.netWeight}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded-lg bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-10 text-center text-xs font-bold font-mono text-stone-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 rounded-lg bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t border-stone-100">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      added
                        ? "bg-[#4F0164] text-white"
                        : "bg-[#680183] hover:bg-[#4F0164] text-white"
                    }`}
                  >
                    {added ? <Check size={14} /> : <ShoppingBag size={14} />}
                    <span>{added ? "Added!" : "Add to Cart"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.slug)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                      inWishlist
                        ? "border-rose-300 bg-rose-50 text-rose-600"
                        : "border-stone-200 text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
                    <span>{inWishlist ? "Wishlisted" : "Wishlist"}</span>
                  </button>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-soft transition-colors"
                >
                  <WhatsAppIcon size={16} fill="#FFFFFF" />
                  <span>Order on WhatsApp</span>
                </a>

                <div className="text-center pt-1">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="text-xs text-[#680183] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>View full product details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
