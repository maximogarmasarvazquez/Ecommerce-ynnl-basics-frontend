import { getToken, getUser } from "../service/authService";

export function PrivateRouteAdmin({ children, role }) {
  const token = getToken();
  const user = getUser();

  if (!token) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/home" />;

  return children;
}

export function PrivateRouteLogin({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" />;

  return children;
}
