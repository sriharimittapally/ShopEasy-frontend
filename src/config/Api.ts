import axios from "axios";

export const API_URL = "https://shopeasy-ecommerce-multivendor-production.up.railway.app";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
