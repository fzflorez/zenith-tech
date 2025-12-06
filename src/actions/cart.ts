"use server";

import { createClient } from "@/src/auth/server";

export async function getOrCreateCart(userId: string) {
  const supabase = await createClient();

  // Buscar carrito existente
  const { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (cart) return cart;

  // Si no existe, crearlo
  const { data: newCart, error } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select()
    .single();

  if (error) throw error;

  return newCart;
}

export async function addToCart(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuario no autenticado");

  const cart = await getOrCreateCart(user.id);

  // Revisar si producto ya existe en el carrito
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + 1 })
      .eq("id", existingItem.id);
  } else {
    await supabase.from("cart_items").insert({
      cart_id: cart.id,
      product_id: productId,
      quantity: 1,
    });
  }
}
