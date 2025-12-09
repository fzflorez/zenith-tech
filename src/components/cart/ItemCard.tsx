"use client";

import { useState, useMemo, startTransition } from "react";
import { formatCurrency } from "@/src/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/src/types/cart";
import { removeCartItem, updateCartQuantity } from "@/src/actions/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  item: CartItem;
};

export default function ItemCard({ item }: Props) {
  const [quantity, setQuantity] = useState(item.quantity);

  const router = useRouter();

  // Stock total real desde Supabase
  const totalStock = item.product.stock_quantity;

  // Stock disponible dinámico: lo que queda después de restar lo que ya tiene el usuario
  const availableStock = useMemo(() => {
    return totalStock - quantity;
  }, [totalStock, quantity]);

  async function handleIncrease() {
    if (availableStock <= 0) return;

    const newQty = quantity + 1;
    setQuantity(newQty);
    await updateCartQuantity(item.id, newQty);
  }

  async function handleDecrease() {
    if (quantity <= 1) return;

    const newQty = quantity - 1;
    setQuantity(newQty);
    await updateCartQuantity(item.id, newQty);
  }

  async function handleManualChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;

    let finalValue = value;

    if (value < 1) finalValue = 1;
    if (value > totalStock) finalValue = totalStock;

    setQuantity(finalValue);
    await updateCartQuantity(item.id, finalValue);
  }

  async function handleRemoveCartItem() {
    startTransition(async () => {
      const result = await removeCartItem(item.id);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(`${item.product.name}`, {
        description: "Eliminado del carrito.",
      });

      router.refresh();
    });
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

      <CardFooter className="flex w-auto flex-col items-center gap-3 sm:items-end">
        {/* Controles de cantidad */}
        <div className="mt-2 flex items-center gap-3">
          <div className="flex w-fit items-center rounded border">
            {/* DECREASE */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              -
            </Button>

            {/* INPUT MANUAL */}
            <input
              value={quantity}
              className="w-12 border-r border-l text-center"
              type="number"
              min={1}
              max={totalStock}
              onChange={handleManualChange}
            />

            {/* INCREASE */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleIncrease}
              disabled={availableStock <= 0}
            >
              +
            </Button>
          </div>

          {/* STOCK DINÁMICO */}
          <div className="text-sm">Stock disponible: {availableStock}</div>
        </div>

        {/* Total por ítem */}
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>{formatCurrency(item.product.price * quantity)}</span>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive cursor-pointer"
            onClick={handleRemoveCartItem}
          >
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
