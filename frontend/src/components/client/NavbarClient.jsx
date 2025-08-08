import { NavLink, useNavigate } from "react-router-dom";

export default function NavbarCliente() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que querés cerrar sesión?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "underline text-yellow-300"
      : "hover:underline text-white";

  return (
    <nav className="bg-gray-800 px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-white">Tienda</div>

        <div className="flex gap-6">
          <NavLink to="/cliente/home" className={navLinkClass}>Inicio</NavLink>
          <NavLink to="/cliente/productos" className={navLinkClass}>Productos</NavLink>
          <NavLink to="/cliente/perfil" className={navLinkClass}>Mi perfil</NavLink>
          <NavLink to="/cliente/carrito" className={navLinkClass}>Carrito</NavLink>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 text-white"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
