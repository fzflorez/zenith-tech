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
import CartClientPage from "./CartClientPage";

export default async function CartPage() {
  const user = await getUser();

  if (!user) {
    return (
      <section className="pt-24 pb-10">
        <div className="mx-auto max-w-md px-5">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-accent-foreground text-2xl font-semibold">
                Inicia sesión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm sm:text-base">
                Debes iniciar sesión para ver los productos en tu carrito.
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

  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5">
        <CartClientPage user={user} />
      </div>
    </section>
  );
}
