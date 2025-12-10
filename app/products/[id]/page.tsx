import { getCartItems } from "@/src/actions/cart";
import ProductDetailClientPage from "./ProductDetailClientPage";
import { getProducts } from "@/src/actions/products";
import { getUser } from "@/src/auth/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const products = await getProducts();
  const items = await getCartItems();
  const user = await getUser();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <ProductDetailClientPage product={product} items={items} user={user} />
  );
}
