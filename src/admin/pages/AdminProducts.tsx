import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Save,
  Search,
  SlidersHorizontal,
} from "lucide-react";

interface Product {
  _id: string;
  id: string;
  slug: string;
  name: string;
  titleWithVariant: string;
  tagline: string;
  type: "Roasted & Salted" | "Raw";
  sku: string;
  netWeight: string;
  accent: string;
  price: number;
  mrp: number;
  stock: number;
  isActive: boolean;
  sortOrder: number;
  ingredients: string;
  description: string;
  storage: string;
  allergen: string;
}

// Utility to safely match products without undefined === undefined collisions
const isSameProduct = (a: Partial<Product>, b: Partial<Product>): boolean => {
  if (a._id && b._id) return a._id === b._id;
  if (a.id && b.id) return a.id === b.id;
  if (a.slug && b.slug) return a.slug === b.slug;
  return false;
};

const deduplicateProducts = (list: Product[]): Product[] => {
  const seen = new Set<string>();
  return list.filter((p) => {
    const key = p._id || p.id || p.slug;
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get<Product[]>("/admin/products");
      setProducts(deduplicateProducts(data || []));
    } catch (err: any) {
      setError(err?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleToggleActive = async (product: Product) => {
    try {
      const targetId = product._id || product.id || product.slug;
      const updated = await api.patch<Product>(`/admin/products/${targetId}`, {
        isActive: !product.isActive,
      });
      setProducts((prev) =>
        prev.map((p) => (isSameProduct(p, updated) ? { ...p, ...updated } : p))
      );
    } catch (err: any) {
      alert(err?.message || "Failed to update product status");
    }
  };

  const handleSaveProductModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name.trim() || !editingProduct.slug.trim() || !editingProduct.sku.trim()) {
      alert("Name, Slug, and SKU are required fields.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...editingProduct,
        images: (editingProduct as any).images || { bowl: "", packFront: "", packBack: "" },
        keyStats: (editingProduct as any).keyStats || [],
        nutrients: (editingProduct as any).nutrients || [],
        titleWithVariant:
          editingProduct.titleWithVariant?.trim() ||
          `${editingProduct.name} – ${editingProduct.type || "Roasted & Salted"} (${editingProduct.netWeight || "100g"})`,
      };

      if (isNew) {
        const created = await api.post<Product>("/admin/products", payload);
        setProducts((prev) => deduplicateProducts([created, ...prev.filter((p) => !isSameProduct(p, created))]));
      } else {
        const targetId = editingProduct._id || editingProduct.id || editingProduct.slug;
        const updated = await api.put<Product>(
          `/admin/products/${targetId}`,
          payload
        );
        setProducts((prev) =>
          prev.map((p) => (isSameProduct(p, updated) ? { ...p, ...updated } : p))
        );
      }
      setEditingProduct(null);
    } catch (err: any) {
      alert(err?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      const targetId = product._id || product.id || product.slug;
      await api.delete(`/admin/products/${targetId}`);
      setProducts((prev) => prev.filter((p) => !isSameProduct(p, product)));
    } catch (err: any) {
      alert(err?.message || "Failed to delete product");
    }
  };

  // Open brand new product form with NO prefilled dummy data
  const openNewProduct = () => {
    setIsNew(true);
    setEditingProduct({
      _id: "",
      id: `prod-${Date.now()}`,
      slug: "",
      name: "",
      titleWithVariant: "",
      tagline: "",
      type: "Roasted & Salted",
      sku: "",
      netWeight: "",
      accent: "#1B4332",
      price: 0,
      mrp: 0,
      stock: 0,
      isActive: true,
      sortOrder: products.length + 1,
      ingredients: "",
      description: "",
      storage: "",
      allergen: "",
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-stone-900">Product Inventory & Pricing</h1>
          <p className="text-xs text-stone-500 font-medium">
            Manage pouch varieties, retail pricing, MRP, and warehouse stock levels
          </p>
        </div>

        <button
          onClick={openNewProduct}
          className="px-4 py-2.5 rounded-xl bg-[#143324] text-white text-xs font-bold hover:bg-[#1B4332] flex items-center gap-2 shadow-md transition-all self-start sm:self-auto hover:scale-[1.02]"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-200">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Search and Filter Row */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by product name, SKU code, or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-700"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-stone-400" />
        </div>

        <span className="text-xs font-semibold text-stone-500">
          {filteredProducts.length} of {products.length} Products
        </span>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-5">Product</th>
                <th className="py-4 px-5">SKU</th>
                <th className="py-4 px-5">Variant</th>
                <th className="py-4 px-5">Selling Price</th>
                <th className="py-4 px-5">MRP</th>
                <th className="py-4 px-5">Stock Qty</th>
                <th className="py-4 px-5">Public Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-stone-400">
                    Loading product inventory...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-stone-400">
                    No products found. Click "Add New Product" to create one.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod, index) => {
                  const uniqueKey = prod._id || prod.id || prod.slug || `product-${index}`;
                  return (
                    <tr key={uniqueKey} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: prod.accent }}
                        />
                        <div>
                          <strong className="text-stone-900 block font-bold text-sm">{prod.name}</strong>
                          <span className="text-[11px] text-stone-400 font-mono">{prod.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-stone-600">
                      {prod.sku}
                    </td>
                    <td className="py-4 px-5 text-stone-600">{prod.type}</td>
                    <td className="py-4 px-5">
                      <span className="font-heading font-extrabold text-emerald-800 text-sm">
                        ₹{prod.price}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-stone-400 line-through">₹{prod.mrp}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded-md text-xs ${
                          prod.stock <= 10
                            ? "bg-rose-50 text-rose-700"
                            : "bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleToggleActive(prod)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                          prod.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-stone-100 text-stone-500 border border-stone-200 hover:bg-stone-200"
                        }`}
                      >
                        {prod.isActive ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setIsNew(false);
                            setEditingProduct({ ...prod });
                          }}
                          className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors"
                          title="Edit Details"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(prod)}
                          className="p-1.5 rounded-lg border border-stone-200 hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New / Edit Product */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={() => setEditingProduct(null)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="font-heading text-xl font-bold text-stone-900">
                {isNew ? "Create New Product" : `Edit ${editingProduct.name}`}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProductModal} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pumpkin Seeds"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                        slug: isNew
                          ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                          : editingProduct.slug,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. pumpkin-seeds"
                    value={editingProduct.slug}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, slug: e.target.value.toLowerCase() })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="0"
                    value={editingProduct.price === 0 && isNew ? "" : editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    MRP (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="0"
                    value={editingProduct.mrp === 0 && isNew ? "" : editingProduct.mrp}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        mrp: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Stock Inventory *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="0"
                    value={editingProduct.stock === 0 && isNew ? "" : editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PUR-PMP-100"
                    value={editingProduct.sku}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, sku: e.target.value.toUpperCase() })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Net Weight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100 g"
                    value={editingProduct.netWeight}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, netWeight: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Variant Type *
                  </label>
                  <select
                    value={editingProduct.type}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
                  >
                    <option value="Roasted & Salted">Roasted & Salted</option>
                    <option value="Raw">Raw</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Title with Variant
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pumpkin Seeds – Roasted & Salted (100g)"
                  value={editingProduct.titleWithVariant}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, titleWithVariant: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Ingredients List
                </label>
                <input
                  type="text"
                  placeholder="e.g. Roasted Green Pumpkin Seeds & Iodised Salt"
                  value={editingProduct.ingredients}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, ingredients: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe health benefits, flavor profile, and usage..."
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isActive}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isActive: e.target.checked })
                    }
                    className="rounded text-emerald-800 focus:ring-emerald-800"
                  />
                  <span className="font-semibold text-stone-700">Display as Active in Public Store</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-[#143324] text-white hover:bg-[#1B4332] font-semibold flex items-center gap-1.5 shadow-md disabled:opacity-50"
                  >
                    <Save size={14} />
                    <span>{saving ? "Saving..." : "Save Product"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
