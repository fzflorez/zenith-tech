import { getProducts } from "@/src/actions/products";
import ProductsClientPage from "./ProductsClientPage";

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsClientPage products={products} />;
}
