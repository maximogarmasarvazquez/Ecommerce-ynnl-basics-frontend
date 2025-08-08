import axios from "axios";

const API_URL = "http://localhost:3000";

// Función para obtener siempre el token más reciente
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Productos
export const getAllProducts = async () => {
  const res = await axios.get(`${API_URL}/products`, getAuthConfig());
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`, getAuthConfig());
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axios.post(`${API_URL}/products`, productData, getAuthConfig());
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_URL}/products/${id}`, productData, getAuthConfig());
  return res.data;
};

export const deleteProductById = async (id) => {
  const res = await axios.delete(`${API_URL}/products/${id}`, getAuthConfig());
  return res.data;
};

// Categorías
export const getAllCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`, getAuthConfig());
  return res.data;
};
