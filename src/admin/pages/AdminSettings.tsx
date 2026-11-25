import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Server,
  Activity,
  Key,
  ShieldAlert,
} from "lucide-react";

export const AdminSettings: React.FC = () => {
  const { admin } = useAdminAuth();

  // All empty - zero prefilled data
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; error: boolean } | null>(null);

  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    api
      .get("/health")
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: "offline" }));
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordMsg({ text: "Please enter both current and new password.", error: true });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMsg({ text: "New password must be at least 8 characters long.", error: true });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: "New passwords do not match.", error: true });
      return;
    }

    setSavingPassword(true);
    setPasswordMsg(null);

    try {
      await api.patch("/admin/auth/change-password", {
        currentPassword,
        newPassword,
      });

      setPasswordMsg({ text: "Password changed successfully!", error: false });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordMsg({
        text: err?.message || "Failed to change password. Verify your current password.",
        error: true,
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-stone-900">
          Security & System Settings
        </h1>
        <p className="text-xs text-stone-500 font-medium">
          Manage administrator credentials, session policies, and backend status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Change Password Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Key size={19} />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-stone-900">
                Change Admin Password
              </h3>
              <p className="text-[11px] text-stone-400 font-mono">
                {admin?.email}
              </p>
            </div>
          </div>

          {passwordMsg && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 font-medium ${
                passwordMsg.error
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              {passwordMsg.error ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-stone-500 mb-1.5 text-[10px]">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/40 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-stone-500 mb-1.5 text-[10px]">
                New Password (minimum 8 characters) *
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new secure password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/40 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-stone-500 mb-1.5 text-[10px]">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/40 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="w-full py-3 rounded-xl bg-[#143324] text-white font-bold hover:bg-[#1B4332] shadow-sm transition-all disabled:opacity-50 mt-2"
            >
              {savingPassword ? "Updating Password..." : "Save New Password"}
            </button>
          </form>
        </div>

        {/* System & Connection Status */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Server size={19} />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-stone-900">
                  Engine Architecture
                </h3>
                <p className="text-[11px] text-stone-400 font-medium">Node.js Express & MongoDB Cluster</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/70 flex items-center justify-between">
                <span className="text-stone-500 font-medium">API Health Status:</span>
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{health?.status === "ok" ? "Operational" : "Checking..."}</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/70 flex items-center justify-between">
                <span className="text-stone-500 font-medium">Database Layer:</span>
                <span className="font-mono font-bold text-stone-800">MongoDB Atlas / Mongoose</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/70 flex items-center justify-between">
                <span className="text-stone-500 font-medium">Email Dispatcher:</span>
                <span className="font-bold text-stone-800">Resend Primary + SMTP Fallback</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/70 flex items-center justify-between">
                <span className="text-stone-500 font-medium">Security Policy:</span>
                <span className="font-mono font-bold text-stone-800">SameSite=None HttpOnly Cookies</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed font-medium">
            <strong>Security Notice:</strong> All administrative endpoints enforce strict IP rate-limiting. Brute force attempts lock after 5 unsuccessful tries within a 15-minute window.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
