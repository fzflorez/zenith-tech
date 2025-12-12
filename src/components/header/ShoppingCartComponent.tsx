"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { useCart } from "@/src/context/CartContext";

type Props = {
  user: User | null;
};

export default function ShoppingCartComponent({ user }: Props) {
  const { items } = useCart();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const showCounter = user && totalQuantity > 0;

  return (
    <div className={`relative ${showCounter ? "mr-4" : "mr-0"}`}>
      {showCounter && (
        <div className="bg-secondary-foreground text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold sm:text-sm">
          {totalQuantity}
        </div>
      )}
      <Button variant="link" size="sm" className="cursor-pointer">
        <Link href="/cart">
          <ShoppingCart className="text-white" />
        </Link>
      </Button>
    </div>
  );
}
