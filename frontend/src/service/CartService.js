// service/CartService.js
import axios from "axios";

const API_URL = "http://localhost:3000";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getMyCart = async () => {
  const response = await axios.get(`${API_URL}/carts/me`, getAuthConfig());
  return response.data;
};

export const addToCart = async (product_size_id) => {
  if (!product_size_id) throw new Error("Debe enviar product_size_id");
  const response = await axios.post(
    `${API_URL}/carts/add`,
    { product_size_id },
    getAuthConfig()
  );
  return response.data;
};

export const updateItemQuantity = async (itemId, quantity) => {
  if (!itemId) throw new Error("Debe enviar itemId");
  if (quantity == null || quantity < 1)
    throw new Error("Cantidad inválida");
  const response = await axios.patch(   // Cambié a PATCH (si usás PUT también está bien)
    `${API_URL}/carts/item/${itemId}`,
    { quantity },
    getAuthConfig()
  );
  return response.data;
};

// removeItemFromCart a /carts/item/:itemId
export const removeItemFromCart = async (itemId) => {
  if (!itemId) throw new Error("Debe enviar itemId");
  const response = await axios.delete(
    `${API_URL}/carts/item/${itemId}`, // corregir a item, no items
    getAuthConfig()
  );
  return response.data;
};

// clearMyCart a /carts/mine
export const clearMyCart = async () => {
  const response = await axios.delete(`${API_URL}/carts/mine`, getAuthConfig());
  return response.data;
};