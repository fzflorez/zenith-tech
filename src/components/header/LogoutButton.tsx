"use client";

import { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { logOutAction } from "@/src/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogOut() {
    if (loading) return;
    setLoading(true);

    try {
      const { errorMessage } = await logOutAction();

      if (!errorMessage) {
        toast.success("Sesión cerrada", {
          description: "Se ha cerrado la sesión correctamente",
        });
        router.push("/");
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Ocurrió un error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenuItem
      onClick={handleLogOut}
      className="text-destructive flex cursor-pointer items-center gap-2"
    >
      <LogOut className="text-primary h-4 w-4" />
      Salir
    </DropdownMenuItem>
  );
}
