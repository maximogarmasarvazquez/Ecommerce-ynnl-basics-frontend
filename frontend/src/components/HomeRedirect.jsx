import { Navigate } from "react-router-dom";

export default function HomeRedirect() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    // No logueado
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin") {
    // Si es admin, al panel admin
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === "client") {
    // Si es cliente, al home cliente
    return <Navigate to="/cliente/home" replace />;
  }

  // Por si hay otro rol o problema, enviar al login o landing
  return <Navigate to="/login" replace />;
}
