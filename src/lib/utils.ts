import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, "");
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Ha ocurrido un error, por favor intenta de nuevo.";
}
