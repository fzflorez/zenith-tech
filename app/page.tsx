import { getProducts } from "@/src/actions/products";
import { HeroSection } from "@/src/components/HeroSection";
import FeacturedProductsSection from "@/src/components/products/FeacturedProductsSection";
import StatsSection from "@/src/components/StatsSection";

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <HeroSection />
      <div className="mx-auto w-full max-w-7xl px-5">
        <StatsSection />
        <FeacturedProductsSection products={products} />
      </div>
    </>
  );
}
