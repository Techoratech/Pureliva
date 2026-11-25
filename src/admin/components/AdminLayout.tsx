import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "../context/AdminAuthContext";
import { api } from "../../lib/api";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Globe,
  Mail,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Bell,
  Sparkles,
} from "lucide-react";

export const AdminLayout: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState<{ newOrders: number; newMessages: number; newEnquiries: number }>({
    newOrders: 0,
    newMessages: 0,
    newEnquiries: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const loadBadges = async () => {
    try {
      const data = await api.get<any>("/admin/stats");
      if (data) {
        setCounts({
          newOrders: data.ordersByStatus?.new || 0,
          newMessages: data.newMessages || 0,
          newEnquiries: data.newBulkEnquiries || 0,
        });
      }
    } catch {
      // ignore badge fetch failures
    }
  };

  useEffect(() => {
    loadBadges();
  }, [location.pathname]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBadges();
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, end: true },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: counts.newOrders },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Bulk Enquiries", href: "/admin/enquiries", icon: Globe, badge: counts.newEnquiries },
    { label: "Contact Messages", href: "/admin/messages", icon: Mail, badge: counts.newMessages },
    { label: "Subscribers", href: "/admin/subscribers", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  // Derive active page title
  const currentNav = navItems.find((item) =>
    item.end ? location.pathname === item.href : location.pathname.startsWith(item.href)
  );
  const currentTitle = currentNav?.label || "Console";

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex text-stone-800 antialiased font-sans">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#143324] text-white z-50 flex flex-col justify-between transition-transform duration-300 ease-out border-r border-[#1B4332]/50 shadow-xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Header / Brand */}
            <div className="h-20 px-6 border-b border-emerald-900/40 flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-[#143324] flex items-center justify-center font-bold text-lg font-heading shadow-md group-hover:scale-105 transition-transform">
                  P
                </div>
                <div>
                  <span className="font-heading font-extrabold text-base tracking-wider block leading-tight text-white">
                    PURELIVA
                  </span>
                  <span className="text-[10px] text-emerald-300 font-medium uppercase tracking-widest block">
                    Admin Portal
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-emerald-300 hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="p-4 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-white text-[#143324] shadow-md font-bold"
                          : "text-emerald-100/75 hover:bg-emerald-900/40 hover:text-white"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900 shadow-xs"
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Footer of Sidebar */}
          <div className="p-4 border-t border-emerald-900/50 space-y-3 bg-[#0E2419]">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-emerald-200/90 hover:text-white hover:bg-emerald-800/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={14} />
                <span>Customer Website</span>
              </span>
              <ChevronRight size={14} className="opacity-60" />
            </a>

            <div className="px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800/30 flex items-center justify-between">
              <div className="truncate mr-2">
                <p className="text-xs font-bold text-white truncate">{admin?.name || "Administrator"}</p>
                <p className="text-[10px] text-emerald-300/80 truncate font-mono">{admin?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Logout from console"
                className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/70 transition-colors"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-18 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-400 font-medium">Console</span>
              <span className="text-stone-300">/</span>
              <span className="font-heading font-bold text-stone-900 text-sm">{currentTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              title="Refresh Stats & Feed"
              className="p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <RefreshCw size={15} className={refreshing ? "animate-spin text-emerald-600" : ""} />
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Online</span>
            </span>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl border border-stone-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content with Smooth Transition */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
