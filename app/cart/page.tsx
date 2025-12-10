import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import { getUser } from "@/src/auth/server";
import { getCartItems } from "@/src/actions/cart";
import CartClientPage from "./CartClientPage";

export default async function CartPage() {
  const user = await getUser();

  if (!user) {
    return (
      <section className="pt-24 pb-10">
        <div className="mx-auto max-w-md px-5">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-foreground text-2xl font-semibold">
                Inicia sesión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm sm:text-base">
                Debes iniciar sesión para poder agregar productos al carrito.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    );
  }

  // const items = await getCartItems();

  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5">
        <CartClientPage />
      </div>
    </section>
  );
}
