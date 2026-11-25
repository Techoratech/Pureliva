import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Mail,
  Trash2,
  CheckCircle2,
  Phone,
  Filter,
  MessageSquare,
  Clock,
} from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const statusBadge: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  read: "bg-gray-100 text-gray-700 border-gray-200",
  replied: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get<any>(
        `/admin/contact-messages?status=${status}&page=${page}&limit=15`
      );
      setMessages(res.messages || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [page, status]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await api.patch<ContactMessage>(`/admin/contact-messages/${id}`, {
        status: newStatus,
      });
      setMessages((prev) => prev.map((m) => (m._id === id ? updated : m)));
    } catch (err: any) {
      alert(err?.message || "Failed to update message status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this contact message?")) return;
    try {
      await api.delete(`/admin/contact-messages/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err: any) {
      alert(err?.message || "Failed to delete message");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-pureliva-heading">
            Customer Inquiries & Feedback
          </h1>
          <p className="text-xs text-gray-500">
            Messages received via the website contact form and support channels
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-pureliva-green"
          >
            <option value="all">All Messages</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-gray-400 bg-white rounded-3xl border border-gray-200">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-gray-400 bg-white rounded-3xl border border-gray-200">
            No contact messages found.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="p-6 rounded-3xl bg-white border border-gray-200 shadow-soft hover:shadow-soft-lg transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-pureliva-green flex items-center justify-center font-bold">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-pureliva-heading">
                      {msg.subject || "General Inquiry"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      From: <strong>{msg.name}</strong> •{" "}
                      {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={msg.status}
                    onChange={(e) => handleUpdateStatus(msg._id, e.target.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border focus:outline-none ${
                      statusBadge[msg.status]
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Message text */}
              <div className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/60 text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>

              {/* Quick Contact links */}
              <div className="flex items-center gap-4 text-xs pt-1 text-gray-500">
                <a
                  href={`mailto:${msg.email}`}
                  className="hover:text-pureliva-green flex items-center gap-1.5 transition-colors"
                >
                  <Mail size={14} />
                  <span>Reply via Email ({msg.email})</span>
                </a>

                {msg.phone && (
                  <a
                    href={`https://wa.me/91${msg.phone.replace(/\D/g, "").slice(-10)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pureliva-green font-semibold hover:underline flex items-center gap-1.5"
                  >
                    <Phone size={14} />
                    <span>WhatsApp ({msg.phone})</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
