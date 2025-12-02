import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function CartEmpty() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <Card>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <ShoppingCart size={65} className="text-muted-foreground" />

          <h2 className="text-foreground text-2xl font-semibold">
            Su Carrito está vacío
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base">
            Parece que aún no has añadido ningún artículo a tu carrito.
          </p>

          <Button className="mt-2">
            <Link href="/products">Seguir Comprando</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
