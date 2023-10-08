import { Cart, Checkout } from "../types";
import { apiInstance } from "../utils/axios";

export const fetchAllItems = async () => {
  const response = await apiInstance.get("/items");
  return response.data;
};

export const fetchUsercart = async (userId: number) => {
  const response = await apiInstance.get(`/cart?userId=${userId}`);
  return response.data;
};

export const addToCart = async (body: Cart) => {
  const response = await apiInstance.post("/add-to-cart", body);
  return response.data;
};

export const checkout = async (body: Checkout) => {
  const response = await apiInstance.post("/checkout", body);
  return response.data;
};
