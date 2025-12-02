"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function ShoppingCartComponent() {
  const showCounter = 1;

  return (
    <div className={`relative ${showCounter ? "mr-4" : "mr-0"}`}>
      {showCounter && (
        <div className="bg-secondary-foreground text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold sm:text-sm">
          {1}
        </div>
      )}
      <Button variant="link" size="sm" className="cursor-pointer">
        <Link href="/cart">
          <ShoppingCart />
        </Link>
      </Button>
    </div>
  );
}
