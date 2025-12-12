"use client";

import ProductGrid from "@/src/components/products/ProductGrid";
import ProductsSearchComponent from "@/src/components/products/ProductsSearchComponent";
import { Product } from "@/src/types/product";
import { useState, useCallback } from "react";

type Props = {
  products: Product[];
};

export default function ProductsClientPage({ products }: Props) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleSearch = useCallback(
    (query: string) => {
      if (!query) {
        setFilteredProducts(products);
        return;
      }

      const cleanQuery = query.toLowerCase();

      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(cleanQuery)
      );

      setFilteredProducts(filtered);
    },
    [products]
  );

  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5">
        <h2 className="text-2xl font-bold md:text-3xl">Productos</h2>
        <ProductsSearchComponent onSearch={handleSearch} />

        {filteredProducts.length > 0 && (
          <p className="text-muted-foreground text-sm">
            Mostrando {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
        )}

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-semibold">No se encontraron productos</p>
            <p className="text-muted-foreground mt-2">
              Intenta buscar con otro nombre.
            </p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </section>
  );
}
