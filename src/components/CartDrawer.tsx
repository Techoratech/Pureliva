import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import WhatsAppIcon from "./WhatsAppIcon";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    checkoutWhatsApp,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-pureliva-cream">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-pureliva-green flex items-center justify-center">
                  <ShoppingBag size={17} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-stone-900 text-lg leading-tight">
                    Your Seed Cart
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    {totalItems} {totalItems === 1 ? "item" : "items"} selected
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-stone-800">
                      Your Cart is Empty
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 max-w-xs">
                      Explore our 100% natural raw and roasted seeds packed with daily nutrition.
                    </p>
                  </div>
                  <Link
                    to="/collections"
                    onClick={closeCart}
                    className="mt-2 px-6 py-2.5 rounded-full bg-pureliva-green text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    Explore Products
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-100"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-20 bg-white rounded-xl p-1 flex items-center justify-center flex-shrink-0 border border-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-sm font-bold text-stone-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {item.variant} • {item.netWeight}
                      </p>
                      <p className="text-xs font-bold text-pureliva-green mt-1">
                        {item.priceDisplay || `₹${item.price}`}
                      </p>

                      {/* Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-100 text-xs transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-semibold font-mono text-stone-800 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-100 text-xs transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-stone-100 bg-stone-50/80 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500 font-medium">Subtotal</span>
                  <span className="font-heading font-bold text-stone-900 text-lg">
                    {subtotal > 0 ? `₹${subtotal}` : "[PRICE]"}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Taxes & free standard dispatch calculated at confirmation.
                </p>

                {/* Primary WhatsApp Checkout Button */}
                <button
                  type="button"
                  onClick={checkoutWhatsApp}
                  className="w-full py-3.5 px-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-sm shadow-soft flex items-center justify-center gap-2.5 transition-all"
                >
                  <WhatsAppIcon size={20} fill="#FFFFFF" />
                  <span>Order on WhatsApp</span>
                </button>

                {/* Or Custom Order Builder link */}
                <Link
                  to="/order"
                  onClick={closeCart}
                  className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Build Custom Box & Track Online</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
