type User = {
  id: number;
  role: "admin" | "user";
};

type DiscountCode = {
  code: string;
  used: boolean;
};
type Item = {
  id: number;
  name: string;
  price: number;
  stock?: number;
  image: string;
};
type Cart = { userId: number; itemId: number; quantity: number };
type Checkout = {
  userId: number;
  discountCode?: string;
};
export type { User, DiscountCode, Item, Cart, Checkout };
