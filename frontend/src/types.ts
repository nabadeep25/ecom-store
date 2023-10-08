type User = {
  id: string;
  role: "admin" | "user";
};

type DiscountCode = {
  code: string;
  used: boolean;
};
type Item = {
  id: string;
  name: string;
  price: number;
  stock?: number;
};

export type { User, DiscountCode, Item };
