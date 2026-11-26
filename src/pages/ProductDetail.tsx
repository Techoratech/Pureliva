import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import NutritionTable from "../components/NutritionTable";
import ProductCard from "../components/ProductCard";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { buildProductOrderLink } from "../lib/whatsapp";
import {
  ShieldCheck,
  Leaf,
  Sparkles,
  ShoppingBag,
  Zap,
  ArrowLeft,
  Check,
  Heart,
  ZoomIn,
  Package,
  Layers,
  Award,
  ChevronRight,
  Info,
} from "lucide-react";

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.slug === slug);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Active gallery image: "front" | "back" | "bowl"
  const [activeImageKey, setActiveImageKey] = useState<"front" | "back" | "bowl">("front");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    setActiveImageKey("front");
    setQuantity(1);
    setIsZoomed(false);
    window.scrollTo(0, 0);

    // Save to recently viewed
    if (slug) {
      try {
        const stored = localStorage.getItem("pureliva_recently_viewed");
        const list: string[] = stored ? JSON.parse(stored) : [];
        const updated = [slug, ...list.filter((s) => s !== slug)].slice(0, 8);
        localStorage.setItem("pureliva_recently_viewed", JSON.stringify(updated));
      } catch (e) {
        // ignore storage errors
      }
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-white text-center flex flex-col items-center justify-center px-4">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-stone-500 mb-6 max-w-md text-sm">
          The natural seed variety you're looking for might have been updated or moved.
        </p>
        <Link
          to="/collections"
          className="px-6 py-3 rounded-full bg-pureliva-green text-white font-semibold text-xs hover:bg-emerald-800 transition-colors"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.slug);
  const otherProducts = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);
  const waUrl = buildProductOrderLink(product.titleWithVariant, quantity);

  // Gallery image selector
  const activeImageUrl =
    activeImageKey === "front"
      ? product.images.front || product.images.packFront
      : activeImageKey === "back"
      ? product.images.back || product.images.packBack
      : product.images.bowl;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin({ x, y });
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    // WhatsApp direct checkout
    const msg = `Hello Pureliva, I would like to order *${quantity}x ${product.name} (${product.variant}, ${product.netWeight})*. Please confirm availability!`;
    const url = buildProductOrderLink(product.titleWithVariant, quantity);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} (${product.variant}) | Pureliva Foods`}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://purelivafoods.com/product/${product.slug}`} />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 overflow-x-auto pb-1">
            <Link to="/" className="hover:text-pureliva-green transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link to="/collections" className="hover:text-pureliva-green transition-colors">
              Collections
            </Link>
            <ChevronRight size={12} />
            <Link
              to={`/collections/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-pureliva-green transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-stone-900 font-semibold truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          {/* Product Overview Section: Gallery + Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            {/* Left: Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display with Click / Hover Zoom */}
              <div
                className="relative w-full h-[380px] sm:h-[480px] bg-stone-50 rounded-3xl p-6 sm:p-8 flex items-center justify-center border border-stone-200/80 overflow-hidden cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {/* Background accent aura */}
                <div
                  className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: product.accent }}
                />

                <img
                  src={activeImageUrl}
                  alt={`${product.name} - ${activeImageKey}`}
                  className="w-full h-full object-contain transition-transform duration-200 select-none"
                  style={{
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                    transform: isZoomed ? "scale(2)" : "scale(1)",
                  }}
                />

                {/* Resealable zipper banner */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-stone-700 border border-stone-200 flex items-center gap-1.5 shadow-sm">
                  <Package size={12} className="text-pureliva-green" />
                  <span>Resealable Zipper Pouch</span>
                </div>

                {/* Zoom Hint */}
                <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 opacity-70">
                  <ZoomIn size={12} /> {isZoomed ? "Click to reset" : "Click to zoom"}
                </span>
              </div>

              {/* Thumbnails (Front, Back, Bowl) */}
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => setActiveImageKey("front")}
                  className={`w-20 h-24 rounded-2xl p-1.5 bg-stone-50 border-2 transition-all flex flex-col items-center justify-center ${
                    activeImageKey === "front"
                      ? "border-pureliva-green shadow-soft"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <img
                    src={product.images.front || product.images.packFront}
                    alt="Front of Pack"
                    className="w-full h-16 object-contain"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mt-1">
                    Front
                  </span>
                </button>

                {(product.images.back || product.images.packBack) && (
                  <button
                    type="button"
                    onClick={() => setActiveImageKey("back")}
                    className={`w-20 h-24 rounded-2xl p-1.5 bg-stone-50 border-2 transition-all flex flex-col items-center justify-center ${
                      activeImageKey === "back"
                        ? "border-pureliva-green shadow-soft"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <img
                      src={product.images.back || product.images.packBack}
                      alt="Back of Pack (Nutrition)"
                      className="w-full h-16 object-contain"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mt-1">
                      Back
                    </span>
                  </button>
                )}

                {product.images.bowl && (
                  <button
                    type="button"
                    onClick={() => setActiveImageKey("bowl")}
                    className={`w-20 h-24 rounded-2xl p-1.5 bg-stone-50 border-2 transition-all flex flex-col items-center justify-center ${
                      activeImageKey === "bowl"
                        ? "border-pureliva-green shadow-soft"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <img
                      src={product.images.bowl}
                      alt="Ready to eat seed bowl"
                      className="w-full h-16 object-contain"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mt-1">
                      Seeds
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: Product Details & Buying Actions (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Variant, Category, Wishlist */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${product.accent}15`,
                      color: product.accentTextDark ? "#855800" : product.accent,
                    }}
                  >
                    {product.variant}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-600">
                    {product.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.slug)}
                  className={`p-2.5 rounded-full border transition-colors ${
                    inWishlist
                      ? "bg-rose-50 border-rose-200 text-rose-500"
                      : "border-stone-200 text-stone-400 hover:text-rose-500"
                  }`}
                  title="Wishlist"
                >
                  <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
                  {product.name}
                </h1>
                <p className="font-script text-xl text-pureliva-brown mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Net Weight */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="font-heading text-3xl font-extrabold text-stone-900">
                  {product.pricePlaceholder || (product.price ? `₹${product.price}` : "[PRICE]")}
                </span>
                {product.mrp && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.mrp}
                  </span>
                )}
                <span className="text-xs text-stone-500 font-medium ml-auto">
                  Net Wt: <strong className="text-stone-800">{product.netWeight}</strong>
                </span>
              </div>

              {/* Description */}
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Stepper & Add to Cart / Buy Now / WhatsApp */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white text-stone-700 font-bold hover:bg-stone-100 flex items-center justify-center text-sm shadow-sm"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold font-mono text-stone-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white text-stone-700 font-bold hover:bg-stone-100 flex items-center justify-center text-sm shadow-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-stone-400">
                    ({quantity * 100}g total)
                  </span>
                </div>

                {/* Primary CTA Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`py-3.5 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-soft ${
                      addedAnimation
                        ? "bg-[#4F0164] text-white"
                        : "bg-[#680183] hover:bg-[#4F0164] text-white"
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check size={18} />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3.5 px-4 rounded-2xl bg-[#4F0164] hover:bg-purple-950 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-soft"
                  >
                    <Zap size={18} />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Order on WhatsApp Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-sm shadow-soft flex items-center justify-center gap-2.5 transition-all"
                >
                  <WhatsAppIcon size={20} fill="#FFFFFF" />
                  <span>Order on WhatsApp ({quantity} Pack{quantity > 1 ? "s" : ""})</span>
                </a>
              </div>

              {/* Key Highlights / Benefits Strip */}
              <div className="p-4 rounded-2xl bg-pureliva-cream border border-stone-200/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pureliva-green block">
                  Key Benefits
                </span>
                <ul className="space-y-1.5">
                  {product.benefits?.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check size={14} className="text-pureliva-green flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <Leaf size={16} className="text-pureliva-green mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-stone-700 block">100% Natural</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <ShieldCheck size={16} className="text-pureliva-green mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-stone-700 block">FSSAI Approved</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <Package size={16} className="text-pureliva-green mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-stone-700 block">Zipper Fresh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Info Tabs / Details: How to Use, Ingredients, Nutrition, Manufacturer */}
          <div className="mt-20 pt-10 border-t border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* How to Use + Ingredients (6 cols) */}
              <div className="lg:col-span-6 space-y-8">
                {/* How to Use */}
                <div>
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                    <span>How to Enjoy {product.name}</span>
                  </h3>
                  <div className="space-y-3">
                    {product.howToUse?.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-100"
                      >
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-pureliva-green text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ingredients & Storage Info */}
                <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Ingredients (As on Pack)
                    </span>
                    <p className="text-sm font-semibold text-stone-900">
                      {product.ingredients}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Storage Instructions
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {product.storage}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Allergen Advice
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {product.allergen}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200 text-xs text-stone-500 space-y-1">
                    <p>
                      <strong className="text-stone-700">Packed & Marketed by:</strong> PATIDAR ENTERPRISES
                    </p>
                    <p>31, Vaikunth Nagar, Khandwa, Madhya Pradesh - 450001, India</p>
                    <p>FSSAI License: 21426950001159</p>
                  </div>
                </div>
              </div>

              {/* Nutrition Table (6 cols) */}
              <div className="lg:col-span-6">
                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-4">
                  Lab-Tested Nutritional Value
                </h3>
                <NutritionTable product={product} />
              </div>
            </div>
          </div>

          {/* Related Products Carousel / Grid */}
          <div className="mt-24 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pureliva-green">
                  Wholesome Range
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  You May Also Like
                </h3>
              </div>
              <Link
                to="/collections"
                className="text-xs sm:text-sm font-semibold text-pureliva-green hover:underline"
              >
                View All Seeds &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {otherProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
