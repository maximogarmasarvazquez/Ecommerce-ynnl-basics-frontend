import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import { loginUser } from "../../service/authService";

export default function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async ({ email, password }) => {
    try {
      // Pasamos rememberMe a loginUser para que guarde correctamente
      const data = await loginUser(email, password, rememberMe);

      // Redirigir según rol
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/cliente/home");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales inválidas");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <LoginForm
        onSubmit={handleLogin}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
      />
      <Link to="/register">Registrarse</Link>
    </div>
  );
}
