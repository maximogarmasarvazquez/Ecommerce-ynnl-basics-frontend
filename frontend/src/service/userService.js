// src/service/userService.js
import axios from "axios";
import { getAuthConfig } from "./getAuthConfig";
const API_URL = "http://localhost:3000/users";



export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, getAuthConfig());
  return res.data;
};


export const updateUser = async (id, userData) => {
  const res = await axios.put(`${API_URL}/${id}`, userData, getAuthConfig());
  return res.data;
};


// Obtener todos los usuarios (solo admin)
export const getAllUsers = async () => {
  const res = await axios.get(API_URL, getAuthConfig());
  return res.data;
};

// Eliminar un usuario (admin o el mismo usuario)
export const deleteUserById = async (id) => {
  await axios.delete(`${API_URL}/${id}`, getAuthConfig());
};

// Crear usuario (requiere pasar los datos)
export const createUser = async (userData) => {
  const res = await axios.post(API_URL, userData, getAuthConfig());
  return res.data;
};

