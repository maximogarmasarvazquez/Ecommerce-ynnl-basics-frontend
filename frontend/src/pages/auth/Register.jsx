import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/authService";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(form.name, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Ocurrió un error");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Registrarse
          </button>
        </form>
      </div>
      <div>
        <Link to="/login">Iniciar sesión</Link>
      </div>
    </>
  );
}
