import { formatCurrency } from "@/src/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function ItemCard() {
  return (
    <Card className="flex w-full flex-col items-center gap-4 p-4 transition-all duration-200 ease-out sm:flex-row">
      <Image
        src={
          "https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg"
        }
        alt="Imagen"
        width={96}
        height={96}
        className="h-24 w-24 rounded object-cover"
        priority
      />

      <CardContent className="w-full flex-1 p-0">
        <CardTitle className="text-base font-medium md:text-lg">
          {"Nombre del producto"}
        </CardTitle>
        <div className="text-muted-foreground text-sm">
          {"Categoría del producto"}
        </div>
        <div className="font-medium">{formatCurrency(20000)}</div>
      </CardContent>

      <CardFooter className="flex w-auto flex-col items-center gap-3 sm:items-end">
        <div className="mt-2 flex items-center gap-3">
          <div className="flex w-fit items-center rounded border">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground cursor-not-allowed opacity-100"
            >
              -
            </Button>
            <input
              className="w-12 border-r border-l text-center"
              type="number"
            />
            <Button variant="ghost" size="sm">
              +
            </Button>
          </div>

          {/* Muestra stock disponible dinámico */}
          <div className="text-sm">Stock disponible: 1</div>
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>{formatCurrency(1 * 2)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive cursor-pointer"
          >
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
