"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { useTransition } from "react";
import Link from "next/link";
import { Product } from "@/src/types/product";
import { addToCart } from "@/src/actions/cart";

export default function ProductCard({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();

  function handleAddToCart() {
    console.log("Agregando producto");
    addToCart(product.id);
  }

  return (
    <Card className="group flex flex-col transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={product.image}
          alt={"Nombre de la imagen"}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <Badge variant="secondary" className="absolute top-4 right-4">
          Agotado
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col justify-between px-5">
        <h3 className="mb-2 text-lg font-semibold">{"Nombre del producto"}</h3>

        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl font-bold">{formatCurrency(40000)}</span>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleAddToCart}
            className="flex w-full items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {isPending ? "Agregando..." : "Agregar al carrito"}
          </Button>

          <Button asChild variant="secondary" className="w-full">
            <Link href={`/products/${product.id}`}>
              Ver Detalles
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
