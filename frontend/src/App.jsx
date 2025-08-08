import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import {PrivateRouteLogin, PrivateRouteAdmin} from "./routes/PrivateRoute";


// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import CategoryForm from "./features/categories/CategoryForm";
import ProductForm from "./features/products/ProductForm";
import UserForm from "./features/users/UserFrom.jsx";
// Cliente
import HomeClient from "./pages/client/HomeClient";
import ProductsClient from "./pages/client/ProductsClient";
import PerfilClient from "./pages/client/PerfilClient";
import ClientLayout from "./layouts/ClientLayout";
// Redirección según rol
import HomeRedirect from "./components/HomeRedirect";

// Carrito
import Cart from "./pages/client/Cart.jsx";

// Componente landing con navegación a login/register
function PublicLanding() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la tienda</h1>
      <p className="mb-2">
        <Link className="text-blue-600 underline" to="/login">Iniciar sesión</Link> |{" "}
        <Link className="text-blue-600 underline" to="/register">Registrarse</Link>
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta raíz que redirige según rol y login */}
        <Route path="/" element={<HomeRedirect />} />

        {/* Landing pública */}
        <Route path="/landing" element={<PublicLanding />} />

        {/* Login y Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Cliente */}
        <Route
          path="/cliente"
          element={
            <PrivateRouteLogin>
                <ClientLayout />
            </PrivateRouteLogin>
          }
        >
          <Route path="home" element={<HomeClient />} />
          <Route path="productos" element={<ProductsClient />} />
          <Route path="perfil" element={<PerfilClient />} />
          <Route path="carrito" element={<Cart />} />
        </Route>

        {/* Admin con rutas anidadas */}
        <Route
          path="/admin"
          element={
            <PrivateRouteAdmin roles="admin">
              <AdminLayout />
            </PrivateRouteAdmin>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="categories" element={<Categories />} />
          <Route path="categories/create" element={<CategoryForm />} />
          <Route path="categories/edit/:id" element={<CategoryForm />} />

          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />

          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />

          <Route path="orders" element={<Orders />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
