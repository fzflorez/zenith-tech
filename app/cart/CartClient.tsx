"use client";

import ItemCard from "@/src/components/cart/ItemCard";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { formatCurrency } from "@/src/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartClient() {
  const [items, setItems] = useState([]); // solo por el momento

  return (
    <>
      <Link
        href="/products"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Productos
      </Link>

      <h1 className="mb-1 text-3xl font-semibold">Tu Carrito</h1>

      <p className="text-muted-foreground mb-8 text-sm">
        1 articulo en tu carrito
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item, index) => (
            <ItemCard
              key={index} // index por el momento
            />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resumen del pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>{formatCurrency(20000)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Envío</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t pt-3 text-base font-semibold md:text-lg">
              <span>Total</span>
              <span>{formatCurrency(20000)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Proceder con la compra</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
