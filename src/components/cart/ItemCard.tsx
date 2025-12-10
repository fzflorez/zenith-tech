"use client";

import { useState, ChangeEvent } from "react";
import { formatCurrency } from "@/src/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { CartItem } from "@/src/types/cart";
import { removeCartItem, updateCartQuantity } from "@/src/actions/cart";
import { toast } from "sonner";
import { useCart } from "@/src/context/CartContext";

type Props = {
  item: CartItem;
};

export default function ItemCard({ item }: Props) {
  const { refreshCart, getAvailableStock, getItemQuantity } = useCart();

  const [isPending, setIsPending] = useState(false);

  const quantity = getItemQuantity(item.product.id);
  const availableStock = getAvailableStock(item.product.id);
  const totalStock = item.product.stock_quantity;

  async function handleIncrease() {
    const newQty = quantity + 1;
    await updateCartQuantity(item.id, newQty);
    refreshCart();
  }

  async function handleDecrease() {
    if (quantity <= 1) return;
    const newQty = quantity - 1;
    await updateCartQuantity(item.id, newQty);
    refreshCart();
  }

  async function handleManualChange(e: ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);

    if (val < 1 || val > totalStock) return;

    await updateCartQuantity(item.id, val);
    refreshCart();
  }

  async function handleRemoveCartItem() {
    try {
      setIsPending(true);
      await removeCartItem(item.id);

      toast.success(item.product.name, {
        description: "Eliminado del carrito.",
      });

      refreshCart();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="flex w-full flex-col items-center gap-4 p-4 transition-all duration-200 ease-out sm:flex-row">
      <Image
        src={item.product.image}
        alt="Imagen"
        width={96}
        height={96}
        className="h-24 w-24 rounded object-cover"
        priority
      />

      <CardContent className="w-full flex-1 p-0">
        <CardTitle className="text-base font-medium md:text-lg">
          {item.product.name}
        </CardTitle>

        <div className="text-muted-foreground text-sm">
          {item.product.category}
        </div>

        <div className="font-medium">{formatCurrency(item.product.price)}</div>
      </CardContent>

      <CardFooter className="flex w-auto flex-col items-center gap-2 sm:items-end">
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex w-fit items-center rounded border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              -
            </Button>

            <input
              value={quantity}
              className="w-12 border-r border-l text-center"
              type="number"
              min={1}
              max={totalStock}
              onChange={handleManualChange}
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={handleIncrease}
              disabled={availableStock <= 0}
            >
              +
            </Button>
          </div>

          <p className="text-sm">Stock disponible: {availableStock}</p>
        </div>

        <div className="text-muted-foreground flex items-center gap-1 text-sm">
          <span>{formatCurrency(item.product.price * quantity)}</span>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive cursor-pointer"
            onClick={handleRemoveCartItem}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
