import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: 200, background: "#eee", padding: 10 }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><NavLink to="/admin" end>Dashboard</NavLink></li>
          <li><NavLink to="/admin/categories">Categorías</NavLink></li>
          <li><NavLink to="/admin/products">Productos</NavLink></li>
          <li><NavLink to="/admin/orders">Órdenes</NavLink></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
}
