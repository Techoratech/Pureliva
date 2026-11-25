import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";

export const AdminLogin: React.FC = () => {
  // Empty states - NO prefilled data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Pureliva Admin Console</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-center items-center p-4 selection:bg-emerald-800 selection:text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl"
        >
          {/* Brand Logo & Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#143324] to-[#1B4332] text-white flex items-center justify-center font-bold text-2xl font-heading mx-auto shadow-md">
              P
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-stone-900 tracking-tight">
              Pureliva Admin Console
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Authorized personnel sign in for store operations
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium"
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="name@purelivafoods.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/40 focus:bg-white transition-colors"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-stone-400" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/40 focus:bg-white transition-colors"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-stone-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#143324] hover:bg-[#1B4332] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 hover:scale-[1.01]"
            >
              <span>{loading ? "Authenticating..." : "Sign in to Dashboard"}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-medium">
            <Link to="/" className="hover:text-stone-700 flex items-center gap-1 transition-colors">
              <ArrowLeft size={13} />
              <span>Back to Store</span>
            </Link>

            <span className="flex items-center gap-1 text-emerald-800">
              <ShieldCheck size={13} />
              <span>SSL Protected</span>
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;
