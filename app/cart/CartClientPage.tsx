"use client";

import CartEmpty from "@/src/components/cart/CartEmpty";
import ItemCard from "@/src/components/cart/ItemCard";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { useCart } from "@/src/context/CartContext";
import { formatCurrency } from "@/src/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function CartClientPage() {
  const [loading, setLoading] = useState(false);
  const { items } = useCart();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, i) => acc + i.product.price * i.quantity,
      0
    );
    return { subtotal, shipping: 0, total: subtotal };
  }, [items]);

  async function handleTestCheckout() {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Compra realizada correctamente", {
        description: "Gracias por su compra",
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Hubo un error realizando la compra");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) return <CartEmpty />;

  return (
    <>
      <Link
        href="/products"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Productos
      </Link>

      <h1 className="text-3xl font-semibold">Tu Carrito</h1>

      <p className="text-muted-foreground mb-8 text-sm">
        {totalQuantity} {totalQuantity === 1 ? "Artículo" : "Artículos"} en tu
        carrito
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:sticky lg:top-20 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Envío</span>
                <span>{formatCurrency(totals.shipping)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t pt-3 text-base font-semibold md:text-lg">
                <span>Total</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleTestCheckout}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Proceder con la compra"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
