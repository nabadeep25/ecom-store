import { apiInstance } from "../utils/axios";
/**
 * admin function to get store purchase statistics
 * @returns
 */
export const fetchDashboardStats = async () => {
  const response = await apiInstance.get("/admin/store-stats");
  return response.data;
};
/**
 *
 * @returns admin function to fetch all discount code
 */
export const fetchDiscountCodes = async () => {
  const response = await apiInstance.get("/admin/discount-codes");
  return response.data;
};
