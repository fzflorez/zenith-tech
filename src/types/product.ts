export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  image: string;
  rating: number;
  reviewCount: number;
  category: string | null;
  inStock: boolean;
  stockQuantity: number;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
