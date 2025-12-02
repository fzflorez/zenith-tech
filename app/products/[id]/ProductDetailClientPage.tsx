"use client";

import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { formatCurrency } from "@/src/lib/utils";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useTransition } from "react";

export default function ProductDetailClientPage() {
  const [isPending, startTransition] = useTransition();

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
                src={
                  "https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg"
                }
                alt={"Nombre imagen"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{"Nombre producto"}</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">{formatCurrency(500)}</span>
              <span className="text-muted-foreground text-xl line-through">
                {formatCurrency(3000)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{"Categoría"}</Badge>
            </div>

            <Card>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {"description"}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Stock:</span>
              </div>

              <Button size="lg" className="w-full cursor-pointer">
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isPending ? "Agregando..." : "Sin stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
