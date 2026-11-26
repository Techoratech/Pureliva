import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../data/products";
import { SITE_CONFIG } from "../config/site";
import { buildWhatsAppLink } from "../lib/whatsapp";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  variant: string;
  netWeight: string;
  price: number;
  priceDisplay?: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  checkoutWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("pureliva_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("pureliva_cart", JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          variant: product.variant,
          netWeight: product.netWeight,
          price: product.price || 99,
          priceDisplay: product.pricePlaceholder || (product.price ? `₹${product.price}` : "[PRICE]"),
          quantity,
          image: product.images.front || product.images.packFront,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkoutWhatsApp = () => {
    if (items.length === 0) return;
    const itemList = items
      .map((item) => `• ${item.quantity}x ${item.name} (${item.variant}, ${item.netWeight})`)
      .join("\n");

    const message = [
      "Hello Pureliva, I would like to place an order:",
      "",
      itemList,
      "",
      `Total Items: ${totalItems}`,
      subtotal > 0 ? `Estimated Total: ₹${subtotal}` : "Price: [PRICE]",
      "",
      "Please confirm availability and dispatch details.",
    ].join("\n");

    const url = buildWhatsAppLink(message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        checkoutWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
