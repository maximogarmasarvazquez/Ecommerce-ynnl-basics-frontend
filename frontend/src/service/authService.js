import axios from "axios";

const API_URL = "http://localhost:3000/users"; // ajustá el puerto si es otro

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};