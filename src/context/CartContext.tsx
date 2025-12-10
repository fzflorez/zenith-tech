"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { CartItem } from "@/src/types/cart";
import { getCartItems } from "@/src/actions/cart";

type CartContextType = {
  items: CartItem[];
  refreshCart: () => Promise<void>;
  getItemQuantity: (productId: string) => number;
  getAvailableStock: (productId: string) => number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  async function refreshCart() {
    const data = await getCartItems();
    setItems(data);
  }

  useEffect(() => {
    async function load() {
      const data = await getCartItems();
      setItems(data);
    }
    load();
  }, []);

  const getItemQuantity = useCallback(
    (productId: string) => {
      const item = items.find((i) => i.product.id === productId);
      return item ? item.quantity : 0;
    },
    [items]
  );

  const getAvailableStock = useCallback(
    (productId: string) => {
      const item = items.find((i) => i.product.id === productId);
      if (!item) return 0;

      return item.product.stock_quantity - item.quantity;
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, refreshCart, getItemQuantity, getAvailableStock }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
