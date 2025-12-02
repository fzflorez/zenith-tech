import ProductGrid from "@/src/components/products/ProductGrid";

export default function ProductsClientPage({ products }) {
  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5">
        <h2 className="text-2xl font-bold md:text-3xl">Productos</h2>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
