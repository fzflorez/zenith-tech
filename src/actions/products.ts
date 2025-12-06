"use server";

import { createClient } from "@/src/auth/server";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Product[];
};
