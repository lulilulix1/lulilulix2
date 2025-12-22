// frontend/src/services/api.js
import axios from "axios";

export const API_URL = "http://localhost:4000";

export async function uploadProduct(formData) {
  return axios.post(`${API_URL}/api/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-admin-pass": "luli123",
    },
  });
}

export async function getProducts() {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data;
}
