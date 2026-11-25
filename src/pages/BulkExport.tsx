import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import SectionHeading from "../components/SectionHeading";
import WhatsAppIcon from "../components/WhatsAppIcon";
import Marquee from "../components/Marquee";
import { buildBulkEnquiryLink, BulkEnquiryData } from "../lib/whatsapp";
import { api } from "../lib/api";
import {
  Globe,
  Truck,
  ShieldCheck,
  Zap,
  Building2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

export const BulkExport: React.FC = () => {
  const [mountTime] = useState<number>(() => Date.now());

  const [formData, setFormData] = useState<
    BulkEnquiryData & { email: string; phone: string; _hp?: string }
  >({
    name: "",
    company: "",
    country: "",
    product: "Chia Seeds",
    quantity: "",
    message: "",
    email: "",
    phone: "",
    _hp: "",
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const bulkCatalog = [
    {
      name: "Bulk Chia Seeds",
      spec: "Purity 99.9% min · Machine cleaned & Sortexed",
      packaging: "25 kg / 50 kg multi-wall paper bags / PP bags",
      icon: "🌱",
      type: "Superfood Seeds",
    },
    {
      name: "Bulk Flax Seeds",
      spec: "Brown & Golden variants · High oil content (>38%)",
      packaging: "25 kg / 50 kg PP bags / customized",
      icon: "🌾",
      type: "Oilseeds & Food",
    },
    {
      name: "Dehydrated Onion Flakes",
      spec: "White & Red Onion · Moisture < 6% · Premium pungent aroma",
      packaging: "14 kg / 20 kg poly-lined cartons",
      icon: "🧅",
      type: "Dehydrated Spices",
    },
    {
      name: "Garlic Powder",
      spec: "100 mesh · Free flowing · Pure aroma · No anti-caking additives",
      packaging: "20 kg / 25 kg fiber drums / cartons",
      icon: "🧄",
      type: "Seasoning Powder",
    },
    {
      name: "Dry Garlic (Whole Bulbs & Cloves)",
      spec: "Khandwa / MP Origin · Thick skin · Strong pungency",
      packaging: "20 kg / 40 kg mesh bags / ventilated boxes",
      icon: "🧄",
      type: "Whole Agricultural",
    },
  ];

  const whyChooseB2B = [
    {
      icon: Building2,
      title: "Direct Farm Aggregation",
      desc: "Aggregated straight from grower belts across Central India with rigorous traceability.",
    },
    {
      icon: ShieldCheck,
      title: "Certified Food Grade Handling",
      desc: "Processed in accordance with ISO 22000, HACCP, GMP and FSSAI sanitary norms.",
    },
    {
      icon: Globe,
      title: "Bulk Export Readiness",
      desc: "Phytosanitary certification, lab COA, export documentation, and container loading capability.",
    },
    {
      icon: Zap,
      title: "Fast Quotation & Sample Support",
      desc: "Immediate pricing sheets and prompt courier dispatch of test evaluation samples.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.company.trim()) {
      setFormError("Please fill in your Name and Company Name.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please provide a valid business email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setFormError("Please provide a valid phone/WhatsApp contact number.");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      await api.post("/bulk-enquiry", {
        name: formData.name.trim(),
        company: formData.company.trim(),
        country: formData.country.trim(),
        product: formData.product.trim(),
        quantity: formData.quantity.trim(),
        message: formData.message?.trim() || undefined,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        _hp: formData._hp,
        _timestamp: mountTime,
      });

      setSubmitted(true);
    } catch (err: any) {
      setFormError(err?.message || "Failed to submit enquiry. Please try directly on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const waUrl = buildBulkEnquiryLink(formData);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      company: "",
      country: "",
      product: "Chia Seeds",
      quantity: "",
      message: "",
      email: "",
      phone: "",
      _hp: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Bulk & Export Supply | Pureliva Foods (Patidar Enterprises)</title>
        <meta
          name="description"
          content="Export and bulk supply of chia seeds, flax seeds, dehydrated onion, and garlic from Khandwa, Madhya Pradesh. Direct container loads and quotation."
        />
        <link rel="canonical" href="https://purelivafoods.com/bulk-export" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="B2B & Global Trade"
            title="Bulk Supply & Export Distribution"
            subtitle="Patidar Enterprises connects bulk buyers, FMCG brands, repackers, and importers directly with farm-aggregated oilseeds and dehydrated spices from Madhya Pradesh."
            align="center"
          />

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyChooseB2B.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-pureliva-cream border border-stone-200/80 shadow-soft hover:shadow-soft-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-pureliva-green mb-4 shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-pureliva-heading mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-pureliva-body leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bulk Commodities Catalog */}
          <div className="mt-20">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-pureliva-heading mb-3 text-center">
              Bulk Export Portfolio
            </h3>
            <p className="text-xs sm:text-sm text-pureliva-body text-center mb-10 max-w-2xl mx-auto">
              Customized grading, sorting, metal detection, and packing options available for domestic freight or ocean container dispatch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bulkCatalog.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl border border-gray-200 bg-white shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-pureliva-green px-2 py-0.5 rounded-full bg-pureliva-green/10">
                      {item.type}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-pureliva-heading mt-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-pureliva-body mb-3">{item.spec}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500">
                    <strong className="text-gray-700">Packing:</strong> {item.packaging}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Quotation Form */}
          <div className="mt-20 max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-pureliva-cream border border-stone-200 shadow-soft">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-bold tracking-wider text-pureliva-green">
                Direct Export Desk
              </span>
              <h3 className="font-heading text-3xl font-bold text-pureliva-heading mt-1">
                Request a Bulk / Export Quotation
              </h3>
              <p className="text-sm text-pureliva-body mt-2">
                Submit this quick form to send your requirements straight to our trade desk. We respond within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 rounded-2xl bg-white border border-emerald-200 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-pureliva-green flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-pureliva-heading">
                    Enquiry Successfully Registered!
                  </h4>
                  <p className="text-xs sm:text-sm text-pureliva-body max-w-md mx-auto">
                    Thank you, {formData.name}. Our B2B export desk at Patidar Enterprises has received your quotation request for <strong>{formData.product} ({formData.quantity})</strong>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={handleOpenWhatsApp}
                      className="px-6 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft"
                    >
                      <WhatsAppIcon size={18} fill="#FFFFFF" />
                      <span>Chat with Export Desk on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={16} />
                      <span>Submit Another Enquiry</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot hidden input */}
                  <input
                    type="text"
                    name="_hp"
                    value={formData._hp}
                    onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {formError && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle size={16} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Company / Entity *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. AgroCorp Global"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ramesh@agrocorp.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Country / State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. India, UAE, UK"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Commodity *
                      </label>
                      <select
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                      >
                        <option value="Chia Seeds">Bulk Chia Seeds</option>
                        <option value="Flax Seeds">Bulk Flax Seeds</option>
                        <option value="Onion Flakes">Dehydrated Onion Flakes</option>
                        <option value="Garlic Powder">Garlic Powder</option>
                        <option value="Dry Garlic">Dry Garlic (Whole / Cloves)</option>
                        <option value="Custom Mixed Load">Custom / Mixed Container</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Volume Requirement *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="e.g. 500 kg, 5 MT, 1 FCL"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Specification Details or Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention desired purity grades, delivery terms (FOB/CIF), port destination, packaging preference..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                    >
                      <WhatsAppIcon size={22} fill="#FFFFFF" />
                      <span>{loading ? "Submitting Request..." : "Submit Enquiry & Connect on WhatsApp"}</span>
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-gray-400">
                    We log your requirements, notify our export executives, and provide the option to continue discussion directly on WhatsApp.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Marquee */}
        <Marquee />
      </div>
    </>
  );
};

export default BulkExport;
