import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { clearStorage } from "../service/authService"; // ajusta la ruta según corresponda

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearStorage();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: 200, background: "#eee", padding: 10 }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><NavLink to="/admin" end>Dashboard</NavLink></li>
          <li><NavLink to="/admin/categories">Categorías</NavLink></li>
          <li><NavLink to="/admin/products">Productos</NavLink></li>
          <li><NavLink to="/admin/orders">Órdenes</NavLink></li>
          <li><NavLink to="/admin/users">Usuarios</NavLink></li>
          <li>
            <button
              onClick={handleLogout}
              style={{
                marginTop: 20,
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: 4,
              }}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
}
