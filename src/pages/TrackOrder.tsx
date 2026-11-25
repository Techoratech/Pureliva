import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, PackageCheck, Clock, CheckCircle2, AlertCircle, ShoppingBag, Truck, MapPin } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { api } from "../lib/api";

interface TrackedOrder {
  orderNumber: string;
  status: "new" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  statusHistory: Array<{
    status: string;
    note?: string;
    at: string;
  }>;
  total: number;
  paymentMethod: string;
  createdAt: string;
  items: Array<{
    title: string;
    quantity: number;
  }>;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  confirmed: "bg-amber-50 text-amber-700 border-amber-200",
  packed: "bg-indigo-50 text-indigo-700 border-indigo-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

export const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !phone.trim()) {
      setError("Please provide both Order Number and Phone Number");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const data = await api.get<TrackedOrder>(
        `/orders/track?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`
      );
      setOrder(data);
    } catch (err: any) {
      setError(err?.message || "No order found matching these details. Please verify your info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order | Pureliva Foods</title>
        <meta
          name="description"
          content="Track live status and dispatch updates for your Pureliva Foods natural seeds order using your Order Number and Phone."
        />
        <link rel="canonical" href="https://purelivafoods.com/track-order" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Live Status"
            title="Track Your Order"
            subtitle="Enter your order number (e.g. PUR-2026-000123) and billing phone number to see latest dispatch and delivery updates."
            align="center"
          />

          {/* Search Box */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-pureliva-cream border border-stone-200/80 shadow-soft max-w-2xl mx-auto">
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PUR-2026-000123"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-pureliva-green uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-pureliva-green"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-pureliva-green hover:bg-pureliva-forest text-white font-semibold text-sm shadow-soft transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Searching order...</span>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Track Order Status</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Card */}
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-soft space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block font-mono">Order Reference</span>
                  <h3 className="font-heading text-2xl font-bold text-pureliva-heading">
                    {order.orderNumber}
                  </h3>
                  <span className="text-xs text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      statusColors[order.status] || "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h4 className="text-sm font-bold text-pureliva-heading mb-4 flex items-center gap-2">
                  <Truck size={18} className="text-pureliva-green" />
                  <span>Tracking Timeline</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-pureliva-green/20">
                  {order.statusHistory.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-pureliva-green ring-4 ring-emerald-50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-pureliva-heading capitalize">
                          {step.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(step.at).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                      {step.note && <p className="text-xs text-gray-600 mt-1">{step.note}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Items Summary */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-pureliva-heading mb-3 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-pureliva-green" />
                  <span>Items in this Order</span>
                </h4>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs sm:text-sm py-1.5 border-b border-gray-50">
                      <span className="text-gray-700">{item.title}</span>
                      <span className="font-semibold text-pureliva-heading">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 mt-2">
                  <span className="text-xs text-gray-500">Total Order Amount ({order.paymentMethod})</span>
                  <span className="font-heading text-lg font-bold text-pureliva-green">₹{order.total}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
