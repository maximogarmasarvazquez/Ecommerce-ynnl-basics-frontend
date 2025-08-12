import { getToken } from "./authService";

export const getAuthConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};