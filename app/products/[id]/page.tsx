import { products } from "@/src/db-tem/products";
import ProductDetailClientPage from "./ProductDetailClientPage";

export default function ProductDetailPage() {
  return <ProductDetailClientPage products={products} />;
}
