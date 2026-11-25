import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Search,
  Download,
  Filter,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  Truck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react";

interface OrderItem {
  productId: string;
  slug: string;
  title: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingCharge: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  status: "new" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  statusHistory: Array<{
    status: string;
    note?: string;
    at: string;
  }>;
  createdAt: string;
}

const statusBadgeStyles: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  confirmed: "bg-amber-50 text-amber-700 border-amber-200",
  packed: "bg-indigo-50 text-indigo-700 border-indigo-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Status updating state (NO prefilled dummy notes)
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [statusNote, setStatusNote] = useState<string>("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
        search,
        status,
      });

      const res = await api.get<any>(`/admin/orders?${params.toString()}`);
      setOrders(res.orders || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotalCount(res.pagination?.total || 0);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [page, status]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadOrders();
  };

  const handleExportCsv = () => {
    const apiBase =
      (import.meta as any).env?.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api/v1";
    window.open(`${apiBase}/admin/orders?export=csv`, "_blank");
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    try {
      setUpdatingStatus(true);
      const updated = await api.patch<Order>(`/admin/orders/${selectedOrder._id}/status`, {
        status: newStatus,
        note: statusNote.trim() || undefined,
        notifyCustomer: true,
      });

      setSelectedOrder(updated);
      setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
      setStatusNote("");
    } catch (err: any) {
      alert(err?.message || "Failed to update order status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-stone-900">Orders & Fulfillment</h1>
          <p className="text-xs text-stone-500 font-medium">
            Track incoming purchases, verify delivery details, and update dispatch stages
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download size={15} />
          <span>Export All (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by Order #, Customer Name, Phone, or City..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-700"
            />
            <Search size={14} className="absolute left-3 top-2.5 text-stone-400" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#143324] text-white text-xs font-bold hover:bg-[#1B4332] transition-colors shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-stone-400" />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-emerald-700 font-medium"
          >
            <option value="all">All Stages ({totalCount})</option>
            <option value="new">New</option>
            <option value="confirmed">Confirmed</option>
            <option value="packed">Packed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-5">Order Reference</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">City</th>
                <th className="py-4 px-5">Items Breakdown</th>
                <th className="py-4 px-5">Total</th>
                <th className="py-4 px-5">Date Placed</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-stone-400">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-stone-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-emerald-800 text-sm">
                      {ord.orderNumber}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-stone-900">{ord.customer.name}</div>
                      <div className="text-[11px] text-stone-400 font-mono">{ord.customer.phone}</div>
                    </td>
                    <td className="py-4 px-5 text-stone-600 font-medium">{ord.address.city}</td>
                    <td className="py-4 px-5 text-stone-700">
                      <span className="font-bold text-stone-900">
                        {ord.items.reduce((s, i) => s + i.quantity, 0)} pouches
                      </span>
                      <span className="text-[11px] text-stone-400 block truncate max-w-[170px]">
                        {ord.items.map((i) => `${i.quantity}x ${i.title}`).join(", ")}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-heading font-extrabold text-stone-900 text-sm">
                      ₹{ord.total}
                    </td>
                    <td className="py-4 px-5 text-stone-500 whitespace-nowrap">
                      {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] border ${
                          statusBadgeStyles[ord.status] || "bg-stone-100 text-stone-700 border-stone-200"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => {
                          setSelectedOrder(ord);
                          setNewStatus(ord.status);
                          setStatusNote(""); // No prefilled dummy note
                        }}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-[#143324] hover:text-white hover:border-[#143324] text-stone-600 transition-colors shadow-xs"
                        title="View Full Order Drawer"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>
              Page {page} of {totalPages} ({totalCount} total orders)
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-40 font-semibold"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-40 font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-stone-200">
            <div>
              {/* Drawer Top Header */}
              <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-bold">Order Details</span>
                  <h3 className="font-heading text-xl font-extrabold text-stone-900">
                    {selectedOrder.orderNumber}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-6 text-xs text-stone-600">
                {/* Status Change Control */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm">
                      Update Fulfillment Status
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] border ${
                        statusBadgeStyles[selectedOrder.status]
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-semibold focus:outline-none focus:border-emerald-700"
                    >
                      <option value="new">New</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Note for tracking log (emailed to customer)..."
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:border-emerald-700"
                    />

                    <button
                      type="button"
                      disabled={updatingStatus || newStatus === selectedOrder.status}
                      onClick={handleUpdateStatus}
                      className="w-full py-2.5 rounded-xl bg-[#143324] text-white font-bold text-xs hover:bg-[#1B4332] transition-colors disabled:opacity-40 shadow-xs"
                    >
                      {updatingStatus ? "Saving Status..." : "Save Status & Notify Customer"}
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-2 pb-4 border-b border-stone-100">
                  <h4 className="font-bold text-stone-900 text-sm">Customer & Shipping Address</h4>
                  <p className="font-bold text-stone-800 text-sm">{selectedOrder.customer.name}</p>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-stone-400" />
                    <span className="font-mono">{selectedOrder.customer.phone}</span>
                    <a
                      href={`https://wa.me/91${selectedOrder.customer.phone.replace(/\D/g, "").slice(-10)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline ml-1"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                  {selectedOrder.customer.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-stone-400" />
                      <span>{selectedOrder.customer.email}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 pt-1">
                    <MapPin size={14} className="text-stone-400 shrink-0 mt-0.5" />
                    <span>
                      {selectedOrder.address.line1}, {selectedOrder.address.city},{" "}
                      {selectedOrder.address.state} – {selectedOrder.address.pincode}
                    </span>
                  </div>
                </div>

                {/* Items Ordered */}
                <div className="space-y-3 pb-4 border-b border-stone-100">
                  <h4 className="font-bold text-stone-900 text-sm">Products in this Order</h4>
                  <div className="space-y-2.5">
                    {selectedOrder.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1">
                        <div>
                          <strong className="text-stone-900 block font-semibold">{i.title}</strong>
                          <span className="text-[11px] text-stone-400 font-mono">SKU: {i.sku}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-stone-900">
                            {i.quantity} × ₹{i.unitPrice}
                          </span>
                          <span className="text-[11px] text-stone-400 block font-mono">
                            ₹{i.quantity * i.unitPrice}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-1 font-medium">
                    <div className="flex justify-between text-stone-500">
                      <span>Subtotal:</span>
                      <span>₹{selectedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Shipping:</span>
                      <span className="text-emerald-700 font-bold">
                        {selectedOrder.shippingCharge === 0 ? "FREE" : "₹" + selectedOrder.shippingCharge}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                      <span>Total Amount:</span>
                      <span className="text-emerald-800">₹{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>

                {/* Status Timeline History */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm">Status Log History</h4>
                  <div className="relative pl-4 space-y-4 before:content-[''] before:absolute before:left-1 before:top-1 before:bottom-1 before:w-0.5 before:bg-stone-200">
                    {selectedOrder.statusHistory.map((h, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-emerald-700 ring-2 ring-emerald-100" />
                        <div className="flex justify-between">
                          <strong className="capitalize text-stone-800">{h.status}</strong>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {new Date(h.at).toLocaleDateString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {h.note && <p className="text-[11px] text-stone-500 mt-0.5">{h.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer close */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
