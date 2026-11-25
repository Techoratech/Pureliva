import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "../data/products";
import Img from "../components/Img";
import QuantityStepper from "../components/QuantityStepper";
import WhatsAppIcon from "../components/WhatsAppIcon";
import SectionHeading from "../components/SectionHeading";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { api } from "../lib/api";
import { fetchProducts } from "../lib/products.service";
import {
  ShoppingBag,
  Check,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

export const Order: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [mountTime] = useState<number>(() => Date.now());

  // State for selected product items and their quantities
  const [selectedItems, setSelectedItems] = useState<{ [slug: string]: { selected: boolean; quantity: number } }>(
    PRODUCTS.reduce((acc, p, idx) => {
      acc[p.slug] = { selected: idx === 0, quantity: 1 };
      return acc;
    }, {} as { [slug: string]: { selected: boolean; quantity: number } })
  );

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
    _hp: "", // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
    total: number;
    whatsappMessage: string;
  } | null>(null);

  // Fetch products with backend data (prices etc)
  useEffect(() => {
    fetchProducts().then((prods) => {
      if (prods && prods.length > 0) {
        setProductList(prods);
      }
    });
  }, []);

  const toggleSelect = (slug: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        selected: !prev[slug]?.selected,
        quantity: prev[slug]?.quantity || 1,
      },
    }));
  };

  const updateQuantity = (slug: string, qty: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        quantity: qty,
      },
    }));
  };

  const getActiveOrders = () => {
    const list: Array<{ slug: string; name: string; quantity: number; price?: number }> = [];
    productList.forEach((p) => {
      const state = selectedItems[p.slug];
      if (state && state.selected && state.quantity > 0) {
        list.push({
          slug: p.slug,
          name: p.titleWithVariant,
          quantity: state.quantity,
          price: (p as any).price || 99,
        });
      }
    });
    return list;
  };

  const activeOrders = getActiveOrders();
  const totalPacks = activeOrders.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedSubtotal = activeOrders.reduce((sum, item) => sum + (item.price || 99) * item.quantity, 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeOrders.length === 0) {
      setErrorMessage("Please select at least one product for your order.");
      return;
    }

    // Required fields validation
    if (!customerInfo.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    const cleanPhone = customerInfo.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    if (!customerInfo.line1.trim() || customerInfo.line1.trim().length < 5) {
      setErrorMessage("Please enter complete delivery address (at least 5 characters).");
      return;
    }
    if (!customerInfo.city.trim()) {
      setErrorMessage("Please enter your city.");
      return;
    }
    if (!/^[1-9][0-9]{5}$/.test(customerInfo.pincode.trim())) {
      setErrorMessage("Please enter a valid 6-digit Indian PIN code.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const payload = {
        customer: {
          name: customerInfo.name.trim(),
          phone: customerInfo.phone.trim(),
          email: customerInfo.email.trim() || undefined,
        },
        address: {
          line1: customerInfo.line1.trim(),
          city: customerInfo.city.trim(),
          state: customerInfo.state.trim() || "Madhya Pradesh",
          pincode: customerInfo.pincode.trim(),
        },
        items: activeOrders.map((i) => ({
          slug: i.slug,
          quantity: i.quantity,
        })),
        paymentMethod: "WhatsApp",
        notes: customerInfo.notes.trim() || undefined,
        _hp: customerInfo._hp,
        _timestamp: mountTime,
      };

      const result = await api.post<any>("/orders", payload);

      setOrderSuccess({
        orderNumber: result.orderNumber,
        total: result.total,
        whatsappMessage: result.whatsappMessage,
      });

      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to place order. Please try again or reach out on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!orderSuccess) return;
    const waUrl = buildWhatsAppLink(orderSuccess.whatsappMessage);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const resetForm = () => {
    setOrderSuccess(null);
    setCustomerInfo({
      name: "",
      phone: "",
      email: "",
      line1: "",
      city: "",
      state: "",
      pincode: "",
      notes: "",
      _hp: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Build Your Order | Pureliva Foods</title>
        <meta
          name="description"
          content="Select multiple natural seed varieties, set custom quantities, and send your combined order directly to Pureliva on WhatsApp."
        />
        <link rel="canonical" href="https://purelivafoods.com/order" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            badge="Custom Seed Box"
            title="Build Your Custom Pureliva Order"
            subtitle="Choose your favorite seed varieties, customize pouch quantities, and place your order directly. You will receive an instant order number and can confirm on WhatsApp."
            align="center"
          />

          <AnimatePresence mode="wait">
            {orderSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-12 max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-pureliva-cream border border-emerald-200/80 shadow-soft text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-pureliva-green flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={36} />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Order Successfully Registered
                </span>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-pureliva-heading mt-4">
                  Thank You, {customerInfo.name}!
                </h3>

                <p className="text-sm text-pureliva-body mt-2">
                  Your order has been recorded in our dispatch system.
                </p>

                <div className="mt-6 p-5 rounded-2xl bg-white border border-stone-200 text-left space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Order Number:</span>
                    <span className="font-mono font-bold text-pureliva-green text-base">
                      {orderSuccess.orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Total Amount:</span>
                    <span className="font-heading font-bold text-pureliva-heading text-lg">
                      ₹{orderSuccess.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Delivery To:</span>
                    <span className="text-gray-800 text-xs sm:text-sm truncate max-w-[220px]">
                      {customerInfo.city} ({customerInfo.pincode})
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="w-full py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-3 transition-all"
                  >
                    <WhatsAppIcon size={24} fill="#FFFFFF" />
                    <span>Send Order on WhatsApp ({orderSuccess.orderNumber})</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full py-3 rounded-2xl bg-transparent hover:bg-stone-200/50 text-gray-600 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={15} />
                    <span>Place Another Order</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitOrder}>
                {/* Honeypot hidden input */}
                <input
                  type="text"
                  name="_hp"
                  value={customerInfo._hp}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, _hp: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
                  {/* Left: Product Selection List */}
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="font-heading text-xl font-bold text-pureliva-heading mb-4 flex items-center justify-between">
                      <span>Select Products (100g Pouches)</span>
                      <span className="text-xs font-normal text-gray-500 font-body">
                        Tap to add or remove
                      </span>
                    </h3>

                    {productList.map((prod) => {
                      const isSelected = selectedItems[prod.slug]?.selected;
                      const qty = selectedItems[prod.slug]?.quantity || 1;
                      const price = (prod as any).price || 99;

                      return (
                        <motion.div
                          key={prod.slug}
                          layout
                          className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 flex items-center gap-4 ${
                            isSelected
                              ? "bg-white border-pureliva-green shadow-soft"
                              : "bg-gray-50/70 border-gray-200/80 hover:bg-white"
                          }`}
                        >
                          {/* Checkbox button */}
                          <button
                            type="button"
                            onClick={() => toggleSelect(prod.slug)}
                            aria-label={`Toggle ${prod.name}`}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-pureliva-green text-white"
                                : "border-2 border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check size={16} strokeWidth={3} />}
                          </button>

                          {/* Small Bowl Image */}
                          <div
                            onClick={() => toggleSelect(prod.slug)}
                            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 cursor-pointer flex items-center justify-center"
                          >
                            <Img
                              src={prod.images.bowl}
                              alt={`${prod.name} bowl`}
                              transparent
                              className="w-full h-full object-contain filter drop-shadow-sm"
                            />
                          </div>

                          {/* Product Info */}
                          <div
                            onClick={() => toggleSelect(prod.slug)}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: prod.accent }}
                              />
                              <span className="text-xs text-gray-400 uppercase font-semibold">
                                {prod.type}
                              </span>
                            </div>
                            <h4 className="font-heading text-base sm:text-lg font-bold text-pureliva-heading">
                              {prod.name}
                            </h4>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-xs font-bold text-pureliva-green">
                                ₹{price} / pouch
                              </span>
                              {(prod as any).mrp > price && (
                                <span className="text-[11px] text-gray-400 line-through">
                                  ₹{(prod as any).mrp}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Stepper (Active when selected) */}
                          <div className="shrink-0 flex flex-col items-end">
                            {isSelected ? (
                              <QuantityStepper
                                value={qty}
                                onChange={(val) => updateQuantity(prod.slug, val)}
                                size="sm"
                                min={1}
                                max={10}
                              />
                            ) : (
                              <button
                                type="button"
                                onClick={() => toggleSelect(prod.slug)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-pureliva-green bg-pureliva-green/10 hover:bg-pureliva-green/20 transition-colors"
                              >
                                + Add
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Right: Live Order Summary & Delivery Details */}
                  <div className="lg:col-span-5 sticky top-28 space-y-6">
                    <div className="p-6 sm:p-8 rounded-3xl bg-pureliva-cream border border-stone-200/80 shadow-soft">
                      <div className="flex items-center justify-between pb-4 border-b border-stone-200/70">
                        <h3 className="font-heading text-xl font-bold text-pureliva-heading flex items-center gap-2">
                          <ShoppingBag size={20} className="text-pureliva-green" />
                          <span>Order Summary</span>
                        </h3>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pureliva-green/10 text-pureliva-green">
                          {totalPacks} {totalPacks === 1 ? "Pack" : "Packs"} Total
                        </span>
                      </div>

                      {/* Selected Items Breakdown */}
                      <div className="py-4 space-y-2.5 max-h-56 overflow-y-auto no-scrollbar">
                        {activeOrders.length === 0 ? (
                          <div className="py-6 text-center text-xs text-gray-400">
                            No products selected yet. Tick products from the list to build your order.
                          </div>
                        ) : (
                          activeOrders.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-stone-200/40"
                            >
                              <span className="font-medium text-pureliva-heading truncate max-w-[180px]">
                                {item.name}
                              </span>
                              <div className="text-right">
                                <span className="font-mono font-bold text-pureliva-green">
                                  {item.quantity} × ₹{item.price}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Estimated Total */}
                      {activeOrders.length > 0 && (
                        <div className="pt-3 pb-2 border-t border-stone-200/70 flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-600">Subtotal (Free Shipping)</span>
                          <span className="font-heading font-bold text-pureliva-heading text-lg">
                            ₹{estimatedSubtotal}
                          </span>
                        </div>
                      )}

                      {/* Required Delivery Fields */}
                      <div className="pt-4 border-t border-stone-200/70 space-y-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                          Delivery & Contact Details (Required)
                        </span>

                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Full Name *"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="tel"
                            required
                            placeholder="10-Digit Mobile Phone *"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                          />
                          <input
                            type="email"
                            placeholder="Email (for order invoice)"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            placeholder="House / Street / Area Address *"
                            value={customerInfo.line1}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, line1: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="City *"
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                          />
                          <input
                            type="text"
                            required
                            placeholder="6-Digit PIN Code *"
                            value={customerInfo.pincode}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                          />
                        </div>
                      </div>

                      {errorMessage && (
                        <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
                          <AlertCircle size={15} />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Submit Order Button */}
                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={loading || activeOrders.length === 0}
                          className="w-full py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2.5 transition-all"
                        >
                          <WhatsAppIcon size={22} fill="#FFFFFF" />
                          <span>
                            {loading ? "Registering Order..." : `Place Order & WhatsApp (${totalPacks} Packs)`}
                          </span>
                        </button>
                      </div>

                      <div className="mt-4 text-[11px] text-gray-400 text-center leading-relaxed">
                        We generate your official order number, verify items from stock, and connect on WhatsApp for dispatch tracking.
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Order;
