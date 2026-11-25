import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import BulkExport from "./pages/BulkExport";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";

// Admin Context & Layout
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import { AdminProtectedRoute } from "./admin/components/AdminProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";

// Lazy-loaded Admin Pages
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminOrders = lazy(() => import("./admin/pages/AdminOrders"));
const AdminProducts = lazy(() => import("./admin/pages/AdminProducts"));
const AdminEnquiries = lazy(() => import("./admin/pages/AdminEnquiries"));
const AdminMessages = lazy(() => import("./admin/pages/AdminMessages"));
const AdminSubscribers = lazy(() => import("./admin/pages/AdminSubscribers"));
const AdminSettings = lazy(() => import("./admin/pages/AdminSettings"));

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Initialize Lenis smooth scroll for public customer pages
  useLenis();

  // Check sessionStorage for first load intro animation
  const [showPreloader, setShowPreloader] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("pureliva_intro_seen") !== "true";
    } catch {
      return true;
    }
  });

  return (
    <AdminAuthProvider>
      <div className="min-h-screen flex flex-col bg-white text-pureliva-body selection:bg-pureliva-green selection:text-white">
        {/* First-load Intro Animation (Hidden on admin routes) */}
        {showPreloader && !isAdminRoute && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}

        {/* Top Green Scroll Progress Bar (Hidden on admin routes) */}
        {!isAdminRoute && <ScrollProgress />}

        {/* Custom Desktop Interactive Cursor (Hidden on admin routes) */}
        {!isAdminRoute && <CustomCursor />}

        {/* Scroll to Top on route change */}
        <ScrollToTop />

        {/* Global Navbar (Hidden on admin routes) */}
        {!isAdminRoute && <Navbar />}

        {/* Route Viewports */}
        <main className="flex-grow">
          {isAdminRoute ? (
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="w-8 h-8 border-3 border-pureliva-green border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="enquiries" element={<AdminEnquiries />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="subscribers" element={<AdminSubscribers />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Routes>
            </Suspense>
          ) : (
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <PageTransition>
                      <Products />
                    </PageTransition>
                  }
                />
                <Route
                  path="/products/:slug"
                  element={
                    <PageTransition>
                      <ProductDetail />
                    </PageTransition>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PageTransition>
                      <About />
                    </PageTransition>
                  }
                />
                <Route
                  path="/bulk-export"
                  element={
                    <PageTransition>
                      <BulkExport />
                    </PageTransition>
                  }
                />
                <Route
                  path="/order"
                  element={
                    <PageTransition>
                      <Order />
                    </PageTransition>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageTransition>
                      <Contact />
                    </PageTransition>
                  }
                />
                <Route
                  path="/track-order"
                  element={
                    <PageTransition>
                      <TrackOrder />
                    </PageTransition>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PageTransition>
                      <NotFound />
                    </PageTransition>
                  }
                />
              </Routes>
            </AnimatePresence>
          )}
        </main>

        {/* Floating WhatsApp Action Button (Hidden on admin routes) */}
        {!isAdminRoute && <FloatingWhatsApp />}

        {/* Global Footer (Hidden on admin routes) */}
        {!isAdminRoute && <Footer />}
      </div>
    </AdminAuthProvider>
  );
};

export default App;
