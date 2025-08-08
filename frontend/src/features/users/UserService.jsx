import axios from "axios";

const API_URL = "http://localhost:3000/users"; // Ajustá el host si es necesario

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Obtener todos los usuarios (solo admin)
export const getAllUsers = async () => {
  const res = await axios.get(API_URL, {
    headers: authHeader(),
  });
  return res.data;
};

// Eliminar un usuario (admin o el mismo usuario)
export const deleteUserById = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: authHeader(),
  });
};

// Crear usuario (requiere pasar los datos)
export const createUser = async (userData) => {
  const res = await axios.post(API_URL, userData, {
    headers: authHeader(),
  });
  return res.data;
};

// Actualizar usuario (id + datos)
export const updateUser = async (id, userData) => {
  const res = await axios.put(`${API_URL}/${id}`, userData, {
    headers: authHeader(),
  });
  return res.data;
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};
