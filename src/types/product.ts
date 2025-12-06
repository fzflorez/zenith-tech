export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image: string | null;
  rating: number;
  review_count: number;
  category: string | null;
  in_stock: boolean;
  stock_quantity: number;
  is_featured: boolean;
};
