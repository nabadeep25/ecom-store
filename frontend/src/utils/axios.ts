import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';
const apiInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

export { apiInstance };
