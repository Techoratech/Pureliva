import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "../data/products";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const filtered = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.variant.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-stone-200"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 flex items-center gap-3 border-b border-stone-100">
              <Search size={22} className="text-pureliva-green flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search raw seeds, roasted seeds, seed mix, benefits..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-base sm:text-lg text-stone-900 placeholder-stone-400 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Suggestions / Results */}
            <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto">
              {!query.trim() ? (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-3">
                    Popular Pureliva Seeds
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRODUCTS.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/product/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100"
                      >
                        <img
                          src={p.images.front}
                          alt={p.name}
                          className="w-10 h-12 object-contain"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900">
                            {p.name}
                          </h4>
                          <span className="text-[11px] text-stone-500">
                            {p.variant} • {p.netWeight}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-sm font-semibold text-stone-800">
                    No seeds matching "{query}"
                  </p>
                  <p className="text-xs text-stone-500">
                    Try searching for Chia, Flax, Pumpkin, Sunflower, or Seed Mix.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Found {filtered.length} {filtered.length === 1 ? "Result" : "Results"}
                  </span>
                  {filtered.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/product/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-emerald-50/50 transition-colors border border-stone-100 group"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={p.images.front}
                          alt={p.name}
                          className="w-12 h-14 object-contain"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 group-hover:text-pureliva-green transition-colors">
                            {p.name}
                          </h4>
                          <p className="text-xs text-stone-500 line-clamp-1">
                            {p.variant} • {p.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-stone-300 group-hover:text-pureliva-green transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
