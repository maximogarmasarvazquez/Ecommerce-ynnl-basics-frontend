import { Navigate } from "react-router-dom";
import { getToken, getUser } from "../service/authService";

export default function HomeRedirect() {
  const token = getToken();
  const user = getUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === "client") {
    return <Navigate to="/cliente/home" replace />;
  }

  return <Navigate to="/login" replace />;
}
