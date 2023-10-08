import { apiInstance } from "../utils/axios";

export const fetchDashboardStats = async () => {

    const response = await apiInstance.get("/admin/store-stats");
    return response.data;
  
};

export const fetchDiscountCodes = async () => {
 
    const response = await apiInstance.get("/admin/discount-codes");
    return response.data;
}
