import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Globe,
  Trash2,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Calendar,
  AlertCircle,
  Filter,
} from "lucide-react";

interface BulkEnquiry {
  _id: string;
  name: string;
  company: string;
  country: string;
  product: string;
  quantity: string;
  message?: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "quoted" | "closed";
  createdAt: string;
}

const statusBadge: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  quoted: "bg-purple-50 text-purple-700 border-purple-200",
  closed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<BulkEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get<any>(
        `/admin/bulk-enquiries?status=${status}&page=${page}&limit=15`
      );
      setEnquiries(res.enquiries || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [page, status]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await api.patch<BulkEnquiry>(`/admin/bulk-enquiries/${id}`, {
        status: newStatus,
      });
      setEnquiries((prev) => prev.map((e) => (e._id === id ? updated : e)));
    } catch (err: any) {
      alert(err?.message || "Failed to update enquiry status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this bulk enquiry record?")) return;
    try {
      await api.delete(`/admin/bulk-enquiries/${id}`);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err: any) {
      alert(err?.message || "Failed to delete enquiry");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-pureliva-heading">
            Bulk & Export Enquiries
          </h1>
          <p className="text-xs text-gray-500">
            B2B institutional leads, wholesale seed requests, and export trade requests
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
            <option value="all">All Enquiries</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-gray-400 bg-white rounded-3xl border border-gray-200">
            Loading enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-400 bg-white rounded-3xl border border-gray-200">
            No bulk enquiries found.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq._id}
              className="p-6 rounded-3xl bg-white border border-gray-200 shadow-soft hover:shadow-soft-lg transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-pureliva-heading">
                      {enq.company} ({enq.country})
                    </h3>
                    <p className="text-xs text-gray-500">
                      Contact: <strong>{enq.name}</strong> •{" "}
                      {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={enq.status}
                    onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border focus:outline-none ${
                      statusBadge[enq.status]
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => handleDelete(enq._id)}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Requirement details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60">
                <div>
                  <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                    Commodity
                  </span>
                  <strong className="text-pureliva-heading text-sm">{enq.product}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                    Target Volume
                  </span>
                  <strong className="text-pureliva-green text-sm">{enq.quantity}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                    Direct Contacts
                  </span>
                  <div className="space-y-0.5 mt-0.5">
                    <a
                      href={`mailto:${enq.email}`}
                      className="text-gray-700 hover:text-pureliva-green flex items-center gap-1.5"
                    >
                      <Mail size={12} />
                      <span>{enq.email}</span>
                    </a>
                    <a
                      href={`https://wa.me/${enq.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pureliva-green font-semibold hover:underline flex items-center gap-1.5"
                    >
                      <Phone size={12} />
                      <span>{enq.phone} (WhatsApp)</span>
                    </a>
                  </div>
                </div>
              </div>

              {enq.message && (
                <div className="text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-500 block mb-1">Specifications:</span>
                  <p className="whitespace-pre-wrap">{enq.message}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
