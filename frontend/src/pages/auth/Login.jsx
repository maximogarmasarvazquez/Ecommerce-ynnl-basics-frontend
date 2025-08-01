import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import { loginUser } from "../../service/authService";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const data  = await loginUser(email, password);

      // Guardar token y user en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirigir según el rol
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales inválidas");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
