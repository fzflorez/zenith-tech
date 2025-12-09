import ProductGrid from "@/src/components/products/ProductGrid";
import { Product } from "@/src/types/product";

type Props = {
  products: Product[];
};

export default function ProductsClientPage({ products }: Props) {
  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5">
        <h2 className="text-2xl font-bold md:text-3xl">Productos</h2>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
