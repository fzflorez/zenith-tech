import { products } from "@/src/db-tem/products";
import ProductsClientPage from "./ProductsClientPage";

export default function ProductsPage() {
  return <ProductsClientPage products={products} />;
}
