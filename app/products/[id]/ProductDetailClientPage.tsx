"use client";

import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { formatCurrency } from "@/src/lib/utils";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useMemo, useTransition } from "react";
import { Product } from "@/src/types/product";
import { CartItem } from "@/src/types/cart";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { addToCart } from "@/src/actions/cart";

type Props = {
  product: Product;
  items: CartItem[];
  user: User | null;
};

export default function ProductDetailClientPage({
  product,
  items,
  user,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const availableStock = useMemo(() => {
    const itemInCart = items.find((i) => i.product.id === product.id);
    const cartQty = itemInCart ? itemInCart.quantity : 0;
    return Math.max(0, product.stock_quantity - cartQty);
  }, [items, product]);

  const discountPercentage =
    product.original_price && product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100
        )
      : 0;

  const handleAddToCart = () => {
    if (!product.in_stock) return toast.error("Este producto está agotado");
    if (!user?.id) return toast.error("Debes iniciar sesión");

    startTransition(() => {
      addToCart(product.id)
        .then(() => toast.success(`${product.name} agregado al carrito`))
        .catch(() => toast.error("Error al agregar al carrito"));
    });
  };

  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 xl:px-0">
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Productos
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                  -{discountPercentage}%
                </Badge>
              )}
              {!product.in_stock && (
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Agotado
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  {product.rating} ({product.review_count} reseñas)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">
                {formatCurrency(product.price)}
              </span>
              {product.original_price && (
                <span className="text-muted-foreground text-xl line-through">
                  {formatCurrency(product.original_price)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{product.category}</Badge>
            </div>

            <Card>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Stock:</span>
                <span
                  className={
                    availableStock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {availableStock > 0
                    ? `${availableStock} Disponible`
                    : "Agotado"}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full cursor-pointer"
                disabled={
                  !product.in_stock || isPending || availableStock === 0
                }
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isPending
                  ? "Agregando..."
                  : availableStock > 0
                  ? "Añadir al Carrito"
                  : "Sin stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
