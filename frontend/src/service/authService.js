import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const loginUser = async (email, password, rememberMe = false) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });

  const token = res.data?.token;
  const user = res.data?.user;

  if (token && user) {
    if (rememberMe) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rememberMe", "true");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rememberMe", "false");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  return res.data;
};

export const registerUser = async (name, email, password) => {
  const res = await axios.post(`${API_URL}/register`, { name, email, password });
  return res.data;
};

export function getRememberMe() {
  return localStorage.getItem("rememberMe") === "true";
}

export function getToken() {
  if (getRememberMe()) {
    return localStorage.getItem("token");
  }
  return sessionStorage.getItem("token");
}

export function getUser() {
  const rememberMe = getRememberMe();
  if (rememberMe) {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function clearStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("rememberMe");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}
