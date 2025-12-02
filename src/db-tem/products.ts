import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Audífonos inalámbricos premium",
    description:
      "Auriculares de alta fidelidad con cancelación de ruido y batería de larga duración. Diseño cómodo para uso prolongado.",
    price: 299900,
    originalPrice: 399900,
    image: "/audifonos-premium.jpg",
    rating: 4.8,
    reviewCount: 124,
    category: "Audio",
    inStock: true,
    stockQuantity: 35,
    isFeatured: true, // 👈 featuredProducts
  },
  {
    id: "2",
    name: "Teclado mecánico retroiluminado",
    description:
      "Teclado mecánico con switches de alto rendimiento y retroiluminación RGB personalizable. Ideal para gamers y programadores.",
    price: 249900,
    originalPrice: 329900,
    image: "/teclado-mecanico.jpg",
    rating: 4.6,
    reviewCount: 98,
    category: "Periféricos",
    inStock: true,
    stockQuantity: 42,
    isFeatured: true,
  },
];
