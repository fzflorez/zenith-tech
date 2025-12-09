"use server";

import { createClient } from "@/src/auth/server";
import { CartItem } from "../types/cart";

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

  // Obtener usuario autenticado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuario no autenticado" };
  }

  // Obtener o crear carrito
  const cart = await getOrCreateCart(user.id);

  // Revisar si ya existe un item del mismo producto
  const { data: existingItem, error: existingError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id)
    .eq("product_id", productId)
    .single();

  if (existingError && existingError.code !== "PGRST116") {
    console.error(existingError);
    return { error: "No se pudo verificar el carrito" };
  }

  // Si ya existe, sumamos
  if (existingItem) {
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + 1 })
      .eq("id", existingItem.id);

    if (updateError) {
      console.error(updateError);
      return { error: "No se pudo actualizar la cantidad del producto" };
    }

    return { success: true, action: "updated" };
  }

  // Si no existe, insertamos
  const { error: insertError } = await supabase.from("cart_items").insert({
    cart_id: cart.id,
    product_id: productId,
    quantity: 1,
  });

  if (insertError) {
    console.error(insertError);
    return { error: "No se pudo agregar el producto al carrito" };
  }

  return { success: true, action: "inserted" };
}

export async function getCartItems(): Promise<CartItem[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const cart = await getOrCreateCart(user.id);

  const { data: items, error } = await supabase
    .from("cart_items")
    .select(
      `
      id,
      quantity,
      product:products!cart_items_product_id_fkey (
        id,
        name,
        description,
        price,
        original_price,
        image,
        rating,
        review_count,
        category,
        in_stock,
        stock_quantity,
        is_featured
      )
    `
    )
    .eq("cart_id", cart.id);

  if (error) {
    console.log("Error obteniendo cart_items:", error);
    return [];
  }

  return (items ?? []).map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product: Array.isArray(item.product) ? item.product[0] : item.product,
  }));
}

export async function updateCartQuantity(itemId: string, quantity: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId);

  if (error) {
    console.error("Error actualizando cantidad:", error);
  }
}

export async function removeCartItem(itemId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
