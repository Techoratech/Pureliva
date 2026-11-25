import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import {
  ShoppingBag,
  Clock,
  Globe,
  ArrowUpRight,
  AlertCircle,
  PackageCheck,
  TrendingUp,
  Inbox,
  Users,
  CreditCard,
} from "lucide-react";

interface AdminStats {
  totalOrders: number;
  todayOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  chartData: Array<{ date: string; orders: number; revenue: number }>;
  newMessages: number;
  newBulkEnquiries: number;
  totalProducts: number;
  totalSubscribers: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await api.get<AdminStats>("/admin/stats");
      setStats(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-stone-200/70 animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-stone-200/60 animate-pulse rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} />
          <span className="font-medium text-sm">{error || "Unable to fetch dashboard statistics"}</span>
        </div>
        <button
          onClick={loadStats}
          className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700"
        >
          Retry Load
        </button>
      </div>
    );
  }

  const maxOrders = Math.max(...stats.chartData.map((d) => d.orders), 1);

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Executive Summary
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            Live business overview, incoming customer seed orders, and B2B trade inquiries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 rounded-xl bg-[#143324] text-white text-xs font-bold hover:bg-[#1B4332] transition-all shadow-md flex items-center gap-2 hover:scale-[1.02]"
          >
            <span>Fulfillment Desk</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Orders */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex items-center justify-between text-stone-500 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shadow-xs">
              <ShoppingBag size={19} />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <h3 className="font-heading text-3xl font-extrabold text-stone-900">
              {stats.totalOrders}
            </h3>
            {stats.todayOrders > 0 && (
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                +{stats.todayOrders} today
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-400 mt-2 font-medium">Recorded in MongoDB</p>
        </div>

        {/* Total Revenue */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex items-center justify-between text-stone-500 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Gross Revenue
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-base shadow-xs">
              ₹
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-heading text-3xl font-extrabold text-stone-900">
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </h3>
          </div>
          <p className="text-[11px] text-stone-400 mt-2 font-medium">Excludes cancelled orders</p>
        </div>

        {/* Pending Orders */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex items-center justify-between text-stone-500 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Pending Orders
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs">
              <Clock size={19} />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <h3 className="font-heading text-3xl font-extrabold text-amber-800">
              {stats.ordersByStatus.new || 0}
            </h3>
            <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
              Awaiting Action
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2 font-medium">Ready for confirmation & packing</p>
        </div>

        {/* Inbound B2B Enquiries */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex items-center justify-between text-stone-500 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Inbound Leads
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shadow-xs">
              <Globe size={19} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-heading text-3xl font-extrabold text-purple-950">
              {stats.newBulkEnquiries + stats.newMessages}
            </h3>
            <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
              New
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2 font-medium">
            {stats.newBulkEnquiries} B2B Trade / {stats.newMessages} Contact Support
          </p>
        </div>
      </div>

      {/* Middle Grid: 7-Day Trend Chart & Operational Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Column */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-heading text-lg font-bold text-stone-900">
                Weekly Orders Volume
              </h3>
              <p className="text-xs text-stone-400 font-medium">Daily order frequency over the last 7 calendar days</p>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">
              Live Feed
            </span>
          </div>

          {/* Clean Modern Bar Graph */}
          <div className="h-60 flex items-end justify-between gap-3 sm:gap-6 pt-4 pb-2 border-b border-stone-100">
            {stats.chartData.map((day, idx) => {
              const heightPercent = Math.max(14, Math.round((day.orders / maxOrders) * 100));
              const displayDate = new Date(day.date).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
              });

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[11px] font-mono font-bold text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.orders}
                  </span>
                  <div
                    className="w-full max-w-[48px] rounded-t-2xl bg-[#143324] group-hover:bg-emerald-600 transition-all shadow-xs"
                    style={{ height: `${heightPercent}%` }}
                    title={`${day.date}: ${day.orders} orders (₹${day.revenue})`}
                  />
                  <span className="text-[10px] text-stone-400 font-medium whitespace-nowrap mt-1">
                    {displayDate}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline Column */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-stone-900 mb-1">
              Fulfillment Pipeline
            </h3>
            <p className="text-xs text-stone-400 mb-6 font-medium">Active stage distribution</p>

            <div className="space-y-3">
              {[
                { status: "new", label: "New Order", count: stats.ordersByStatus.new || 0, color: "bg-blue-500", text: "text-blue-700 bg-blue-50" },
                { status: "confirmed", label: "Confirmed", count: stats.ordersByStatus.confirmed || 0, color: "bg-amber-500", text: "text-amber-700 bg-amber-50" },
                { status: "packed", label: "Packed", count: stats.ordersByStatus.packed || 0, color: "bg-indigo-500", text: "text-indigo-700 bg-indigo-50" },
                { status: "shipped", label: "Shipped", count: stats.ordersByStatus.shipped || 0, color: "bg-purple-500", text: "text-purple-700 bg-purple-50" },
                { status: "delivered", label: "Delivered", count: stats.ordersByStatus.delivered || 0, color: "bg-emerald-500", text: "text-emerald-700 bg-emerald-50" },
                { status: "cancelled", label: "Cancelled", count: stats.ordersByStatus.cancelled || 0, color: "bg-rose-400", text: "text-rose-700 bg-rose-50" },
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between text-xs py-1.5 border-b border-stone-50">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="font-semibold text-stone-700">{item.label}</span>
                  </div>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded-md text-[11px] ${item.text}`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Live Catalog: <strong>{stats.totalProducts}</strong> products</span>
            <span>Subscribers: <strong>{stats.totalSubscribers}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
