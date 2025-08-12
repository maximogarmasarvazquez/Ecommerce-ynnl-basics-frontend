import axios from "axios";
import { getAuthConfig } from "./getAuthConfig";
const API = "http://localhost:3000/categories";

export const getAllCategories = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getCategoryById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const createCategory = async (category) => {
  const res = await axios.post(API, category, getAuthConfig());
  return res.data;
};

export const updateCategory = async (id, category) => {
  const res = await axios.put(`${API}/${id}`, category, getAuthConfig());
  return res.data;
};

export const deleteCategoryById = async (id) => {
  await axios.delete(`${API}/${id}`, getAuthConfig());
};
