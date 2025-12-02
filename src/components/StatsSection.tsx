import { ShoppingBag, TrendingUp, Users } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function StatsSection() {
  return (
    <section className="pt-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <Card className="text-center">
          <CardHeader>
            <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <ShoppingBag className="text-primary h-6 w-6" />
            </div>
            <CardTitle>1000+ Productos</CardTitle>
            <CardDescription>Tu selección premium está aquí</CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Users className="text-primary h-6 w-6" />
            </div>
            <CardTitle>50k+ Clientes</CardTitle>
            <CardDescription>
              Con la confianza de clientes de todo el mundo
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <TrendingUp className="text-primary h-6 w-6" />
            </div>
            <CardTitle>4.8★ Clasificación</CardTitle>
            <CardDescription>
              Excelente satisfacción del cliente
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
