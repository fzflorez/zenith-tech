import { Loader2 } from "lucide-react";

export default function CartLoading() {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />

      <p className="text-sm font-medium text-gray-600">Cargando carrito...</p>
    </div>
  );
}
