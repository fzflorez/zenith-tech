"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { ChevronRight, ShoppingCart, Star } from "lucide-react";
import { useTransition } from "react";
import Link from "next/link";
import { Product } from "@/src/types/product";
import { addToCart } from "@/src/actions/cart";
import { toast } from "sonner";
import { useCart } from "@/src/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();
  const { refreshCart } = useCart();

  function handleAddToCart() {
    startTransition(async () => {
      const result = await addToCart(product.id);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(`${product.name} agregado al carrito`);

      await refreshCart();
    });
  }

  return (
    <Card className="group flex flex-col transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {!product.in_stock && (
          <Badge variant="secondary" className="absolute top-4 right-4">
            Agotado
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col justify-between px-5">
        <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>

        <div className="mb-3 flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            {product.rating} ({product.review_count})
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl font-bold">
            {formatCurrency(product.price)}
          </span>
          {product.original_price && (
            <span className="text-muted-foreground text-sm line-through">
              {formatCurrency(product.original_price)}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleAddToCart}
            className={`flex w-full items-center gap-2 ${
              !isPending && product.in_stock
                ? "cursor-pointer"
                : "cursor-default"
            }`}
            disabled={!product.in_stock || isPending}
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
