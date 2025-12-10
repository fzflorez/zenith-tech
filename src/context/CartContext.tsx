"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/src/types/cart";
import { getCartItems } from "@/src/actions/cart";

type CartContextType = {
  items: CartItem[];
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  async function refreshCart() {
    const data = await getCartItems();
    setItems(data);
  }

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ items, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
