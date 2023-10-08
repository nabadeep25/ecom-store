import { Cart, Checkout } from "../types";
import { apiInstance } from "../utils/axios";
/**
 * Function to fetch all ites
 * @returns 
 */
export const fetchAllItems = async () => {
  const response = await apiInstance.get("/items");
  return response.data;
};
/**
 * Function to get user cart data
 * @param userId 
 * @returns 
 */
export const fetchUsercart = async (userId: number) => {
  const response = await apiInstance.get(`/cart?userId=${userId}`);
  return response.data;
};
/**
 * Function to add item to cart
 * @param body 
 * @returns 
 */
export const addToCart = async (body: Cart) => {
  const response = await apiInstance.post("/add-to-cart", body);
  return response.data;
};
/**
 * Function for user checkout
 * @param body 
 * @returns 
 */
export const checkout = async (body: Checkout) => {
  const response = await apiInstance.post("/checkout", body);
  return response.data;
};
